<?php

use App\Http\Controllers\FishController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\IsAdmin;
use Inertia\Inertia;




Route::get('/', function () {
    return Inertia::render('Auth/Login');
});


Route::prefix('fish')->name('fish.')->group(function () {
    Route::get('/', [FishController::class, 'index'])->name('index');
    Route::post('/', [FishController::class, 'store'])->name('store');
    Route::post('{fish}', [FishController::class, 'update'])->name('update');
    Route::delete('{fish}', [FishController::class, 'destroy'])->name('destroy');
});

Route::post('/create-snap-token', [PaymentController::class, 'createTransaction']);



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// User Route
Route::middleware(['auth'])->group(function () {
    Route::get('movies', [MovieController::class, 'index'])->name('movies.index');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

// Admin Route
Route::middleware(['auth', IsAdmin::class])->group(function () {
    
    // Route::get('movies', [MovieController::class, 'index'])->name('movies.index');
        
    Route::get('posts', [PostController::class, 'index'])->name('posts.index');    
    Route::get('posts/{slug}', [PostController::class, 'show'])->name('posts.show');    
    Route::get('posts/create', [PostController::class, 'create'])->name('posts.create');    
    Route::post('posts', [PostController::class, 'store'])->name('posts.store');
    Route::get('posts/{slug}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::post('posts/{slug}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('posts/{slug}', [PostController::class, 'destroy'])->name('posts.destroy');
    // Route::resource('posts', PostController::class);
    


});



require __DIR__.'/auth.php';



