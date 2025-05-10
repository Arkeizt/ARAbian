import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react'; 
import { FlashProps, Project, type BreadcrumbItem } from '@/types';
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
    const { flash, projects } = usePage<FlashProps & { projects: Project[] }>().props;

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
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.id}</TableCell>
                                    <TableCell>{project.title}</TableCell>
                                    <TableCell>{project.type}</TableCell>
                                    <TableCell className="text-right">
                                        {/* You can add actions or buttons here */}
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
