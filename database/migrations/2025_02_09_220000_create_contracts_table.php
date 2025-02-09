
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_id')->constrained(table: 'users');
            $table->foreignId('employee_id')->constrained(table: 'users');
            $table->enum('type', ['CDI', 'CDD']);
            $table->enum('case', ['Cas 1', 'Cas 2']);
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->time('default_working_hours_start');
            $table->time('default_working_hours_end');
            $table->float('default_working_hours');
            $table->string('default_working_days');
            $table->float('weekly_working_hours');
            $table->float('base_net_hourly_salary')->nullable();
            $table->float('base_raw_hourly_salary')->nullable();
            $table->float('additional_net_hourly_salary')->nullable();
            $table->float('additional_raw_hourly_salary')->nullable();
            $table->float('increased_net_hourly_salary')->nullable();
            $table->float('increased_raw_hourly_salary')->nullable();
            $table->float('base_net_monthly_salary')->nullable();
            $table->float('base_raw_monthly_salary')->nullable();
            $table->float('maintenance_allowance');
            $table->float('meal_cost')->nullable();
            $table->float('travel_expenses_per_km')->nullable();
            $table->smallInteger('payment_day')->nullable();
            $table->string('worked_holidays')->nullable();
        });

        Schema::create('contract_instructions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contract_id')->constrained();
            $table->text('text')->nullable();
        });

        Schema::create('daily_specific_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contract_id')->constrained();
            $table->tinyInteger('week_day');
            $table->time('working_hours_start');
            $table->time('working_hours_end');
            $table->float('working_hours');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
        Schema::dropIfExists('contract_instructions');
    }
};
