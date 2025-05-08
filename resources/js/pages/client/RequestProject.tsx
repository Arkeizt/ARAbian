import { Head } from '@inertiajs/react';
import { useState } from 'react';

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
        // You can post the form to your backend here using fetch or Inertia
        console.log('Form submitted:', form);
    };

    return (
        <>
            <Head title="Request a Project" />
            <div className="min-h-screen bg-white p-6 dark:bg-[#0a0a0a] dark:text-white">
                <div className="max-w-xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">Request a Geodetic Surveying Project</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Project Type</label>
                            <input
                                type="text"
                                name="projectType"
                                value={form.projectType}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Additional Details</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full border border-gray-300 rounded px-3 py-2 dark:bg-gray-800"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
