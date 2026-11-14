'use client';
import Image from 'next/image';
import logo from '@/assets/Logo/logo.png';

export default function Loader({ fullScreen = true }) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            {/* Rotating ring */}
            <div className="absolute inset-0 animate-spin">
              <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full border-4 border-transparent border-t-[#BA9550] border-r-[#BA9550]"></div>
            </div>

            {/* Pulsing logo */}
            <div className="relative flex h-28 w-28 sm:h-32 sm:w-32 items-center justify-center animate-pulse">
              <Image
                src={logo}
                alt="Empirical"
                width={85}
                height={85}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Loading text */}
          <div className="flex items-center gap-1">
            <span className="text-base sm:text-lg font-semibold text-gray-700">Loading</span>
            <span className="flex gap-1">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>
                .
              </span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>
                .
              </span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>
                .
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Inline loader variant
  return (
    <div className="flex items-center justify-center !p-8">
      <div className="relative">
        <div className="absolute inset-0 animate-spin">
          <div className="h-16 w-16 rounded-full border-4 border-transparent border-t-[#BA9550] border-r-[#BA9550]"></div>
        </div>
        <div className="relative flex h-16 w-16 items-center justify-center animate-pulse">
          <Image src={logo} alt="Empirical" width={45} height={45} className="object-contain" />
        </div>
      </div>
    </div>
  );
}
