'use client';

import EyeIconInverse from '@/component/EyeIconInverse/EyeIconInverse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useSignInMutation } from '@/redux/api/authApi';
import { setUser } from '@/redux/slices/authSlice';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export default function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [formError, setFormError] = useState(null);
  const dispatch = useDispatch();

  const [signIn, { isLoading }] = useSignInMutation();

  const onLoginSubmit = async (data) => {
    setFormError(null);
    try {
      const res = await signIn(data).unwrap();
      if (res?.success) {
        toast.success('Signed in successfully');
        const accessToken = res?.data?.accessToken;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('signupToken');
          localStorage.removeItem('forgetPassToken');
          if (res?.data?.refreshToken) {
            localStorage.setItem('refreshToken', res.data.refreshToken);
          }
        }
        dispatch(
          setUser({
            user: accessToken ? jwtDecode(accessToken) : null,
            token: accessToken,
          })
        );
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      setFormError(error?.data?.message || error?.error || 'Invalid email or password');
    }
  };

  return (
    <form onSubmit={handleSubmit(onLoginSubmit)} className="text-primary-black bg-white !pt-4">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="email" className="font-semibold">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="Enter your email"
          className="rounded-xl border-primary-black/50 bg-transparent !px-4 !py-5"
          {...register('email', {
            required: 'Email is required',
            validate: (value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(value)) {
                return 'Must be a valid email';
              }
              return true;
            },
          })}
        />
        {typeof errors.email?.message === 'string' && (
          <span className="text-xs text-red-500">{errors.email.message}</span>
        )}
      </div>

      <div className="!mt-5 grid w-full items-center gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="font-semibold">
            Password
          </Label>
          <Link
            href="/forgot-password"
            className="text-xs sm:text-sm font-medium text-[#BA9550] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password"
            className="rounded-xl border-primary-black/50 bg-transparent !px-4 !py-5 !pr-11"
            {...register('password', { required: true })}
          />
          <EyeIconInverse showPassword={showPassword} setShowPassword={setShowPassword} />
        </div>

        {errors.password && <span className="text-xs text-red-500">Password is required</span>}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className={cn(
          '!mt-7 h-11 w-full rounded-xl border bg-primary text-white cursor-pointer font-semibold capitalize'
        )}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      {formError && <p className="!mt-3 text-center text-sm text-red-500">{formError}</p>}

      <div className="!mt-5 flex items-center justify-center gap-2 text-sm">
        <p className="text-muted-foreground">Don&apos;t have an account?</p>
        <Link href="/sign-up" className="font-semibold text-[#BA9550] hover:underline">
          Register
        </Link>
      </div>
    </form>
  );
}
