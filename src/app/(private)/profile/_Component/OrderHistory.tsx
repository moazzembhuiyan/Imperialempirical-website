'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDeleteOrderMutation, useGetOrdersQuery } from '@/redux/api/orderAndpaymentApi';
import Loader from '@/app/loading';
import { PackageOpen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import EmptyState from '@/component/shared/EmptyState/EmptyState';
import { selectToken } from '@/redux/slices/authSlice';
import { useSelector } from 'react-redux';

export function OrderHistory() {
  const token = useSelector(selectToken);
  const getStatusColor = (status = '') => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const { data, isLoading, isError, refetch } = useGetOrdersQuery(undefined, {
    skip: !token,
  });
  const [deleteOrder, { isLoading: isDeleteLoading }] = useDeleteOrderMutation();

  if (isLoading) {
    return (
      <div className="!py-8">
        <Loader fullScreen={false} />
      </div>
    );
  }

  if (isError) {
    return (
      <EmptyState
        icon={PackageOpen}
        title="Could Not Load Order History"
        description="We encountered a problem retrieving your orders. Please try again."
        actionLabel="Try Again"
        onAction={refetch}
      />
    );
  }

  const orders = data?.data || [];

  const handleDeleteOrder = async (orderId) => {
    const toastId = toast.loading('Deleting order...');
    try {
      const res = await deleteOrder(orderId).unwrap();
      if (res?.success) {
        toast.success('Order deleted successfully', { id: toastId });
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete order', { id: toastId });
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-foreground !mb-6">Order History</h2>

      <div className="!space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order._id} className="hover:shadow-md transition-shadow rounded-2xl">
              <CardContent className="!p-5 sm:!p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Left: Order Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 !mb-2">
                      <p className="font-bold text-foreground text-sm sm:text-base">
                        #{order.id || order._id?.slice(-6)}
                      </p>

                      {order.status && (
                        <Badge className={`${getStatusColor(order.status)} border-0 !px-2.5 !py-1`}>
                          {order.status}
                        </Badge>
                      )}

                      {order.paymentStatus && (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-0 !px-2.5 !py-1">
                          {order.paymentStatus}
                        </Badge>
                      )}
                    </div>

                    {/* Items Titles */}
                    <p className="text-muted-foreground text-sm !mb-1 line-clamp-2">
                      {(order.items || [])
                        .map((item) => item?.product?.title || 'Product')
                        .join(', ') || 'Order items'}
                    </p>

                    {/* Date */}
                    {order.createdAt && (
                      <p className="text-muted-foreground text-xs">
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    )}
                  </div>

                  {/* Right: Price & Delete */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 !pt-3 sm:!pt-0 border-stone-100">
                    <p className="text-lg font-bold text-foreground">
                      ${Number(order.amount || 0).toFixed(2)}
                    </p>
                    <button
                      type="button"
                      disabled={isDeleteLoading}
                      onClick={() => handleDeleteOrder(order._id)}
                      aria-label="Delete Order"
                      className="text-red-500 hover:text-red-700 !p-2 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <EmptyState
            icon={PackageOpen}
            title="No Orders Yet"
            description="You haven't placed any orders yet. Once you make a purchase, your order history and tracking status will appear here."
            actionLabel="Explore Shop"
            actionHref="/product"
          />
        )}
      </div>
    </div>
  );
}
