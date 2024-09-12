<?php

namespace App\Http\Controllers;

use App\Models\Fish;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use Midtrans\Transaction;

class PaymentController extends Controller
{
    public function __construct()
    {
        Config::$serverKey = config('midtrans.server_key');
        Config::$isSanitized = true;
        Config::$is3ds = true;
        Config::$isProduction = config('midtrans.env') === 'production';
    }

    public function createTransaction(Request $request)
{
    $request->validate([
        'order_id' => 'required|string',
        'gross_amount' => 'required|numeric',
        'fish_id' => 'required|integer',
        'price_kg' => 'required|numeric' 
    ]);

    try {
        $fish = Fish::findOrFail($request->input('fish_id'));
        $newStock = $fish->stock - $request->input('price_kg');

        if ($newStock < 0) {
            return response()->json(['error' => 'Insufficient stock'], 400);
        }

        $transaction = Snap::createTransaction([
            'transaction_details' => [
                'order_id' => $request->input('order_id'),
                'gross_amount' => $request->input('gross_amount'),
            ]
        ]);

        // Update stock ikan setelah transaksi berhasil
        $fish->update(['stock' => $newStock]);

        return response()->json(['snap_token' => $transaction->token]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

}
