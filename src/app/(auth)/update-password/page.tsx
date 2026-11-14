'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/Logo/logo.png';
import { useForm } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import EyeIconInverse from '@/component/EyeIconInverse/EyeIconInverse';
import { useResetPasswordMutation } from '@/redux/api/authApi';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function UpdatePasswordPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword({
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();

      if (res?.success) {
        toast.success('Password updated successfully! Please sign in.');
        if (typeof window !== 'undefined') {
          localStorage.removeItem('forgetPassToken');
          localStorage.removeItem('signupToken');
        }
        router.push('/login');
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error || 'Failed to update password');
    }
  };

  return (
    <div className="!mx-auto w-full bg-white !space-y-3 !p-6 sm:!p-8 md:!p-10 rounded-3xl shadow-2xl">
      <div className="flex justify-center items-center">
        <Image src={logo} className="mx-auto w-[80px] sm:w-[95px]" width={200} height={200} alt="logo" />
      </div>
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-foreground">
        Set New Password
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Enter a strong new password for your account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="!pt-4 !space-y-5">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="newPassword" className="font-semibold text-primary-black">
            New Password
          </Label>
          <div className="relative">
            <Input
              type={showPass ? 'text' : 'password'}
              id="newPassword"
              placeholder="Enter new password"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
              })}
              className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black !px-4 !py-5 !pr-11"
            />
            <EyeIconInverse showPassword={showPass} setShowPassword={setShowPass} />
          </div>
          {typeof errors.newPassword?.message === 'string' && (
            <p className="text-xs text-red-500">{errors.newPassword.message}</p>
          )}
        </div>

        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="confirmPassword" className="font-semibold text-primary-black">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPass ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm new password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (val) => val === watch('newPassword') || 'Passwords do not match',
              })}
              className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black !px-4 !py-5 !pr-11"
            />
            <EyeIconInverse showPassword={showConfirmPass} setShowPassword={setShowConfirmPass} />
          </div>
          {typeof errors.confirmPassword?.message === 'string' && (
            <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="!mt-6 h-11 w-full rounded-xl bg-primary text-white font-semibold cursor-pointer"
        >
          {isLoading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </div>
  );
}
