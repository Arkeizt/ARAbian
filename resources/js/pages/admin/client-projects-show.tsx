import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { Project, type BreadcrumbItem, type ProjectWithPosts} from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { route } from 'ziggy-js';
import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ClientProjectsShow() {
    const getInitials = useInitials();
    const { project, posts } = usePage<ProjectWithPosts>().props;
    console.log(project); 
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

    return (
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
                            href={`/admin/project-posts/create?project_id=${project.id}`} 
                            className="text-blue-500 hover:underline"
                        >
                            + Add New Post
                        </Link>
                    </CardContent>
                </Card>

                <div className='space-y-4'>
                    {posts.map((post) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <h2 className='text-lg font-semibold'>{post.title}</h2>
                                <p className='text-gray-600'>{post.description}</p>
                            </CardHeader>
                            <CardContent className='space-y-2'>
                                {post.media.length > 0 ? (
                                    post.media.map((media) => (
                                        <div key={media.id} className='border p-2 rounded'>
                                            <p className='font-medium'>{media.file_name}</p>
                                            <a href={media.file_url} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline'>
                                                View File
                                            </a>
                                            <p className='text-xs text-gray-500'>{media.media_type}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className='text-sm text-gray-400'>No media attached.</p>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
