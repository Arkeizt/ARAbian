<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'auth' => [
            'user' => Auth::user(),
        ]
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::get('/admin/projects', function () {
        if (!auth()->user()?->hasRole('admin')) {
            return Redirect::route('my-projects');
        }
    
        return Inertia::render('admin-projects');
    })->middleware(['auth', 'can:manage client projects'])->name('admin.projects');
    
    
    Route::get('/my-projects', function () {
        return Inertia::render('my-projects');
    })->middleware(['auth'])->name('my.projects');

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
