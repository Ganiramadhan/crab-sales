<?php

namespace App\Services;

use GuzzleHttp\Client;

class RajaOngkirService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('RAJAONGKIR_API_KEY');
    }

    public function getShippingCost($origin, $destination, $weight, $courier)
    {
        try {
            $response = $this->client->request('POST', 'https://api.rajaongkir.com/starter/cost', [
                'headers' => [
                    'key' => $this->apiKey,
                    'Content-Type' => 'application/x-www-form-urlencoded',
                ],
                'form_params' => [
                    'origin' => $origin,
                    'destination' => $destination,
                    'weight' => $weight,
                    'courier' => $courier,
                ]
            ]);

            $body = json_decode($response->getBody(), true);
            return $body['rajaongkir']['results'][0]['costs'];

        } catch (\Exception $e) {
            return null;
        }
    }
}
