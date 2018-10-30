<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Utilities\FileUploader;
use App\Utilities\Random;
use Webmozart\Json\JsonDecoder;
use App\Http\Controllers\Controller;
use App\APIClients\FeedbacksAPIClient as APIClient;

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

        return view('administration-lte-2.feedbacks.feedbacks', [
            'feedbacks' => $feedbacks
        ]);
    }

    public function reply($id)
    {
        $feedback = $this->client->getFeedback($id);
        return view('administration-lte-2.feedbacks.reply-feedback', [
            'feedback' => $feedback
        ]);
    }

    public function viewThread($id)
    {
        $feedback = $this->client->getFeedback($id);
        return view('administration-lte-2.feedbacks.view-feedback-thread', [
            'feedback' => $feedback
        ]);
    }

}
