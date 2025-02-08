<?php

namespace App\Services;

use App\Classes\WorkedHours;
use Illuminate\Support\Carbon;
use Illuminate\Support\Collection;

class Schedule
{
    public static function getDefaultDailyHoursCount(): float
    {
        return 9.75;
    }

    /**
     * @return array<int, float>
     */
    public static function getSpecificDailyHoursCount(): array
    {
        return [
            5 => 9,
        ];
    }

    /**
     * @param  array<int, string>  $workedDays
     * @return array<int, array<int, string>>
     */
    private static function getDatesGroupedByWeeks(array $workedDays): Collection
    {
        return collect($workedDays)
            ->mapToGroups(function ($dateString) {
                $date = Carbon::parse($dateString)->setTimezone('Europe/Paris');

                return [$date->isoWeek => [$date->dayOfWeek => $date->toDateTimeString()]];
            })
            ->map(function ($weekGroup) {
                return $weekGroup->reduce(function ($carry, $dayGroup) {
                    foreach ($dayGroup as $day => $date) {
                        $carry[$day][] = $date; // Ajoute la date sous le bon jour
                    }

                    return $carry;
                }, []);
            });
    }

    /**
     * @param  array<int, string>  $workedDays
     */
    public static function getWorkedHoursCount(array $workedDays): WorkedHours
    {
        $workedHoursCount = 0;
        $workedHoursByWeek = [];

        $groupedByWeek = self::getDatesGroupedByWeeks($workedDays);

        $specificDailyHoursCount = self::getSpecificDailyHoursCount();
        $defaultDailyHoursCount = self::getDefaultDailyHoursCount();

        foreach ($groupedByWeek as $week => $days) {
            $workedHoursByWeek[$week] = 0;

            foreach ($days as $day => $dates) {
                $workedHours = (isset($specificDailyHoursCount[$day]) ? $specificDailyHoursCount[$day] : $defaultDailyHoursCount) * count($dates);
                $workedHoursCount += $workedHours;
                $workedHoursByWeek[$week] += $workedHours;
            }
        }

        return new WorkedHours($workedHoursCount, $workedHoursByWeek);
    }
}
