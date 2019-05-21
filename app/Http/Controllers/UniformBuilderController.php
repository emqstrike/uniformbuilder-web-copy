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
use App\APIClients\UsersAPIClient;
use App\APIClients\SavedDesignsAPIClient;
use App\APIClients\InksoftDesignsAPIClient;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Utilities\FileUtility;
use App\Utilities\S3Uploader;
use App\Utilities\FileUploaderV2;
use App\Utilities\Random;
use TCPDF;
use File;
use Slack;
use Storage;
use App\Utilities\StringUtility;
use App\Traits\OwnsUniformDesign;
use App\Traits\HandleTeamStoreConfiguration;
use App\TeamStoreClient\UserTeamStoreClient;

class UniformBuilderController extends Controller
{
    use OwnsUniformDesign;
    use HandleTeamStoreConfiguration;

    protected $materialsClient;
    protected $colorsClient;
    protected $designSetClient;
    protected $ordersClient;
    protected $savedDesignsClient;
    protected $usersAPIClient;
    protected $inksoftDesignsAPIClient;

    public function __construct(
        MaterialsAPIClient $materialsClient,
        ColorsAPIClient $colorsClient,
        UniformDesignSetsAPIClient $designSetClient,
        OrdersAPIClient $ordersClient,
        SavedDesignsAPIClient $savedDesignsClient,
        UsersAPIClient $usersAPIClient,
        InksoftDesignsAPIClient $inksoftDesignsAPIClient
    )
    {
        $this->materialsClient = $materialsClient;
        $this->colorsClient = $colorsClient;
        $this->designSetClient = $designSetClient;
        $this->ordersClient = $ordersClient;
        $this->savedDesignsClient = $savedDesignsClient;
        $this->usersAPIClient = $usersAPIClient;
        $this->inksoftDesignsAPIClient = $inksoftDesignsAPIClient;
    }

    function log_info($msg_str) {

        $run = true;
        if ($run) { Log::info($msg_str); }

    }

    public function downBuilder()
    {
        $asset_storage = env('ASSET_STORAGE');
        $asset_version = env('ASSET_VERSION');
        return view('uniform-builder-down', ['asset_storage' => $asset_storage, 'asset_version' => $asset_version]);
    }

    public function showBuilder($config = [])
    {
        $designSetId = (isset($config['design_set_id']) && !empty($config['design_set_id']) && !($config['design_set_id'] == 0))
            ? $config['design_set_id']
            : null;
        $materialId = (isset($config['material_id']) && !empty($config['material_id']) && !($config['material_id'] == 0))
            ? $config['material_id']
            : null;
        $productId = (isset($config['product_id']) && !empty($config['product_id']) && !($config['product_id'] == 0))
            ? $config['product_id']
            : null;

        $render = (isset($config['render'])) ? $config['render'] : false;

        $accessToken = null;
        $categoryId = 0;
        $material = null;

        $colors = $this->colorsClient->getColors();

        if (is_null($designSetId))
        {
            if (!is_null($materialId))
            {
                // To do: Pull material data from memory
                $material = $this->materialsClient->getMaterial($materialId);
            }

            if (is_null($material))
            {

                $materialId = -1;

            } else {

                $categoryId = $material->uniform_category_id;

            }

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
            'render' => $render
        ];
        if (!is_null($productId))
        {
            $params['product_id'] = $productId;
        }

        if (!Session::get('userHasTeamStoreAccount'))
        {
            $encoded_data = $this->getTeamStoreRegistrationParams();
            if (!is_null($encoded_data))
            {
                $credentials = $this->retrieveCredentials($encoded_data);

                $client = new UserTeamStoreClient;
                $email = Session::get('email');
                $response = $client->team_store_login($email, $credentials);
                $this->handleTeamStoreLogin(
                    $response,
                    null,
                    Session::get('accessToken'),
                    $credentials
                );
            }
        }

        // Handle Team Store configuration
        $this->handleConfiguration($params, $config);

        $params['builder_customizations'] = null;
        $params['order'] = null;

        ///

        if (isset($config['builder_customizations'])) {

            $pageType = Session::get("page-type");
            $params['type'] = $config['type'];

            if ($pageType['page'] === "saved-design")
            {
                $design = Session::get('design');
                Session::put('order', null);

                $params['saved_design_user_id'] = $config['saved_design_user_id'];

                $params['saved_design_name'] = $config['saved_design_name'];
                $params['page'] = 'saved-design';
                $bc = $config['builder_customizations'];
                $params['saved_design_id'] = $config['id'];
                $params['material_id'] = $config['material_id'];
                $params['builder_customizations'] = $config['builder_customizations'];
                $params['saved_design_name'] = $config['saved_design_name'];

                 // Notify Slack
                $data = '';
                if(!is_null(Session::get('accessToken')) && !is_null(Session::get('userId'))) {
                    $active_user_id = Session::get('userId');
                    $active_user_name = Session::get('fullname');
                    $created_by_user_id = $config['saved_design_user_id'];
                    $result['user'] = $this->usersAPIClient->getUser($created_by_user_id);
                    $created_by_user = $result['user'];
                    $created_by_user_name = $created_by_user->first_name . ' ' . $created_by_user->last_name;
                } else {
                    $active_user_id = 1196;
                    $active_user_name = 'Guest Account';
                    $created_by_user_id = $config['saved_design_user_id'];
                    $created_by_user_name = 'User';
                }

                $title = "User ".$active_user_name." [".$active_user_id."] viewed saved design [".$params['saved_design_name']."].";
                $link = "http://customizer.prolook.com/my-saved-design/".$params['saved_design_id'].".";
                $created_by_user_link = "http://customizer.prolook.com/administration/user/orders/".$created_by_user_id;
                $low_res_front = $config['low_res_front'];
                $low_res_back = $config['low_res_back'];
                $low_res_left = $config['low_res_left'];
                $low_res_right = $config['low_res_right'];

                $fields = [
                    [
                        'title' => "Name:",
                        'value' => $params['saved_design_name'],
                        'short' => true
                    ],
                    [
                        'title' => "Viewed By:",
                        'value' => $active_user_name." [".$active_user_id."].",
                        'short' => true
                    ],
                    [
                        'title' => "Created By:",
                        'value' => "$created_by_user_link",
                        'short' => false
                    ],

                    [
                        'title' => "Link:",
                        'value' => "$link",
                        'short' => false
                    ],
                    [
                        'title' => "Front Thumbnail link:",
                        'value' => "$low_res_front",
                        'short' => false
                    ],
                    [
                        'title' => "Back Thumbnail link:",
                        'value' => "$low_res_back",
                        'short' => false
                    ],
                    [
                        'title' => "Right Thumbnail link:",
                        'value' => "$low_res_left",
                        'short' => false
                    ],
                    [
                        'title' => "Left Thumbnail link:",
                        'value' => "$low_res_right",
                        'short' => false
                    ]
                ];

                Slack::to('#a-views')->attach([
                                                'fallback' => $title,
                                                'color'=> 'good',
                                                'title' => $title,
                                                'image_url' => $low_res_front,
                                                'fields' => $fields
                                                ])->send($data);

            } elseif ($pageType['page'] === "order") {

                $order = Session::get('order');
                Session::put('design', null);

                if ($order['order_id'] == $config['order_id'])
                {

                    $params['page'] = 'order';
                    $bc = $config['builder_customizations'];
                    $params['order_id'] = $config['order_id_short'];
                    $params['order_code'] = $config['order_code'];
                    $params['order'] = $order;

                    $params['builder_customizations'] = $config['builder_customizations'];

                } else {

                    Session::put('order', null);

                }

            }

            if ($config['type'] == 'Order') {

                $params['order_code']    = $config['order_code'];
                $params['order_id_short'] = $config['order_id_short'];
                $params['order_id_parent'] = $config['order_id_parent'];

            }

        }

        if (isset($config['type']) && $config['type'] === 'Saved Design' && isset($config['created_at'])) {
            $params['created_at'] = $config['created_at'];
        }

        if (isset($config['styles'])) {

            $params['styles'] = $config['styles'];
            $params['sport'] = $config['sport'];
            $params['gender'] = $config['gender'];
            $params['isFromHSEL'] = isset($config['hsel']) ? true : false;

        }

        return view('editor.uniform-builder-index', $params);

    }

    /**
     * Show the order item in the builder editor
     * @param String $orderItemId
     */
    public function loadOrderItem($orderId, $orderItemId)
    {

        $order = $this->ordersClient->getOrderByOrderId($orderId);

        Session::put('order', [
            'id' => $order->id,
            'order_id' => $orderId,
            'order_item_id' => $orderItemId,
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
                    'order_id' => $orderId,
                    'type' => 'Order Item',
                ];
                return $this->showBuilder($config);
            }
        }
        return redirect('index');
    }

    /**
     * View order details / status
     * @param String $orderId
     */

    public function viewOrder($orderId)
    {

        $order = $this->ordersClient->getOrderItems($orderId);
        $orderInfo = $this->ordersClient->getOrderByOrderId($orderId);
        $orderDetails = $this->ordersClient->getOrderItems($orderId);

        if( isset($order[0]) ) {

            $order = $order[0];
            $orderID = $order->order_id;
            $builder_customizations = json_decode($order->builder_customizations);

            if (isset($builder_customizations->upper->material_id)) {
                $materialID = $builder_customizations->upper->material_id;
            } else {
                $materialID = $builder_customizations->lower->material_id;
            }

            //$material = $this->materialsClient->getMaterial($materialID);

            Session::put('page-type', [
                'page' => 'view-order-info',
            ]);

            Session::put('order', [
                'id' => $order->id,
                'order_id' => $orderID,
                'material_id' => $materialID,
            ]);

            $params = [

                'page_title' => 'Order Info: ' . $orderId,
                'material_id' => $materialID,
                'order_id' => $orderId,
                'description' => $order->description,
                'order_code' => $orderId,
                'order_id_short' => $order->id,
                'order_id_parent' => $orderInfo->id,

                'type' => 'Order',
                'pdfOrderForm' => $builder_customizations->pdfOrderForm,

                'page_title' => env('APP_TITLE'),
                'app_title' => env('APP_TITLE'),
                'asset_version' => env('ASSET_VERSION'),
                'asset_storage' => env('ASSET_STORAGE'),
                'material_id' => -1,
                'category_id' => -1,
                'builder_customizations' => null,
                'page' => 'view-order-info',
                'type' => 'view-order-info',

            ];

            return view('editor.view-order-info', $params);

        }

        return redirect('index');

    }

    /**
     * Show the order in the builder editor
     * @param String $orderId
     */

    public function loadOrder($orderId)
    {

        $order = $this->ordersClient->getOrderItems($orderId);
        $orderInfo = $this->ordersClient->getOrderByOrderId($orderId);
        $orderDetails = $this->ordersClient->getOrderItems($orderId);

        if( isset($order[0]) ) {

            $order = $order[0];
            $orderID = $order->order_id;
            $builder_customizations = json_decode($order->builder_customizations);

            if (isset($builder_customizations->upper->material_id)) {
                $materialID = $builder_customizations->upper->material_id;
            } else {
                $materialID = $builder_customizations->lower->material_id;
            }

            //$material = $this->materialsClient->getMaterial($materialID);

            Session::put('page-type', [
                'page' => 'order',
            ]);

            Session::put('order', [
                'id' => $order->id,
                'order_id' => $orderID,
                'material_id' => $materialID,
            ]);

            $config = [
                'material_id' => $materialID,
                'order_id' => $orderId,
                'order_code' => $orderId,
                'order_id_short' => $order->id,
                'builder_customizations' => $orderID,
                'type' => 'Order',
                'order_id_parent' => $orderInfo->id,
            ];

            return $this->showBuilder($config);

        }

        return redirect('index');

    }

    /**
     * Show the design set in the builder editor
     * @param Integer $designSetId
     * @param Integer $materialId
     * @param String $store_code
     * @param String $team_name
     * @param String $team_colors
     * @param String $jersey_name
     * @param String $jersey_number
     * @param Integer $mascot_id
     * @param Boolean $save_rendered
     * @param Integer $save_rendered_timeout
     * @param Integer $product_id
     */

    public function loadDesignSet(
        $designSetId = null,
        $materialId = null,
        $store_code = null,
        $team_name = null,
        $team_colors = null,
        $jersey_name = null,
        $jersey_number = null,
        $mascot_id = null,
        $save_rendered = false,
        $save_rendered_timeout = 10,
        $product_id = null
    )
    {
        $config = [
            'design_set_id' => $designSetId,
            'material_id' => $materialId,
            'type' => 'Design Set',
        ];

        $this->injectParameters($config,
            $store_code,
            $team_name,
            $team_colors,
            $jersey_name,
            $jersey_number,
            $mascot_id,
            $save_rendered,
            $save_rendered_timeout,
            $product_id
        );

        return $this->showBuilder($config);

    }

    public function styles($gender = null, $sport = null, $org = null)
    {
        $config = [
            'styles' => true,
            'sport' => $sport,
            'gender' => $gender,
        ];

        // For HSEL
        if (!is_null($org)) {
            if ($org === "HSEL") {
                $config['hsel'] = true;
            } else {
                abort(404);
            }
        }

        return $this->showBuilder($config);
    }

    public function loadDesignSetRender(Request $request, $designSetId = null, $materialId = null)
    {
        $config = [
            'design_set_id' => $designSetId,
            'material_id' => $materialId,
            'type' => 'Design Set',
            'render' => true
        ];

        return $this->showBuilder($config);

    }

    public function load_material(
        Request $request,
        $material_id,
        $store_code = null,
        $team_name = null,
        $team_colors = null,
        $jersey_name = null,
        $jersey_number = null,
        $mascot_id = null,
        $save_rendered = false,
        $save_rendered_timeout = 10,
        $product_id = null
    )
    {
        $config = [
            'design_set_id' => 0,
            'material_id' => $material_id,
            'render' => true
        ];
        $this->injectParameters($config,
            $store_code,
            $team_name,
            $team_colors,
            $jersey_name,
            $jersey_number,
            $mascot_id,
            $save_rendered,
            $save_rendered_timeout,
            $product_id
        );
        return $this->showBuilder($config);
    }

    protected function injectParameters(
        &$config,
        $store_code = null,
        $team_name = 'PROLOOK',
        $team_colors = null,
        $jersey_name = 'ABRAHAM',
        $jersey_number = '70',
        $mascot_id = null,
        $save_rendered = false,
        $save_rendered_timeout = 10,
        $product_id = null
    )
    {
        if (!is_null($store_code))
        {
            $config['store_code'] = $store_code;
        }
        if (!is_null($team_name))
        {
            // Use default team_name when 'DEFAULT' is passed
            if ($team_name !== 'DEFAULT')
            {
                $config['team_name'] = $team_name;
            }
            $config['team_name'] = $team_name;
        }
        if (!is_null($team_colors))
        {
            // Use default colors when 'DEFAULT' is passed
            if ($team_colors !== 'DEFAULT')
            {
                $config['team_colors'] = $team_colors;
            }
        }
        if (!is_null($store_code))
        {
            $config['store_code'] = $store_code;
        }
        if (!is_null($jersey_name))
        {
            // Use default jersey_name when 'DEFAULT' is passed
            if ($jersey_name !== 'DEFAULT')
            {
                $config['jersey_name'] = $jersey_name;
            }
            $config['jersey_name'] = $jersey_name;
        }
        if (!is_null($jersey_number))
        {
            // Use default jersey_number when 'DEFAULT' is passed
            if ($jersey_number !== 'DEFAULT')
            {
                $config['jersey_number'] = $jersey_number;
            }
            $config['jersey_number'] = $jersey_number;
        }
        if (!is_null($mascot_id))
        {
            // Use default mascot_id when 'DEFAULT' is passed
            if ($mascot_id !== 'DEFAULT')
            {
                $config['mascot_id'] = $mascot_id;
            }
            $config['mascot_id'] = $mascot_id;
        }
        if (!is_null($save_rendered))
        {
            $config['save_rendered'] = $save_rendered;
        }
        if (!is_null($save_rendered_timeout))
        {
            $config['save_rendered_timeout'] = $save_rendered_timeout;
        }
        if (!is_null($product_id))
        {
            $config['product_id'] = $product_id;
        }
    }

    public function fileUpload(Request $request) {

        $data = [];
        $folder_name = "uploaded_files";

        try {

            $newFile = $request->file('file');

            if (isset($newFile))
            {

                if ($newFile->isValid())
                {
                    $randstr = Random::randomize(12);
                    $data['file_path'] = FileUploaderV2::upload(
                                                    $newFile,
                                                    $randstr,
                                                    'file',
                                                    $folder_name
                                                );
                }
            }

            return [
                'success' => true,
                'message' => 'File Uploaded',
                'filename' => $data['file_path'],
            ];

        }
        catch (S3Exception $e)
        {

            $message = $e->getMessage();

            return [
                'success' => false,
                'message' => $message,
                'filename' => $data['file_path'],
            ];
            // return Redirect::to('/administration/test/create')
            //                 ->with('message', 'There was a problem uploading your files');
        }


    }

    public function saveLogo(Request $request){

        $r = $request->all();
        $dataUrl = $r['dataUrl'];

        $fname = $this->getS3PathDecodedImage($dataUrl);
        return response()->json([ 'success' => true, 'filename' => $fname ]);

    }

    public function saveImageResized(Request $request){

        $r = $request->all();
        $dataUrl = $r['dataUrl'];
        // $height = $r['height'];
        // $width = $r['width'];
        $height = 420;
        $width = 388;

        $fname = $this->getS3PathDecodedImageResized($dataUrl, $width, $height);
        return response()->json([ 'success' => true, 'filename' => $fname ]);

    }

    private function getS3PathDecodedImage($base64string)
    {
        $path = FileUtility::saveBase64Image($base64string);
        $s3path = S3Uploader::uploadToS3($path);
        return $s3path;
    }

    private function getS3PathDecodedImageResized($base64string, $width, $height)
    {
        $path = FileUtility::saveBase64ImageResized($base64string, $width, $height);
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

    function toTitleCase ($str) {

        $output = strtoupper(str_replace("_"," ",$str));
        return $output;

    }

    function generatePipingsTable ($pipings, $uniform_category) {

        $this->log_info('generatePipingsTable');

        $html = '';
        $html .= '<br /><br />';
        $html .= '<h3>PIPINGS</h3>';
        $html .= '<table border="1" cellpadding="3">';

        $html .= '<tr>';
        $html .=   '<td align="center">';
        $html .=   '<strong>TYPE</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>Size</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>Number of Colors</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>Colors</strong>';
        $html .=   '</td>';
        $html .= '</tr>';

        $ctrPipings = 0;

        foreach ($pipings as $key => &$piping)
        {
            $pipingType = $key;

            if ($piping["enabled"] == "0") { continue; }

            $ctrPipings += 1;
            $bgcolor = '#fff';

            if ($ctrPipings % 2 !== 0) {
                $bgcolor = '#e7e7e7';
            }

            $html .= '<tr bgcolor="' . $bgcolor . '">';
            $html .=   '<td align="center">';
            $html .=   $pipingType;
            $html .=   '</td>';

            $html .=   '<td align="center">';
            if (isset($piping['size']))
            {
                $html .=   $piping['size'];
            }
            $html .=   '</td>';

            $html .=   '<td align="center">';
            if (isset($piping['numberOfColors']))
            {
                $html .=   $piping['numberOfColors'];
            }
            $html .=   '</td>';

            $html .=   '<td align="center">';

            $colors = '';
            $val = 1;
            $noOfColors = intval($piping['numberOfColors']);
            if (isset($piping['layers']))
            {
                foreach ($piping['layers'] as &$color)
                {
                    if ($val > $noOfColors) { continue; }
                    $colors .= $color['colorCode'] . ",";
                    $val++;

                }
            }

            $colorsTrimmed = rtrim($colors, ",");

            $html .= $colorsTrimmed;
            $html .=   '</td>';

            $html .= '</tr>';

        }

        $html .= '</table>';

        return $html;

    }

    function generateApplicationsTable ($applications, $uniform_category, $uat) {

        $this->log_info('generateApplicationsTable');

        $html = '';
        $html .= '<br /><br />';
        $html .= '<h3>APPLICATIONS</h3>';
        $html .= '<table border="1" cellpadding="3">';

        $html .= '<tr>';
        $html .=   '<td align="center" width="5%">';
        $html .=   '<strong>#</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>APPLICATION TYPE</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>FONT or MASCOT Detail</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>SIZE</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center" width="35%">';
        $html .=   '<strong>COLORS / PATTERNS</strong>';
        $html .=   '</td>';

        $html .= '</tr>';

        $ctrApplications = 0;

        foreach ($applications as &$application) {

            $appType = strtoupper(str_replace("_"," ",$application['application_type']));
            $appTypeCaption = $appType;

            // Skip free / unused applications
            if ($appType == "FREE") { continue; }
            if ($appType == "EMBELLISHMENTS") { $appTypeCaption = "CUSTOM MASCOT"; }



            // Skip applications that are turned off
            if (isset($application['status']) and $application['status'] === "off") { continue; }

            $this->log_info('---' . $application['code'] . ' ' . $appType);

            $ctrApplications += 1;
            $bgcolor = '#fff';

            if ($ctrApplications % 2 !== 0) {
                $bgcolor = '#e7e7e7';
            }

            $html .= '<tr bgcolor="' . $bgcolor . '">';
            $html .=   '<td align="center">';
            $html .=   $application['code'];
            $html .=   '</td>';

            $html .=   '<td align="center">';
            $html .=   $appTypeCaption;
            $html .=   '</td>';

            if ($appType == "TEAM NAME" or $appType == "PLAYER NAME" or $appType == "SHOULDER NUMBER" or $appType == "SLEEVE NUMBER" or $appType == "FRONT NUMBER" or $appType == "BACK NUMBER" ) {

                $html .=   '<td align="center">';
                $html .=   'Accent: ' . $application['accent_obj']['title'] . "<br />";
                $html .=   'Font: ' . $application['font_obj']['alias'] . "<br />";
                $html .=   'Text: ' . strtoupper($application['text']) . "<br />";

                if (isset($application['pattern_obj'])) {

                    if ($application['pattern_obj']['name'] !== "Blank") {

                        $html .= "Pattern: " . $application['pattern_obj']['name'] . "<br />";

                    }

                }

                $html .=   '</td>';

            } else if ($appType == "MASCOT" ) {

                $html .=   '<td align="center">';
                $html .=   'Stock Mascot Name: ' . $application['mascot']['name'] . "<br />";

                if (isset($application['alpha'])) {
                    $html .= 'Watermark Intensity: ' . ($application['alpha'] * 100) . "% <br />";
                } else {
                    $html .= 'Watermark Intensity: 100% <br />';
                }

                if ($application['mascot']['name'] == 'Custom Logo') {

                    // $html .=   '<a href="' . $application['customFilename'] . '" target="_new">Link To Uploaded File</a> <br />';

                    $userfile_name = $application['customFilename'];
                    $userfile_extn = substr($userfile_name, strrpos($userfile_name, '.')+1);

                    if ($userfile_extn === 'png' or $userfile_extn === 'gif' or $userfile_extn === 'jpg' or $userfile_extn === 'jpeg' or $userfile_extn === 'bmp') {

                        $html .=   '<img width="50" height="50"  src="' . $application['customFilename'] . '">';

                    }

                    $html .= "<br />" . $application['additionalNotes'] . "<br />";

                } else {

                    $html .=   '<img width="50" height="50"  src="' . $application['mascot']['icon'] . '">';
                    // $html .=   '<a href="' . $application['mascot']['ai_file'] . '" target="_new">Link To Mascot PDF File</a> <br />';

                }

                $html .=   '</td>';

            } else if ($appType == "EMBELLISHMENTS" ) {

                $embellishment = $application['embellishment'];

                $html .=   '<td align="center">';
                $html .=   'Custom Mascot Name: ' . $embellishment['name'] . "<br />";

                if (isset($application['alpha'])) {
                   $html .=   'Watermark Intensity: ' . ($application['alpha'] * 100) . "% <br />";
                } else {
                   $html .=   'Watermark Intensity: 100% <br />';
                }

                $html .=   '<img width="50" height="50"  src="' . $embellishment['thumbnail'] . '">';
//                $html .=   '<a href="' . $embellishment['svg_filename'] . '" target="_blank">Link To Prepared File</a> <br />';
//                $html .=   '<a href="http://' . env('WEBSITE_URL') . '/utilities/previewEmbellishmentInfo/' . $embellishment['design_id'] . '" target="_new">View Detailed Info</a> <br />';

                $html .=   '</td>';
            }

             else {
                $html .=   '<td align="center">';
                $html .=   '<strong></strong>';
                $html .=   '</td>';
            }

            if ($appType == "TEAM NAME" or $appType == "PLAYER NAME" or $appType == "SHOULDER NUMBER" or $appType == "SLEEVE NUMBER" or $appType == "FRONT NUMBER" or $appType == "BACK NUMBER" or ($appType == "EMBELLISHMENTS" and $uat == "Tackle Twill")) {

                $html .=   '<td align="center">';

                // Applications greater than 70 are free-form tool applications, best fit for GA's
                if (intval($application['code']) > 70) {

                    $html .=   'Refer to Thumbnail<br />';

                } else {

                    if (isset($application['font_size'])) {
                        $html .=   $application['font_size'] . '" <br />';
                    } elseif (isset($application['size'])) {
                        $html .=   $application['size'] . '" <br />';
                    }

                }

                $html .=   '</td>';

            } else if ($appType == "MASCOT" ) {

                $html .=   '<td align="center">';

                // Applications greater than 70 are free-form tool applications, best fit for GA's
                if (intval($application['code']) > 70 ) {

                    $html .=   'Refer to Thumbnail<br />';

                } else {

                    if (isset($application['size'])) {
                        $html .=   $application['size'] . '" <br />';
                    } elseif (isset($application['font_size'])) {
                        $html .=   $application['font_size'] . '" <br />';
                    }

                }

                $html .=   '</td>';

            } else if ($appType == "EMBELLISHMENTS" ) {

             $html .=   '<td align="center">';

                // Applications greater than 70 are free-form tool applications, best fit for GA's
                if (intval($application['code']) > 70 ) {

                    $html .=   'Refer to Thumbnail<br />';

                }
                $html .=   '</td>';

            } else {

                $html .=   '<td align="center">';
                $html .=   '<strong></strong>';
                $html .=   '</td>';

            }

            $html .=   '<td align="center">';

            if ($appType == "EMBELLISHMENTS" ) {
                $html .=   'Refer to Prepared File<br />';
            } else {

                $colors = '';
                $accentLabel = '';
                $isTextApplicationType = false;
                $withPattern = false;
                $patternName = '';
                $label = '';

                if (isset($application['pattern_obj'])) {
                    if ($application['pattern_obj']['name'] !== "Blank") {
                        $withPattern = true;
                        $patternName = $application['pattern_obj']['name'];
                    }
                }

                // Every other text type applications
                if ($appType <> "MASCOT") {

                    $isTextApplicationType = true;
                    $accentLabel = $application['accent_obj']['title'];
                    $label = $accentLabel;

                    if ($withPattern) { $label .= " --- " . $patternName; }

                }

                $html .= "";

                // If Prolook items reverse, base color should be Outer - Inner
                $reversedColorArray = array_reverse($application['color_array']);

                if ($isTextApplicationType) {
                    foreach ($reversedColorArray as &$color) {
                        if (is_array($color)) {
                            $colors .= $color['color_code'] . "/";
                        }
                    }
                } else {

                    foreach ($application['color_array'] as &$color) {
                        if (is_array($color)) {
                            $colors .= $color['color_code'] . "/";
                        }
                    }

                }

                $colors = rtrim($colors, "/");

                // Pop base color if it has a pattern
                if ($isTextApplicationType && $withPattern) {
                    if (is_array($reversedColorArray)) {
                        if ($accentLabel <> "Single Color") {

                            $tokens = explode('/', $colors);
                            array_pop($tokens);
                            $colors = implode('/', $tokens);

                        }
                    }
                }

                $html .= $label . "<br />";

                $html .= $colors;

                $colorsTrimmed = '';

                if ($withPattern && $isTextApplicationType) {

                    $colors = '';

                    foreach ($application['pattern_obj']['layers'] as &$layer) {
                        if (array_key_exists('color_code', $layer)) {
                            $colors .= $layer['color_code'] . "/";
                        } else {
                            $colors .= "?,";
                        }
                    }

                    $colorsTrimmed = ' --- ' . rtrim($colors, "/");

                }

                $html .= $colorsTrimmed;

            }

            $html .=   '</td>';

            $html .= '</tr>';

        }

        $html .= '</table>';

        return $html;

    }

    function generateRosterTable ($rosters, $sport, $type) {

        $this->log_info('generateRosterTable');

        $html = '';
        $html .= '<br /><br />';
        $html .= '<h3>ROSTER</h3>';
        $html .= '<table border="1" cellpadding="3">';

        $html .= '<tr>';
        $html .=   '<td align="center">';
        $html .=   '<strong>SIZE</strong>';
        $html .=   '</td>';

        $html .=   '<td align="center">';
        $html .=   '<strong>QUANTITY</strong>';
        $html .=   '</td>';

        $html .=   '<td align="center">';
        $html .=   '<strong>NUMBER</strong>';
        $html .=   '</td>';

        if ($sport !== "Crew Socks (Apparel)" || $sport !== "Socks (Apparel)") {

            $html .=   '<td align="center">';
            $html .=   '<strong>LASTNAME</strong>';
            $html .=   '</td>';

        }

        if ($sport === "Football 2017" && $type !== "lower") {

            $html .=   '<td align="center">';
            $html .=   '<strong>LASTNAME APPLICATION</strong>';
            $html .=   '</td>';
            $html .=   '<td align="center">';
            $html .=   '<strong>SLEEVE TYPE</strong>';
            $html .=   '</td>';

        }

        $html .= '</tr>';

        $ctrRoster = 0;

        foreach ($rosters as &$roster) {

            $ctrRoster += 1;
            $bgcolor = '#fff';

            if ($ctrRoster % 2 !== 0) {
                $bgcolor = '#e7e7e7';
            }

            $html .= '<tr bgcolor="' . $bgcolor . '">';
            $html .=   '<td align="center">';
            $html .=   $roster['size'];
            $html .=   '</td>';
            $html .=   '<td align="center">';
            $html .=   $roster['quantity'];
            $html .=   '</td>';

            $html .=   '<td align="center">';
            $html .=   $roster['number'];
            $html .=   '</td>';

            if ($sport !== "Crew Socks (Apparel)") {

                $html .=   '<td align="center">';
                $html .=   $roster['lastname'];
                $html .=   '</td>';

            }

            if (($sport === "Football 2017" || $sport === "Baseball") && $type !== "lower") {

                $html .=   '<td align="center">';
                $html .=   $roster['lastNameApplication'];
                $html .=   '</td>';
                $html .=   '<td align="center">';
                $html .=   $roster['sleeveType'];
                $html .=   '</td>';

            }

            $html .= '</tr>';

        }

        $html .= '</table>';

        return $html;

    }

    function generateMaterialOptionsTable ($itemData) {

        $this->log_info('generateMaterialOptionsTable');

        $orItem = $itemData;
        $bc = $itemData['builder_customizations'];
        $sml = $bc['sorted_modifier_labels'];

        Log::info('SML===> ' . json_encode($sml));

        $uniformType = $itemData['type'];
        $parts = $bc[$uniformType];
        $randomFeeds = $bc['randomFeeds'];
        $hiddenBody = $bc["hiddenBody"];

        $html = '';
        $html .= '<br /><br />';
        $html .= '<h3>PARTS</h3>';
        $html .= '<table border="1" cellpadding="3">';

        $html .= '<tr>';
        $html .=   '<td align="right" width="40%">';
        $html .=       '<strong>PARTS</strong>';
        $html .=   '</td>';
        $html .=   '<td width="20%" align="center">';
        $html .=       '<strong>COLOR</strong>';
        $html .=   '</td>';
        $html .=   '<td width="40%" align="center">';
        $html .=       '<strong>PATTERN</strong>';
        $html .=   '</td>';

        if ($bc['uniform_category'] == "Crew Socks (Apparel)" || $bc['uniform_category'] == "Socks (Apparel)") {

            $html .=   '<td width="40%" align="center">';
            $html .=       '<strong>RANDOM FEEDS</strong>';
            $html .=   '</td>';

        }

        $html .= '</tr>';

        $ctrParts = 0;

        $newParts = [];

        // adding group id to matching part
        foreach ($parts as &$partX) {

            if (!is_array($partX)) { continue; }

            if ($partX['setting_type'] === 'mesh_shadows') { continue; }
            if ($partX['setting_type'] === 'mesh_highlights') { continue; }
            if ($partX['setting_type'] === 'static_layer') { continue; }

            if ($partX['code'] === 'highlights') { continue; }
            if ($partX['code'] === 'highlight') { continue; }
            if ($partX['code'] === 'shadows') { continue; }
            if ($partX['code'] === 'shadow') { continue; }
            if ($partX['code'] === 'guide') { continue; }
            if ($partX['code'] === 'status') { continue; }
            if ($partX['code'] === 'static') { continue; }
            if ($partX['code'] === 'locker_tag') { continue; }
            if ($partX['code'] === 'elastic_belt') { continue; }
            if ($partX['code'] === 'body_inside') { continue; }
            if ($partX['code'] === 'extra') { continue; }
            if ($partX['code'] === 'extra_cowl') { continue; }

            if ($hiddenBody and $partX['code'] === 'body') { continue; }

            Log::info('PARTX===============>' . $partX['code']);
            $prevCode = $partX['code'];

            // add extra property
            $partX = (object) array_merge( (array)$partX, array( 'code_prev' => $prevCode ) );

            // pre check if part name value is contains sleeve and only one separator then set it to sleeve only
            if (strpos($partX->code, 'sleeve') !== false && substr_count($partX->code, '_') === 1) {
                $partX->code = 'sleeve';
            }

            // pre check if part name value is contains cowl and only one separator then set it to cowl only
            if (strpos($partX->code, 'cowl') !== false && substr_count($partX->code, '_') === 1) {
                $partX->code = 'cowl';
            }

            // transform code to matching words
            if (strpos($partX->code, '-') !== false ) { // if dash is detected inside a word
                $trans_code = str_replace('-', ' ', $partX->code); // replace dash with spaces
                $upper_code = ucwords($trans_code); // convert every word to uppercase
                $upper_code = str_replace(' ', '-', $upper_code); // replace spaces back to dash
                $count_spaces = substr_count($upper_code, ' '); // count spaces
            } else {
                $trans_code = str_replace('_', ' ', $partX->code); // replace underscore with spaces
                $upper_code = ucwords($trans_code); // convert every word to uppercase
                $count_spaces = substr_count($upper_code, ' '); // count spaces
            }

            // words thats are exempted from trim
            if (strpos($upper_code, 'Upper Stripe') !== false || strpos($upper_code, 'Lower Stripe') !== false) {
                Log::info('EXEMPTED WORDS=======>' . $upper_code);
            } else {
                // trim
                if ($count_spaces >= 2) {
                    $pos = strpos($upper_code, ' ') + 1;
                    $upper_code = substr($upper_code, $pos);
                }
            }

            foreach ($sml as $v) {
                if ($upper_code === $v['name']) {

                    Log::info('LABEL CHECK===============>' . $upper_code . ' | ' . $v['name'] . ' ✔');

                    // check if $upper_code is sleeve then check prev_code it matches
//                    if ($upper_code === 'sleeve') {
//                        Log::info('SLEEVE CHECK===============>' . $partX->code);
//                    }

                    // add extra property
                    $partX = (object) array_merge( (array)$partX, array( 'group_id' => $v['group_id'] ) );

                    // push to array
                    array_push($newParts, $partX);
                }

//                if (strpos($upper_code, 'dry') !== false) {
//                    Log::info('LOGGING PRO-DRY==========%%%%%%%%%%' . $upper_code);
//                }
            }
        }

        // sort new parts before using
        usort($newParts, function($a, $b)
        {
            if ($a->group_id == $b->group_id) {
                return 0;
            }
            return ($a->group_id < $b->group_id) ? -1 : 1;
        });

//        Log::info('NEW PARTS SORTED===============>' . json_encode($newParts));

        foreach (json_decode(json_encode($newParts), true) as &$part) {

//            if (!is_array($part)) { continue; }
//
//            if ($part['setting_type'] === 'mesh_shadows') { continue; }
//            if ($part['setting_type'] === 'mesh_highlights') { continue; }
//            if ($part['setting_type'] === 'static_layer') { continue; }
//
//            if ($part['code'] === 'highlights') { continue; }
//            if ($part['code'] === 'highlight') { continue; }
//            if ($part['code'] === 'shadows') { continue; }
//            if ($part['code'] === 'shadow') { continue; }
//            if ($part['code'] === 'guide') { continue; }
//            if ($part['code'] === 'status') { continue; }
//            if ($part['code'] === 'static') { continue; }
//            if ($part['code'] === 'locker_tag') { continue; }
//            if ($part['code'] === 'elastic_belt') { continue; }
//            if ($part['code'] === 'body_inside') { continue; }
//            if ($part['code'] === 'extra') { continue; }
//
//            if ($hiddenBody and $part['code'] === 'body') { continue; }

//            Log::info('PART===============>' . $part['code']);
//            Log::info('PART===============>' . json_encode($part));

            $hasPattern = false;
            if (array_key_exists('pattern', $part)) {
                if ($part['pattern']['pattern_id'] != '') {
                    if ($part['pattern']['pattern_obj']['name'] != 'Blank') {
                        $hasPattern = true;
                    }
                }
            }

            if (array_key_exists('code_prev', $part)) {
                $codeName =   $part['code_prev'];
            } else {
                $codeName =  $part['code'];
            }

//            if ($part['code'] === 'sleeve') {
//                Log::info('PART TEST===============>' . json_encode($part));
//            }

            $code = $this->toTitleCase($codeName);

            $ctrParts += 1;
            $bgcolor = '#fff';

            if ($ctrParts % 2 !== 0) {
                $bgcolor = '#e7e7e7';
            }

            $html .= '<tr bgcolor="' . $bgcolor . '">';
            $html .=   '<td align="right">';
            $html .=   $code;
            $html .=   '</td>';
            $html .=   '<td align="center">';

            if ($bc['uniform_category'] == "Crew Socks (Apparel)" || $bc['uniform_category'] == "Socks (Apparel)") {

                $titledPart = $part['code'];
                $titledPart = str_replace('_', ' ', $titledPart);
                $titledPart = ucwords($titledPart);

                if (array_key_exists($titledPart, $randomFeeds)) {

                    if ($randomFeeds[$titledPart]['enabled'] != '0') {
                         $html .= "Use Random Feed Color";
                    } else {
                        $html .=   $part['colorObj']['color_code'];
                    }

                } else {
                    $html .=   $part['colorObj']['color_code'];
                }

            } else {

                if (!$hasPattern) {

                    if (array_key_exists('colorObj', $part)) {
                        $html .=   $part['colorObj']['color_code'];
                    } else {
                        $html .=   'Default';
                    }

                } else {
                        $html .=   'Use Pattern Color';
                }

            }

            $html .=   '</td>';
            $html .=   '<td align="center">';

            if ($hasPattern) {

                $html .= '<strong>' . $part['pattern']['pattern_obj']['name'] . "</strong>" . " / ";

                $colors = '';
                foreach ($part['pattern']['pattern_obj']['layers'] as &$layer) {
                    $colors .= $layer['color_code'] . ',';
                }

                $colorsTrimmed = rtrim($colors, ",");

                $html .= '<strong>' . $colorsTrimmed . '</strong>';

            }

            $html .=   '</td>';

            // Random Feeds
            if ($bc['uniform_category'] == "Crew Socks (Apparel)" || $bc['uniform_category'] == "Socks (Apparel)") {

                $html .=   '<td align="center">';

                Log::error('----------' . $code);

                $titledPart = $part['code'];
                $titledPart = str_replace('_', ' ', $titledPart);
                $titledPart = ucwords($titledPart);

                if (array_key_exists($titledPart, $randomFeeds)) {

                    if ($randomFeeds[$titledPart]['enabled'] != '0') {

                        $colors = '';
                        $index = 1;
                        foreach ($randomFeeds[$titledPart]['layers'] as &$layer) {

                            // Random Feeds only have two colors
                            if ($layer['colorCode'] === "none" or $index === 3) { continue; }

                            $colors .= $layer['colorCode'] . ',';
                            $index++;

                        }

                        $colorsTrimmed = rtrim($colors, ",");
                        $html .= '<strong>' . $colorsTrimmed . '</strong>';

                    }

                }

                $html .=   '</td>';

            }
            // End Random Feeds

            $html .= '</tr>';

        }

        $html .= '</table>';

        return $html;

    }

    function generateClientDetailsTable ($itemData) {

        $table = "";

        $table .= '<table cellpadding="2">';
        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'CLIENT NAME<br />';
        $table .=     $itemData['order']['client'];
        $table .=     '<br />';
        $table .=   '</td>';
        $table .= '</tr>';
        $table .= '</table>';

        return $table;

    }

    function generateClientDetailsTableDetailed ($itemData) {

        $table = '<strong>CLIENT INFO / ORGANIZATION</strong><br /><br />';
        $table .= '<table cellpadding="2">';
        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Client Name';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['order']['client'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Athletic Director ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Contact: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['athletic_director']['contact'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Email: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['athletic_director']['email'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Phone: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['athletic_director']['phone'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Fax: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['athletic_director']['fax'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     '<br /><br /><strong>BILLING</strong>';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Organization: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['billing']['organization'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Contact: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['billing']['contact'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Email: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['billing']['email'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Phone: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['billing']['phone'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Fax: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['billing']['fax'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Address: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['billing']['address'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'City: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['billing']['city'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'State: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['billing']['state'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'ZIP: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['billing']['zip'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     '<br /><br /><strong>SHIPPING</strong>';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Organization: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['shipping']['organization'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Contact: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['shipping']['contact'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Email: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['shipping']['email'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Phone: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['shipping']['phone'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Fax: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['shipping']['fax'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'Address: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['shipping']['address'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'City: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['shipping']['city'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'State: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['shipping']['state'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=     'ZIP: ';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=     $itemData['shipping']['zip'];
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '</table>';
        $total  = 0;

        return $table;

    }

    function generateItemTable ($itemData, $fname, $mainInfo, $material_id) {

        $this->log_info('generateItemTable');

        $styleURL = '<a href="' . $itemData["url"]  . '"><strong>BUILDER URL</strong></a>';
        $pdfURL   = '<a href="' . env("WEBSITE_URL") . $fname . '"><strong>PDF URL</strong></a>';
        $cutURL   = '<a href="' . $itemData["builder_customizations"]["cut_pdf"] . '"><strong>CUT PDF URL</strong></a>';
        $stylesPDFURL   = '<a href="' . $itemData["builder_customizations"]["styles_pdf"] . '"><strong>STYLE PDF URL</strong></a>';

        if ($itemData["builder_customizations"]["cut_pdf"] === '') { $cutURL = 'No Cut PDF detected.'; }
        if ($itemData["builder_customizations"]["styles_pdf"] === '') { $stylesPDFURL = 'No STYLE PDF detected.'; }

        $html = '';
        $html .= '<table>';

        $html .= '<tr>';
        $html .=     '<td width="100%" style="font-size: 1.0em;">';
        $html .=       'STYLE<br />';
        $html .=       '<strong>#' .  $material_id  . ', ' . $itemData["description"] . ' (' . $itemData["applicationType"]  .')</strong><br />';
        $html .=       '<strong>' .  $itemData["sku"]  . '</strong><br />';
        $html .=     '</td>';
        $html .= '</tr>';

        $html .= '<tr>';
        $html .=     '<td width="100%" style="font-size: 1.0em;">';
        $html .=       'URLS: <br />';
        $html .=       $styleURL . '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;' . $pdfURL . '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;' . $cutURL . '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;' . $stylesPDFURL;
        $html .=     '</td>';
        $html .= '</tr>';

        $html .= '</table>';

        return $html;

    }

    function generateSizeBreakDownTable ($firstOrderItem) {

        $bc = $firstOrderItem['builder_customizations'];
        $sizeBreakDown = $firstOrderItem['builder_customizations']['size_breakdown'];

        $table = '';

        $table .= '<strong>ADDITIONAL NOTES</strong>';
        $table .= '<p style="font-size: 0.8em">';
        $table .= $firstOrderItem['notes'];
        $table .= '</p>';

        if ($firstOrderItem['additional_attachments'] !== "" and $firstOrderItem['additional_attachments'] !== null) {
            $table .= '<br /><br />';
            $table .= '<strong>ATTACHMENT</strong>';
            $table .= '<p>';
            $table .= '<a href="' . $firstOrderItem['additional_attachments'] . '" target="_new">Open Attachment</a>';
            $table .= '</p>';
        }

        if (isset($bc['sizingTableHTML']))
        {
            $table .= '<strong>SIZING TABLE</strong><br /><br />';
            $table .= '<table style="font-size: 1.5em">';
            $table .= '<tr><td colspan="2">' . $bc['sizingTableHTML'] . '</td></tr>';
            $table .= '</table>';
        }

        $table .= '<table width="90%">';

        $total  = 0;

        foreach ($sizeBreakDown as &$size) {

            $table .= '<tr>';

            $table .=   '<td width="65%"></td>';
            $table .=   '<td align="right">';
            $table .=   $size['size'];
            $table .=   '</td>';
            $table .=   '<td width="10%" style="text-align: right;">';
            $table .=   $size['quantity'];
            $table .=   '</td>';
            $table .= '</tr>';

            $total += intval($size['quantity']);

        }

        $table .= '<tr>';
        $table .=   '<td width="65%"></td>';
        $table .=   '<td align="right">';
        $table .=   '<strong>TOTAL</strong>';
        $table .=   '</td>';
        $table .=   '<td width="10%" style="text-align: right;">';
        $table .=   '<br />';
        $table .=   '<strong>'. $total . '</strong>';
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '</table>';

        return $table;

    }

    function generatePDF($builder_customizations, $previousTransformedPath) {

        $pdf = new TCPDF();

        $filename = $this->getGUID();

        if ($previousTransformedPath) {
            $path = public_path('design_sheets/' . substr($previousTransformedPath,15));
        } else {
            $path = public_path('design_sheets/' . $filename . '.pdf');
        }

        Log::info('PDF PATH=======>' . $path);

        $type = 'upper';

        $bc = $builder_customizations['builder_customizations']['order_items'][0]['builder_customizations'];
//        $sml = $builder_customizations['builder_customizations']['order_items'][0]['sorted_modifier_labels'];

//        $block_pattern = $bc['cuts_links']['block_pattern'];

        $sport = $bc['uniform_category'];

        if (array_key_exists('material_id', $bc['lower'])) {
            $type = 'lower';
        }

        $uniform_category = $bc['uniform_category'];

        // dd($bc['builder_customizations']['roster']);
        // $body_color = $bc->upper->Body->color;
        // $body_color_hex = dechex($body_color);

        $frontViewImage = $bc['thumbnails']['front_view'];
        $backViewImage = $bc['thumbnails']['back_view'];
        $leftViewImage = $bc['thumbnails']['left_view'];
        $rightViewImage = $bc['thumbnails']['right_view'];

        //$image = @file_get_contents($frontViewImage);
        // $outputFilenameFront = '';
        // if ($image != '') {
        //     $fname = 'front.png';
        //     $outputFilenameFront = storage_path('/app/'.$fname);
        //     file_put_contents($outputFilenameFront, $image);
        // }

        $pdf->setPrintHeader(false);
        $pdf->SetTitle('Order Form');
        $pdf->AddPage("L");

        //$fontname = $pdf->addTTFfont('/fonts/avenir_next.ttf', 'TrueTypeUnicode', '', 96);
        $pdf->SetFont('avenir_next', '', 14, '', false);

        $firstOrderItem = $builder_customizations['builder_customizations']['order_items'][0];
        $mainInfo       = $builder_customizations['builder_customizations'];

        $style = '<style> body, td, p { font-size: 0.8em; } </style>';

        $html  = '';
        $html .= $style;
        $html .= '<div style ="width: 100%; text-align: center;">';
        $html .=    '<h4>PROLOOK UNIFORM CUSTOMIZER - ORDER FORM</h2>';
        $html .=    '<h3>' . $uniform_category . '</h3>';
        $html .= '</div>';

        $html .=   $this->generateClientDetailsTable($mainInfo);

        $html .= '<table cellpadding="2">';
        $html .= '<tr>';
        $html .=   '<td>';
        $html .=     'STYLE<br />';
        $html .=       '<strong>#' .  $firstOrderItem['material_id']  . ', ' . $firstOrderItem["description"] . ' (' . $firstOrderItem["applicationType"]  .')</strong><br />';
        $html .=       '<strong>' .  $firstOrderItem["sku"]  . '</strong>';
        $html .=   '</td>';
        $html .= '</tr>';
        $html .= '</table>';
        $pdf->writeHTML($html, true, false, true, false, '');

//        $html .=   '<table width="100%">';
//        $html .=     '<tr>';
//        $html .=     '<td>';
//        $html .=         $this->generateItemTable($firstOrderItem, '/design_sheets/' . $filename . '.pdf', $mainInfo, $firstOrderItem['material_id']);
//        $html .=     '</td>';
//        $html .=     '</tr>';
//        $html .=   '</table>';
        $html  = '';
        $html .= $style;
        $html .= '<p>URLS:</p>';
        $pdf->writeHTML($html, true, false, true, false, '');

        $builder_url_text = 'BUILDER URL';
        $pdf_url_text = 'PDF URL';
        $cut_url_text = 'CUT URL';
        $style_url_text = 'STYLE URL';

        $builder_url_link = $firstOrderItem["url"];

        // PDF FILE PATH
        $s3_target_path = '/design_sheets/' . str_slug(env('APP_VENDOR'), '-') . '/' . env('S3_ENV') . '/' . $firstOrderItem['material_id']  . '/' . $filename . '.pdf';
        $pdf_url_link = 'https://s3-us-west-2.amazonaws.com/uniformbuilder' . $s3_target_path;
        // $pdf_url_link = 'https://' . env("WEBSITE_URL") . '/design_sheets/' . $filename . '.pdf';

        Log::info('PDF S3 TARGET========>' . $pdf_url_link);

        $cut_url_link = $firstOrderItem["builder_customizations"]["cut_pdf"];
        $style_url_link = $firstOrderItem["builder_customizations"]["styles_pdf"];

        $pdf->addHtmlLink($builder_url_link, $builder_url_text, false, false , array(0,0,255), -1, false);
        $pdf->Write( 1, '     |     ', '', false, '', false, 0, false, false, 0, 0, '' );
        $pdf->addHtmlLink($pdf_url_link, $pdf_url_text, false, false , array(0,0,255), -1, false);
        $pdf->Write( 1, '     |     ', '', false, '', false, 0, false, false, 0, 0, '' );
        if ($firstOrderItem["builder_customizations"]["cut_pdf"] === '') {
            $pdf->Write( 1, 'No Cut PDF detected.', '', false, '', false, 0, false, false, 0, 0, '' );
        } else {
            $pdf->addHtmlLink($cut_url_link, $cut_url_text, false, false , array(0,0,255), -1, false);
        }

        $pdf->Write( 1, '     |     ', '', false, '', false, 0, false, false, 0, 0, '' );
        if ($firstOrderItem["builder_customizations"]["styles_pdf"] === '') {
            $pdf->Write( 1, 'No STYLE PDF detected.', '', false, '', false, 0, false, false, 0, 0, '' );
        } else {
            $pdf->addHtmlLink($style_url_link, $style_url_text, false, false , array(0,0,255), -1, false);
        }

        $html  = '<br /><br />';
        $html .= $style;
        $html .=   '<table width="100%" style="height: 750px">';
        $html .=   '<tr>';
        $html .=   '<td style="text-align=center;">';
        $html .=   '<br /><br />';

        $html .=   $this->generateSizeBreakDownTable($firstOrderItem);

        //$html .=   $this->generateClientDetailsTable($mainInfo);
        $html .=   '</td>';
        // $html .=   '<td width="30%">';
        // //$html .=   $this->generateSizeBreakDownTable($firstOrderItem);
        // $html .=   '</td>';
        $html .=   '</tr>';
        $html .=   '</table>';
        $html .=   '</div>';

        //$pdf->AddPage("L");

        $pdf->writeHTML($html, true, false, true, false, '');

        $frontCaption = '(Front)';
        $backCaption = '(Back)';
        $leftCaption = '(Left)';
        $rightCaption = '(Right)';

        if ($sport === "Crew Socks (Apparel)" || $sport === "Socks (Apparel)") {
            $leftCaption = '(Inside)';
            $rightCaption = '(Outside)';
        }

//        if ($block_pattern === "Hockey Sock") {
//            $leftCaption = '(Outside)';
//            $rightCaption = '(Inside)';
//        }

        $html  = '';
        $html .=   '<div>';
        $html .=      '<div style ="width: 100%; text-align: center;">';
        $html .=         '<h3>PREVIEW</h3>';
        $html .=      '</div>';
        $html .=     '<br /><br /><br /><br /><br /><br />';
        $html .=       '<table>';
        $html .=         '<tr style="height: 100px;"><td></td><td></td><td></td><td></td></tr>';
//        $html .=         '<tr>';
//        $html .=            '<td align="center"><img style="margin-top: 30px; width: 200px;" src="' . $frontViewImage  .'"/><br /><a style="font-size: 0.7em" href="' . $frontViewImage . '" target="_new"><em>View Larger Image</a></em><br />' . $frontCaption . '</td>';
//        $html .=            '<td align="center"><img style="margin-top: 30px; width: 200px;" src="' . $backViewImage  .'"/><br /><a style="font-size: 0.7em" href="' . $backViewImage . '" target="_new"><em>View Larger Image</a></em><br />' . $backCaption . '</td>';
//        $html .=            '<td align="center"><img style="margin-top: 30px; width: 200px;" src="' . $leftViewImage  .'"/><br /><a style="font-size: 0.7em" href="' . $leftViewImage . '" target="_new"><em>View Larger Image</a></em><br />' . $leftCaption . '</td>';
//        $html .=            '<td align="center"><img style="margin-top: 30px; width: 200px;" src="' . $rightViewImage  .'"/><br /><a style="font-size: 0.7em" href="' . $rightViewImage . '" target="_new"><em>View Larger Image</a></em><br />' . $rigthCaption . '</td>';
//        $html .=         '</tr>';
        $html .=         '<tr>';
        $html .=            '<td align="center"><img style="margin-top: 30px; width: 200px;" src="' . $frontViewImage  .'"/></td>';
        $html .=            '<td align="center"><img style="margin-top: 30px; width: 200px;" src="' . $backViewImage  .'"/></td>';
        $html .=            '<td align="center"><img style="margin-top: 30px; width: 200px;" src="' . $leftViewImage  .'"/></td>';
        $html .=            '<td align="center"><img style="margin-top: 30px; width: 200px;" src="' . $rightViewImage  .'"/></td>';
        $html .=         '</tr>';
        $html .=        '<tr style="height: 100px;"><td></td><td></td><td></td><td></td></tr>';
        $html .=   '</table>';
        $html .= '</div>';

        $pdf->AddPage("L");
        $pdf->writeHTML($html, true, false, true, false, '');

        $pdf->Write( 1, '                      ', '', false, '', false, 0, false, false, 0, 0, '' );
        $pdf->addHtmlLink($frontViewImage , $frontCaption, false, false , array(0,0,255), -1, false);
        $pdf->Write( 1, '                                            ', '', false, '', false, 0, false, false, 0, 0, '' );
        $pdf->addHtmlLink($backViewImage, $backCaption, false, false , array(0,0,255), -1, false);
        $pdf->Write( 1, '                                              ', '', false, '', false, 0, false, false, 0, 0, '' );
        $pdf->addHtmlLink($leftViewImage, $leftCaption, false, false , array(0,0,255), -1, false);
        $pdf->Write( 1, '                                               ', '', false, '', false, 0, false, false, 0, 0, '' );
        $pdf->addHtmlLink($rightViewImage, $rightCaption, false, false , array(0,0,255), -1, false);

//        $pdf->Write( 0, $frontCaption, '', false, '', false, 0, false, false, 0, 0, '' );
//        $pdf->Write( 0, $backCaption, '', false, '', false, 0, false, false, 0, 0, '' );
//        $pdf->Write( 0, $leftCaption, '', false, '', false, 0, false, false, 0, 0, '' );
//        $pdf->Write( 0, $rightCaption, '', false, '', false, 0, false, false, 0, 0, '' );

        $pdf->AddPage("L");

        $bc = $builder_customizations['builder_customizations']['order_items'][0];

        $html  = '';
        $html .= $style;
        $html .= '<table>';
        $html .=    '<tr>';
        $html .=        '<td width="70%">';
        $html .=            $this->generateMaterialOptionsTable($bc);
        $html .=        '</td>';
        $html .=        '<td width= "30%">';
        $html .=            '';
        $html .=        '</td>';
        $html .=    '</tr>';
        $html .='</table>';

        $pdf->writeHTML($html, true, false, true, false, '');

        $roster = $builder_customizations['builder_customizations']['order_items'][0]['builder_customizations']['roster'];
        $pdf->AddPage("L");
        $html  = '';
        $html .= $style;
        $html .= '<table>';
        $html .=    '<tr>';
        $html .=        '<td width="100%">';
        $html .=            $this->generateRosterTable($roster, $sport, $type);
        $html .=        '</td>';
        $html .=    '</tr>';
        $html .='</table>';

        $pdf->writeHTML($html, true, false, true, false, '');

        $applications = $builder_customizations['builder_customizations']['order_items'][0]['builder_customizations']['applications'];
        $pdf->AddPage("L");
        $html  = '';
        $html .= $style;
        $html .= '<table>';
        $html .=    '<tr>';
        $html .=        '<td width="100%">';
        $html .=            $this->generateApplicationsTable($applications, $uniform_category, $firstOrderItem["applicationType"]);
        $html .=        '</td>';
        $html .=    '</tr>';
        $html .='</table>';

        $pdf->writeHTML($html, true, false, true, false, '');

        // Application separated links
        $html  = '';
        $html .= $style;
        $html .= '<p>APPLICATION LINKS:</p>';
        $pdf->writeHTML($html, true, false, true, false, '');

        foreach ($applications as $application) {
            // Log::info('==========APPLICATION LINKS===========');
            $appType = strtoupper(str_replace("_"," ",$application['application_type']));
            // $appTypeCaption = $appType;

            // Skip free / unused applications
            if ($appType === "FREE") { continue; }
            if ($appType !== "EMBELLISHMENTS" && $appType !== "MASCOT" ) { continue; }

            // Skip applications that are turned off
            if (isset($application['status']) and $application['status'] === "off") { continue; }

            // Log::info('---' . $application['code'] . ' ' . $appType);
//            Log::info('APP TYPE IS ==========>' . $appType);

            if ($appType === "EMBELLISHMENTS") {

                // Log::info('==========>Embellisments Detected!');
                $appTypeCaption = "CUSTOM MASCOT";
                $embellishment = $application['embellishment'];
                $pdf->Write(1, '#' . $application['code'] . '          ', '', false, '', false, 0, false, false, 0, 0, '');
                $pdf->addHtmlLink($embellishment['svg_filename'], 'Link To Prepared File', false, false, array(0, 0, 255), -1, false);
                $pdf->Write(1, '             ', '', false, '', false, 0, false, false, 0, 0, '');
                $pdf->addHtmlLink('http://' . env('WEBSITE_URL') . '/utilities/previewEmbellishmentInfo/' . $embellishment['design_id'], 'View Detailed Info', false, false, array(0, 0, 255), -1, false);
                $html = '<br/>';
                $pdf->writeHTML($html, true, false, true, false, '');

            } else if ($appType === "MASCOT" ) {

                // Log::info('==========>Mascot Detected!');
                if ($application['mascot']['name'] == 'Custom Logo') {

                    $pdf->Write(1, '#' . $application['code'] . '          ', '', false, '', false, 0, false, false, 0, 0, '');
                    $pdf->addHtmlLink($application['customFilename'], 'Link To Uploaded File', false, false, array(0, 0, 255), -1, false);
                    $html = '<br/>';
                    $pdf->writeHTML($html, true, false, true, false, '');

                } else {

                    $pdf->Write(1, '#' . $application['code'] . '          ', '', false, '', false, 0, false, false, 0, 0, '');
                    $pdf->addHtmlLink($application['mascot']['ai_file'], 'Link To Mascot PDF File', false, false, array(0, 0, 255), -1, false);
                    $html = '<br/>';
                    $pdf->writeHTML($html, true, false, true, false, '');

                }
            }
        }

        // Piping

        if ($uniform_category === "Baseball" or $uniform_category == "Fastpitch") {

            $applications = $builder_customizations['builder_customizations']['order_items'][0]['builder_customizations']['pipings'];
            $pdf->AddPage("L");
            $html  = '';
            $html .= $style;
            $html .= '<table>';
            $html .=    '<tr>';
            $html .=        '<td width="100%">';
            $html .=            $this->generatePipingsTable($applications, $uniform_category);
            $html .=        '</td>';
            $html .=    '</tr>';
            $html .='</table>';

            $pdf->writeHTML($html, true, false, true, false, '');

        }

        // End Piping

        $pdf->SetAuthor('ProLook Sports');
        $pdf->SetCreator('ProLook Sports Customizer');
        $pdf->Output($path, 'F');

        $transformedPath = '/design_sheets/' . $filename . '.pdf';

        // Upload PDF to S3
        $source_path = base_path() . '/public/' . $transformedPath;
        $target_remote_path = $s3_target_path;
        if (file_exists($source_path))
        {
            $result = Storage::disk('s3')->put($target_remote_path, file_get_contents($source_path), 'public');
            Log::info('File Uploaded Status: ' . $result);

            // If upload is successful, remove the file
            if ($result)
            {
                Log::info('PDF PATH = ' . $pdf_url_link);
                Log::info('Delete File Status: ' . unlink($source_path));
            }
        }
        else
        {
            Log::info('Missing PDF File');
        }

        $user = Session::get('userId');
        $message = 'Anonymous user has generated a designsheet for '.$firstOrderItem['description'].'. Link: '. $pdf_url_link;

        if ( isset($user) ) {
            $user_id = Session::get('userId');
            $first_name = Session::get('first_name');
            $last_name = Session::get('last_name');
            $message = $first_name.''.$last_name.'['.$user_id.']'.' has generated a designsheet for '.$firstOrderItem['description'].'. Link: '. $pdf_url_link;
        }

        if (env('APP_ENV') <> "local") { Slack::send($message); }

        return $pdf_url_link;

    }

    public function generateOrderForm(Request $request){

        $this->log_info('generateOrderForm');

        $r = $request->all();
        $fname = $this->generatePDF($r, '');

        return response()->json(['success' => true, 'filename' => $fname ]);

    }

    public function generateLegacy($orderId){

        // Log::info('GENERATING LEGACY PDF===> ' . $orderId);

        $orderInfo = $this->ordersClient->getOrderByOrderId($orderId);
        $orderDetails = $this->ordersClient->getOrderItems($orderId);
        $order = $this->ordersClient->getOrderItems($orderId);
        $order = $order[0];
        $settings = json_decode($order->builder_customizations, true);

        if (isset($settings['upper']['material_id'])) {
            $materialID = $settings['upper']['material_id'];
            $appType = 'upper';
        } else {
            $materialID = $settings['lower']['material_id'];
            $appType = 'lower';
        }

        $material = $this->materialsClient->getMaterial($materialID);

        $builderItem[0] = array(
            'material_id' => $materialID,
            'description' => $orderDetails[0]->description,
            'notes' => $orderDetails[0]->notes,
            'additional_attachments' => $orderDetails[0]->additional_attachments,
            'applicationType' => ucwords($material->uniform_application_type),
            'sku' => $material->sku,
            'url' => '/order/'.$orderId,
            'type' => $appType,
            'builder_customizations' => $settings
        );

        $bc = [
            'builder_customizations' => [
                'order' => [
                    'client' => $orderInfo->client

                ],
                'order_items' => $builderItem
            ]
        ];

        $fname = $this->generatePDF($bc, $settings['pdfOrderForm']);
//        return response()->json(['success' => true, 'filename' => $fname ]);
//        Log::info('OLD PDF FILE IS HERE===> ' . json_encode($settings));
//        return view('editor.view-generated-pdf')->with('filename',$fname);

        $params = [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'view-generated-pdf',
            'type' => 'view-generated-pdf',
            'filename' => $fname
        ];
        return view('editor.view-generated-pdf', $params);
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

        // Disable PDF Creation for now
        // $fname = $this->createPDF($request->input('builder_customizations'));

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
            'design_name' => $request->input('design_name'),
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
        // Log::info("Finished converting base64 image and uploaded to S3");
        // Log::info("It took {$time} seconds\n");

        // Log::info('Saving uniform design');
        $response = $this->ordersClient->saveOrder($data);
        if ($response->success)
        {
            // Log::info('Success');
            return Redirect::to('/order/' . $response->order->order_id)
                        ->with('message', 'Successfully saved your uniform design');
        }
        else
        {
            // Log::info('Failed');
            return Redirect::to('/')
                        ->with('message', 'There was a problem saving your uniform design.');
        }

    }

    /**
     * Displays the saved uniform design on the "Customizer"
     * @param Integer $id Saved Uniform design ID
     */
    public function loadSavedDesign($id, $render = false)
    {

        // Log::info('Load Saved Design');

        $savedDesign = $this->savedDesignsClient->getSavedDesign($id);

        if (isset($savedDesign))
        {

            $builder_customizations = json_decode($savedDesign->builder_customizations);
            $materialId = $savedDesign->material_id;

            Session::put('page-type', [
                'page' => 'saved-design',
            ]);

            Session::put('design', [
                'id' => $savedDesign->id,
                'material_id' => $materialId,
            ]);

            $config = [
                'saved_design_user_id' => $savedDesign->user_id,
                'saved_design_name' => $savedDesign->name,
                'material_id' => $materialId,
                'id' => $savedDesign->id,
                'builder_customizations' => $savedDesign->id,
                'type' => 'Saved Design',
                'saved_design_name' => $savedDesign->name,
                'created_at' => $savedDesign->created_at,
                'low_res_front' => $savedDesign->low_res_front_thumbnail,
                'low_res_back' => $savedDesign->low_res_back_thumbnail,
                'low_res_left' => $savedDesign->low_res_left_thumbnail,
                'low_res_right' => $savedDesign->low_res_right_thumbnail
            ];

            if ($render) { $config['render'] = true; }

            if (Session::has('userHasTeamStoreAccount'))
            {
                $team_store = Session::get('team_store');
                $colors = implode(',', $team_store['colors']);
                $this->injectParameters($config,
                    $team_store['code'],
                    $team_store['name']
                );
            }

            return $this->showBuilder($config);
        }
        return redirect('index');
    }

    /**
     * Public endpoint for saved uniform designs
     */
    public function showcaseDesign($showcaseDesignId)
    {
        $salt = config('customizer.vendor.code');

        if (is_numeric($showcaseDesignId))
        {
            $showcaseIdHash = StringUtility::encryptShowcaseId($showcaseDesignId);
            return redirect('/showcase/' . $showcaseIdHash);
        }
        else
        {
            $saved_design_id = StringUtility::decryptShowcaseId($showcaseDesignId);
            return $this->loadSavedDesign($saved_design_id);
        }
    }

    /**
     * Owner of uniforms could use this method. If non-owners try to access this uniform design, they will be redirected to a different URL but same uniform design
     */
    public function mySavedDesign($saved_design_id)
    {

        $savedDesign = $this->savedDesignsClient->getSavedDesign($saved_design_id);

        if (!$this->isUniformOwner($savedDesign) and env('APP_ENV') !== 'local')
        {
            return $this->showcaseDesign($saved_design_id);
        }

        return $this->loadSavedDesign($saved_design_id);

    }

     /**
     * Owner of uniforms could use this method. If non-owners try to access this uniform design, they will be redirected to a different URL but same uniform design
     */
    public function mySavedDesignRender($saved_design_id)
    {

        $savedDesign = $this->savedDesignsClient->getSavedDesign($saved_design_id);

        if (!$this->isUniformOwner($savedDesign))
        {
            return $this->showcaseDesign($saved_design_id);
        }

        return $this->loadSavedDesign($saved_design_id, true);

    }

    public function mySavedDesigns(Request $request) {

        $materialId = -1;
        $categoryId = -1;

        $params = [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'my-saved-designs',
            'type' => 'my-saved-designs',
        ];

        return view('editor.my-saved-designs', $params);

    }

    public function myMessages(Request $request) {

        $materialId = -1;
        $categoryId = -1;

        $params = [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'my-messages',
            'type' => 'my-messages',
        ];

        return view('editor.my-messages', $params);

    }

    public function myCustomArtworkRequests(Request $request) {

        $materialId = -1;
        $categoryId = -1;

        $params = [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'my-custom-artwork-requests',
            'type' => 'my-custom-artwork-requests',
        ];

        return view('editor.my-custom-artwork-requests', $params);

    }

    public function myOrders(Request $request) {

        $materialId = -1;
        $categoryId = -1;

        $params = [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'my-orders',
            'type' => 'my-orders',
        ];

        return view('editor.my-orders', $params);

    }

    public function myProfile(Request $request) {

        $user = $this->usersAPIClient->getUser(Session::get('userId'));

        Session::put('fullname', $user->first_name . ' ' . $user->last_name);
        Session::put('first_name', $user->first_name);
        Session::put('firstName', $user->first_name);
        Session::put('lastName', $user->last_name);
        Session::put('lastName', $user->last_name);

        Session::put('state', $user->state);
        Session::put('zip', $user->zip);
        Session::put('default_rep_id', $user->default_rep_id);

        $materialId = -1;
        $categoryId = -1;

        $params = [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'my-profile',
            'type' => 'my-profile',
        ];

        return view('editor.my-profile', $params);

    }

    public function signup(Request $request) {

        $materialId = -1;
        $categoryId = -1;

        $params = [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'signup',
        ];

        return view('editor.signup', $params);

    }

    public function forgotPassword(Request $request) {

        $materialId = -1;
        $categoryId = -1;

        $params = [

            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'forgot-password',

        ];

        return view('editor.forgot-password', $params);

    }

    public function previewEmbellishmentInfo($embellishmentID) {

        $embellishment = $this->inksoftDesignsAPIClient->getByDesignID($embellishmentID);

        $params = [
            'page_title' => env('APP_TITLE'),
            'app_title' => env('APP_TITLE'),
            'asset_version' => env('ASSET_VERSION'),
            'asset_storage' => env('ASSET_STORAGE'),
            'material_id' => -1,
            'category_id' => -1,
            'builder_customizations' => null,
            'page' => 'preview-embellishment',
            'type' => 'preview-embellishment',
            'embellishmentDetails' => $embellishment,
        ];

        $params['embellishmentDetails'] = $embellishment;

        return view('editor.preview-embellishment', $params);

    }

    public function loadOrderbyFOID($foid)
    {
        $order = $this->ordersClient->searchOrderByFOID($foid);

        if ($order)
        {
            return self::loadOrder($order->order_id);
        }
        return redirect('index');
    }

    public function generateLegacyByFOID($foid)
    {
        $order = $this->ordersClient->searchOrderByFOID($foid);

        if ($order)
        {
            return self::generateLegacy($order->order_id);
        }
        return redirect('index');
    }

}
