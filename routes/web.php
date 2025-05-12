<?php

use App\Http\Controllers\Admin\ClientController;
use App\Http\Controllers\Admin\ClientRequestController;
use App\Http\Controllers\Admin\ClientProjectController;
use App\Http\Controllers\Client\MyProjectController;
use App\Http\Controllers\Client\MyRequestController;
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
    
    Route::resource('/admin/clients', ClientController::class)
        ->middleware(['can:manage client projects'])
        ->names('clients');
    
    Route::resource('/admin/client-requests', ClientRequestController::class)
        ->middleware(['can:manage client projects'])
        ->names('client.requests');

    Route::resource('/admin/client-projects-show', ClientProjectController::class)
        ->middleware(['can:manage client projects'])
        ->names('client.projects');

    Route::resource('my-projects', MyProjectController::class)
        ->names('my.projects');
    
    Route::resource('request-project', RequestProjectController::class)
        ->names('request.project');

    Route::resource('my-requests', MyRequestController::class)
        ->names('my.requests');
    
    
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';