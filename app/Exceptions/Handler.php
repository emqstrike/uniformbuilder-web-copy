<?php

namespace App\Exceptions;

use Log;
use Mail;
use Exception;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        HttpException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $e
     * @return void
     */
    public function report(Exception $e)
    {
        if ($e instanceof Exception)
        {
            $content = "APP_ENV = " . env('APP_ENV') . "\n\n<hr />";

            if (ExceptionHandler::isHttpException($e))
            {
                $content .= ExceptionHandler::toIlluminateResponse(ExceptionHandler::renderHttpException($e), $e);
            }
            else
            {
                $content .= ExceptionHandler::toIlluminateResponse(ExceptionHandler::convertExceptionToResponse($e), $e);
            }

            // Send Error Notification to EMAIL
            Mail::send('errors.oops', compact('content'), function($message) {
                $message->to(config('mail.oops_receiver'), 'QStrike Geeks');
                $message->from(config('mail.oops_sender'), config('app.title'));
                $message->subject('[OOPS!] ' . config('app.title') . ' ' . date('Y-m-d H:i:s'));
            });
        }

        return parent::report($e);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $e
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        return parent::render($request, $e);
    }
}
