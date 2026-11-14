'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAddOrderMutation, useCheckoutMutation } from '@/redux/api/orderAndpaymentApi';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function BillingDetailsFormModal({ children, items, total }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addOrder, { isLoading }] = useAddOrderMutation();
  const [checkout, { isLoading: checkoutLoading }] = useCheckoutMutation();

  const isSubmitting = isLoading || checkoutLoading;

  const onSubmit = async (data) => {
    const toastId = toast.loading('Processing your order...');

    try {
      const payload = {
        items: items?.map((item) => ({
          product: item?.product?._id,
          quantity: item?.quantity,
          size: item?.size,
        })),
        orderData: {
          amount: total,
          billingDetails: data,
        },
      };

      const res = await addOrder(payload).unwrap();

      if (res?.success) {
        const checkoutData = {
          user: res?.data?.order?.user,
          order: res?.data?.order?._id,
        };

        const checkoutRes = await checkout(checkoutData).unwrap();

        if (checkoutRes?.success) {
          toast.success('Order placed! Redirecting to payment...', {
            id: toastId,
            duration: 2000,
          });

          if (typeof window !== 'undefined' && checkoutRes?.data) {
            window.location.href = checkoutRes.data;
          }
          return;
        }
      }

      toast.error('Could not complete checkout. Please try again.', { id: toastId });
    } catch (error) {
      toast.error(error?.data?.message || error?.error || 'Something went wrong', {
        id: toastId,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="!max-w-[95vw] sm:!max-w-[500px] rounded-2xl !p-6">
        <DialogHeader>
          <DialogTitle>Billing Details</DialogTitle>
          <DialogDescription>
            Enter your delivery and billing information to proceed to checkout.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 !mt-2">
          <div className="grid gap-1.5">
            <Label htmlFor="billing-name">Full Name</Label>
            <Input
              id="billing-name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              placeholder="Enter your full name"
            />
            {typeof errors.name?.message === 'string' && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="billing-address">Delivery Address</Label>
            <Input
              id="billing-address"
              type="text"
              {...register('address', { required: 'Address is required' })}
              placeholder="Enter your street address"
            />
            {typeof errors.address?.message === 'string' && (
              <p className="text-xs text-red-500">{errors.address.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="billing-city">City</Label>
            <Input
              id="billing-city"
              type="text"
              {...register('city', { required: 'City is required' })}
              placeholder="Enter your city"
            />
            {typeof errors.city?.message === 'string' && (
              <p className="text-xs text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="billing-phone">Contact Number</Label>
            <Input
              id="billing-phone"
              type="text"
              {...register('phoneNumber', { required: 'Phone number is required' })}
              placeholder="Enter your phone number"
            />
            {typeof errors.phoneNumber?.message === 'string' && (
              <p className="text-xs text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting} className="!mt-2 w-full cursor-pointer">
            {isSubmitting ? 'Processing...' : `Pay $${Number(total || 0).toFixed(2)}`}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
