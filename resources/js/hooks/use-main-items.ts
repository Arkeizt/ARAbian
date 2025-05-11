import { LayoutGrid, Clipboard } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import type { SharedData } from '@/types';

interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
}

function resolveNavItems(isAdmin: boolean): NavItem[] {
    const navItems: NavItem[] = [
        {
            title: isAdmin ? 'Clients' : 'My Projects',
            href: isAdmin ? route('clients.index') : '/my-projects',
            icon: LayoutGrid,
        },
        {
            title: isAdmin ? 'Client Requests' : 'My Requests',
            href: isAdmin ? route('client.requests.index') : route('my.requests.index'),
            icon: Clipboard,
        },
    ];
    return navItems;
}

export function useNavItems(): NavItem[] {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth?.isAdmin ?? false;

    return resolveNavItems(isAdmin);
}
