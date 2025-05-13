import AppLayout from '@/layouts/app-layout';
import { useState, useMemo } from 'react';
import { Project, type BreadcrumbItem, type ProjectWithPosts} from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  

export default function MyProjectsShow() {
    const { project, posts } = usePage<ProjectWithPosts>().props;
    const { url } = usePage();
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const from = searchParams.get('from');
    const breadcrumbs: BreadcrumbItem[] = [
        { title: `My Projects`, href: `/my-projects` },
        { title: `${project.title}`, href: `/my-projects/${project.id}` },
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
                    </CardHeader>
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
                                    <h2 className='text-lg font-semibold'>{post.title}</h2>
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
    );
}
