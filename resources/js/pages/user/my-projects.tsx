import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
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
        title: 'My Projects',
        href: '/my-projects',
    },
];

export default function MyProjects() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Table>
                    <TableCaption>Client/User View.</TableCaption>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">Projects</TableHead>
                        <TableHead>Ling gang</TableHead>
                        <TableHead>guli guli</TableHead>
                        <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                    </TableBody>
                </Table>
            </div>
        </AppLayout>
    );
}
