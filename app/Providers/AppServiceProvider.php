<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Inertia::share([
            'canManageProjects' => fn () => auth()->check() && auth()->user()->can('manage client projects'),

            'isAdmin' => fn () => auth()->check() && auth()->user()->hasRole('admin'),
            
            'auth.user' => function () {
                $user = Auth::user();
                return $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'permissions' => $user->getPermissionsViaRoles()->pluck('name')->toArray(),
                ] : null;
            },
        ]);

                    if (env('APP_ENV') === 'production') {
                URL::forceScheme('https');
            }

    }
}
