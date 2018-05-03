<?php
namespace App\Http\Controllers\AdministrationV2;

use \Session;
use \Redirect;
use App\Http\Requests;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\APIClients\PriceItemTemplatesAPIClient as APIClient;

class PriceItemTemplatesController extends Controller
{
    protected $client;

    public function __construct(APIClient $apiClient)
    {
        $this->client = $apiClient;
    }

    public function index()
    {
        $price_item_templates = $this->client->getAll();
        return view('administration-lte-2.price-items.price-templates', [
            'price_item_templates' => $price_item_templates
        ]);
    }

    // public function addForm()
    // {
    //     return view('administration.price-items.price-item-template-create');
    // }

    // public function editForm($id)
    // {
    //     $template = $this->client->getTemplate($id);
    //     return view('administration.price-items.price-item-template-edit', [
    //         'template' => $template
    //     ]);
    // }

    // public function store(Request $request)
    // {
    //     $name = $request->input('name');
    //     $description = $request->input('description');
    //     $size_properties = $request->input('size_props');

    //     if (!empty($request->input('template_id')))
    //     {
    //         $template_id = $request->input('template_id');
    //     }

    //     $data = [
    //         'name' => $name,
    //         'description' => $description,
    //         'properties' => json_decode($size_properties)
    //     ];

    //     $response = null;
    //     if (!empty($template_id))
    //     {
    //         Log::info('Attempts to update Price Item Template');
    //         $data['id'] = $template_id;
    //         $response = $this->client->updateTemplate($data);
    //     }
    //     else
    //     {
    //         Log::info('Attempts to create a new Price Item Template ' . json_encode($data));
    //         $response = $this->client->create($data);
    //     }

    //     if ($response->success)
    //     {
    //         Log::info('Success');
    //         return Redirect::to('administration/price_item_templates')
    //                         ->with('message', $response->message);
    //     }
    //     else
    //     {
    //         Log::info('Failed');
    //         return Redirect::to('administration/price_item_templates')
    //                         ->with('message', 'There was a problem saving your price item template');
    //     }
    // }
}
