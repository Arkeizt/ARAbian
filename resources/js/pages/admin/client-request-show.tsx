import AppLayout from '@/layouts/app-layout';
import { type ClientRequest } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

export default function ClientRequestShow({ request }: { request: ClientRequest }) {
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const from = searchParams.get('from');
    const getInitials = useInitials();
    const handleStatusChange = (status: 'APPROVED' | 'REJECTED') => {
        router.put(route('client.requests.update', request.id), {
            status: status,
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Client Requests', href: '/admin/client-requests' },
        ...(from
            ? [{ title: 'Back to Previous', href: `/${from}` }]
            : []),
        {
            title: `Request #${request.id}`,
            href: `/admin/client-requests/${request.id}`,
        },
    ];    

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Request #${request.id}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-l font-bold">Request #{request.id}</h1>
                <Card>
                    <CardHeader className="border-b border-muted-backgroundground">
                        <p className="text-sm text-muted-foreground">Title</p>
                        <CardTitle>
                            <div className="flex gap-2 items-center pb-4">
                                <p className='text-2xl'><strong>{request.title}</strong></p>
                                <Badge className={request.type === 'SURVEY' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 dark:bg-indigo-800 text-white'}>
                                    {request.type === 'SURVEY' ? 'Survey' : 'Construction'}
                                </Badge>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            <strong>Requested By</strong>
                        </p>
                        <Link href={route('clients.show', request.user?.id) + `?from=client-requests/${request.id}`}>
                            <div className="flex justify-start gap-2 pt-2 ml-4">
                                <Avatar className="size-6 overflow-hidden rounded-full">
                                    <AvatarImage src={request.user?.avatar} alt={request.user?.name} />
                                    <AvatarFallback className="rounded-lg text-xs bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                        {getInitials(request.user?.name ?? 'Unknown')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex items-center gap-2">
                                    <p>{request.user?.name ?? 'Unknown'}</p>
                                    •
                                    <p className="m-0 text-xs text-muted-foreground pt-1">{new Date(request.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </Link>
                    </CardContent>
                    <CardContent>
                        <p className="text-sm">
                            <strong>Address</strong>
                        </p>
                        <p className='ml-4 text-muted-foreground'>{request.address}</p>
                        <p className="text-sm pt-4">
                            <strong>Description</strong>
                        </p>
                        <p className='ml-4 text-muted-foreground'>{request.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-end border-t border-muted-background">
                        <div className='flex pt-6 gap-2'>
                            <Button
                                variant="outline"
                                className="border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
                                onClick={() => handleStatusChange('REJECTED')}
                                disabled={request.status !== 'FOR_REVIEW'}
                            >
                                Reject
                            </Button>
                            <Button 
                                onClick={() => handleStatusChange('APPROVED')}
                                disabled={request.status !== 'FOR_REVIEW'}
                            >
                                Approve
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
