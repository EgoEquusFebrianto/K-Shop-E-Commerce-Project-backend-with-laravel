<?php

namespace App\Enums;

enum ProductStatus: string
{
    case AVAILABLE = 'AVAILABLE';
    case UNAVAILABLE = 'UNAVAILABLE';
}