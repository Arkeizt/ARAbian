<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\ClientRequest;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;


class MyRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $requests = ClientRequest::where('user_id', auth()->id())->get();

        return Inertia::render('client/my-requests', [
            'requests' => $requests, // Send the requests data here
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $request = ClientRequest::where('id', $id)
            ->where('user_id', auth()->id()) // ensure user owns it
            ->firstOrFail();

        return Inertia::render('client/my-request-edit', [
            'request' => $request,
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $clientRequest = ClientRequest::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();
    
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'type' => 'required|in:SURVEY,CONSTRUCTION',
            'address' => 'required|string|max:255',
        ]);
    
        $clientRequest->update([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'type' => $validated['type'],
            'address' => $validated['address'],
        ]);
    
        return redirect()->route('my.requests.index')
            ->with('success', 'Your request has been updated.');
    }
    


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $clientRequest = ClientRequest::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $clientRequest->delete();

        return redirect()->route('my.requests.index')
            ->with('success', 'Request deleted successfully.');
    }

}
