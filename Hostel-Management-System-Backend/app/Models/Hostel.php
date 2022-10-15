<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hostel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',

    ];


    public function rooms()
    {
        return $this->hasMany(Room::class, 'hostel_id');
    }

    public function beds()
    {
        return $this->hasManyThrough(
            Bed::class,
            Room::class,
            'hostel_id', // Foreign key on the rooms table
            'room_id', // Foreign key on the beds table
            'id', // Local key on the hostel table
            'id' // Local key on the rooms table
        );
    }
}
