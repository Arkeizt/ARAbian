import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type Client } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

export default function ClientsShow({ client }: {client: Client}) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Clients',
            href: '/admin/clients',
        },
        {
            title: 'Client Show',
            href: `/admin/clients/${client.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">{client.name}</h1>
                <p>Email: {client.email}</p>
            </div>
        </AppLayout>
    );
}
