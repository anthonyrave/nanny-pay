<?php

use App\Http\Resources\WorkedHoursResource;
use App\Services\Schedule;
use Illuminate\Support\Facades\Route;

Route::post('/workedHours', function () {
    return new WorkedHoursResource(Schedule::getWorkedHoursCount(request()->get('workedDays')));
});
