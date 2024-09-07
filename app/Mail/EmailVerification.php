<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EmailVerification extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function build()
    {
        return $this->view('emails.verify')
            ->with([
                'user' => $this->user,  
                'url' => route('verify.email', ['token' => $this->user->verification_token]),
            ])
            ->subject('Verify your email');
    }
    
}
