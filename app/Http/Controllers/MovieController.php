<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class MovieController extends Controller
{
    public function index()
    {
        $users = User::all();
        // foreach ($users as $user) {
        //     echo 'Name: ' . $user->name . ', Role: ' . $user->role . '<br>';
        // }
        // print_r($users);die();
        // die();
        $response = Http::get('https://api.themoviedb.org/3/movie/popular?api_key=5082b43afc8df1d074469f8bf43fbb7b');
        $movieData = $response->json();
    
        return Inertia::render('Movies/Index', [
            'title' => 'Popular Movies',
            'movieData' => $movieData['results']
        ]);
    }
    
}
