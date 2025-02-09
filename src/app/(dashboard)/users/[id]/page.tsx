// @ts-nocheck

import { Suspense } from 'react';
import UserDetailContent from '@/components/users/detail/UserDetailContent';

type PageProps = {
    params: any;
    searchParams: any;
};

export default async function UserDetailPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
        }>
            <UserDetailContent userId={id} />
        </Suspense>
    );
}
