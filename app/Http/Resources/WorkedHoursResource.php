<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WorkedHoursResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'totalCount' => $this->totalCount,
            'weeklyCounts' => $this->weeklyCounts,
        ];
    }
}
