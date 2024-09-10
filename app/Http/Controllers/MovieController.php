<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        $response = Http::get('https://api.themoviedb.org/3/movie/popular?api_key=5082b43afc8df1d074469f8bf43fbb7b');
        $movieData = $response->json();
        
        return Inertia::render('Movies/Index', [
            'title' => 'Popular Movies',
            'user' => $user,
            'movieData' => $movieData['results']
        ]);
    }
    

    
}
