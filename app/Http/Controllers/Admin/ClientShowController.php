<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ClientShowController extends Controller
{
    public function index(User $client) 
    {
        return Inertia::render('admin/clients-show', [
            'client' => $client,
        ]);
    }
}
