import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLogoIcon from '../components/app-logo-icon';

export default function Welcome() {
    const { auth, isAdmin } = usePage<SharedData>().props;
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                {/* NAVIGATION */}
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl p-6 lg:p-8">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={isAdmin ? route('clients') : route('my.projects.index')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                {isAdmin ? 'Clients' : 'My Projects'}
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* HERO */}
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0 px-6 lg:px-8">
                    <div className="inline-flex items-center justify-center rounded-sm border border-[#19140035] p-4 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] h-[50vh] w-full max-w-5xl overflow-hidden">
                        <div className="flex w-full h-full flex-col lg:flex-row">
                            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-4 h-full">
                                <div className="flex items-center justify-center">
                                    <div className="bg-white text-sidebar-primary-foreground flex aspect-square size-20 p-1 items-center justify-center rounded-md">
                                        <AppLogoIcon/>
                                    </div>
                                    <h1 className="text-center text-[#461cb9] font-bold text-xl">
                                        AR
                                    </h1>
                                    <h1 className="text-center text-[#B91C1C] font-bold text-xl">
                                        Abian
                                    </h1>
                                </div>
                                <h1 className="text-center text-[#B91C1C] dark:text-[#FCA5A5] font-bold text-xl">
                                    Land Surveying & Construction Progress Tracker
                                </h1>
                                <a href="https://www.facebook.com/profile.php?id=100054545585447" target="_blank" className="flex items-center gap-1 text-sm text-red-600 hover:underline mt-2">
                                    <span>Follow our Facebook Page</span>
                                    <svg
                                        width={10}
                                        height={11}
                                        viewBox="0 0 10 11"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-2.5 w-2.5"
                                    >
                                        <path
                                            d="M7.70833 6.95834V2.79167H3.54167M2.5 8L7.5 3.00001"
                                            stroke="currentColor"
                                            strokeLinecap="square"
                                        />
                                    </svg>  
                                </a>             
                            </div>
                            <div className="hidden lg:block w-1/2 h-full rounded-r-sm">
                                <img
                                    src="/welcome.jpg"
                                    alt="Surveying"
                                    className="w-full h-full object-cover rounded-r-sm"
                                    style={{
                                        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
                                        maskImage: 'linear-gradient(to right, transparent 0%, black 50%)'
                                    }}    
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FEATURES SECTION */}
                <section className="w-full max-w-6xl px-6 py-12 lg:px-8">
                    <h2 className="text-2xl font-semibold text-[#B91C1C] mb-6 text-center">Our Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="border p-4 rounded-md shadow-sm bg-white dark:bg-[#1a1a1a]">
                            <h3 className="text-lg font-bold text-[#B91C1C]">Real-time Tracking</h3>
                            <p className="text-sm">Monitor construction progress and land survey updates in real time.</p>
                        </div>
                        <div className="border p-4 rounded-md shadow-sm bg-white dark:bg-[#1a1a1a]">
                            <h3 className="text-lg font-bold text-[#B91C1C]">Client Portal</h3>
                            <p className="text-sm">Clients can securely log in to view project updates, documents, and images.</p>
                        </div>
                        <div className="border p-4 rounded-md shadow-sm bg-white dark:bg-[#1a1a1a]">
                            <h3 className="text-lg font-bold text-[#B91C1C]">Responsive Support</h3>
                            <p className="text-sm">Dedicated support team available to assist with inquiries and updates.</p>
                        </div>
                    </div>
                </section>

                {/* TESTIMONIAL SECTION */}
                <section className="w-full max-w-4xl px-6 py-12 lg:px-8 bg-[#fff5f5] dark:bg-[#1f1f1f] rounded-md">
                    <h2 className="text-2xl font-semibold text-[#B91C1C] mb-6 text-center">What Our Clients Say</h2>
                    <div className="space-y-6">
                        <blockquote className="text-sm border-l-4 border-red-400 pl-4 italic">
                            “ARAbian has transformed the way we manage and monitor land surveying projects. Highly recommended!”<br />
                            <span className="block text-right text-xs font-medium mt-2">— Engr. Paimon</span>
                        </blockquote>
                        <blockquote className="text-sm border-l-4 border-red-400 pl-4 italic">
                            “Thanks to ARAbian, our project timelines are easier to manage and communicate with clients.”<br />
                            <span className="block text-right text-xs font-medium mt-2">— Kaveh, Arki sa Sumeru</span>
                        </blockquote>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="w-full py-6 text-center text-xs text-[#6b6b6b] dark:text-[#aaa] mt-12">
                    &copy; 2005 ARAbian. All rights reserved.
                </footer>
            </div>
        </>
    );
}
