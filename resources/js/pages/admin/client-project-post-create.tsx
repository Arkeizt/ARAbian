import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BreadcrumbItem, Project } from '@/types';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
{ title: 'Create New Post', href: '/client-project-post-create' },
];

export default function ClientProjectPostCreate({ project }: { project: Project }) {
    const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);
    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        description: string;
        media: File[] | null;
    }>({
        title: '',
        description: '',
        media: null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('client.project.posts.store', { projectId: project.id }), { forceFormData: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                        <CardTitle>Create New Post</CardTitle>
                        <CardDescription>Fill out the form to add a new post to the project timeline.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <Input
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full"
                                />
                                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Description</label>
                                <Textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows={4}
                                className="w-full"
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium">Media Files</label>
                                <input
                                    type="file"
                                    multiple
                                    onChange={(e) => {
                                    const newFiles = e.target.files ? Array.from(e.target.files) : [];
                                    const combined = data.media ? [...data.media, ...newFiles] : newFiles;
                                    const uniqueFiles = Array.from(
                                        new Map(combined.map(f => [`${f.name}-${f.size}`, f])).values()
                                    );
                                    setData('media', uniqueFiles);
                                    e.target.value = '';
                                    }}
                                    ref={setFileInputRef}
                                    className="hidden"
                                />

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {data.media && data.media.map((file) => (
                                        <Button
                                            key={`${file.name}-${file.size}`}
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-1"
                                            onClick={() => {
                                            setData('media', data.media?.filter(f => f !== file) || null);
                                            }}
                                        >
                                            {file.name}
                                            <X className="h-3 w-3 text-muted-foreground" />
                                        </Button>
                                    ))}

                                    <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fileInputRef?.click()}
                                    >
                                        + Add Files
                                    </Button>
                                </div>
                                {errors.media && <p className="text-sm text-red-500 mt-1">{errors.media}</p>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end gap-2">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Create Post'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
