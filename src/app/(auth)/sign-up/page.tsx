import React from 'react';
import Image from 'next/image';
import logo from '@/assets/Logo/logo.png';
import SignUpForm from './_Component/SignUpForm';

export const metadata = {
  title: 'Sign Up',
  description: 'Create your Empirical account.',
};

export default function page() {
  return (
    <div className="!mx-auto w-full bg-white !space-y-3 !p-6 sm:!p-8 md:!p-10 rounded-3xl shadow-2xl">
      <div className="flex justify-center items-center">
        <Image src={logo} className="mx-auto w-[80px] sm:w-[95px]" width={200} height={200} alt="logo" />
      </div>
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-foreground">Create Account</h1>
      <p className="text-center text-sm text-muted-foreground">Sign up to your account</p>
      <SignUpForm />
    </div>
  );
}
