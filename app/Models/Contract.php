<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'employer_id',
        'employee_id',
        'employee_firstname',
        'employee_lastname',
        'employee_email',
        'employee_phone_number',
        'type',
        'case',
        'start_date',
        'end_date',
        'default_working_hours_start',
        'default_working_hours_end',
        'default_working_hours',
        'default_working_days',
        'weekly_working_hours',
        'base_net_hourly_salary',
        'base_raw_hourly_salary',
        'additional_net_hourly_salary',
        'additional_raw_hourly_salary',
        'increased_net_hourly_salary',
        'increased_raw_hourly_salary',
        'base_net_monthly_salary',
        'base_raw_monthly_salary',
        'maintenance_allowance',
        'meal_cost',
        'travel_expenses_per_km',
        'payment_day',
        'worked_holidays',
    ];

    /**
     * @return BelongsTo<User, Contract>
     */
    public function employer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'employer_id');
    }

    /**
     * @return BelongsTo<User, Contract>
     */
    public function employee(): BelongsTo
    {
        return $this->belongsTo(User::class, 'employee_id');
    }

    /**
     * @return HasMany<ContractInstruction, Contract>
     */
    public function instructions(): HasMany
    {
        return $this->hasMany(ContractInstruction::class);
    }
}
