<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fish extends Model
{
    use HasFactory;

    protected $table = 'products_fish';
    protected $fillable = ['id', 'name', 'price_kg', 'stock', 'description', 'image'];
}
