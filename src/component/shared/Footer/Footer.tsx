'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    toast.success('Thank you for subscribing to our newsletter!');
    setEmail('');
  };

  return (
    <footer className="w-full relative !mt-24 md:!mt-36">
      {/* Newsletter Subscription Banner */}
      <div className="!px-4 sm:!px-6 lg:!px-8 relative z-10 -mb-16 md:-mb-20">
        <div className="!mx-auto max-w-5xl">
          <div className="rounded-2xl md:rounded-3xl bg-black !px-6 !py-8 sm:!px-10 sm:!py-12 md:!px-14 md:!py-14 shadow-xl">
            <h2 className="text-center font-sans text-xl sm:text-2xl md:text-3xl font-light text-white !mb-6 md:!mb-8">
              Subscribe for updates and promotions
            </h2>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center w-full max-w-xl !mx-auto"
            >
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="!px-5 !py-3 rounded-full bg-stone-800 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#BA9550] flex-1 w-full text-sm md:text-base"
              />
              <Button
                type="submit"
                className="rounded-full bg-white text-stone-900 hover:bg-stone-200 cursor-pointer !px-8 !py-5.5 font-bold whitespace-nowrap w-full sm:w-auto"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="bg-[#F3EAD3] !px-4 sm:!px-6 lg:!px-8 !pt-28 md:!pt-32 !pb-12 md:!pb-16 relative">
        <div className="!mx-auto max-w-7xl">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 !mb-12 text-center sm:text-left">
            {/* Left Column - Navigation */}
            <div className="!space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 !mb-2">
                Explore
              </h3>
              <ul className="!space-y-3 text-sm md:text-base text-stone-900">
                <li>
                  <Link href="/" className="hover:text-[#BA9550] transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/product" className="hover:text-[#BA9550] transition">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/philosophy" className="hover:text-[#BA9550] transition">
                    Philosophy
                  </Link>
                </li>
                <li>
                  <Link href="/event" className="hover:text-[#BA9550] transition">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* Center Column - More Navigation */}
            <div className="!space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 !mb-2">
                Resources
              </h3>
              <ul className="!space-y-3 text-sm md:text-base text-stone-900">
                <li>
                  <Link href="/gallery" className="hover:text-[#BA9550] transition">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/financeArticle" className="hover:text-[#BA9550] transition">
                    Finance Article
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#BA9550] transition">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Column - Contact Info & Social */}
            <div className="!space-y-4 sm:col-span-2 md:col-span-1">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-500 !mb-2">
                Contact
              </h3>
              <div className="!space-y-2 text-sm md:text-base text-stone-900 !mb-4">
                <p className="font-medium">(105) 115-2920</p>
                <p className="text-sm">115 Palm Forest, Australia</p>
                <p className="text-sm">hello@empirical6728.com</p>
              </div>

              <p className="text-sm text-stone-700 !mb-4 max-w-xs !mx-auto sm:!mx-0">
                Building fashion that speaks to you, while respecting the planet and empowering
                communities.
              </p>

              {/* Social Icons */}
              <div className="flex gap-3 justify-center sm:justify-start">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="!p-2.5 rounded-full bg-stone-200 hover:bg-stone-300 transition"
                >
                  <Facebook size={16} className="text-stone-900" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="!p-2.5 rounded-full bg-stone-200 hover:bg-stone-300 transition"
                >
                  <Linkedin size={16} className="text-stone-900" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="!p-2.5 rounded-full bg-stone-200 hover:bg-stone-300 transition"
                >
                  <Twitter size={16} className="text-stone-900" />
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-stone-400/50 !mb-6"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm text-stone-700 gap-4">
            <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
              <Link href="/terms" className="hover:text-stone-900 transition">
                Terms &amp; Conditions
              </Link>
              <Link href="/privacy" className="hover:text-stone-900 transition">
                Privacy Policy
              </Link>
            </div>
            <p className="text-center sm:text-right">
              &copy; {new Date().getFullYear()} EMPIRICAL. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
