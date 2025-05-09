import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Request a Project',
        href: '/request-project',
    },
];

export default function RequestProject() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        projectType: '',
        location: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', form);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Request a Project" />
            <div className="flex flex-col gap-6 p-4 max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-2xl">
                
                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => router.visit('/')}
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition duration-150"
                >
                    ← Back
                </button>

                <h1 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
                    Request a Geodetic Surveying Project
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Juan Dela Cruz"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="juan@example.com"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Project Type</label>
                        <input
                            type="text"
                            name="projectType"
                            value={form.projectType}
                            onChange={handleChange}
                            placeholder="Boundary Survey, Topographic Mapping, etc."
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Location</label>
                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="e.g. Davao City, Philippines"
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Additional Details</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Please describe your project requirements in detail..."
                            rows={5}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg text-white font-semibold bg-blue-600 hover:bg-blue-700 transition duration-200"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
