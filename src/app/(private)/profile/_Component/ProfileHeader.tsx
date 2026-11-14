'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useMyProfileQuery } from '@/redux/api/authApi';
import { baseApi } from '@/redux/api/baseApi';
import { logout, selectToken } from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { EditUserInfo } from './EdituserInfoModal';
import { Skeleton } from '@/components/ui/skeleton';
import { LogOut, Mail, Phone, User } from 'lucide-react';

export function ProfileHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { data, isLoading } = useMyProfileQuery(undefined, {
    skip: !token,
  });
  const user = data?.data;

  const initials = user?.name
    ? user.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  const handleLogout = () => {
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    router.push('/');
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="!mb-10 border-b border-border !pb-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          <Skeleton className="h-28 w-28 rounded-full shrink-0" />
          <div className="flex-1 !space-y-3 w-full">
            <Skeleton className="h-8 w-48 !mx-auto sm:!mx-0" />
            <Skeleton className="h-4 w-64 !mx-auto sm:!mx-0" />
            <Skeleton className="h-10 w-28 !mx-auto sm:!mx-0" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="!mb-10">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start border-b border-border !pb-8 bg-white rounded-2xl !p-6 border border-stone-200/80 shadow-xs">
        {/* Avatar with anchored Edit button */}
        <div className="relative inline-block shrink-0">
          <Avatar className="!h-24 !w-24 md:!h-28 md:!w-28 border-2 border-[#BA9550]/40">
            <AvatarImage src={user?.photoUrl || '/placeholder.svg'} alt={user?.name || 'User'} />
            <AvatarFallback className="text-2xl font-bold bg-[#F4EBD3] text-[#BA9550]">
              {initials || <User className="w-8 h-8" />}
            </AvatarFallback>
          </Avatar>

          <div className="absolute -bottom-1 -right-1">
            <EditUserInfo user={user} />
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left w-full">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground !mb-4">
            {user?.name || 'Empirical Member'}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm !mb-6">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 bg-stone-50 rounded-xl !p-3 border border-stone-200/60">
              <Mail className="w-4 h-4 text-[#BA9550] shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-foreground font-medium truncate">{user?.email || 'N/A'}</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-2.5 bg-stone-50 rounded-xl !p-3 border border-stone-200/60">
              <Phone className="w-4 h-4 text-[#BA9550] shrink-0" />
              <div className="text-left min-w-0">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-foreground font-medium truncate">
                  {user?.contractNo || 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            variant="outline"
            className="rounded-full !px-5 !py-2 cursor-pointer border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 inline-flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
