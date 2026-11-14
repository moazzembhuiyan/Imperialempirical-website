'use client';

import CustomFormError from '@/component/shared/CustomFormError/CustomFormError';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';
import { useResendOtpMutation, useVerifyOtpMutation } from '@/redux/api/authApi';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function VerifyOtpForm() {
  const [value, setValue] = useState('');
  const [showRequired, setShowRequired] = useState(false);
  const [formError, setFormError] = useState(null);
  const router = useRouter();

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resendOtpLoading }] = useResendOtpMutation();

  const handleVerifyOtp = async () => {
    if (value.length < 6) {
      setShowRequired(true);
      return;
    }
    setShowRequired(false);
    setFormError(null);

    try {
      const res = await verifyOtp({ otp: value }).unwrap();

      if (res?.success) {
        toast.success('OTP verified successfully');
        const isResetFlow =
          typeof window !== 'undefined' && Boolean(localStorage.getItem('forgetPassToken'));

        if (isResetFlow) {
          const newToken = res?.data?.accessToken || res?.data?.token;
          if (newToken) {
            localStorage.setItem('forgetPassToken', newToken);
          }
          localStorage.removeItem('signupToken');
          router.push('/update-password');
          return;
        }

        if (typeof window !== 'undefined') {
          localStorage.removeItem('signupToken');
        }
        router.push('/login');
      }
    } catch (error) {
      setFormError(error?.data?.message || error?.message || error?.error || 'Invalid OTP code');
    }
  };

  const handleResendOtp = async () => {
    setFormError(null);
    try {
      const res = await resendOtp().unwrap();
      if (res?.success) {
        toast.success('OTP re-sent successfully');
        const token = res?.data?.token || res?.data?.otpToken?.token;
        if (typeof window !== 'undefined' && token) {
          localStorage.setItem('signupToken', token);
        }
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error || 'Failed to resend OTP');
    }
  };

  return (
    <div className="relative text-primary-black bg-white !pt-4">
      <div className="mx-auto !w-full flex flex-col items-center justify-center">
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
          value={value}
          onChange={(val) => {
            setValue(val);
            if (val.length === 6) setShowRequired(false);
          }}
        >
          <InputOTPGroup className="flex items-center justify-center gap-1.5 sm:gap-3">
            {[0, 1, 2, 3, 4, 5].map((idx) => (
              <InputOTPSlot
                key={idx}
                index={idx}
                className="!h-12 !w-10 sm:!h-14 sm:!w-12 rounded-lg border border-primary-black/50 text-xl sm:text-2xl font-bold"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {showRequired && (
          <p className="!mt-3 text-center text-xs text-red-500">
            Please enter your 6-digit one-time password
          </p>
        )}
      </div>

      <Button
        type="button"
        disabled={isLoading}
        className={cn(
          '!mt-7 h-11 w-full rounded-xl border bg-primary text-white cursor-pointer font-semibold capitalize'
        )}
        onClick={handleVerifyOtp}
      >
        {isLoading ? 'Verifying...' : 'Verify Code'}
      </Button>

      <div className="flex justify-center !mt-4">
        <button
          type="button"
          disabled={resendOtpLoading}
          onClick={handleResendOtp}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <RotateCw size={14} className={resendOtpLoading ? 'animate-spin' : ''} />
          {resendOtpLoading ? 'Sending...' : 'Resend OTP'}
        </button>
      </div>

      {formError && <CustomFormError formError={formError} />}
    </div>
  );
}
