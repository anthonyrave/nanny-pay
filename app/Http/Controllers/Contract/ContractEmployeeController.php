<?php

namespace App\Http\Controllers\Contract;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contract\ContractEmployeeCreateRequest;
use App\Models\Contract;

class ContractEmployeeController extends Controller
{
    public function store(ContractEmployeeCreateRequest $request)
    {
        $contract = Contract::create([
            'employer_id' => $request->user()->id,
            'employee_firstname' => $request->employee_firstname,
            'employee_lastname' => $request->employee_lastname,
            'employee_email' => $request->employee_email,
            'employee_phone_number' => $request->employee_phone_number,
        ]);
    }
}
