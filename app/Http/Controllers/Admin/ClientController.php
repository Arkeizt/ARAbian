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
        $clients = User::role('client')
            ->select('id', 'name', 'avatar')
            ->get();

        return Inertia::render('admin/clients', [
            'clients' => $clients,
        ]);
    }

    public function show(User $client) 
    {
        return Inertia::render('admin/clients-show', [
            'client' => $client,
        ]);
    }
}
