<?php

use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ClientRequestsController;
use App\Http\Controllers\Admin\ClientShowController;
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
        ->middleware(['can:manage client projects'])
        ->name('clients');
    
    Route::get('/admin/client-requests', [ClientRequestsController::class, 'index'])
        ->middleware(['can:manage client projects'])
        ->name('client.requests');

    Route::get('/admin/clients/{client}', [ClientShowController::class, 'index'])
        ->middleware(['can:manage client projects'])
        ->name('clients.show');
    
    Route::get('/my-projects', function () {
        return Inertia::render('client/my-projects');
    })->name('my.projects');

    
    Route::get('/request-project', function () {
        return Inertia::render('client/RequestProject');
    })->name('request.project');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';