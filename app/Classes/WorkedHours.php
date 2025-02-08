<?php

namespace App\Classes;

class WorkedHours
{
    /**
     * @param  array<string, float>  $weeklyCounts
     */
    public function __construct(
        public readonly float $totalCount,
        public readonly array $weeklyCounts
    ) {}
}
