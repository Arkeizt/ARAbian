<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show($id)
    {
        // Eager load relationships: user, posts, and media
        $project = Project::with([
            'user:id,name,avatar',
            'posts:id,title,description,project_id',
            'posts.media:id,file_name,file_url,media_type',
        ])->findOrFail($id);

        // Log the project data to check if it has the relationships loaded correctly
        \Log::info('Project Data:', ['project' => $project]);

        // Return the Inertia response with the project data
        return Inertia::render('admin/client-projects-show', [
            'project' => $project,
            'posts' => $project->posts,
        ]);
    }

    

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
