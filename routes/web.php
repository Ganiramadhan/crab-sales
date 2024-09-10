<?php

use App\Http\Controllers\MovieController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\IsAdmin;
use Inertia\Inertia;




Route::get('/', function () {
    return Inertia::render('Auth/Login');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Rute untuk pengguna biasa (user)
Route::middleware(['auth'])->group(function () {
    Route::get('movies', [MovieController::class, 'index'])->name('movies.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

// Rute untuk admin, dengan middleware 'IsAdmin' yang baru kita buat
Route::middleware(['auth', IsAdmin::class])->group(function () {
    
    Route::get('products', [ProductController::class, 'index'])->name('products.index');
    Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('products', [ProductController::class, 'store'])->name('products.store');
    Route::get('products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::put('products/{product}', [ProductController::class, 'update'])->name('products.update');
    Route::delete('products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

    // Route::get('movies', [MovieController::class, 'index'])->name('movies.index');
    
    
    
    Route::get('posts', [PostController::class, 'index'])->name('posts.index');    
    Route::get('posts/{slug}', [PostController::class, 'show'])->name('posts.show');    
    Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');    
    Route::post('posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('posts/{slug}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::put('posts/{slug}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('posts/{slug}', [PostController::class, 'destroy'])->name('posts.destroy');
    // Route::resource('posts', PostController::class);
    


});



require __DIR__.'/auth.php';



