'use client';

import EyeIconInverse from '@/component/EyeIconInverse/EyeIconInverse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSignUpMutation } from '@/redux/api/authApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const router = useRouter();

  const [signUp, { isLoading }] = useSignUpMutation();

  const onSignUpSubmit = async (data) => {
    try {
      const res = await signUp(data).unwrap();
      if (res?.success) {
        toast.success('Account created! Please verify the OTP sent to your email.');
        const otpToken = res?.data?.otpToken?.token || res?.data?.token;
        if (typeof window !== 'undefined' && otpToken) {
          localStorage.setItem('signupToken', otpToken);
        }
        router.push(`/otp-verification?next=/login&email=${encodeURIComponent(data?.email || '')}`);
        reset();
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.error || 'Failed to create account');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSignUpSubmit)} className="!pt-4">
      <div className="!space-y-5">
        {/* Name */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="name" className="font-semibold text-primary-black">
            Full Name
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Enter your full name"
            {...register('name', { required: 'Name is required' })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black !px-4 !py-5"
          />
          {typeof errors.name?.message === 'string' && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email" className="font-semibold text-primary-black">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Email is required',
            })}
            className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black !px-4 !py-5"
          />
          {typeof errors.email?.message === 'string' && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password" className="font-semibold text-primary-black">
            Password
          </Label>
          <div className="relative">
            <Input
              type={showPass ? 'text' : 'password'}
              id="password"
              placeholder="Create a password"
              {...register('password', {
                required: 'Password is required',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must be at least 8 characters and include uppercase, lowercase, number, and special character',
                },
              })}
              className="rounded-xl border border-primary-black/50 bg-transparent text-primary-black !px-4 !py-5 !pr-11"
            />
            <EyeIconInverse showPassword={showPass} setShowPassword={setShowPass} />
          </div>
          {typeof errors.password?.message === 'string' && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="confirmPassword" className="font-semibold text-primary-black">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPass ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm your password"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters long',
                },
                validate: (value) => value === watch('password') || 'Passwords do not match',
              })}
              className="rounded-xl border-primary-black/50 bg-transparent text-primary-black !px-4 !py-5 !pr-11"
            />
            <EyeIconInverse showPassword={showConfirmPass} setShowPassword={setShowConfirmPass} />
          </div>
          {typeof errors.confirmPassword?.message === 'string' && (
            <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="!mt-7 h-11 w-full rounded-xl bg-primary text-white font-semibold cursor-pointer"
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </Button>

      <div className="!mt-5 flex items-center justify-center gap-2 text-sm">
        <p className="text-muted-foreground">Already have an account?</p>
        <Link href="/login" className="font-semibold text-[#BA9550] hover:underline">
          Sign In
        </Link>
      </div>
    </form>
  );
}
