import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { ClientRequest, type BreadcrumbItem } from '@/types';
import { useInitials } from '@/hooks/use-initials';
import { Head, usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Client Requests',
    href: '/admin/client-requests',
  },
];

export default function ClientRequests() {
    const { requests } = usePage<{ requests: ClientRequest[] }>().props;
    const getInitials = useInitials();
    const statusOptions = ['FOR_REVIEW', 'APPROVED', 'REJECTED'];
    const [statusFilter, setStatusFilter] = useState<string[]>(statusOptions);
    const toggleStatus = (status: string) => {
        setStatusFilter((prev) =>
            prev.includes(status)
                ? prev.filter((s) => s !== status)
                : [...prev, status]
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Client Requests" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px] text-center">Request</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Requested by</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm">
                                        Filter Status
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-48">
                                    <p className="text-sm font-medium mb-2">Show statuses</p>
                                    <div className="flex flex-col gap-1">
                                        {statusOptions.map((status) => (
                                            <label key={status} className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={statusFilter.includes(status)}
                                                    onCheckedChange={() => toggleStatus(status)}
                                                />
                                                <span className="text-sm">
                                                    {status === 'FOR_REVIEW' && 'For Review'}
                                                    {status === 'APPROVED' && 'Approved'}
                                                    {status === 'REJECTED' && 'Rejected'}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='items-center'>
                    {requests.filter(req => statusFilter.includes(req.status)).map((request) => (
                        <TableRow key={request.id}>
                            <TableCell className='text-center'>{request.id}</TableCell>
                            <TableCell>
                                <div className='flex justify gap-4'>
                                    {request.title}
                                    <Badge className={request.type === 'SURVEY' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 dark:bg-indigo-800 text-white'}>
                                        {request.type === 'SURVEY' ? 'Survey' : 'Construction'}
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Link href={route('clients.show', request.user?.id) + '?from=client-requests'}>
                                    <div className='flex justify gap-4 items-center'>
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage src={request.user?.avatar} alt={request.user?.name} />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(request.user?.name ?? 'Unknown')}
                                            </AvatarFallback>
                                        </Avatar>
                                        {request.user?.name ?? 'Unknown'}
                                    </div>
                                </Link>
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
                                {request.status === 'FOR_REVIEW' ? (
                                    <Link href={route('client.requests.show', request.id)}>
                                        <Button>View</Button>
                                    </Link>
                                ) : (
                                    <Button disabled>View</Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        </AppLayout>
    );
}
