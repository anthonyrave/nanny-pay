<?php

namespace App\Http\Controllers\Contract;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;

class ContractEmployerController extends Controller
{
    public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if ($request->user()->isDirty('firstname') || $request->user()->isDirty('lastname')) {
            $request->user()->name = $request->user()->firstname.' '.$request->user()->lastname;
        }

        $request->user()->save();
    }
}
