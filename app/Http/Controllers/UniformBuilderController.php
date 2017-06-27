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
use App\Http\Requests;
use App\Http\Controllers\Controller;
use App\Utilities\FileUtility;
use App\Utilities\S3Uploader;
use App\Utilities\FileUploaderV2;
use App\Utilities\Random;
use TCPDF;
use File;
use Slack;
use App\Utilities\StringUtility;
use App\Traits\OwnsUniformDesign;

class UniformBuilderController extends Controller
{
    use OwnsUniformDesign;

    protected $materialsClient;
    protected $colorsClient;
    protected $designSetClient;
    protected $ordersClient;
    protected $savedDesignsClient;
    protected $usersAPIClient;

    public function __construct(
        MaterialsAPIClient $materialsClient,
        ColorsAPIClient $colorsClient,
        UniformDesignSetsAPIClient $designSetClient,
        OrdersAPIClient $ordersClient,
        SavedDesignsAPIClient $savedDesignsClient,
        UsersAPIClient $usersAPIClient
    )
    {
        $this->materialsClient = $materialsClient;
        $this->colorsClient = $colorsClient;
        $this->designSetClient = $designSetClient;
        $this->ordersClient = $ordersClient;
        $this->savedDesignsClient = $savedDesignsClient;
        $this->usersAPIClient = $usersAPIClient;
    }

    public function showBuilder($config = [])
    {

        $designSetId = (isset($config['design_set_id']) && !empty($config['design_set_id']) && !($config['design_set_id'] == 0))
            ? $config['design_set_id']
            : null;
        $materialId = (isset($config['material_id']) && !empty($config['material_id']) && !($config['material_id'] == 0))
            ? $config['material_id']
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

        // @param Render request code - parameter passed by team store
        if (isset($config['code']))
        {
            $params['return_rendered_code'] = $config['code'];
            Log::info(__METHOD__ . ':return_rendered_code = ' . $config['code']);
        }

        // @param Store Code
        $params['store_code'] = '';
        if (isset($config['store_code']))
        {
            $params['store_code'] = $config['store_code'];
            Log::info(__METHOD__ . ': Team Name = ' . $params['store_code']);
        }

        // @param Team Name
        $params['team_name'] = '';
        if (isset($config['team_name']))
        {
            $params['team_name'] = $config['team_name'];
            Log::info(__METHOD__ . ': Team Name = ' . $params['team_name']);
        }

        // @param Team Colors - comma separated list
        $params['team_colors'] = null;
        if (isset($config['team_colors']))
        {
            $color_array = StringUtility::strToArray($config['team_colors']);
            $color_array = StringUtility::surroundElementsDQ($color_array);
            $params['team_colors'] = implode(',', $color_array);
            Log::info(__METHOD__ . ': Team Colors = ' . $params['team_colors']);
        }

        // @param Jersey Name
        $params['jersey_name'] = '';
        if (isset($config['jersey_name']))
        {
            $params['jersey_name'] = $config['jersey_name'];
            Log::info(__METHOD__ . ': Jersey Name = ' . $params['jersey_name']);
        }

        // @param Jersey Number
        $params['jersey_number'] = '';
        if (isset($config['jersey_number']))
        {
            $params['jersey_number'] = $config['jersey_number'];
            Log::info(__METHOD__ . ': Jersey Number = ' . $params['jersey_number']);
        }

        // @param Mascot ID
        $params['mascot_id'] = '';
        if (isset($config['mascot_id']))
        {
            $params['mascot_id'] = $config['mascot_id'];
            Log::info(__METHOD__ . ': Mascot ID = ' . $params['mascot_id']);
        }

        $params['builder_customizations'] = null;
        $params['order'] = null;

        ///

        if (isset($config['builder_customizations'])) {

            $pageType = Session::get("page-type");
            $params['type'] = $config['type'];

            if($pageType['page'] === "saved-design") {
                
                $design = Session::get('design');
                Session::put('order', null);

                $params['page'] = 'saved-design';
                $bc = $config['builder_customizations'];
                $params['saved_design_id'] = $config['id'];
                $params['material_id'] = $config['material_id'];
                $params['builder_customizations'] = $config['builder_customizations'];
                $params['saved_design_name'] = $config['saved_design_name'];              

            } elseif ($pageType['page'] === "order") {

                $order = Session::get('order');
                Session::put('design', null);

                if ($order['order_id'] == $config['order_id'])
                {

                    $params['page'] = 'order';
                    $bc = $config['builder_customizations'];
                    $params['order_id'] = $config['order_id'];
                    $params['order'] = $order;
                    $params['builder_customizations'] = $config['builder_customizations'];

                } else {

                    Session::put('order', null);

                }

            }

            if ($config['type'] == 'Order') {

                $params['orderCode']    = $config['order_code'];
                $params['orderIdShort'] = $config['order_id_short'];
                
            }
            
        }

        if (isset($config['styles'])) {

            $params['styles'] = $config['styles'];
            $params['sport'] = $config['sport'];
            $params['gender'] = $config['gender'];

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
     */

    public function loadDesignSet(
        $designSetId = null,
        $materialId = null,
        $store_code = null,
        $team_name = null,
        $team_colors = null,
        $jersey_name = null,
        $jersey_number = null,
        $mascot_id = null
    )
    {
        $config = [
            'design_set_id' => $designSetId,
            'material_id' => $materialId,
            'type' => 'Design Set',
        ];


        if (!is_null('store_code'))
        {
            $config['store_code'] = $store_code;
        }
        if (!is_null('team_name'))
        {
            $config['team_name'] = $team_name;
        }
        if (!is_null('team_colors'))
        {
            $config['team_colors'] = $team_colors;
        }
        if (!is_null('store_code'))
        {
            $config['store_code'] = $store_code;
        }
        if (!is_null('jersey_name'))
        {
            $config['jersey_name'] = $jersey_name;
        }
        if (!is_null('jersey_number'))
        {
            $config['jersey_number'] = $jersey_number;
        }
        if (!is_null('mascot_id'))
        {
            $config['mascot_id'] = $mascot_id;
        }

        return $this->showBuilder($config);

    }

    public function styles($gender = null, $sport = null)
    {

        $config = [
            'styles' => true,
            'sport' => $sport,
            'gender' => $gender,
        ];
        
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

        Log::info('(Request Before) Code  ' . $code);
        Log::info('(Request Before) !isNull  ' . !is_null($code));
        Log::info('(Request Before) has Team Colors  ' . $request->has('team_colors'));
        Log::info('(Request Before) Team Colors  ' . $request->team_colors);
        Log::info('Request Object ' . $request);

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
        $mascot_id = null
    )
    {
        $config = [
            'design_set_id' => 0,
            'material_id' => $material_id,
            'render' => true
        ];
        if (!is_null('store_code'))
        {
            $config['store_code'] = $store_code;
        }
        if (!is_null('team_name'))
        {
            $config['team_name'] = $team_name;
        }
        if (!is_null('team_colors'))
        {
            $config['team_colors'] = $team_colors;
        }
        if (!is_null('store_code'))
        {
            $config['store_code'] = $store_code;
        }
        if (!is_null('jersey_name'))
        {
            $config['jersey_name'] = $jersey_name;
        }
        if (!is_null('jersey_number'))
        {
            $config['jersey_number'] = $jersey_number;
        }
        if (!is_null('mascot_id'))
        {
            $config['mascot_id'] = $mascot_id;
        }
        return $this->showBuilder($config);
    }

    public function fileUpload (Request $request) {

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

        $html = '';
        $html .= '<br /><br />';
        $html .= '<h3>PIPINGS</h3>';
        $html .= '<table>';

        $html .= '<tr>';
        $html .=   '<td align="center">';
        $html .=   '<strong>TYPE</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>Number of Colors</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>Colors</strong>';
        $html .=   '</td>';
        $html .= '</tr>';

        foreach ($pipings as $key => &$piping) {

            $pipingType = $key;

            if ($piping["enabled"] == "0") { continue; }

            $html .= '<tr>';
            
            $html .=   '<td align="center">';
            $html .=   $pipingType;
            $html .=   '</td>';


            $html .=   '<td align="center">';
            $html .=   $piping['numberOfColors'];
            $html .=   '</td>';

            $html .=   '<td align="center">';

            $colors = '';
            $val = 1; 
            $noOfColors = intval($piping['numberOfColors']);
            foreach ($piping['layers'] as &$color) {

                if ($val > $noOfColors) { continue; }
                $colors .= $color['colorCode'] . ",";
                $val++;

            }

            $colorsTrimmed = rtrim($colors, ",");

            $html .= $colorsTrimmed;
            $html .=   '</td>';

            $html .= '</tr>';

        }

        $html .= '</table>';

        return $html;

    }

    function generateApplicationsTable ($applications, $uniform_category) {

        $html = '';
        $html .= '<br /><br />';
        $html .= '<h3>APPLICATIONS</h3>';
        $html .= '<table>';

        $html .= '<tr>';
        $html .=   '<td align="center">';
        $html .=   '<strong>LOCATION</strong>';
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
        $html .=   '<td align="center">';
        $html .=   '<strong>COLORS</strong>';
        $html .=   '</td>';

        $html .= '</tr>';

        foreach ($applications as &$application) {

            $appType = strtoupper(str_replace("_"," ",$application['application_type']));

            if ($appType == "FREE") { continue; }

            $html .= '<tr>';
            $html .=   '<td align="center">';
            $html .=   $application['code'];
            $html .=   '</td>';

            $html .=   '<td align="center">';
            $html .=   $appType;
            $html .=   '</td>';

            if ($appType == "TEAM NAME" or $appType == "PLAYER NAME" or $appType == "SHOULDER NUMBER" or $appType == "SLEEVE NUMBER" or $appType == "FRONT NUMBER" or $appType == "BACK NUMBER" ) {

                $html .=   '<td align="center">';
                $html .=   'Accent: ' . $application['accent_obj']['title'] . "<br />";
                $html .=   'Font: ' . $application['font_obj']['name'] . "<br />";
                $html .=   'Text: ' . strtoupper($application['text']) . "<br />";
                $html .=   '</td>';

            } else if ($appType == "MASCOT" ) {

                $html .=   '<td align="center">';
                $html .=   'Mascot Name: ' . $application['mascot']['name'] . "<br />";

                if ($application['mascot']['name'] == 'Custom Logo') {

                    $html .=   '<a href="' . $application['customFilename'] . '" target="_new">Link To Uploaded File</a> <br />';

                    $userfile_name = $application['customFilename'];
                    $userfile_extn = substr($userfile_name, strrpos($userfile_name, '.')+1);

                    if ($userfile_extn === 'png' or $userfile_extn === 'gif' or $userfile_extn === 'jpg' or $userfile_extn === 'jpeg' or $userfile_extn === 'bmp') {

                        $html .=   '<img width="50" height="50"  src="' . $application['customFilename'] . '"><br />';    

                    }

                } else {

                    $html .=   '<img width="50" height="50"  src="' . $application['mascot']['icon'] . '"><br />';    

                }

                $html .=   '</td>';

            } else {
                $html .=   '<td align="center">';
                $html .=   '<strong></strong>';
                $html .=   '</td>';                
            }

            if ($appType == "TEAM NAME" or $appType == "PLAYER NAME" or $appType == "SHOULDER NUMBER" or $appType == "SLEEVE NUMBER" or $appType == "FRONT NUMBER" or $appType == "BACK NUMBER" ) {

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

            } else {

                $html .=   '<td align="center">';
                $html .=   '<strong></strong>';
                $html .=   '</td>';                

            }

            $html .=   '<td align="center">';

                $colors = '';
                foreach ($application['color_array'] as &$color) {
                    $colors .= $color['color_code'] . ",";
                }

                $colorsTrimmed = rtrim($colors, ",");

            $html .= $colorsTrimmed;
            $html .=   '</td>';

            $html .= '</tr>';

        }

        $html .= '</table>';

        return $html;

    }

    function generateRosterTable ($rosters, $sport) {

        $html = '';
        $html .= '<br /><br />';
        $html .= '<h3>ROSTER</h3>';
        $html .= '<table>';

        $html .= '<tr>';
        $html .=   '<td align="center">';
        $html .=   '<strong>SIZE</strong>';
        $html .=   '</td>';

        $html .=   '<td align="center">';
        $html .=   '<strong>QUANTITY</strong>';
        $html .=   '</td>';

        if ($sport !== "Crew Socks (Apparel)") {

            $html .=   '<td align="center">';
            $html .=   '<strong>LASTNAME</strong>';
            $html .=   '</td>';

        }    

        if ($sport !== "Wrestling" and $sport !== "Crew Socks (Apparel)") {

            $html .=   '<td align="center">';
            $html .=   '<strong>NUMBER</strong>';
            $html .=   '</td>';

            $html .=   '<td align="center">';
            $html .=   '<strong>LASTNAME APPLICATION</strong>';
            $html .=   '</td>';
            $html .=   '<td align="center">';
            $html .=   '<strong>SLEEVE TYPE</strong>';
            $html .=   '</td>';

        }

        $html .= '</tr>';

        foreach ($rosters as &$roster) {

            $html .= '<tr>';
            $html .=   '<td align="center">';
            $html .=   $roster['size'];
            $html .=   '</td>';
            $html .=   '<td align="center">';
            $html .=   $roster['quantity'];
            $html .=   '</td>';

            if ($sport !== "Crew Socks (Apparel)") {

                $html .=   '<td align="center">';
                $html .=   strtoupper($roster['lastname']);
                $html .=   '</td>';

            }

            if ($sport !== "Wrestling" and $sport !== "Crew Socks (Apparel)") {

                $html .=   '<td align="center">';
                $html .=   $roster['number'];
                $html .=   '</td>';
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

        $orItem = $itemData;
        $bc = $itemData['builder_customizations'];
        $uniformType = $itemData['type'];
        $parts = $bc[$uniformType];
        $randomFeeds = $bc['randomFeeds'];

        $html = '';
        $html .= '<br /><br />';
        $html .= '<h3>PARTS</h3>';
        $html .= '<table>';

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

        if ($bc['uniform_category'] == "Crew Socks (Apparel)") {

            $html .=   '<td width="40%" align="center">';
            $html .=       '<strong>RANDOM FEEDS</strong>';
            $html .=   '</td>';

        }

        $html .= '</tr>';
        $html .= '<tr>';
        $html .=   '<td>';
        $html .=       '';
        $html .=   '</td>';
        $html .=   '<td>';
        $html .=       ''; 
        $html .=   '</td>';
        $html .= '</tr>';

        foreach ($parts as &$part) {

            if (!is_array($part)) { continue; }
            if ($part['code'] === 'highlights') { continue; }
            if ($part['code'] === 'highlight') { continue; }
            if ($part['code'] === 'shadows') { continue; }
            if ($part['code'] === 'shadow') { continue; }
            if ($part['code'] === 'guide') { continue; }
            if ($part['code'] === 'status') { continue; }
            if ($part['code'] === 'static') { continue; }
            if ($part['code'] === 'locker_tag') { continue; }
            if ($part['code'] === 'elastic_belt') { continue; }
            if ($part['code'] === 'body_inside') { continue; }

            $code = $this->toTitleCase($part['code']);

            Log::info('---' . $code);

            $html .= '<tr>';
            $html .=   '<td align="right">';
            $html .=   $code;
            $html .=   '</td>';
            $html .=   '<td align="center">';

            if (array_key_exists('colorObj', $part)) {
                $html .=   $part['colorObj']['color_code'];
            } else {
                $html .=   'Default';
            }

            $html .=   '</td>';
            $html .=   '<td align="center">';

            Log::error('----------' . $code);

            if (array_key_exists('pattern', $part)) {

                if ($part['pattern']['pattern_id'] != '') {

                    if ($part['pattern']['pattern_obj']['name'] != 'Blank') {

                        $html .= '<strong>' . $part['pattern']['pattern_obj']['name'] . "</strong>" . " / ";    

                        $colors = '';
                        foreach ($part['pattern']['pattern_obj']['layers'] as &$layer) {
                            $colors .= $layer['color_code'] . ',';
                        }

                        $colorsTrimmed = rtrim($colors, ",");

                        $html .= '<strong>' . $colorsTrimmed . '</strong>';

                    }

                }

            }

            $html .=   '</td>';

            // Random Feeds 
            if ($bc['uniform_category'] == "Crew Socks (Apparel)") {

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

    function generateItemTable ($itemData, $fname) {

        $html = '';
        $html .= "<table>";

        $html .= "<tr>";
        $html .=     "<td width='30%'>";
        $html .=        "UNIFORM NAME:<br />";
        $html .=       "<strong>" . $itemData['description'] . " (" . $itemData['applicationType']  .") </strong><br />";
        $html .=     "</td>";
        $html .= "</tr>";

        $html .= "<tr>";
        $html .=     "<td width='20%'>";
        $html .=        "SKU:<br />";
        $html .=       "<strong>" .  $itemData['sku']  . "</strong><br />";
        $html .=     "</td>";
        $html .= "</tr>";

        $html .= "<tr>";
        $html .=     "<td width='20%'>";
        $html .=        "PRICE:<br />";
        $html .=       "<strong>" . $itemData['price'] . "</strong><br />";
        $html .=     "</td>";
        $html .= "</tr>";

        $html .= "<tr>";
        $html .=     "<td width='20%'>";
        $html .=        "BUILDER URL:<br />";
        $html .=       "<strong>" . $itemData['url'] . "</strong><br />";
        $html .=     "</td>";
        $html .= "</tr>";

        $html .= "<tr>";
        $html .=     "<td width='20%'>";
        $html .=        "PDF URL:<br />";
        $html .=       "<strong>" . env('WEBSITE_URL') . $fname . "</strong><br />";
        $html .=     "</td>";
        $html .= "</tr>";

        $html .= "</table>";
        return $html;

    }

    function generateSizeBreakDownTable ($firstOrderItem) {

        $sizeBreakDown = $firstOrderItem['builder_customizations']['size_breakdown'];

        $table = '<strong>SIZES BREAKDOWN</strong><br /><br />';

        $table .= '<table>';
        $total  = 0;

        foreach ($sizeBreakDown as &$size) {

            $table .= '<tr>';
            $table .=   '<td>';
            $table .=   $size['size'];
            $table .=   '</td>';
            $table .=   '<td style="text-align: right;">';
            $table .=   $size['quantity'];
            $table .=   '</td>';
            $table .= '</tr>';

            $total += intval($size['quantity']);

        }

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=   '<strong>TOTAL</strong>';
        $table .=   '</td>';
        $table .=   '<td style="text-align: right;">';
        $table .=   '<br />';
        $table .=   '<strong>'. $total . '</strong>';
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '</table>';

        $table .= '<br /><br />';
        $table .= '<strong>ADDITIONAL NOTES</strong>';
        $table .= '<p style="font-size: 0.8em">';
        $table .= $firstOrderItem['notes'];
        $table .= '</p>';
        
        if ($firstOrderItem['attached_files'] !== "") {
            $table .= '<br /><br />';
            $table .= '<strong>ATTACHMENT</strong>';
            $table .= '<p>'; 
            $table .= '<a href="' . $firstOrderItem['attached_files'] . '" target="_new">Open Attachment</a>';    
            $table .= '</p>'; 
        }
        
        return $table;

    }

    function generatePDF ($builder_customizations) {

        $pdf = new TCPDF(); 

        $filename = $this->getGUID(); 
        $path = public_path('design_sheets/' . $filename . '.pdf');

        $bc = $builder_customizations['builder_customizations']['order_items'][0]['builder_customizations'];

        $uniform_category = $bc['uniform_category'];

        // dd($bc['builder_customizations']['roster']);
        // $body_color = $bc->upper->Body->color;
        // $body_color_hex = dechex($body_color);

        $frontViewImage = $bc['thumbnails']['front_view'];
        $backViewImage = $bc['thumbnails']['back_view'];
        $leftViewImage = $bc['thumbnails']['left_view'];
        $rightViewImage = $bc['thumbnails']['right_view'];
        $image = @file_get_contents($frontViewImage);

        // $outputFilenameFront = '';
        // if ($image != '') {
        //     $fname = 'front.png';
        //     $outputFilenameFront = storage_path('/app/'.$fname);
        //     file_put_contents($outputFilenameFront, $image);
        // }

        $pdf->setPrintHeader(false);
        $pdf->SetTitle('Order Form');
        $pdf->AddPage("P");

        //$fontname = $pdf->addTTFfont('/fonts/avenir_next.ttf', 'TrueTypeUnicode', '', 96);
        $pdf->SetFont('avenir_next', '', 14, '', false);

        $firstOrderItem = $builder_customizations['builder_customizations']['order_items'][0];
        $mainInfo       = $builder_customizations['builder_customizations'];

        $style = '<style> body { font-size: 0.8em; } td { font-size: 0.8em; } </style>';

        $html  = '';
        $html .= $style;
        $html .= '<div style ="width: 100%; text-align: center;">';
        $html .=    '<h4>PROLOOK UNIFORM CUSTOMIZER - ORDER FORM</h2>';
        $html .=    '<h3>' . $uniform_category . '</h3>';
        $html .= '</div>';
        $html .=   '<table width="100%">';
        $html .=     '<tr>';
        $html .=     '<td>';
        $html .=         $this->generateItemTable($firstOrderItem, '/design_sheets/' . $filename . '.pdf');
        $html .=     '</td>';
        $html .=     '</tr>';
        $html .=   '</table>';

        $html .=   '<table width="100%" style="height: 750px">';
        $html .=   '<tr>';
        $html .=   '<td width="50%" style="text-align=center;">';
        $html .=   '<br /><br />';
        $html .=   $this->generateClientDetailsTable($mainInfo);
        $html .=   '<br /><br />';
        $html .=   '</td>';
        $html .=   '<td width="30%">';
        $html .=   '<br /><br />';
        $html .=   $this->generateSizeBreakDownTable($firstOrderItem);
        $html .=   '<br /><br />';
        $html .=   '</td>';
        $html .=   '</tr>';
        $html .=   '</table>';
        $html .=   '</div>';

        $pdf->writeHTML($html, true, false, true, false, '');

        $html  = '';
        $html .=   '<div>';
        $html .=      '<div style ="width: 100%; text-align: center;">';
        $html .=         '<h3>PREVIEW</h3>';
        $html .=      '</div>';
        $html .=     '<br /><br /><br /><br /><br /><br />';
        $html .=       '<table>';
        $html .=         '<tr style="height: 100px;"><td></td><td></td><td></td><td></td></tr>';
        $html .=         '<tr>';
        $html .=            '<td><img style="margin-top: 30px; width: 200px;" src="' . $frontViewImage  .'"/></td>';
        $html .=            '<td><img style="margin-top: 30px; width: 200px;" src="' . $backViewImage  .'"/></td>';
        $html .=            '<td><img style="margin-top: 30px; width: 200px;" src="' . $leftViewImage  .'"/></td>';
        $html .=            '<td><img style="margin-top: 30px; width: 200px;" src="' . $rightViewImage  .'"/></td>';
        $html .=         '</tr>';
        $html .=        '<tr style="height: 100px;"><td></td><td></td><td></td><td></td></tr>';
        $html .=   '</table>';
        $html .= '</div>';

        $pdf->AddPage("L");
        $pdf->writeHTML($html, true, false, true, false, '');

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
        $html .=            $this->generateRosterTable($roster, $builder_customizations['builder_customizations']['order_items'][0]['builder_customizations']['uniform_category']);
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
        $html .=            $this->generateApplicationsTable($applications, $uniform_category);
        $html .=        '</td>';
        $html .=    '</tr>';
        $html .='</table>';

        $pdf->writeHTML($html, true, false, true, false, '');      

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

        $pdf->Output($path, 'F');

        $transformedPath = '/design_sheets/' . $filename . '.pdf';

        $user = Session::get('userId');
        $message = 'Anonymous user has generated a designsheet for '.$firstOrderItem['description'].'. Link: '.'customizer.prolook.com'.$transformedPath;

        if ( isset($user) ) {
            $user_id = Session::get('userId');
            $first_name = Session::get('first_name');
            $last_name = Session::get('last_name');
            $message = $first_name.''.$last_name.'['.$user_id.']'.' has generated a designsheet for '.$firstOrderItem['description'].'. Link: '.'customizer.prolook.com'.$transformedPath;
        }

        if (env('APP_ENV') <> "local") { Slack::send($message); }

        return $transformedPath;
        
    }

    public function generateOrderForm(Request $request){

        $r = $request->all();
        $fname = $this->generatePDF($r);

        return response()->json(['success' => true, 'filename' => $fname ]);

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

    /**
     * Displays the saved uniform design on the "Customizer"
     * @param Integer $id Saved Uniform design ID
     */
    public function loadSavedDesign($id, $render = false)
    {
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
                'material_id' => $materialId,
                'id' => $savedDesign->id,
                'builder_customizations' => $savedDesign->id,
                'type' => 'Saved Design',
                'saved_design_name' => $savedDesign->name,
            ];

            if ($render) { $config['render'] = true; }

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

        if (!$this->isUniformOwner($savedDesign))
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

}
