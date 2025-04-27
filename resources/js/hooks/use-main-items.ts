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
            href: isAdmin ? '/admin/clients' : '/my-projects',
            icon: LayoutGrid,
        },
    ];

    if (isAdmin) {
        navItems.push({
            title: 'Client Requests',
            href: '/admin/client-requests',
            icon: Clipboard,
        });
    }

    return navItems;
}

export function useNavItems(): NavItem[] {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth?.isAdmin ?? false;

    return resolveNavItems(isAdmin);
}
