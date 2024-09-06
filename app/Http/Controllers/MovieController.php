<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class MovieController extends Controller
{
    public function index()
    {
        $response = Http::get('https://api.themoviedb.org/3/movie/popular?api_key=5082b43afc8df1d074469f8bf43fbb7b');
        $movieData = $response->json();

        return view('pages.movie', [
            'title' => 'Popular Movies',
            'movieData' => $movieData['results']
        ]);
    }
}
