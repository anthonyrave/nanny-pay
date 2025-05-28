
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
            $table->foreignId('employer_id')->nullable()->constrained(table: 'users');
            $table->foreignId('employee_id')->nullable()->constrained(table: 'users');
            $table->string('child_firstname')->nullable();
            $table->string('child_lastname')->nullable();
            $table->string('employee_email')->nullable();
            $table->string('employee_firstname')->nullable();
            $table->string('employee_lastname')->nullable();
            $table->string('employee_phone_number')->nullable();
            $table->string('working_address_line_1')->nullable();
            $table->string('working_address_line_2')->nullable();
            $table->string('working_postcode')->nullable();
            $table->string('working_city')->nullable();
            $table->enum('type', ['CDI', 'CDD'])->nullable();
            $table->enum('case', ['Cas 1', 'Cas 2'])->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->time('default_working_hours_start')->nullable();
            $table->time('default_working_hours_end')->nullable();
            $table->float('default_working_hours')->nullable();
            $table->string('default_working_days')->nullable();
            $table->float('weekly_working_hours')->nullable();
            $table->float('base_net_hourly_salary')->nullable();
            $table->float('base_raw_hourly_salary')->nullable();
            $table->float('additional_net_hourly_salary')->nullable();
            $table->float('additional_raw_hourly_salary')->nullable();
            $table->float('increased_net_hourly_salary')->nullable();
            $table->float('increased_raw_hourly_salary')->nullable();
            $table->float('base_net_monthly_salary')->nullable();
            $table->float('base_raw_monthly_salary')->nullable();
            $table->float('maintenance_allowance')->nullable();
            $table->float('meal_cost')->nullable();
            $table->float('travel_expenses_per_km')->nullable();
            $table->smallInteger('payment_day')->nullable();
            $table->string('worked_holidays')->nullable();
            $table->timestamps();
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
        Schema::dropIfExists('daily_specific_schedules');
    }
};
