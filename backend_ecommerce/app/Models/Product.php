<?php

namespace App\Models;

use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;
    
    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'stock',
        'status',
        'storage_path',
    ];

    private const ALLOWED_SORTS  = [
        'name_asc' => ['name', 'asc'],
        'name_desc' => ['name', 'desc'],
        'price_asc' => ['price', 'asc'],
        'price_desc' => ['price', 'desc'],
    ];

    protected function casts(): array
    {
        return [
            'price' => 'decimal:2',
            'status' => ProductStatus::class,
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function carts(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function scopeSearch(
        Builder $query,
        ?string $search
    ): Builder
    {
        return $query->when(
            $search,
            function (Builder $query, string $search) {
                $query->where('name', 'ILIKE', "%{$search}%");
            }
        );
    }

    public function scopeCategory(
        Builder $query,
        ?int $category
    ): Builder
    {
        return $query->when(
            $category,
            function (Builder $query, int $category) {
                $query->where('category_id', $category);
            }
        );
    }


    public function scopeSortBy(
        Builder $query,
        ?string $sort
    ): Builder
    {
        return $query->when(
            $sort,
            function (Builder $query, string $sort) {
                if (isset(self::ALLOWED_SORTS[$sort])) {
                    [$column, $destination] = self::ALLOWED_SORTS[$sort];
                    $query->orderBy($column, $destination);
                }
            }
        );
    }
}