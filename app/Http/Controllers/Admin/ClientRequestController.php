<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ClientRequest;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ClientRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Only allow admin to access
        if (!auth()->user()?->hasRole('admin')) {
            return Redirect::route('my.projects');
        }

        // Fetch all client requests, including user info (who made the request)
        $requests = ClientRequest::with('user:id,name,avatar')
            ->orderBy('created_at', 'asc')
            ->get();

        return Inertia::render('admin/client-requests', [
            'requests' => $requests,
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
    public function show(ClientRequest $clientRequest)
    {
        // Only allow admin to access
        if (!auth()->user()?->hasRole('admin')) {
            return Redirect::route('my.projects');
        }

        // Eager load the user info (who made the request)
        $clientRequest->load('user:id,name,avatar');

        return Inertia::render('admin/client-request-show', [
            'request' => $clientRequest,
        ]);
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
    public function update(Request $request, ClientRequest $clientRequest)
    {
        $validatedStatus = $request->validate([
            'status' => 'required|in:APPROVED,REJECTED',
        ]);

        if ($clientRequest->status !== 'FOR_REVIEW') {
            return redirect()->route('client.requests.index')
                ->with('error', 'This request has already been processed.');
        }

        $clientRequest->update([
            'status' => $validatedStatus['status'],
        ]);

        if ($validatedStatus['status'] === 'APPROVED') {
            Project::create([
                'title'   => $clientRequest->title,
                'type'    => $clientRequest->type,
                'user_id' => $clientRequest->user_id,
            ]);
        }

        return redirect()->route('client.requests.index')
            ->with('success', 'Request updated successfully.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ClientRequest $clientRequests)
    {
        //
    }
}
