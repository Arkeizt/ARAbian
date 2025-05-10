import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';

const breadcrumbs = [
    { title: 'Request a Project', href: '/request-project' },
];

export default function RequestProject() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        type: '',
        address: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setData(e.target.name as keyof typeof data, e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('request-project.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Request a Project" />
            <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto bg-card text-card-foreground shadow-xl rounded-2xl">

                <Link
                    href={route('my.projects.index')}
                    className="inline-flex items-center text-sm text-primary hover:underline transition"
                >
                    ← Back
                </Link>

                <h1 className="text-3xl font-semibold text-center">
                    Request a Project
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Project Title</label>
                        <Input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            placeholder="Road Survey for Subdivision"
                            required
                        />
                        {errors.title && <div className="text-destructive text-sm mt-1">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Project Type</label>
                        <select
                            name="type"
                            value={data.type}
                            onChange={handleChange}
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-base shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                            required
                        >
                            <option value="">Select type</option>
                            <option value="SURVEY">Survey</option>
                            <option value="CONSTRUCTION">Construction</option>
                        </select>
                        {errors.type && <div className="text-destructive text-sm mt-1">{errors.type}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Location / Address</label>
                        <Input
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={handleChange}
                            placeholder="Davao City, Philippines"
                            required
                        />
                        {errors.address && <div className="text-destructive text-sm mt-1">{errors.address}</div>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-1">Project Description</label>
                        <textarea
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            placeholder="Please describe your project requirements..."
                            rows={5}
                            className="w-full rounded-md border border-border bg-background px-3 py-2 text-base shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
                            required
                        />
                        {errors.description && <div className="text-destructive text-sm mt-1">{errors.description}</div>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-3 rounded-lg text-primary-foreground bg-primary hover:opacity-90 transition disabled:opacity-50 font-semibold"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
