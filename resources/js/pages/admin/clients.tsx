import AppLayout from '@/layouts/app-layout';
import { useInitials } from '@/hooks/use-initials';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type Client } from '@/types';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Clients',
        href: '/admin/clients',
    },
];

export default function Clients({ clients }: {clients: Client[]}) {
    const getInitials = useInitials();
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Clients" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableCaption>Admin View.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Clients</TableHead>
                        <TableHead>Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.length > 0 ? 
                            (clients.map(client => (
                                <TableRow key={client.id}>
                                    <TableCell>
                                        <Button variant="ghost" className="size-10 rounded-full p-1">
                                            <Avatar className="size-8 overflow-hidden rounded-full">
                                                <AvatarImage src={client.avatar} alt={client.name} />
                                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                    {getInitials(client.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </TableCell>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Button>View</Button>
                                    </TableCell>
                                </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">
                                        No clients found.
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
