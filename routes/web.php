<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\Contract\ContractController;
use App\Http\Controllers\Contract\ContractPartiesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/pay', function () {
    return Inertia::render('Pay');
})->middleware(['auth', 'verified'])->name('pay');

Route::get('/test', function () {
    return Inertia::render('Test');
})->middleware(['auth', 'verified'])->name('test');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])
        ->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])
        ->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
    Route::patch('/profile/address', [AddressController::class, 'update'])
        ->name('profile.address.update');

    Route::get('/contracts/create', [ContractController::class, 'create'])
        ->name('contracts.create');

    Route::get('/contracts/create/parties', [ContractPartiesController::class, 'create'])
        ->name('contracts.parties.create');
    Route::post('/contracts/create/parties', [ContractPartiesController::class, 'store'])
        ->name('contracts.parties.store');
    Route::get('/contracts/{id}/update/parties', [ContractPartiesController::class, 'update'])
        ->name('contracts.parties.update');

    Route::get('/contracts/create/start-and-place', [ContractPartiesController::class, 'create'])
        ->name('contracts.start-and-place.create');
});

require __DIR__.'/auth.php';
