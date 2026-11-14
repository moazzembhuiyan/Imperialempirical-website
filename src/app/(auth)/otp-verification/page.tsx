import React from 'react';
import VerifyOtpForm from './_Component/OtpVerifyForm';
import logo from '@/assets/Logo/logo.png';
import Image from 'next/image';

export const metadata = {
  title: 'OTP Verification',
  description: 'Empirical || OTP Verification',
};

export default function page() {
  return (
    <div className="!mx-auto w-full bg-white !space-y-3 !p-6 sm:!p-8 md:!p-10 rounded-3xl shadow-2xl">
      <div className="flex justify-center items-center">
        <Image src={logo} className="mx-auto w-[80px] sm:w-[95px]" width={200} height={200} alt="logo" />
      </div>
      <h1 className="text-center text-2xl sm:text-3xl font-bold text-foreground">
        Verify Your Email
      </h1>
      <p className="text-center text-sm text-muted-foreground">
        Enter the 6-digit verification code sent to your email address.
      </p>
      <VerifyOtpForm />
    </div>
  );
}
