<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerification;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class EmailVerificationController extends Controller
{
    public function sendVerificationEmail(Request $request)
    {
        $user = User::where('email', $request->input('email'))->first();

        if ($user) {
            $token = Str::random(60);
            $user->verification_token = $token;
            $user->save();

            Mail::to($user->email)->send(new EmailVerification($user));

            return response()->json(['message' => 'Verification email sent.']);
        }

        return response()->json(['message' => 'User not found.'], 404);
    }

    public function verifyEmail(Request $request, $token)
    {
        $user = User::where('verification_token', $token)->first();

        if ($user) {
            $user->email_verified_at = now();
            $user->verification_token = null;
            $user->save();

            return redirect()->route('login')->with('success', 'Email verified. You can now log in.');
        }

        return redirect()->route('login')->with('error', 'Invalid verification token.');
    }
}
