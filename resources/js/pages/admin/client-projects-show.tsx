import AppLayout from '@/layouts/app-layout';
import { MoreVertical, Pencil, Trash } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Project, type BreadcrumbItem, type ProjectWithPosts} from '@/types';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { route } from 'ziggy-js';
import { Separator } from "@/components/ui/separator";
import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ClientProjectsShow() {
    const getInitials = useInitials();
    const { project, posts } = usePage<ProjectWithPosts>().props;
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const from = searchParams.get('from');

    const breadcrumbs: BreadcrumbItem[] = [
        from?.startsWith('client-requests')
            ? { title: 'Client Requests', href: '/admin/client-requests' }
            : { title: 'Clients', href: '/admin/clients' },
        { title: `${project.user?.name}`, href: `/admin/clients/${project.user?.id}` },
        { title: `${project.title}`, href: `/admin/client-projects-show/${project.id}` },
    ];

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };
    const sortedPosts = useMemo(() => {
        return [...posts].sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }).map(post => ({
            ...post,
            formattedCreatedAt: formatDate(post.created_at)
        }));
    }, [posts, sortOrder]);

    const statusOptions = [
        { value: 'ONGOING', label: 'Ongoing' },
        { value: 'ON_HOLD', label: 'On Hold' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CANCELLED', label: 'Cancelled' },
    ];

    return (
        <>
        <Toaster />
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={project.title} />
            <div className='m-6 space-y-6'>
                <Card>
                    <CardHeader>
                        <h1 className='text-4xl font-bold'>{project.title}</h1>
                        <div className='flex gap-2 items-center mt-2'>
                            <p className='text-sm text-gray-500'>
                                <Badge className={project.type === 'SURVEY' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 dark:bg-indigo-800 text-white'}>
                                    {project.type === 'SURVEY' ? 'Survey' : 'Construction'}
                                </Badge>
                            </p>
                            |
                            <p> 
                                {project.status === 'ONGOING' && (
                                    <span className="text-blue-600 dark:text-blue-400"> Ongoing</span>
                                )}
                                {project.status === 'ON_HOLD' && (
                                    <span className="text-yellow-600 dark:text-yellow-400"> On Hold</span>
                                )}
                                {project.status === 'COMPLETED' && (
                                    <span className="text-emerald-600 dark:text-emerald-400"> Completed</span>
                                )}
                                {project.status === 'CANCELLED' && (
                                    <span className="text-red-600 dark:text-red-400"> Cancelled</span>
                                )}
                            </p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <span className="text-xs ml-2 pt-0.5 text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                                        Change Status
                                    </span>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {statusOptions.map(option => (
                                        <DropdownMenuItem
                                            key={option.value}
                                            onClick={() => {
                                                if (option.value !== project.status) {
                                                    router.put(route('client.projects.update', project.id), {
                                                        status: option.value,
                                                    });
                                                }
                                            }}
                                        >
                                            {option.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className='flex gap-2 items-center mt-2'>
                            <Avatar className="size-8 overflow-hidden rounded-full">
                                <AvatarImage src={project.user?.avatar} alt={project.user?.name} />
                                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white text-sm">
                                    {getInitials(project.user?.name)}
                                </AvatarFallback>
                            </Avatar>
                            <p className='text-sm'>
                                {project.user?.name}
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Link 
                            href={route('client.project.posts.create', { projectId: project.id })}
                            className="text-blue-500 hover:underline"
                        >
                            + Add New Post
                        </Link>
                    </CardContent>
                </Card>

                <div className='m-10 space-y-4'>
                    <div>
                        <span className='m-6 text-xl font-bold'>Posts</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="px-3 py-1.5 border rounded text-sm hover:bg-accent">
                                    Sort: {sortOrder === 'asc' ? 'Oldest First' : 'Newest First'}
                                </button>
                            </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => setSortOrder('asc')}>
                                    Oldest First
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSortOrder('desc')}>
                                    Newest First
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Separator />
                    <div className='flex flex-col justify-center items-center space-y-4 w-full'>
                        {sortedPosts.map((post) => (
                            <Card key={post.id} className='w-3/4 mx-auto'>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <h2 className='text-lg font-semibold'>{post.title}</h2>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                type="button"
                                                className="p-1 rounded hover:bg-muted transition"
                                                >
                                                <MoreVertical className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => router.visit(route('client.project.posts.edit', { projectId: project.id, post: post.id }))}>
                                                    <Pencil className="w-4 h-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>

                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        if (
                                                        confirm(
                                                            'Are you sure you want to delete this post? This action cannot be undone.'
                                                        )
                                                        ) {
                                                        router.delete(
                                                            route('client.project.posts.destroy', {
                                                            projectId: project.id,
                                                            post: post.id,
                                                            }),
                                                            {
                                                            preserveScroll: true,
                                                            onSuccess: () => {
                                                                toast.success('Success!', {
                                                                    description: 'Post was successfully deleted.',
                                                                });
                                                            },
                                                            onError: () => {
                                                                toast.error('Error', {
                                                                    description: 'Failed to delete the post.',
                                                                });
                                                            },
                                                            }
                                                        );
                                                        }
                                                    }}
                                                    >
                                                    <Trash className="w-4 h-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <p className='text-xs text-muted-foreground'>{post.formattedCreatedAt}</p>
                                    <Separator />
                                    <p className='text-muted-foreground ml-4'>{post.description}</p>
                                </CardHeader>

                                <CardContent className='space-y-2'>
                                    {post.media
                                        .filter((media) => media.media_type === 'DOCUMENT')
                                        .map((media) => (
                                            <div key={media.id} className='border p-4 rounded'>
                                                <p className='font-medium'>{media.file_name}</p>
                                                <a
                                                href={media.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='text-blue-500 hover:underline'
                                                >
                                                    View File
                                                </a>
                                            </div>
                                        ))}

                                    {post.media.some((media) => media.media_type === 'IMAGE' || media.media_type === 'VIDEO') && (
                                        <div className="relative w-full overflow-hidden rounded-lg">
                                            <Carousel orientation="horizontal" className="space-y-4">
                                                <CarouselContent>
                                                    {post.media
                                                        .filter((media) => media.media_type === 'IMAGE' || media.media_type === 'VIDEO')
                                                        .map((media) => (
                                                        <CarouselItem key={media.id} className="flex justify-center">
                                                            <div className="w-full max-w-[500px] flex items-center justify-center rounded-lg overflow-hidden">
                                                            {media.media_type === 'IMAGE' ? (
                                                                <img
                                                                src={media.file_url}
                                                                alt={media.file_name}
                                                                className="w-full h-auto max-h-[500px] object-contain"
                                                                />
                                                            ) : media.media_type === 'VIDEO' ? (
                                                                <video
                                                                controls
                                                                src={media.file_url}
                                                                className="w-full h-auto max-h-[500px] object-contain"
                                                                />
                                                            ) : null}
                                                            </div>
                                                        </CarouselItem>
                                                    ))}
                                                </CarouselContent>
                                                <CarouselPrevious className="absolute top-1/2 left-4 transform -translate-y-1/2" />
                                                <CarouselNext className="absolute top-1/2 right-4 transform -translate-y-1/2" />
                                            </Carousel>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
        </>
    );
}
