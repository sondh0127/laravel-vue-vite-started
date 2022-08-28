<?php

use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Nette\Utils\Random;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group(function () {

    Route::get('/', function () {
        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
        ]);
    });

    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');

    Route::get('/users', function () {
        return Inertia::render('Users/Index', [
            'time' => now()->toTimeString(),
            'users' => User::query()
                ->when(Request::input('search'), function ($query, $search) {
                    $query->where('name', 'like',  "%{$search}%");
                })
                ->paginate(10)
                ->withQueryString()
                ->through(fn ($user) =>  [
                    'id' => $user->id,
                    'name' => $user->name
                ]),
            'filters' => Request::only(['search'])
        ]);
    });

    Route::post('/users', function () {
        sleep(2);
        $validatedData = Request::validate([
            'name' => ['required', 'max:20'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string', 'min:6'],
        ]);
        $validatedData['stripe_token'] = Random::generate(10);
        User::create($validatedData);

        return redirect('/users');
    });

    Route::get('/users/create', function () {
        return Inertia::render('Users/Create');
    });

    Route::get('/settings', function () {
        return Inertia::render('Settings');
    });

    Route::post('/logout2', function () {
        dd(request('foo'));
    });
});


require __DIR__ . '/auth.php';
