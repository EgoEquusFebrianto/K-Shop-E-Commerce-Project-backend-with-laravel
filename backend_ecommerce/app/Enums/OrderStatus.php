<?php

enum OrderStatus: string
{
    case PENDING = 'PENDING';
    case PAID = 'PAID';
    case PROCESSING = 'PROCESSING';
    case SHIPPED = 'SHIPPED';
    case COMPLETED = 'COMPLETED';
    case CANCELLED = 'CANCELLED';
}