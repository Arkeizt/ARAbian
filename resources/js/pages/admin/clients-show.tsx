import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { type Client, type ClientRequest, type Project } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from "@/components/ui/badge";
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from "@/components/ui/button";
import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { route } from 'ziggy-js';

export default function ClientsShow({ client, projects, requests }: { client: Client, projects: Project[], requests: ClientRequest[] }) {
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const from = searchParams.get('from');
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
    
    const breadcrumbs: BreadcrumbItem[] = [
        from?.startsWith('client-requests')
            ? { title: 'Client Requests', href: '/admin/client-requests' }
            : { title: 'Clients', href: '/admin/clients' },
        { title: `${client.name}`, href: `/admin/clients/${client.id}` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={client.name} />
            <Card className='m-4 w-full'>
                <CardHeader className='border-b border-muted-backgroundground'>
                    <div className="flex flex-col gap-4 p-4">
                        <div className='flex items-center gap-2'>
                            <Avatar className="size-16 overflow-hidden rounded-full">
                                <AvatarImage src={client.avatar} alt={client.name} />
                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white text-2xl">
                                    {getInitials(client.name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className='flex-col'>
                                <h1 className="text-3xl font-bold">{client.name}</h1>
                                <p>{client.email}</p>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue='projects'>
                        <TabsList>
                            <TabsTrigger value='projects'>Projects</TabsTrigger>
                            <TabsTrigger value='requests'>Requests</TabsTrigger>
                        </TabsList>

                        <TabsContent value='projects'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {projects.length > 0 ? projects.map(project => (
                                        <TableRow key={project.id}>
                                            <TableCell>{project.title}</TableCell>
                                            <TableCell>
                                                <Badge className={project.type === 'SURVEY' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 dark:bg-indigo-800 text-white'}>
                                                    {project.type === 'SURVEY' ? 'Survey' : 'Construction'}
                                                </Badge>
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
                                                <Link href={route('client.projects.show', project.id)}>
                                                    <Button>
                                                        View
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={3} className='text-center'>No projects found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TabsContent>

                        <TabsContent value='requests'>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Type</TableHead>
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
                                <TableBody>
                                    {requests.filter(req => statusFilter.includes(req.status)).length > 0 ? (
                                        requests
                                            .filter(req => statusFilter.includes(req.status))
                                            .map(request => (
                                                <TableRow key={request.id}>
                                                    <TableCell>{request.title}</TableCell>
                                                    <TableCell>
                                                        <Badge className={request.type === 'SURVEY' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 dark:bg-indigo-800 text-white'}>
                                                            {request.type === 'SURVEY' ? 'Survey' : 'Construction'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        {request.status === 'FOR_REVIEW' && <span className="text-muted-foreground">For Review</span>}
                                                        {request.status === 'APPROVED' && <span className="text-green-600 dark:text-green-400">Approved</span>}
                                                        {request.status === 'REJECTED' && <span className="text-red-600 dark:text-red-400">Rejected</span>}
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
                                            ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className='text-center'>No requests found.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TabsContent>

                    </Tabs>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
