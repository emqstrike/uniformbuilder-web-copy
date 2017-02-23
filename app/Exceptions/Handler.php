<?php

namespace App\Exceptions;

use Log;
use Mail;
use Exception;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use App\Utilities\ServerUtility;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        \Illuminate\Auth\AuthenticationException::class,
        \Illuminate\Auth\Access\AuthorizationException::class,
        \Symfony\Component\HttpKernel\Exception\HttpException::class,
        \Illuminate\Database\Eloquent\ModelNotFoundException::class,
        \Illuminate\Session\TokenMismatchException::class,
        \Illuminate\Validation\ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        if ($exception instanceof Exception)
        {
            $env = env('APP_ENV');
            $visitor_ip_address = ServerUtility::getIpAddress();
            $content = null;

            if (ExceptionHandler::isHttpException($exception))
            {
                $content .= ExceptionHandler::toIlluminateResponse(ExceptionHandler::renderHttpException($exception), $exception);
            }
            else
            {
                $content .= ExceptionHandler::toIlluminateResponse(ExceptionHandler::convertExceptionToResponse($exception), $exception);
            }

            // Send Error Notification to EMAIL
            Mail::send('errors.oops', compact('content', 'env', 'visitor_ip_address'), function($message) {
                $message->to(config('mail.oops_receiver'), 'QStrike Geeks');
                $message->from(config('mail.oops_sender'), config('app.title'));
                $message->subject('[OOPS!] ' . config('app.title') . ' ' . date('Y-m-d H:i:s'));
            });
        }

        if (method_exists($exception, 'getStatusCode'))
        {
            if ($exception->getStatusCode() == '404')
            {
            return view('errors.404');
            }
        }

        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        return redirect()->guest('login');
    }
}
