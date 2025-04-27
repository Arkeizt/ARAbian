import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Client Requests',
        href: '/admin/client-requests',
    },
];

export default function ClientRequests() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client Requests" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                Client Requests Page
            </div>
        </AppLayout>
    );
}
