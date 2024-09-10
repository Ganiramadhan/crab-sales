<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';
    protected $fillable = [
        'title', 'slug', 'content', 'category_id', 'image'
    ];

    public $timestamps = true;

    public function setImageAttribute($value)
    {
        if (is_string($value)) {
            $this->attributes['image'] = $value;
        } elseif ($value instanceof \Illuminate\Http\UploadedFile) {
            $path = $value->store('images', 'public');
            $this->attributes['image'] = $path;
        }
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
