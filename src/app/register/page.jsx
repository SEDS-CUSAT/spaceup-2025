'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/schemas';
import { registerUser } from '@/app/actions/register';
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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

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
      
      <Card className="w-full max-w-2xl relative z-10 bg-black/40 backdrop-blur-xl border-neutral-800 text-neutral-100 shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]">
        <CardHeader className="space-y-1 text-center relative overflow-hidden rounded-t-xl">
          <div className="absolute inset-0 bg-linear-to-r  blur-xl"></div>
          <CardTitle className="text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-indigo-200 via-purple-200 to-pink-200 relative z-10">
            SpaceUp Registration
          </CardTitle>
          <CardDescription className="text-neutral-400 relative z-10 text-lg">
            Join us for an incredible journey into space!
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
              <Input 
                id="referralCode"
                type="text" 
                placeholder="Enter Referral Code if any" 
                className={cn("bg-neutral-900/50 border-neutral-800 focus:ring-neutral-700 text-neutral-100 placeholder:text-neutral-600", errors.referralCode && "border-red-500 focus:ring-red-500")} 
                {...register('referralCode')} 
              />
              {errors.referralCode && <span className="text-red-400 text-sm">{errors.referralCode.message}</span>}
            </div>

            <div className="border-t border-neutral-800 my-6"></div>
            <div className="text-lg font-semibold text-neutral-200">Payment Details</div>

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
                className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 font-bold py-6 text-lg shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02]" 
                disabled={isSubmitting}
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
