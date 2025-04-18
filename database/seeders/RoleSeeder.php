<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role_admin = Role::create(['name' => 'admin']);
        $permission_manage_client_projects = Permission::create(['name'=> 'manage client projects']);

        $role_admin->givePermissionTo($permission_manage_client_projects);

        $user = User::find(1);

        $user->assignRole($role_admin);
    }
}
