<?php

namespace App\Http\Requests\Contract;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ContractPartiesCreateRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'phone_number' => ['nullable', 'phone:FR'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'employee_firstname' => ['required', 'string', 'max:255'],
            'employee_lastname' => ['required', 'string', 'max:255'],
            'employee_phone_number' => ['required', 'phone:FR', 'max:255'],
            'employee_email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
            ],
        ];
    }
}
