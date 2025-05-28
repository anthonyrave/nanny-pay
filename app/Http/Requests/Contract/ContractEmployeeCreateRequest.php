<?php

namespace App\Http\Requests\Contract;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class ContractEmployeeCreateRequest extends FormRequest
{
    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
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
