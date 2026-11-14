'use client';

import ResponsiveContainer from '@/component/ResponsiveContainer/ResponsiveContainer';
import React from 'react';
import { ContactForm } from './ContactForm';
import Image from 'next/image';

const ContactContainer = () => {
  return (
    <ResponsiveContainer>
      <div className="w-full !my-6 md:!my-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          {/* Left side - Contact Image */}
          <div className="w-full flex justify-center">
            <Image
              src="/contact.png"
              alt="Contact Us"
              width={650}
              height={550}
              className="object-contain w-full max-w-md lg:max-w-full h-auto rounded-2xl"
              priority
            />
          </div>
          {/* Right side - Contact Form */}
          <div className="w-full bg-white rounded-2xl border border-stone-200/80 !p-6 sm:!p-8 md:!p-10 shadow-xs">
            <ContactForm />
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default ContactContainer;
