'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateProfileMutation } from '@/redux/api/authApi';
import { Edit, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export function EditUserInfo({ user }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm<{ name: string; contractNo: string; profileImage: FileList }>({
    defaultValues: {
      name: user?.name || '',
      contractNo: user?.contractNo || '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || '',
        contractNo: user.contractNo || '',
      });
    }
  }, [user, reset]);

  const [update, { isLoading }] = useUpdateProfileMutation();
  const selectedFile = watch('profileImage');

  const onEditSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (data.profileImage && data.profileImage.length > 0) {
        formData.append('image', data.profileImage[0]);
      }

      const sendData = {
        name: data?.name,
        contractNo: data?.contractNo,
      };

      formData.append('data', JSON.stringify(sendData));

      const res = await update(formData).unwrap();

      if (res?.success) {
        toast.success('Profile updated successfully');
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Edit profile"
          className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center shadow-md hover:bg-stone-800 transition-colors cursor-pointer"
        >
          <Edit size={15} />
        </button>
      </DialogTrigger>

      <DialogContent className="!max-w-[95vw] sm:!max-w-[500px] rounded-2xl !p-6">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile information here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onEditSubmit)} className="!space-y-5 !mt-2">
          {/* Name */}
          <div className="grid gap-1.5">
            <Label htmlFor="name-1">Name</Label>
            <Input id="name-1" {...register('name', { required: 'Name is required' })} />
            {typeof errors.name?.message === 'string' && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

          {/* Contact */}
          <div className="grid gap-1.5">
            <Label htmlFor="contractNo-1">Contact Number</Label>
            <Input
              id="contractNo-1"
              {...register('contractNo', {
                required: 'Contact number is required',
                minLength: { value: 10, message: 'Minimum 10 digits required' },
              })}
            />
            {typeof errors.contractNo?.message === 'string' && (
              <p className="text-red-500 text-xs">{errors.contractNo.message}</p>
            )}
          </div>

          {/* Profile Image */}
          <div className="grid gap-1.5">
            <Label htmlFor="profileImage">Profile Image</Label>
            <input
              type="file"
              accept="image/*"
              id="profileImage"
              {...register('profileImage')}
              className="hidden"
            />
            <label
              htmlFor="profileImage"
              className="cursor-pointer flex flex-col items-center justify-center gap-2 border border-dashed border-stone-300 rounded-xl !p-4 hover:bg-stone-50 transition text-sm text-muted-foreground"
            >
              <Upload className="w-5 h-5 text-[#BA9550]" />
              <span>
                {selectedFile?.[0]?.name ? selectedFile[0].name : 'Click to upload a new photo'}
              </span>
            </label>
          </div>

          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading} className="cursor-pointer">
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
