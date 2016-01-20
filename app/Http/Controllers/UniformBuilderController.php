<?php

namespace App\Http\Controllers;

use Session;
use Redirect;
use App\Utilities\Log;
use Illuminate\Http\Request;
use App\APIClients\ColorsAPIClient;
use App\APIClients\MaterialsAPIClient;
use App\APIClients\UniformDesignSetsAPIClient;
use App\APIClients\OrdersAPIClient;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Utilities\FileUtility;
use App\Utilities\S3Uploader;

use TCPDF;
use File;

class UniformBuilderController extends Controller
{
    protected $materialsClient;
    protected $colorsClient;
    protected $designSetClient;
    protected $ordersClient;

    public function __construct(
        MaterialsAPIClient $materialsClient,
        ColorsAPIClient $colorsClient,
        UniformDesignSetsAPIClient $designSetClient,
        OrdersAPIClient $ordersClient
    )
    {
        $this->materialsClient = $materialsClient;
        $this->colorsClient = $colorsClient;
        $this->designSetClient = $designSetClient;
        $this->ordersClient = $ordersClient;
    }

    public function showBuilder($config = [])
    {

        $designSetId = (isset($config['design_set_id']) && !empty($config['design_set_id']) && !($config['design_set_id'] == 0))
            ? $config['design_set_id']
            : null;
        $materialId = (isset($config['material_id']) && !empty($config['material_id']) && !($config['material_id'] == 0))
            ? $config['material_id']
            : null;

        $accessToken = null;
        $categoryId = 0;
        $material = null;
        $colors = $this->colorsClient->getColors();

        if (is_null($designSetId))
        {
            if (!is_null($materialId))
            {
                $material = $this->materialsClient->getMaterial($materialId);
            }

                if (is_null($material))
                {
                    $material = $this->materialsClient->getMaterials()[0];
                    $materialId = $material->id;

                    if(env('APP_ENV') === 'local') {

                        $materialId = 11;

                    }
                    else {

                        $materialId = 44;                

                    }

            }
            $categoryId = $material->uniform_category_id;
        }
        else
        {
            $design_set = $this->designSetClient->getDesignSet($designSetId);
            $material = $this->materialsClient->getMaterialByCode($design_set->upper_body_uniform);
            $materialId = $material->id;
        }

        $params = [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'colors' => $colors,
            'material' => $material,
            'material_id' => $materialId,
            'category_id' => $categoryId,

        ];

         $params['builder_customizations'] = null;

        $params['order'] = null;
        if (Session::has('order'))
        {
            $order = Session::get('order');
            if (isset($config['order_id']))
            {
                if ($order['order_id'] == $config['order_id'])
                {

                    $params['order'] = $order;
                    $params['builder_customizations'] = json_decode($this->ordersClient->getOrderByOrderId($order['order_id'])->builder_customizations);
                }
                else
                {
                    Session::put('order', null);
                }
            }
        }



        return view('editor.uniform-builder-index', $params);
    }

    /**
     * Show the order in the builder editor
     * @param String $orderId
     */
    public function loadOrder($orderId)
    {
        $order = $this->ordersClient->getOrderByOrderId($orderId);
        Session::put('order', [
            'id' => $order->id,
            'order_id' => $orderId
        ]);
        if (!is_null($order))
        {
            // Check whether the upper body or the lower body has something in it
            $material = $this->materialsClient->getMaterialByCode($order->upper_body_uniform);
            if (is_null($material))
            {
                $material = $this->materialsClient->getMaterialByCode($order->lower_body_uniform);
            }

            if (!is_null($material))
            {
                $config = [
                    'material_id' => $material->id,
                    'order_id' => $orderId
                ];
                return $this->showBuilder($config);
            }
        }
        return redirect('index');
    }

    /**
     * Show the design set in the builder editor
     * @param Integer $designSetId
     * @param Integer $materialId
     */
    public function loadDesignSet($designSetId = null, $materialId = null)
    {
        $config = [
            'design_set_id' => $designSetId,
            'material_id' => $materialId
        ];
        return $this->showBuilder($config);
    }

    private function getS3PathDecodedImage($base64string)
    {
        $path = FileUtility::saveBase64Image($base64string);
        $s3path = S3Uploader::uploadToS3($path);
        return $s3path;
    }

    function getGUID(){

        if (function_exists('com_create_guid')){
            return com_create_guid();
        }else{
            mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45);
            $uuid = substr($charid, 0, 8).$hyphen
                .substr($charid, 8, 4).$hyphen
                .substr($charid,12, 4).$hyphen
                .substr($charid,16, 4).$hyphen
                .substr($charid,20,12); 
            return $uuid;
        }

    }

    function createPDF ($builder_customizations) {

        $pdf = new TCPDF(); 

        $filename = $this->getGUID(); 
        $path = storage_path('app/design_sheets/' . $filename . '.pdf');
        $svg_file = storage_path('originals/spartansxs_2.svg');

        $bc = json_decode($builder_customizations);
        $body_color = $bc->upper->Body->color;
        $body_color_hex = dechex($body_color);

        $style_append = '.cls-1 { fill: #' . $body_color_hex . '}';

        $contents = File::get($svg_file);
        $replaced_contents = str_replace("@@@", $style_append, $contents);

        $pdf->SetTitle('Prolook Design Sheet');
        $pdf->AddPage("L");
        $pdf->Write(0, 'Prolook Design Sheet');

        $pdf->ImageSVG('@' . $replaced_contents, $x=0, $y=0, $w='3909.13', $h='2376.85', $link='http://www.prolook.com', $align='', $palign='', $border=1, $fitonpage=false);
        $pdf->ImageSVG($svg_file, $x=0, $y=0, $w='3909.13', $h='2376.85', $link='http://www.tcpdf.org', $align='', $palign='', $border=1, $fitonpage=true);
        $pdf->Output($path, 'F');

        $body_front = '';
        $body_back = '';

        return $path;

    }

    public function saveOrder(Request $request)
    {

        $fname = $this->createPDF($request->input('builder_customizations'));

        $time_start = microtime(true);
        $perspectives = [
            'upper' => [
                'front' => null,
                'back' => null,
                'left' => null,
                'right' => null
            ],
            'lower' => [
                'front' => null,
                'back' => null,
                'left' => null,
                'right' => null
            ]
        ];
        // Upper Uniform
        // Front
        if ($request->has('upper_front_view'))
        {
            $perspectives['upper']['front'] = $this->getS3PathDecodedImage($request->input('upper_front_view'));
        }
        // Back
        if ($request->has('upper_back_view'))
        {
            $perspectives['upper']['back'] = $this->getS3PathDecodedImage($request->input('upper_back_view'));
        }
        // Left
        if ($request->has('upper_left_view'))
        {
            $perspectives['upper']['left'] = $this->getS3PathDecodedImage($request->input('upper_left_view'));
        }
        // Right
        if ($request->has('upper_right_view'))
        {
            $perspectives['upper']['right'] = $this->getS3PathDecodedImage($request->input('upper_right_view'));
        }

        // Lower Uniform
        // Front
        if ($request->has('lower_front_view'))
        {
            $perspectives['lower']['front'] = $this->getS3PathDecodedImage($request->input('lower_front_view'));
        }
        // Back
        if ($request->has('lower_back_view'))
        {
            $perspectives['lower']['back'] = $this->getS3PathDecodedImage($request->input('lower_back_view'));
        }
        // Left
        if ($request->has('lower_left_view'))
        {
            $perspectives['lower']['left'] = $this->getS3PathDecodedImage($request->input('lower_left_view'));
        }
        // Right
        if ($request->has('lower_right_view'))
        {
            $perspectives['lower']['right'] = $this->getS3PathDecodedImage($request->input('lower_right_view'));
        }

        $data = [
            'status' => 'pending',
            'user_id' => $request->input('user_id'),
            'client' => $request->input('client'),
            'email' => $request->input('email'),
            'upper_body_uniform' => $request->input('upper_body_uniform'),
            'lower_body_uniform' => $request->input('lower_body_uniform'),
            'total_upper_uniforms' => $request->input('total_upper_uniforms'),
            'total_lower_uniforms' => $request->input('total_lower_uniforms'),
            'upper_front_thumbnail_path' => $perspectives['upper']['front'],
            'upper_back_thumbnail_path' => $perspectives['upper']['back'],
            'upper_left_thumbnail_path' => $perspectives['upper']['left'],
            'upper_right_thumbnail_path' => $perspectives['upper']['right'],
            'lower_front_thumbnail_path' => $perspectives['lower']['front'],
            'lower_back_thumbnail_path' => $perspectives['lower']['back'],
            'lower_left_thumbnail_path' => $perspectives['lower']['left'],
            'lower_right_thumbnail_path' => $perspectives['lower']['right'],
            'uniform_type' => $request->input('uniform_type'),
            'builder_customizations' => $request->input('builder_customizations'),
            'athletic_director' => [
                'organization' => $request->input('athletic_director_organization_name'),
                'contact' => $request->input('athletic_director_contact_person'),
                'email' => $request->input('athletic_director_email'),
                'phone' => $request->input('athletic_director_phone'),
                'fax' => $request->input('athletic_director_fax')
            ],
            'billing' => [
                'organization' => $request->input('billing_info_organization_name'),
                'contact' => $request->input('billing_info_contact_person'),
                'email' => $request->input('billing_info_email'),
                'city' => $request->input('billing_info_city'),
                'state' => $request->input('billing_info_state'),
                'zip' => $request->input('billing_info_zip'),
                'phone' => $request->input('billing_info_phone'),
                'fax' => $request->input('billing_info_fax')
            ],
            'shipping' => [
                'organization' => $request->input('shipping_info_organization_name'),
                'contact' => $request->input('shipping_info_contact_person'),
                'address' => $request->input('shipping_info_address'),
                'city' => $request->input('shipping_info_city'),
                'state' => $request->input('shipping_info_state'),
                'zip' => $request->input('shipping_info_zip'),
                'phone' => $request->input('shipping_info_phone')
            ],
            'credit_card' => [
                'number' => $request->input('cc_number'),
                'verification' => $request->input('cc_verification'),
                'card_type' => $request->input('cc_type'),
                'card_holder_name' => $request->input('cc_card_holder_name'),
                'expiration_date' => $request->input('cc_expiration_date')
            ]
        ];

        $time_end = microtime(true);
        $time = $time_end - $time_start;
        Log::info("Finished converting base64 image and uploaded to S3");
        Log::info("It took {$time} seconds\n");

        Log::info('Saving uniform design');
        $response = $this->ordersClient->saveOrder($data);
        if ($response->success)
        {
            Log::info('Success');
            return Redirect::to('/order/' . $response->order->order_id)
                        ->with('message', 'Successfully saved your uniform design');
        }
        else
        {
            Log::info('Failed');
            return Redirect::to('/')
                        ->with('message', 'There was a problem saving your uniform design.');
        }

    }

}
