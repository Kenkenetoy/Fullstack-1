<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'email',
        'password',
        'phone_number',
        'gender',
        'address',
        'birthday',
        'profile_picture',
        'status',
        'user_type',
        'is_archived',
        'slug',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Scope to get approved users
    public function scopeApproved($query)
    {
        return $query->where('approved', true);
    }

    // Scope to get pending users
    public function scopePending($query)
    {
        return $query->where('approved', false);
    }

    public function scopeSearch($query, $term)
    {
        $term = strtolower($term);

        return $query->where(function ($query) use ($term) {
            $query->whereRaw('LOWER(title) LIKE ?', ["%{$term}%"])
                ->orWhereRaw('LOWER(content) LIKE ?', ["%{$term}%"]);
        });
    }

    // User model
    public function student()
    {
        return $this->hasOne(Student::class, 'user_id');
    }

    public function instructor()
    {
        return $this->hasOne(Instructor::class, 'user_id');
    }

    public function staff()
    {
        return $this->hasOne(Staff::class, 'user_id');
    }
}
