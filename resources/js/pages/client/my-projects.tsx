import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react'; 
import { type BreadcrumbItem } from '@/types';
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
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Projects',
        href: '/my-projects',
    },
];

export default function MyProjects() {
    const { flash } = usePage().props as { flash: { success?: string; error?: string } }; //ayuson pa ni sa index.d.ts pero working ni sya gihapon, oa ra typescript

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
                <Head title="My Projects" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <Table>
                        <TableCaption>Client/User View.</TableCaption>
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Projects</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                        </TableBody>
                    </Table>
                </div>
            </AppLayout>
        </>
    );
}
