<?php

use App\Http\Controllers\FishController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RajaOngkirController;
use App\Http\Controllers\ShippingController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\IsAdmin;
use Inertia\Inertia;




Route::get('/', function () {
    return Inertia::render('Auth/Login');
});



Route::get('/city', [RajaOngkirController::class, 'city']);
Route::post('/shipping-cost', [ShippingController::class, 'checkShippingCost']);


Route::prefix('fish')->name('fish.')->group(function () {
    Route::get('/', [FishController::class, 'index'])->name('index');
    Route::post('/', [FishController::class, 'store'])->name('store');  
    Route::post('{fish}', [FishController::class, 'update'])->name('update');
    Route::delete('{fish}', [FishController::class, 'destroy'])->name('destroy');
});

// Snap Payment 
Route::post('/create-snap-token', [PaymentController::class, 'createTransaction']);



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// User Route
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

// Admin Route
Route::middleware(['auth', IsAdmin::class])->group(function () {    


});



require __DIR__.'/auth.php';



