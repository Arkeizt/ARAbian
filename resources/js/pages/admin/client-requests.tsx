import AppLayout from '@/layouts/app-layout';
import { ClientRequest, type BreadcrumbItem } from '@/types';
import { useInitials } from '@/hooks/use-initials';
import { Head, usePage, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Client Requests" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <Table>
                <TableCaption>List of all client requests.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px] text-center">Request</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Requested by</TableHead>
                        <TableHead className="text-right"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='items-center'>
                    {requests.map((request) => (
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
                        <TableCell className="text-right">
                            <Button>
                                <Link href={route('client.requests.show', request.id)}>
                                    View
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
        </AppLayout>
    );
}
