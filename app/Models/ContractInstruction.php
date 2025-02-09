<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContractInstruction extends Model
{
    protected $fillable = [
        'contract_id',
        'text',
    ];
}
