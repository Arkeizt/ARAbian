import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create New Post',
        href: '/client-project-post-create',
    },
];

export default function ClientProjectPostCreate() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create New Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <Input></Input>
                    </CardHeader>
                    <CardContent>

                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
