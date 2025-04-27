<?php

use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ClientRequestsController;
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
    
    Route::get('/admin/clients', [ClientController::class, 'index'])
        ->middleware(['auth', 'can:manage client projects'])
        ->name('clients');
    
        Route::get('/admin/client-requests', [ClientRequestsController::class, 'index'])
        ->middleware(['auth', 'can:manage client projects'])
        ->name('client.requests');
    
    Route::get('/my-projects', function () {
        return Inertia::render('user/my-projects');
    })->middleware(['auth'])->name('my.projects');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
