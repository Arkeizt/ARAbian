<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectPost;
use App\Models\Media;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ClientProjectPostController extends Controller
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
    public function create($projectId)
    {
        $project = Project::select('id', 'name')->findOrFail($projectId);

        return Inertia::render('admin/client-project-post-create', [
            'project' => $project
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);
    
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'media.*' => 'nullable|file|mimes:jpg,jpeg,png,gif,mp4,mov,avi,webm,pdf,doc,docx,xls,xlsx,ppt,pptx,txt,rtf|max:10240',
        ]);        
    
        $post = $project->posts()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
        ]);
    
        $mediaIds = [];
    
        if ($request->hasFile('media')) {
            foreach ($request->file('media') as $uploadedFile) {
                $mimeType = $uploadedFile->getMimeType();
    
                if (str_starts_with($mimeType, 'image/')) {
                    $mediaType = 'IMAGE';
                } elseif (str_starts_with($mimeType, 'video/')) {
                    $mediaType = 'VIDEO';
                } else {
                    $mediaType = 'DOCUMENT';
                }
    
                $path = $uploadedFile->store('media', 'public');
    
                $media = Media::create([
                    'file_name' => $uploadedFile->getClientOriginalName(),
                    'file_url' => '/storage/' . $path,
                    'media_type' => $mediaType,
                ]);
    
                $mediaIds[] = $media->id;
            }

            $post->media()->attach($mediaIds);
        }
    
        return redirect()->route('client.projects.show', $projectId)
            ->with('success', 'Post created successfully.');
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
    public function edit($projectId, $postId)
    {
        $project = Project::with('user:id,name,avatar')->findOrFail($projectId);
    
        $post = $project->posts()
            ->with('media')
            ->findOrFail($postId);
    
        return Inertia::render('admin/client-project-post-edit', [
            'project' => $project,
            'post' => $post,
            'media' => $post->media,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update()
    {

    }

    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($projectId, $postId)
    {
        $project = Project::findOrFail($projectId);
        $post = $project->posts()->findOrFail($postId);

        // Detach and optionally delete associated media
        foreach ($post->media as $media) {
            // Delete file from storage
            Storage::disk('public')->delete(str_replace('/storage/', '', $media->file_url));
            $media->delete(); // If you want to remove from DB as well
        }

        $post->delete();

        return redirect()->route('client.projects.show', $projectId)
            ->with('success', 'Post deleted successfully.');
    }

}
