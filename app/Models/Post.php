<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';
    protected $fillable = [
        'title', 'slug', 'content', 'category_id', 'image'
    ];

    public $timestamps = true; // Menandakan bahwa model ini menggunakan timestamps

    // Handle image uploads (if necessary)
    public function setImageAttribute($value)
    {
        if (is_string($value)) {
            $this->attributes['image'] = $value;
        } elseif ($value instanceof \Illuminate\Http\UploadedFile) {
            // Handle file upload
            $path = $value->store('images', 'public');
            $this->attributes['image'] = $path;
        }
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
