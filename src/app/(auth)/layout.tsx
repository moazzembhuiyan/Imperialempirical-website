import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="relative bg-[url('/philosophy.png')] bg-cover bg-center bg-no-repeat z-10 min-h-[85vh] flex justify-center items-center overflow-hidden !px-4 sm:!px-6 md:!px-10 !py-10">
      <div className="absolute inset-0 bg-black/45 z-0" />
      <div className="relative z-10 !mx-auto w-full max-w-lg">{children}</div>
    </div>
  );
}
