<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class AddressController extends Controller
{
    public function update(AddressUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        $request->user()->save();

        return Redirect::route('profile.edit');
    }
}
