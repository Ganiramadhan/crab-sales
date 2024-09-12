<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category; 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $categories = Category::all();
        $query = Post::query();

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', '%' . $search . '%')
                    ->orWhere('content', 'like', '%' . $search . '%');
        }

        $posts = $query->get();

        return Inertia::render('Posts/Index', [
            'posts' => $posts,
            'user' => $user,
            'title' => 'Post List',
            'categories' => $categories,
        ]);
    }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return Inertia::render('Posts/Show', [
            'post' => $post,
        ]);
    }

    public function create()
    {
        $categories = Category::all(); 

        return Inertia::render('Posts/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'image' => 'nullable|image',
        ]);
    
        $validatedData['slug'] = \Illuminate\Support\Str::slug($request->title);
    
        if ($request->hasFile('image')) {
            $validatedData['image'] = $request->file('image')->store('images', 'public');
        }
    
        try {
            $post = Post::create($validatedData);
            return response()->json(['success' => true, 'post' => $post], 200);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }
    

    public function edit($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        $categories = Category::all();

        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, $slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        
        $post->title = $request->input('title');
        $post->content = $request->input('content');
        $post->category_id = $request->input('category_id');
        
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $post->image = $path; // Ganti gambar hanya jika ada gambar baru
        }
    
        $post->save();
        
        return response()->json(['success' => true, 'post' => $post]);
    }
    
    
    

    public function destroy($slug)
    {
        $post = Post::where('slug', $slug)->first();

        if ($post) {
            $post->delete();
            return response()->json(['success' => true], 200);
        }

        return response()->json(['success' => false, 'message' => 'Post not found.'], 404);
    }
}
