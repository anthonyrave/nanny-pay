<?php

namespace App\Http\Controllers\Contract;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContractController extends Controller
{
    public function create(Request $request): Response
    {
        return Inertia::render('Contract/Create');
    }
}
