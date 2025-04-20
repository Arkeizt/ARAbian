import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Projects',
        href: '/my-projects',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                Client View
            </div>
        </AppLayout>
    );
}
