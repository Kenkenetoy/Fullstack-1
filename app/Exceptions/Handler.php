<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    public function render($request, Throwable $exception)
    {
        // Check if the request expects a JSON response (API endpoints)
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Something went wrong'], 500);
        }

        // Handle NotFoundHttpException (404)
        if ($exception instanceof NotFoundHttpException) {
            return Inertia::render('Errors/NotFound', [
                'message' => 'The page you are looking for could not be found.',
            ]);
        }

        // Handle general server errors (500)
        return Inertia::render('Errors/ServerError', [
            'message' => 'Sorry, something went wrong on our end.',
        ]);
    }
}
