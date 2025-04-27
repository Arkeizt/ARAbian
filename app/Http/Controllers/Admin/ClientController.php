<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ClientController extends Controller
{
    public function index() 
    {
        if (!auth()->user()?->hasRole('admin')) {
            return Redirect::route('my.projects');
        }
        
        $clients = User::doesntHave('roles')
            ->select('id', 'name', 'avatar')
            ->get();

        return Inertia::render('admin/clients', [
            'clients' => $clients,
        ]);
    }
}
