<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bed extends Model
{
    use HasFactory;

    protected $fillable = [

        'student_index_number',
        'availability',
        'reserved_for'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
