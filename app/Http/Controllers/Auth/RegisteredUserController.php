<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    /**
     * Menampilkan halaman register.
     */
    public function create()
    {
        return view('auth.login')->with('form', 'register');
    }

    /**
     * Menyimpan data user baru.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'confirmed', Password::min(8)->mixedCase()->letters()->numbers()],
            ], [
                'name.required' => 'Name is required.',
                'email.required' => 'Email is required.',
                'email.unique' => 'The email has already been taken. Please use a different one.',
                'password.required' => 'Password is required.',
                'password.confirmed' => 'Password confirmation does not match.',
            ]);
    
            User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);
    
            // Redirect with success message
            return redirect()->route('login')
                ->with('form', 'login')
                ->with('register_success', true)
                ->with('success', 'Registration successful! Please log in.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Get the first validation error
            $errors = $e->errors();
            $firstError = reset($errors);
    
            return redirect()->route('register')
                ->with('form', 'register')
                ->withErrors($firstError)
                ->withInput();
        }
    }
    
    
}
