<?php

namespace App\Http\Controllers;

use App\Services\RajaOngkirService;
use Illuminate\Http\Request;

class ShippingController extends Controller
{
    protected $rajaOngkir;

    public function __construct(RajaOngkirService $rajaOngkir)
    {
        $this->rajaOngkir = $rajaOngkir;
    }

    public function checkShippingCost(Request $request)
    {
        $origin = $request->input('origin');
        $destination = $request->input('destination');
        $weight = $request->input('weight');
        $courier = $request->input('courier', 'jne'); 
        $shippingCosts = $this->rajaOngkir->getShippingCost($origin, $destination, $weight, $courier);

        if ($shippingCosts) {
            return response()->json([
                'status' => 'success',
                'data' => $shippingCosts
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to retrieve shipping costs'
            ]);
        }
    }
}
