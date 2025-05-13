import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User | null;
    isAdmin: boolean;
    canManageProjects: boolean;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    permissions: string[];
    roles: string[];
    [key: string]: unknown;
}

export interface Client {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}

export interface FlashProps {
    flash: {
      success?: string;
      error?: string;
    };
    [key: string]: unknown;
}
export interface Project {
    id: number;
    title: string;
    type: 'SURVEY' | 'CONSTRUCTION';
    status: 'ONGOING' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
    [key: string]: unknown;
}

export interface ClientRequest {
    id: number;
    title: string;
    description: string;
    type: 'SURVEY' | 'CONSTRUCTION';
    status: 'FOR_REVIEW' | 'APPROVED' | 'REJECTED';
    address: string;
    user_id: number;
    created_at: string;
    updated_at: string;
    user?: Pick<User, 'id' | 'name' | 'avatar'> | null;
    [key: string]: unknown;
}

export interface Media {
    id: number;
    file_name: string;
    file_url: string;
    media_type: string;
    [key: string]: unknown;
}

export interface ProjectPost {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    project: Project;
    media: Media[];
    [key: string]: unknown;
}

export interface ProjectWithPosts {
    project: Project & {
        user: Pick<User, 'id' | 'name' | 'avatar'>;
    };
    posts: ProjectPost[];
    [key: string]: unknown;
}