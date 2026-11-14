import React from 'react';
import Image from 'next/image';
import logo from '@/assets/Logo/logo.png';
import ForgotPasswordForm from './_Component/ForgetPasswordForm';

export const metadata = {
  title: 'Forgot Password',
  description: 'Recover your Empirical account password.',
};

export default function page() {
  return (
    <div className="!mx-auto w-full bg-white !space-y-3 !p-6 sm:!p-8 md:!p-10 rounded-3xl shadow-2xl">
      <div className="flex justify-center items-center">
        <Image src={logo} className="mx-auto w-[80px] sm:w-[95px]" width={200} height={200} alt="logo" />
      </div>
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-foreground">
        Recover Password
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Please provide the email address associated with your account, and we&apos;ll send you a
        verification code to reset your password.
      </p>
      <ForgotPasswordForm />
    </div>
  );
}
