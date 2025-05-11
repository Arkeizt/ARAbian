import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react'; 
import { FlashProps, Project, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
                                    <TableCell></TableCell>
                                    <TableCell>
                                        <div className='flex gap-2'>
                                            {project.title}
                                            <Badge className={project.type === 'SURVEY' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 dark:bg-indigo-800 text-white'}>
                                                {project.type === 'SURVEY' ? 'Survey' : 'Construction'}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {project.status === 'ONGOING' && (
                                            <span className="text-blue-600 dark:text-blue-400">Ongoing</span>
                                        )}
                                        {project.status === 'ON_HOLD' && (
                                            <span className="text-yellow-600 dark:text-yellow-400">On Hold</span>
                                        )}
                                        {project.status === 'COMPLETED' && (
                                            <span className="text-emerald-600 dark:text-emerald-400">Completed</span>
                                        )}
                                        {project.status === 'CANCELLED' && (
                                            <span className="text-red-600 dark:text-red-400">Cancelled</span>
                                        )}
                                    </TableCell>

                                    <TableCell className="text-right">
                                        <Button>
                                            View
                                        </Button>
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
