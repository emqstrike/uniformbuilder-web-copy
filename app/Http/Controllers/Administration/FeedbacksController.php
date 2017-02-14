<?php
namespace Customizer\Http\Controllers\Administration;

use \Session;
use \Redirect;
use Customizer\Http\Requests;
use Customizer\Utilities\Log;
use Illuminate\Http\Request;
use Customizer\Utilities\FileUploader;
use Customizer\Utilities\Random;
use Webmozart\Json\JsonDecoder;
use Customizer\Http\Controllers\Controller;
use Customizer\APIClients\FeedbacksAPIClient as APIClient;

class FeedbacksController extends Controller
{
    protected $client;
    protected $categoriesClient;

    public function __construct(
        APIClient $apiClient
    )
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $feedbacks = $this->client->getAll();
        foreach($feedbacks as $feedback)
        {
            $feedback->created_at = date('M-d-Y', strtotime($feedback->created_at));
        }

        return view('administration.feedbacks.feedbacks', [
            'feedbacks' => $feedbacks
        ]);
    }

    public function reply($id)
    {
        $feedback = $this->client->getFeedback($id);
        return view('administration.feedbacks.reply-feedback', [
            'feedback' => $feedback
        ]);
    }

    public function viewThread($id)
    {
        $feedback = $this->client->getFeedback($id);
        // dd($feedback);
        return view('administration.feedbacks.view-feedback-thread', [
            'feedback' => $feedback
        ]);
    }

}