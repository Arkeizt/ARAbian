<?php

use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ClientRequestController;
use App\Http\Controllers\Admin\ClientShowController;
use App\Http\Controllers\Client\MyProjectController;
use App\Http\Controllers\Client\RequestProjectController;
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
    
    Route::get('/admin/client-requests', [ClientRequestController::class, 'index'])
        ->middleware(['can:manage client projects'])
        ->name('client.requests');

    Route::get('/admin/clients/{client}', [ClientShowController::class, 'index'])
        ->middleware(['can:manage client projects'])
        ->name('clients.show');

    Route::resource('my-projects', MyProjectController::class)
        ->names('my.projects');
    
    Route::resource('request-project', RequestProjectController::class)
        ->names('request-project');
    
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';