'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Download, Save } from 'lucide-react';
import { toast } from 'sonner';

import { paymentQRs } from '@/lib/constants';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [constants, setConstants] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, verified, unverified
  const [selectedImage, setSelectedImage] = useState(null);
  const [verifyingUsers, setVerifyingUsers] = useState(new Set());
  const [initialLoading, setInitialLoading] = useState(true);
  
  // Constants management state
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [tempSettings, setTempSettings] = useState({
    activePaymentId: 0,
    registrationOpen: true,
    maxRegistrations: 500
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (constants) {
      setTempSettings({
        activePaymentId: constants.activePaymentId ?? 0,
        registrationOpen: constants.registrationOpen ?? true,
        maxRegistrations: constants.maxRegistrations ?? 500
      });
    }
  }, [constants]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } finally {
      setIsAuthenticated(false);
      setUsers([]);
      setConstants(null);
    }
  };

  const fetchData = async () => {
    try {
      // Fetch users
      const usersRes = await fetch('/api/admin/users');

      if (usersRes.status === 401) {
        handleLogout();
        return;
      }

      const usersData = await usersRes.json();
      if (usersData.requiresLogin) {
        handleLogout();
        return;
      }
      
      setIsAuthenticated(true);
      setUsers(usersData.users || []);

      // Fetch constants
      const constantsRes = await fetch('/api/admin/constants');

      if (constantsRes.ok) {
        const constantsData = await constantsRes.json();
        setConstants(constantsData.constants);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    setSettingsLoading(true);

    try {
      const res = await fetch('/api/admin/constants', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tempSettings),
      });

      if (res.ok) {
        const data = await res.json();
        setConstants(data.constants);
        toast.success('Settings updated successfully');
      } else {
        toast.error('Failed to update settings');
      }
    } catch (err) {
      toast.error('Network error while updating settings');
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleExport = () => {
    // Define headers
    const headers = [
      'Name',
      'Email',
      'Phone',
      'Educational Status',
      'College',
      'Year',
      'Food Preference',
      'Workshop',
      'Attended Before',
      'Amount',
      'Transaction ID',
      'Referral Source',
      'Referral Code',
      'Status',
      'Registration Date',
      'Verified At',
      'Payment Screenshot URL'
    ];

    // Convert users data to CSV format
    const csvContent = [
      headers.join(','),
      ...users.map(user => [
        `"${user.name || ''}"`,
        `"${user.email || ''}"`,
        `"${user.whatsappNumber || ''}"`,
        `"${user.educationalStatus || ''}"`,
        `"${user.collegeName || ''}"`,
        `"${user.yearOfStudy || ''}"`,
        `"${user.foodPreference || ''}"`,
        `"${user.workshop || ''}"`,
        `"${user.attendedBefore || ''}"`,
        `"${user.amount || ''}"`,
        `"${user.upiTransactionId || ''}"`,
        `"${user.referralSource || ''}"`,
        `"${user.referralCode || ''}"`,
        `"${user.isVerified ? 'Verified' : 'Pending'}"`,
        `"${user.createdAt ? new Date(user.createdAt).toLocaleString() : ''}"`,
        `"${user.verifiedAt ? new Date(user.verifiedAt).toLocaleString() : ''}"`,
        `"${user.paymentScreenshotUrl || ''}"`
      ].join(','))
    ].join('\n');

    // Create a blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `spaceup-registrations_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVerify = async (userId, isVerified) => {
    setVerifyingUsers(prev => {
      const next = new Set(prev);
      next.add(userId);
      return next;
    });

    try {
      const res = await fetch(`/api/admin/users/${userId}/verify`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isVerified }),
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      if (res.ok) {
        // Refresh data
        await fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update verification status');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setVerifyingUsers(prev => {
        const next = new Set(prev);
        next.delete(userId);
        return next;
      });
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (user.email?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (user.upiTransactionId?.toLowerCase().includes(searchTerm.toLowerCase()) || '');

    const matchesFilter =
      filterStatus === 'all' ||
      (filterStatus === 'verified' && user.isVerified) ||
      (filterStatus === 'unverified' && !user.isVerified);

    return matchesSearch && matchesFilter;
  });

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <span className="ml-4">Loading Admin Dashboard...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Admin Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-900/50 text-red-200 rounded">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <button
              onClick={handleExport}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
            >
              <Download size={20} />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded cursor-pointer w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Statistics and Settings */}
        {constants && (
          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-gray-400 text-sm">Total Registrations</h3>
                <p className="text-3xl font-bold mt-2">{users.length}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-gray-400 text-sm">Verified</h3>
                <p className="text-3xl font-bold mt-2 text-green-500">
                  {users.filter((u) => u.isVerified).length}
                </p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-gray-400 text-sm">Unverified</h3>
                <p className="text-3xl font-bold mt-2 text-yellow-500">
                  {users.filter((u) => !u.isVerified).length}
                </p>
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Registration Settings</h3>
                
                {(constants.activePaymentId !== tempSettings.activePaymentId || 
                  constants.registrationOpen !== tempSettings.registrationOpen) && (
                  <button
                    onClick={handleUpdateSettings}
                    disabled={settingsLoading}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm disabled:opacity-50 transition-all font-medium"
                  >
                    <Save size={16} />
                    {settingsLoading ? "Saving..." : "Save Changes"}
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Active Payment QR</label>
                  <select
                    value={tempSettings.activePaymentId}
                    onChange={(e) =>
                      setTempSettings({
                        ...tempSettings,
                        activePaymentId: parseInt(e.target.value),
                      })
                    }
                    className="bg-gray-900 text-white rounded-lg px-4 py-2.5 text-sm border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  >
                    {paymentQRs.map((qr) => (
                      <option key={qr.id} value={qr.id}>
                        {qr.name} ({qr.upi})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Registration Status</label>
                  <select
                    value={tempSettings.registrationOpen}
                    onChange={(e) =>
                      setTempSettings({
                        ...tempSettings,
                        registrationOpen: e.target.value === "true",
                      })
                    }
                    className="bg-gray-900 text-white rounded-lg px-4 py-2.5 text-sm border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  >
                    <option value="true">Open</option>
                    <option value="false">Closed</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">Max Registrations</label>
                  <input
                    type="number"
                    value={tempSettings.maxRegistrations}
                    disabled
                    className="bg-gray-800 text-gray-500 rounded-lg px-4 py-2.5 text-sm border border-gray-700 cursor-not-allowed outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Users</option>
              <option value="verified">Verified Only</option>
              <option value="unverified">Unverified Only</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-xl">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-sm">
              <thead className="bg-gray-900/50 text-gray-400 font-medium uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Email</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">WhatsApp</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Educational Status</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">College</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Year</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Food Preference</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Workshop</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Referral Code</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Referral Source</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Amount</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Payment To</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Txn ID</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Proof</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 text-left whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.whatsappNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.educationalStatus || '-'}</td>
                    <td className="px-6 py-4 max-w-[200px] truncate text-gray-300" title={user.collegeName}>
                      {user.collegeName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.yearOfStudy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.foodPreference || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.workshop}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-gray-400">
                      {user.referralCode ? (
                        <span className="bg-gray-700 px-2 py-1 rounded border border-gray-600">
                          {user.referralCode}
                        </span>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">{user.referralSource || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300">₹{user.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-300 text-xs">
                      {(() => {
                        if (user.paymentId === undefined || user.paymentId === null) return '-';
                        const qr = paymentQRs.find((q) => q.id === user.paymentId);
                        return qr ? (
                          <div className="flex flex-col">
                            <span className="font-medium text-white">{qr.name}</span>
                            <span className="text-gray-500">{qr.upi}</span>
                          </div>
                        ) : (
                          user.paymentId
                        );
                      })()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-indigo-300">
                      {user.upiTransactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedImage(user.paymentScreenshotUrl)}
                        className="text-blue-400 hover:text-blue-300 text-xs font-medium border border-blue-500/30 hover:border-blue-500/50 px-2.5 py-1 rounded bg-blue-500/10 transition-all cursor-pointer"
                      >
                        View Image
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isVerified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.isVerified ? (
                        <button
                          onClick={() => handleVerify(user._id, false)}
                          disabled={verifyingUsers.has(user._id)}
                          className={`text-red-400 hover:text-red-300 hover:bg-red-500/10 px-2 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                            verifyingUsers.has(user._id) ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {verifyingUsers.has(user._id) ? '...' : 'Unverify'}
                        </button>
                      ) : (
                        <button
                          onClick={() => handleVerify(user._id, true)}
                          disabled={verifyingUsers.has(user._id)}
                          className={`text-green-400 hover:text-green-300 hover:bg-green-500/10 px-2 py-1 rounded text-xs font-medium transition-all cursor-pointer ${
                            verifyingUsers.has(user._id) ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          {verifyingUsers.has(user._id) ? '...' : 'Verify'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No users found
              </div>
            )}
          </div>
        </div>

        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-4xl max-h-[90vh] bg-gray-800 p-2 rounded-lg shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 bg-red-600 text-white rounded-full p-2 hover:bg-red-700 shadow-lg transition-colors z-10 cursor-pointer"
              >
                <X size={20} />
              </button>
              <img 
                src={selectedImage} 
                alt="Payment Screenshot" 
                className="max-w-full max-h-[85vh] object-contain rounded"
              />
            </div>
          </div>
        )}

        <div className="mt-4 text-gray-400 text-sm">
          Showing {filteredUsers.length} of {users.length} registrations
        </div>
      </div>
    </div>
  );
}
