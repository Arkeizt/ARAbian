import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth, isAdmin } = usePage<SharedData>().props;
    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={
                                    isAdmin
                                        ? route('clients')
                                        : route('my.projects')
                                }
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
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <div className="inline-flex items-center justify-center rounded-sm border border-[#19140035] p-4 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] h-[50vh] w-[50vw] overflow-hidden">
                        <div className="flex w-full h-full flex-col lg:flex-row">
                            <div className="flex w-full lg:w-1/2 flex-col items-center justify-center p-4 h-full">
                                <h1 className="text-center text-[#1b1b18] dark:text-[#EDEDEC]">
                                    Arabian: Land Surveying & Construction Progress Tracker
                                </h1>
                                <a href="https://www.facebook.com/profile.php?id=100054545585447" target="_blank" className="flex items-center gap-1 text-sm text-blue-600 hover:underline">
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
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </> 
    );
}