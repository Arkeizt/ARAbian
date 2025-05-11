import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react'; 
import { FlashProps, ClientRequest, type BreadcrumbItem } from '@/types'; // Use ClientRequest instead of Project
import { Head, Link, router } from '@inertiajs/react';
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
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
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
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <div className='flex gap-2'>
                                            {request.title}
                                            <Badge className={request.type === 'SURVEY' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 dark:bg-indigo-800 text-white'}>
                                                {request.type === 'SURVEY' ? 'Survey' : 'Construction'}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {request.status === 'FOR_REVIEW' && (
                                            <span className="text-muted-foreground">For Review</span>
                                        )}
                                        {request.status === 'APPROVED' && (
                                            <span className="text-green-600 dark:text-green-400">Approved</span>
                                        )}
                                        {request.status === 'REJECTED' && (
                                            <span className="text-red-600 dark:text-red-400">Rejected</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-4">
                                            <Button disabled={request.status !== 'FOR_REVIEW'}>
                                                <Link href={route('my.requests.edit', request.id)}>
                                                    Edit
                                                </Link>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                    variant="outline"
                                                    className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
                                                    disabled={request.status !== 'FOR_REVIEW'}
                                                    >
                                                    Delete
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will permanently delete your request.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => router.delete(route('my.requests.destroy', request.id))}
                                                            className="bg-red-600 text-white hover:bg-red-700"
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
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