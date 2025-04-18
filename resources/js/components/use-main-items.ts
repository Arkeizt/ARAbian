import { LayoutGrid } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface User {
    id: number;
    name: string;
    permissions: string[];
}

interface Auth {
    user: User | null;
}

interface PageProps {
    auth: Auth;
    [key: string]: any;
}

interface NavItem {
    title: string;
    href: string;
    icon: any;
}

function resolveNavItems(permissions: string[]): NavItem[] {
    const isAdmin = permissions.includes('manage client projects');

    console.log('isAdmin:', isAdmin);
    console.log('User permissions:', permissions);

    return [
        {
        title: isAdmin ? 'Client Projects' : 'My Projects',
        href: '/dashboard', //use new href pag mabuhat na, prefix /admin for admin
        icon: LayoutGrid,
        },
    ];
}

// ✅ This is the exported React hook (clean, no logic inside)
export function useNavItems(): NavItem[] {
    const { props } = usePage<PageProps>();
    const permissions = props.auth?.user?.permissions || [];

    return resolveNavItems(permissions);
}