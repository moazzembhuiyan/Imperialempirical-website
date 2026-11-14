'use client';

import AnimateTextOnHover from '@/component/AnimateTextOnHover/AnimateTextOnHover';
import Link from 'next/link';
import logo from '@/assets/Logo/logo.png';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectToken } from '@/redux/slices/authSlice';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMyProfileQuery } from '@/redux/api/authApi';
import { useGetCartQuery } from '@/redux/api/cartApi';
import { Menu, ShoppingBag, User, X } from 'lucide-react';

const LINKS = [
  {
    key: 'home',
    label: 'Home',
    route: '/',
  },
  {
    key: 'Philosophy',
    label: 'Philosophy',
    route: '/philosophy',
  },
  {
    key: 'Shop',
    label: 'Shop',
    route: '/product',
  },
  {
    key: 'Events',
    label: 'Events',
    route: '/event',
  },
  {
    key: 'Finance Article',
    label: 'Finance Article',
    route: '/financeArticle',
  },
  {
    key: 'Gallery',
    label: 'Gallery',
    route: '/gallery',
  },
  {
    key: 'contact',
    label: 'Contact Us',
    route: '/contact',
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const token = useSelector(selectToken);

  // Properly pass undefined as 1st arg and { skip: !token } as 2nd arg to prevent unauthenticated calls
  const { data } = useMyProfileQuery(undefined, {
    skip: !token,
  });
  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !token,
  });

  const user = data?.data;
  const cartCount = cartData?.data?.length || 0;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Desktop & Tablet Header Bar */}
      <div className="!mx-auto flex items-center justify-between !px-4 sm:!px-6 lg:!px-8 !py-3 max-w-[1440px]">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src={logo}
            alt="Empirical Logo"
            className="w-11 h-11 sm:w-12 sm:h-12 object-contain"
            width={50}
            height={50}
            priority
          />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center justify-center gap-x-6 xl:gap-x-9">
          {LINKS.map((link) => (
            <Link
              key={link.key}
              href={link.route}
              className="text-sm xl:text-base font-medium !text-black uppercase tracking-wide whitespace-nowrap"
            >
              <AnimateTextOnHover path={link.route}>{link.label}</AnimateTextOnHover>
            </Link>
          ))}
        </nav>

        {/* Right: Desktop & Mobile Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Cart Icon Button */}
          <button
            type="button"
            onClick={() => router.push(token ? '/cart' : '/login')}
            aria-label="Shopping Cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-stone-800" />
            {token && cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] !px-1 rounded-full bg-[#BA9550] text-white text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Desktop Auth / Profile Button */}
          <div className="hidden lg:flex items-center">
            {token ? (
              <Button
                variant="ghost"
                className="bg-transparent rounded-full cursor-pointer hover:bg-stone-100 !p-1 transition duration-300 ease-in-out"
                onClick={() => router.push('/profile')}
              >
                <Avatar className="h-9 w-9 border border-[#BA9550]">
                  <AvatarImage src={user?.photoUrl} alt={user?.name || 'User'} />
                  <AvatarFallback className="text-sm font-bold text-[#BA9550] bg-[#F4EBD3]">
                    {user?.name?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Button
                onClick={() => router.push('/login')}
                className="!bg-black !text-white hover:!bg-stone-800 cursor-pointer !py-2 !px-5 !rounded-full !text-sm font-medium transition-colors"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile & Tablet Hamburger Button */}
          <button
            type="button"
            aria-label="Toggle Menu"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-black hover:bg-stone-100 transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden overflow-hidden bg-white border-t border-stone-200 shadow-xl"
          >
            <div className="flex flex-col !px-6 !py-5 !space-y-2">
              {LINKS.map((link) => {
                const isActive = pathname === link.route;
                return (
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    key={link.key}
                    href={link.route}
                    className={`font-medium text-base !py-2.5 !px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#F4EBD3] text-[#BA9550] font-semibold'
                        : 'text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="border-t border-stone-200 !pt-4 !mt-2 flex flex-col sm:flex-row gap-3">
                {token ? (
                  <>
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/profile');
                      }}
                      variant="outline"
                      className="w-full sm:flex-1 rounded-full border-stone-300 !py-2.5 font-medium flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      {user?.name ? `${user.name.split(' ')[0]}'s Profile` : 'My Profile'}
                    </Button>
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/cart');
                      }}
                      className="w-full sm:flex-1 rounded-full !bg-black !text-white !py-2.5 font-medium flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Cart {cartCount > 0 ? `(${cartCount})` : ''}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/login');
                      }}
                      className="w-full sm:flex-1 rounded-full !bg-black !text-white !py-2.5 font-medium cursor-pointer"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        router.push('/sign-up');
                      }}
                      variant="outline"
                      className="w-full sm:flex-1 rounded-full border-stone-800 text-stone-900 !py-2.5 font-medium cursor-pointer"
                    >
                      Create Account
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
