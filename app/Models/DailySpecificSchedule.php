<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailySpecificSchedule extends Model
{
    protected $fillable = [
        'contract_id',
        'week_day',
        'working_hours_start',
        'working_hours_end',
        'working_hours',
    ];
}
