<?php


namespace App\Http\Controllers;

use App\Models\Fish;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


class FishController extends Controller
{
    public function index() {
        $user = Auth::user();
        $fishProducts = Fish::all();

        return Inertia::render('Fish/Index', [
            'title' => 'Fish Product Marketplace',
            'user' => $user,
            'fishProducts' => $fishProducts
        ]);
    }

    public function store(Request $request) {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price_kg' => 'required|numeric',
            'stock' => 'required|numeric',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048', 
        ]);
    
        if ($request->hasFile('image')) {   
            $imagePath = $request->file('image')->store('fish_images', 'public');
            $validated['image'] = '/storage/' . $imagePath; 
        }
    
        $fish = Fish::create($validated);
    
        return response()->json($fish); 
    }


    public function update(Request $request, Fish $fish)
    {
        // dd($request->all());

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price_kg' => 'required|numeric',
            'stock' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        
        if ($request->hasFile('image')) {   
            $imagePath = $request->file('image')->store('fish_images', 'public');
            $validated['image'] = '/storage/' . $imagePath; 
        }
        
        // Update field lainnya selain image
        $fish->update($validated);
    
        // Return JSON response
        return response()->json($fish);
    }
    


    public function destroy($id)
    {
        $fish = Fish::findOrFail($id);

        if ($fish->image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $fish->image));
        }

        $fish->delete();

        // Return JSON response for Inertia.js to handle UI update
        return response()->json(['success' => true, 'message' => 'Fish deleted successfully']);
    }


    
    
}
