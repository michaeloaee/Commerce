<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception $exception
     *
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Exception $exception
     *
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        if ( ! $request->wantsJson()) {
            return parent::render($request, $exception);
        }

        if ($exception instanceof QueryException) {
            return response()->json([
                'Error' => "Query error. Code: [{$exception->getCode()}]",
            ], 400);
        }

        if ($exception instanceof ValidationException) {
            return response()->json([
                'Error' => $exception->getMessage(),
            ], 400);
        }

        if ($exception instanceof ModelNotFoundException ||
            $exception instanceof NotFoundHttpException) {
            return response()->json([
                'Error' => 'Resource not found',
            ], 404);
        }

        return response()->json([
            'Error' => 'Internal Server Error',
        ], 500);
    }
}
