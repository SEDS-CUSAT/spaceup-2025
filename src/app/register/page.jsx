'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/schemas';
import { registerUser, verifyReferralCode } from '@/app/actions/register';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { FileUpload } from "@/components/ui/file-upload";
import { FloatingAstronaut } from "@/components/ui/floating-astronaut";

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [referralStatus, setReferralStatus] = useState('idle'); // idle, verifying, valid, invalid
  const [referralFeedback, setReferralFeedback] = useState('');

  useEffect(() => {
    const registered = localStorage.getItem('spaceup_registered');
    if (registered === 'true') {
      setIsRegistered(true);
    }
  }, []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const referralCodeValue = watch('referralCode');

  // Reset referral status when code changes
  useEffect(() => {
    if (!referralCodeValue) {
      setReferralStatus('idle');
      setReferralFeedback('');
    } else if (referralStatus === 'valid' || referralStatus === 'invalid') {
       // If user types after verification, reset to idle (require re-verification)
       // Check if the current value matches the verified/invalid one?
       // Actually simpler: if code changes, reset status to idle.
       // But this effect runs on every keystroke.
       // So we check if status is NOT idle, then set it to idle.
       setReferralStatus('idle');
       setReferralFeedback('');
    }
  }, [referralCodeValue]);

  const handleVerifyReferral = async () => {
    const code = getValues('referralCode');
    if (!code) return;

    setReferralStatus('verifying');
    setReferralFeedback('');

    try {
      const result = await verifyReferralCode(code);
      if (result.success && result.valid) {
        setReferralStatus('valid');
        setReferralFeedback(`Valid code: ${result.data?.name || 'Ambassador'}`);
      } else {
        setReferralStatus('invalid');
        setReferralFeedback(result.error || 'Invalid referral code');
      }
    } catch (error) {
      setReferralStatus('invalid');
      setReferralFeedback('Error verifying code');
    }
  };

  const handleFileUpload = (files) => {
    setValue('paymentScreenshot', files);
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage(null);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('whatsappNumber', data.whatsappNumber);
    formData.append('collegeName', data.collegeName);
    formData.append('yearOfStudy', data.yearOfStudy);
    formData.append('workshop', data.workshop);
    formData.append('attendedBefore', data.attendedBefore);
    formData.append('referralSource', data.referralSource || '');
    formData.append('referralCode', data.referralCode || '');
    formData.append('upiTransactionId', data.upiTransactionId);
    
    // data.paymentScreenshot is an array of files from FileUpload
    if (data.paymentScreenshot && data.paymentScreenshot[0]) {
      formData.append('paymentScreenshot', data.paymentScreenshot[0]);
    }

    try {
      const result = await registerUser(formData);
      if (result.success) {
        setSubmitMessage({ type: 'success', text: result.message });
        localStorage.setItem('spaceup_registered', 'true');
        setIsRegistered(true);
        reset();
      } else {
        setSubmitMessage({ type: 'error', text: result.message || 'Registration failed' });
        if (result.errors) {
            console.error(result.errors);
        }
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center relative w-full overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 w-full h-full z-0">
          <ShootingStars />
          <StarsBackground />
        </div>
        <div className="absolute top-10 left-10 z-0 hidden lg:block opacity-80">
           <FloatingAstronaut className="w-48 h-48" />
        </div>
        <div className="absolute bottom-10 right-10 z-0 hidden lg:block opacity-80 animation-delay-2000">
           <FloatingAstronaut className="w-32 h-32 rotate-12" />
        </div>

        <div className="lg:hidden relative z-50 -mb-20 pointer-events-none flex justify-center">
            <FloatingAstronaut className="w-48 h-48 drop-shadow-2xl" />
        </div>
        
        <Card className="w-full max-w-2xl relative z-10 bg-black/40 backdrop-blur-xl border-neutral-800 text-neutral-100 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] mt-4">
          <CardHeader className="space-y-1 text-center relative overflow-hidden rounded-t-xl">
            <div className="absolute inset-0 bg-linear-to-r blur-xl"></div>
            <CardTitle className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 relative z-10">
              Registration Successful!
            </CardTitle>
            <CardDescription className="text-neutral-400 relative z-10 text-lg">
              You have successfully registered for SpaceUp.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6 py-8">
            <div className="p-4 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg">
              Thank you for registering!
            </div>
            <div className="space-y-4">
              <p className="text-neutral-300">
                Please join our official WhatsApp group for updates:
              </p>
              <a 
                href="https://chat.whatsapp.com/Jr1Z36wxdK44OZ91pVszP4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/20"
              >
                Join WhatsApp Group
              </a>
            </div>

            <div className="pt-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsRegistered(false);
                  localStorage.removeItem('spaceup_registered');
                  setSubmitMessage(null);
                }}
                className="border-neutral-700 hover:bg-neutral-800 text-neutral-300 hover:text-white"
              >
                Register Another Person
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center relative w-full overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 w-full h-full z-0">
        <ShootingStars />
        <StarsBackground />
      </div>

      <div className="absolute top-10 left-10 z-0 hidden lg:block opacity-80">
         <FloatingAstronaut className="w-48 h-48" />
      </div>
      <div className="absolute bottom-10 right-10 z-0 hidden lg:block opacity-80 animation-delay-2000">
         <FloatingAstronaut className="w-32 h-32 rotate-12" />
      </div>

      <div className="lg:hidden relative z-50 -mb-20 pointer-events-none flex justify-center">
         <FloatingAstronaut className="w-48 h-48 drop-shadow-2xl" />
      </div>
      
      <Card className="w-full max-w-2xl relative z-10 bg-black/40 backdrop-blur-xl border-neutral-800 text-neutral-100 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)] mt-4">
        <CardHeader className="space-y-1 text-center relative overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 bg-linear-to-r  blur-xl"></div>
          <CardTitle className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 relative z-10">
            SpaceUp Registration
          </CardTitle>
          <CardDescription className="text-neutral-400 relative z-10 text-lg">
            Join us for an incredible journey into space on <span className="text-indigo-300 font-semibold">Jan 24th</span>!
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitMessage && (
            <div className={cn(
              "p-4 mb-6 rounded-lg text-center font-medium border",
              submitMessage.type === 'success' 
                ? "bg-green-500/10 text-green-400 border-green-500/20" 
                : "bg-red-500/10 text-red-400 border-red-500/20"
            )}>
              {submitMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-neutral-200">Name <span className="text-red-500 font-bold ml-1">*</span></Label>
              <Input 
                id="name"
                placeholder="Your Full Name" 
                className={cn("bg-neutral-900/50 border-neutral-800 focus:ring-neutral-700 text-neutral-100 placeholder:text-neutral-600", errors.name && "border-red-500 focus:ring-red-500")} 
                {...register('name')} 
              />
              {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-200">Email ID <span className="text-red-500 font-bold ml-1">*</span> <span className="text-xs text-yellow-500/80 ml-2">(Ticket will be sent here)</span></Label>
              <Input 
                id="email"
                type="email" 
                placeholder="you@example.com" 
                className={cn("bg-neutral-900/50 border-neutral-800 focus:ring-neutral-700 text-neutral-100 placeholder:text-neutral-600", errors.email && "border-red-500 focus:ring-red-500")} 
                {...register('email')} 
              />
              {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2">
              <Label htmlFor="whatsappNumber" className="text-neutral-200">WhatsApp Number <span className="text-red-500 font-bold ml-1">*</span></Label>
              <Input 
                id="whatsappNumber"
                type="tel" 
                placeholder="1234567890" 
                className={cn("bg-neutral-900/50 border-neutral-800 focus:ring-neutral-700 text-neutral-100 placeholder:text-neutral-600", errors.whatsappNumber && "border-red-500 focus:ring-red-500")} 
                {...register('whatsappNumber')} 
              />
              {errors.whatsappNumber && <span className="text-red-400 text-sm">{errors.whatsappNumber.message}</span>}
            </div>

            {/* College Name */}
            <div className="space-y-2">
              <Label htmlFor="collegeName" className="text-neutral-200">College Name <span className="text-red-500 font-bold ml-1">*</span></Label>
              <Input 
                id="collegeName"
                type="text" 
                placeholder="University/College Name" 
                className={cn("bg-neutral-900/50 border-neutral-800 focus:ring-neutral-700 text-neutral-100 placeholder:text-neutral-600", errors.collegeName && "border-red-500 focus:ring-red-500")} 
                {...register('collegeName')} 
              />
              {errors.collegeName && <span className="text-red-400 text-sm">{errors.collegeName.message}</span>}
            </div>

            {/* Year of Study */}
            <div className="space-y-2">
              <Label htmlFor="yearOfStudy" className="text-neutral-200">Year of Study <span className="text-red-500 font-bold ml-1">*</span></Label>
              <Controller
                name="yearOfStudy"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className={cn("bg-neutral-900/50 border-neutral-800 focus:ring-neutral-700 text-neutral-100", errors.yearOfStudy && "border-red-500 focus:ring-red-500")}>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-100">
                      <SelectItem value="1st Year">1st Year</SelectItem>
                      <SelectItem value="2nd Year">2nd Year</SelectItem>
                      <SelectItem value="3rd Year">3rd Year</SelectItem>
                      <SelectItem value="4th Year">4th Year</SelectItem>
                      <SelectItem value="5th Year">5th Year</SelectItem>
                      <SelectItem value="Graduated">Graduated</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.yearOfStudy && <span className="text-red-400 text-sm">{errors.yearOfStudy.message}</span>}
            </div>

            {/* Workshop */}
            <div className="space-y-2">
              <Label htmlFor="workshop" className="text-neutral-200">Workshop you're interested in <span className="text-red-500 font-bold ml-1">*</span></Label>
              <Controller
                name="workshop"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className={cn("bg-neutral-900/50 border-neutral-800 focus:ring-neutral-700 text-neutral-100", errors.workshop && "border-red-500 focus:ring-red-500")}>
                      <SelectValue placeholder="Select Workshop" />
                    </SelectTrigger>
                    <SelectContent className="bg-neutral-900 border-neutral-800 text-neutral-100">
                      <SelectItem value="Rocketry">Rocketry</SelectItem>
                      <SelectItem value="Astronomy">Astronomy</SelectItem>
                      <SelectItem value="Space Policy">Space Policy</SelectItem>
                      <SelectItem value="CubeSat">CubeSat</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.workshop && <span className="text-red-400 text-sm">{errors.workshop.message}</span>}
            </div>

            {/* Attended Before */}
            <div className="space-y-2">
              <Label className="text-neutral-200">Have you attended SpaceUp before? <span className="text-red-500 font-bold ml-1">*</span></Label>
              <Controller
                name="attendedBefore"
                control={control}
                render={({ field }) => (
                  <div className="flex gap-6 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        value="Yes" 
                        checked={field.value === 'Yes'}
                        onChange={field.onChange}
                        className="w-4 h-4 text-neutral-600 bg-neutral-900 border-neutral-700 focus:ring-neutral-600 focus:ring-2"
                      />
                      <span className="text-neutral-300">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        value="No" 
                        checked={field.value === 'No'}
                        onChange={field.onChange}
                        className="w-4 h-4 text-neutral-600 bg-neutral-900 border-neutral-700 focus:ring-neutral-600 focus:ring-2"
                      />
                      <span className="text-neutral-300">No</span>
                    </label>
                  </div>
                )}
              />
              {errors.attendedBefore && <span className="text-red-400 text-sm">{errors.attendedBefore.message}</span>}
            </div>

            {/* Referral Source */}
            <div className="space-y-2">
              <Label htmlFor="referralSource" className="text-neutral-200">How did you hear about this event? <span className="text-xs text-neutral-500 ml-2">(Optional)</span></Label>
              <Input 
                id="referralSource"
                type="text" 
                placeholder="Social Media, Friend, Poster, etc." 
                className={cn("bg-neutral-900/50 border-neutral-800 focus:ring-neutral-700 text-neutral-100 placeholder:text-neutral-600", errors.referralSource && "border-red-500 focus:ring-red-500")} 
                {...register('referralSource')} 
              />
              {errors.referralSource && <span className="text-red-400 text-sm">{errors.referralSource.message}</span>}
            </div>

            {/* Referral Code */}
            <div className="space-y-2">
              <Label htmlFor="referralCode" className="text-neutral-200">Referral Code <span className="text-xs text-neutral-500 ml-2">(Optional)</span></Label>
              <div className="flex gap-2">
                <Input 
                  id="referralCode"
                  type="text" 
                  placeholder="Enter Referral Code if any" 
                  readOnly={referralStatus === 'valid'}
                  className={cn(
                    "bg-neutral-900/50 border-neutral-800 focus:ring-neutral-700 text-neutral-100 placeholder:text-neutral-600",
                    errors.referralCode && "border-red-500 focus:ring-red-500",
                    referralStatus === 'valid' && "border-green-500/50 focus:ring-green-500/50 text-green-400 bg-green-500/10 cursor-not-allowed"
                  )} 
                  {...register('referralCode')} 
                />
                {referralCodeValue && (
                  <Button
                    type="button"
                    onClick={handleVerifyReferral}
                    disabled={referralStatus === 'verifying' || referralStatus === 'valid'}
                    className={cn(
                      "min-w-[100px]",
                      referralStatus === 'valid' ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                    )}
                  >
                    {referralStatus === 'verifying' ? 'Checking...' : referralStatus === 'valid' ? 'Verified' : 'Verify'}
                  </Button>
                )}
              </div>
              {referralFeedback && (
                <span className={cn("text-sm block", referralStatus === 'valid' ? "text-green-400" : "text-red-400")}>
                  {referralFeedback}
                </span>
              )}
              {errors.referralCode && <span className="text-red-400 text-sm">{errors.referralCode.message}</span>}
            </div>

            <div className="border-t border-neutral-800 my-6"></div>
            <div className="text-lg font-semibold text-neutral-200">Payment Details</div>
            
            <div className="bg-neutral-900/50 p-4 rounded-lg border border-neutral-800 mb-6 mt-4">
              <div className="text-center mb-4">
                <p className="text-neutral-300 mb-2">Registration Fee</p>
                <div className="text-4xl font-bold text-green-400">
                  ₹399
                </div>
              </div>

              <div className="flex flex-col items-center space-y-4">
                {/* PDF Viewer for QR Code */}
                <div className="w-full aspect-3/4 max-w-[350px] bg-white rounded-lg overflow-hidden relative border border-neutral-700">
                  <iframe 
                    src="/mesac550@sbi.pdf#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH" 
                    className="w-[calc(100%+20px)] h-full border-0 absolute inset-0 -ml-[2px]"
                    title="Payment QR Code"
                    scrolling="no"
                  />
                </div>
                
                <div className="w-full text-center space-y-2">
                  <p className="text-sm text-neutral-400">Scan QR Code or pay to UPI ID</p>
                  <div 
                    className="flex items-center justify-center gap-2 p-3 bg-black/50 rounded border border-neutral-800 cursor-pointer hover:border-neutral-600 transition-colors group"
                    onClick={() => {
                      navigator.clipboard.writeText('mesac550@sbi');
                      // Simple feedback
                      const el = document.getElementById('copy-feedback');
                      if (el) {
                        el.style.opacity = '1';
                        setTimeout(() => el.style.opacity = '0', 2000);
                      }
                    }}
                  >
                    <code className="text-lg text-indigo-300 font-mono">mesac550@sbi</code>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-500 group-hover:text-white transition-colors"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                  </div>
                  <p id="copy-feedback" className="text-xs text-green-400 opacity-0 transition-opacity duration-300">Copied to clipboard!</p>
                </div>
              </div>
            </div>

            {/* UPI Transaction ID */}
            <div className="space-y-2">
              <Label htmlFor="upiTransactionId" className="text-neutral-200">UPI Transaction ID <span className="text-red-500 font-bold ml-1">*</span></Label>
              <Input 
                id="upiTransactionId"
                type="text" 
                placeholder="Enter Transaction ID" 
                className={cn("bg-neutral-900/50 border-neutral-800 focus:ring-neutral-700 text-neutral-100 placeholder:text-neutral-600", errors.upiTransactionId && "border-red-500 focus:ring-red-500")} 
                {...register('upiTransactionId')} 
              />
              {errors.upiTransactionId && <span className="text-red-400 text-sm">{errors.upiTransactionId.message}</span>}
            </div>

            {/* Payment Screenshot */}
            <div className="space-y-2">
              <Label htmlFor="paymentScreenshot" className="text-neutral-200">Payment Screenshot <span className="text-red-500 font-bold ml-1">*</span> <span className="text-xs text-neutral-500 ml-2">(Max 2MB)</span></Label>
              <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                <FileUpload onChange={handleFileUpload} />
              </div>
              {errors.paymentScreenshot && <span className="text-red-400 text-sm">{errors.paymentScreenshot.message}</span>}
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 font-bold py-6 text-lg shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={isSubmitting || (!!referralCodeValue && referralStatus !== 'valid')}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Registering...
                  </>
                ) : (
                  "Register Now"
                )}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
