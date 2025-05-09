<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use App\Models\ClientRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ClientRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() 
    {
        if (!auth()->user()?->hasRole('admin')) {
            return Redirect::route('my.projects');
        }
        
        $clients = User::doesntHave('roles')
            ->select('id', 'name', 'avatar')
            ->get();

        return Inertia::render('admin/client-requests', [
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ClientRequest $clientRequests)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ClientRequest $clientRequests)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ClientRequest $clientRequests)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClientRequest $clientRequests)
    {
        //
    }
}
