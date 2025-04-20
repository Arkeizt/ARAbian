import { LayoutGrid } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import type { LucideIcon } from 'lucide-react';
import type { SharedData } from '@/types';

interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
}

function resolveNavItems(isAdmin: boolean): NavItem[] {
    return [
        {
            title: isAdmin ? 'Client Projects' : 'My Projects',
            href: isAdmin ? '/admin/projects' : '/my-projects',
            icon: LayoutGrid,
        },
    ];
}

export function useNavItems(): NavItem[] {
    const { auth } = usePage<SharedData>().props;
    const isAdmin = auth?.isAdmin ?? false;

    return resolveNavItems(isAdmin);
}
