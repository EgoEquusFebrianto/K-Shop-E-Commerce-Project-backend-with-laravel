<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'role_id' => $this->role_id,
            'fullname'=> $this->fullname,
            'email' => $this->email,
            'phone' => $this->phone,
            'status' => $this->status,
            'avatar' => url(Storage::url($this->avatar)),
        ];
    }
}