<?php

namespace App\Http\Controllers\Contract;

use App\Http\Controllers\Controller;
use App\Http\Requests\Contract\ContractPartiesCreateRequest;
use App\Models\Contract;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContractPartiesController extends Controller
{
    public function create(Request $request): Response
    {
        $creationSteps = config('contract.creation-steps');

        $currentStepIndex = array_search($request->route()->getName(), $creationSteps);

        return Inertia::render(
            'Contract/Parties/Create',
            $this->getProps($request)
        );
    }

    public function update(Contract $contract, Request $request): Response
    {
        return Inertia::render(
            'Contract/Parties/Update',
            array_merge(
                $this->getProps($request),
                ['contract' => $contract]
            )
        );

    }

    public function store(ContractPartiesCreateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        if (
            $request->user()->isDirty('firstname') ||
            $request->user()->isDirty('lastname')
        ) {
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

        return redirect()
            ->route(
                'contracts.start-and-place.create',
                ['contract' => $contract]
            );
    }

    private function getProps(Request $request): array
    {
        $creationSteps = config('contract.creation-steps');

        $currentStepIndex = array_search($request->route()->getName(), $creationSteps);

        return [
            'stepIndex' => $currentStepIndex + 1,
            'stepCount' => count($creationSteps),
            'prevStep' => $creationSteps[$currentStepIndex - 1] ?? null,
        ];
    }
}
