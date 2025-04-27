import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type Client } from '@/types';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Client Projects',
        href: '/admin/projects',
    },
];

export default function AdminProjects({ clients }: {clients: Client[]}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Client Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <Table>
                    <TableCaption>Admin View.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Clients</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {clients.map(client => (
                            <TableRow key={client.id}>
                                <TableCell></TableCell>
                                <TableCell>{client.name}</TableCell>
                                <TableCell className="text-right">
                                    <button className="text-blue-500 hover:underline">
                                        View
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
