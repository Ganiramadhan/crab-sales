<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Category; 
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('category')->get();
        $categories = Category::all(); 
        return view('pages.post', [
            'title' => 'All Posts',
            'posts' => $posts,
            'categories' => $categories 
        ]);
    }
    

    public function create()
    {
        $categories = Category::all(); 
        return view('pages.post', ['title' => 'All Posts', 'posts' => Post::all(), 'categories' => $categories]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'image' => 'nullable|image',
        ]);
    
        $data = $request->all();
        $data['slug'] = \Illuminate\Support\Str::slug($request->title);
    
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        }
    
        Post::create($data);
        return redirect()->route('posts.index')->with('success', 'Post created successfully.');
    }
    

    

    public function edit($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        return response()->json($post);
    }

    public function update(Request $request, $slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
    
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|integer|exists:categories,id',
            'image' => 'nullable|image',
        ]);
    
        $data = $request->except(['existing_slug']);
    
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('images', 'public');
        }
    
        $post->update($data);
        return redirect()->route('posts.index')->with('success', 'Post updated successfully.');
    }

    public function destroy($slug)
    {
        $post = Post::where('slug', $slug)->firstOrFail();
        $post->delete();
        return redirect()->route('posts.index')->with('success', 'Post deleted successfully.');
    }
}
