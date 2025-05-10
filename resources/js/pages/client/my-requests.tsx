import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react'; 
import { FlashProps, ClientRequest, type BreadcrumbItem } from '@/types'; // Use ClientRequest instead of Project
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button }  from "@/components/ui/button";
import { Badge }  from "@/components/ui/badge";
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Requests',
        href: '/my-requests',
    },
];

export default function MyRequests() {
    const { flash, requests } = usePage<FlashProps & { requests: ClientRequest[] }>().props; // Change Project to ClientRequest

    useEffect(() => {
        if (flash?.success) {
            toast.success('Success!', {
                description: flash.success,
            });
        }

        if (flash?.error) {
            toast.error('Error', {
                description: flash.error,
            });
        }

    }, [flash.success, flash.error]);

    return (
        <>  
            <Toaster />
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="My Requests" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <Table>
                        <TableCaption>Client Requests</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Requests</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell></TableCell>
                                    <TableCell>{request.title}</TableCell>
                                    <TableCell>
                                        <Badge className={request.type === 'SURVEY' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 dark:bg-indigo-800 text-white'}>
                                            {request.type === 'SURVEY' ? 'Survey' : 'Construction'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-4">
                                            <Button>Edit</Button>
                                            <Button className='dark:hover:bg-red-400 dark:hover:text-white hover:text-red-500'>Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </AppLayout>
        </>
    );
}