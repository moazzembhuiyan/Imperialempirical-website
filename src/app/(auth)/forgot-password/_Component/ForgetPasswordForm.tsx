'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForgotPasswordMutation } from '@/redux/api/authApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [formError, setFormError] = useState(null);
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onForgotPassSubmit = async (data) => {
    setFormError(null);
    try {
      const res = await forgotPassword(data).unwrap();
      if (res?.success) {
        toast.success('Verification code sent! Please check your email.');
        const resetToken = res?.data?.token || res?.data?.otpToken?.token || res?.data?.accessToken;
        if (typeof window !== 'undefined' && resetToken) {
          localStorage.setItem('forgetPassToken', resetToken);
          localStorage.setItem('signupToken', resetToken);
        }
        router.push(`/otp-verification?mode=reset&email=${encodeURIComponent(data.email)}`);
      }
    } catch (error) {
      const msg = error?.data?.message || error?.error || 'Could not send reset code';
      setFormError(msg);
      toast.error(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onForgotPassSubmit)} className="!pt-4">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="email" className="block font-semibold text-primary-black">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          {...register('email', {
            required: 'Email is required',
          })}
          className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black outline-none !px-4 !py-5"
        />
        {typeof errors.email?.message === 'string' && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {formError && <p className="!mt-3 text-xs text-red-500 text-center">{formError}</p>}

      <Button
        type="submit"
        disabled={isLoading}
        className="!text-white !mt-6 h-11 w-full rounded-xl bg-primary text-center font-semibold cursor-pointer"
      >
        {isLoading ? 'Sending Code...' : 'Send Verification Code'}
      </Button>

      <div className="!mt-4 text-center">
        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:underline">
          Back to Sign In
        </Link>
      </div>
    </form>
  );
}
