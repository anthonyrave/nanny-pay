<?php

namespace App\Http\Controllers\Contract;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contract\ContractPartiesCreateRequest;
use App\Models\Contract;

class ContractPartiesController extends Controller
{
    public function store(ContractPartiesCreateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if ($request->user()->isDirty('firstname') || $request->user()->isDirty('lastname')) {
            $request->user()->name = $request->user()->firstname.' '.$request->user()->lastname;
        }

        $request->user()->save();

        $contract = Contract::create([
            'employer_id' => $request->user()->id,
            'employee_firstname' => $request->employee_firstname,
            'employee_lastname' => $request->employee_lastname,
            'employee_email' => $request->employee_email,
            'employee_phone_number' => $request->employee_phone_number,
        ]);
    }
}
