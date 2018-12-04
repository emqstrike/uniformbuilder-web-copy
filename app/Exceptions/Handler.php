<?php

namespace App\Exceptions;

use Log;
use Mail;
use Exception;
use Symfony\Component\HttpKernel\Exception\HttpException;
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
        // if ($e instanceof Exception)
        // {
        //     $env = env('APP_ENV');
        //     $visitor_ip_address = ServerUtility::getIpAddress();
        //     $content = null;

        //     if (ExceptionHandler::isHttpException($e))
        //     {
        //         $content .= ExceptionHandler::toIlluminateResponse(ExceptionHandler::renderHttpException($e), $e);
        //     }
        //     else
        //     {
        //         $content .= ExceptionHandler::toIlluminateResponse(ExceptionHandler::convertExceptionToResponse($e), $e);
        //     }

        //     // Send Error Notification to EMAIL
        //     Mail::send('errors.oops', compact('content', 'env', 'visitor_ip_address'), function($message) {
        //         $message->to(config('mail.oops_receiver'), 'QStrike Geeks');
        //         $message->from(config('mail.oops_sender'), config('app.title'));
        //         $message->subject('[OOPS!] ' . config('app.title') . ' ' . date('Y-m-d H:i:s'));
        //     });
        // }

	if (method_exists($e, 'getStatusCode'))
	{
	        if ($e->getStatusCode() == '404')
	        {
			return view('errors.404');
	        }
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
        if (app()->environment() === 'testing') throw $e;

        return parent::render($request, $e);
    }
}
