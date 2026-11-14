'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/inquires/sent-mail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      reset();
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="!space-y-4">
      <div className="text-center !mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Get in Touch</h1>
        <p className="text-sm text-muted-foreground !mt-1">
          Have a question or inquiry? Fill out the form below and we&apos;ll get back to you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium !mb-1.5">Name</label>
          <Input
            placeholder="Your Name"
            {...register('name', { required: 'Name is required' })}
            className="h-11"
          />
          {typeof errors.name?.message === 'string' && (
            <p className="!mt-1 text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium !mb-1.5">Email</label>
          <Input
            type="email"
            placeholder="Email Address"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className="h-11"
          />
          {typeof errors.email?.message === 'string' && (
            <p className="!mt-1 text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="!mt-4">
        <label className="block text-sm font-medium !mb-1.5">Subject</label>
        <Input
          placeholder="Subject"
          {...register('subject', { required: 'Subject is required' })}
          className="h-11"
        />
        {typeof errors.subject?.message === 'string' && (
          <p className="!mt-1 text-xs text-destructive">{errors.subject.message}</p>
        )}
      </div>

      <div className="!mt-4">
        <label className="block text-sm font-medium !mb-1.5">Message</label>
        <Textarea
          placeholder="Your Message"
          {...register('message', { required: 'Message is required' })}
          className="min-h-[120px] resize-none !p-3"
        />
        {typeof errors.message?.message === 'string' && (
          <p className="!mt-1 text-xs text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="h-12 !mt-6 w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl cursor-pointer font-semibold"
      >
        {loading ? 'Sending...' : 'Inquire Now'}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}
