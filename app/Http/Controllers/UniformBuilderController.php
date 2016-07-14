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
                    
                // Set to the first material if nothing is requested
                //$material = $this->materialsClient->getMaterials()[0];
                //$materialId = $material->id;

                // if(env('APP_ENV') === 'local') {
                //     $materialId = -1;
                // }
                // else {
                //     $materialId = -1;                
                // }

                // set to just -1 for now to signal opening pickers instead

                $materialId = -1;                
                   
            }
            else {

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

                    $bc = json_decode($this->ordersClient->getOrderByOrderId($order['order_id'])->builder_customizations);
                    $params['order'] = $order;
                    $params['builder_customizations'] = $bc;
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
                    'order_id' => $orderId
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

    public function saveLogo(Request $request){

        $r = $request->all();
        $dataUrl = $r['dataUrl'];

        $fname = $this->getS3PathDecodedImage($dataUrl);
        return response()->json([ 'success' => true, 'filename' => $fname ]);

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

    function toTitleCase ($str) {

        $output = strtoupper(str_replace("_"," ",$str));
        return $output;

    }

    function generateApplicationsTable ($applications) {

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
                $html .=   'Accent: ' . $application['accent_obj']['name'] . "<br />";
                $html .=   'Font: ' . $application['font_obj']['name'] . "<br />";
                $html .=   'Text: ' . strtoupper($application['text']) . "<br />";
                $html .=   '</td>';
           
            } else if ($appType == "MASCOT" ) {
                $html .=   '<td align="center">';
                $html .=   'Mascot Name: ' . $application['mascot']['name'] . "<br />";
                $html .=   '<img width="50" height="50"  src="' . $application['mascot']['icon'] . '"><br />';
                $html .=   '</td>';                
            } else {
                $html .=   '<td align="center">';
                $html .=   '<strong></strong>';
                $html .=   '</td>';                
            }

            if ($appType == "TEAM NAME" or $appType == "PLAYER NAME" or $appType == "SHOULDER NUMBER" or $appType == "SLEEVE NUMBER" or $appType == "FRONT NUMBER" or $appType == "BACK NUMBER" ) {
                $html .=   '<td align="center">';
                $html .=   'Size: ' . $application['font_size'] . '" <br />';
                $html .=   '</td>';
            } else if ($appType == "MASCOT" ) {
                $html .=   '<td align="center">';
                $html .=   '<strong></strong>';
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

    function generateRosterTable ($rosters) {

        $html = '';
        $html .= '<br /><br />';
        $html .= '<h3>ROSTER</h3>';
        $html .= '<table>';

        $html .= '<tr>';
        $html .=   '<td align="center">';
        $html .=   '<strong>SIZE</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>NUMBER</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>QUANTITY</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>LASTNAME</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>LASTNAME APPLICATION</strong>';
        $html .=   '</td>';
        $html .=   '<td align="center">';
        $html .=   '<strong>SLEEVE TYPE</strong>';
        $html .=   '</td>';


        $html .= '</tr>';

        foreach ($rosters as &$roster) {

            $html .= '<tr>';
            $html .=   '<td align="center">';
            $html .=   $roster['size'];
            $html .=   '</td>';
            $html .=   '<td align="center">';
            $html .=   $roster['number'];
            $html .=   '</td>';
            $html .=   '<td align="center">';
            $html .=   $roster['quantity'];
            $html .=   '</td>';
            $html .=   '<td align="center">';
            $html .=   strtoupper($roster['lastname']);
            $html .=   '</td>';
            $html .=   '<td align="center">';
            $html .=   $roster['lastNameApplication'];
            $html .=   '</td>';
            $html .=   '<td align="center">';
            $html .=   $roster['sleeveType'];
            $html .=   '</td>';
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
            if ($part['code'] === 'shadows') { continue; }
            if ($part['code'] === 'guide') { continue; }
            if ($part['code'] === 'status') { continue; }
            if ($part['code'] === 'static') { continue; }
            if ($part['code'] === 'infused_locker_tag') { continue; }
            if ($part['code'] === 'locker_tag') { continue; }

            $code = $this->toTitleCase($part['code']);

            Log::info('---' . $code);
            
            $html .= '<tr>';
            $html .=   '<td align="right">';
            $html .=   $code;
            $html .=   '</td>';
            $html .=   '<td align="center">';
            $html .=   $part['colorObj']['color_code'];
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
        $table .=     '<br /><br /><strong>BILLING</strong><br />';
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
        $table .=     '<br /><br /><strong>SHIPPING</strong><br />';
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

        $table .= '</table>';
        $total  = 0;
        
        return $table;

    }

    function generateItemTable ($itemData, $fname) {
        
        $html = '';
        $html .= "<table>";
        $html .= "<tr>";
        $html .= "<td>";
        $html .= "UNIFORM NAME: <strong>" . $itemData['description'] . "</strong><br />";
        $html .= "SKU: <strong>" .  $itemData['sku'] . "</strong><br />";
        $html .= "BUILDER URL: <strong>" . $itemData['url'] . "</strong><br />";
        $html .= "PDF URL: <strong>http://" . $_SERVER['SERVER_NAME'] . $fname . "</strong><br />";
        $html .= "</td>";
        $html .= "</tr>";
        $html .= "</table>";
        return $html;

    }

    function generateSizeBreakDownTable ($sizeBreakDown) {

        $table = '<strong>SIZES BREAKDOWN</strong><br /><br />';

        $table .= '<table>';
        $total  = 0;

        foreach ($sizeBreakDown as &$size) {

            $table .= '<tr>';
            $table .=   '<td>';
            $table .=   $size['size'];
            $table .=   '</td>';
            $table .=   '<td>';
            $table .=   $size['quantity'];
            $table .=   '</td>';
            $table .= '</tr>';

            $total += intval($size['quantity']);

        }

        $table .= '<tr>';
        $table .=   '<td>';
        $table .=   '<strong>Total</strong>';
        $table .=   '</td>';
        $table .=   '<td>';
        $table .=   '<strong>'. $total . '</strong>';
        $table .=   '</td>';
        $table .= '</tr>';

        $table .= '</table>';

        return $table;
    }

    function generatePDF ($builder_customizations) {

        $pdf = new TCPDF(); 

        $filename = $this->getGUID(); 
        $path = public_path('design_sheets/' . $filename . '.pdf');

        $bc = $builder_customizations['builder_customizations']['order_items'][0]['builder_customizations'];

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

        $pdf->SetTitle('Order Form');
        $pdf->AddPage("L");

        $firstOrderItem = $builder_customizations['builder_customizations']['order_items'][0];
        $mainInfo = $builder_customizations['builder_customizations'];

        $html = '';
        $style = '<style> body { font-size: 0.8em; } td { font-size: 0.8em; } </style>';
        $html .= $style;
        $html .= '<h3>Prolook Customizer - Order Form</h3>';
        $html .= '<div>';
        $html .=   '<table width="100%" style="height: 750px">';
        $html .=   '<tr>';
        $html .=   '<td width="50%" style="text-align=center;">';
        $html .= $this->generateItemTable($firstOrderItem, '/design_sheets/' . $filename . '.pdf');
        $html .= '<br /><br />';
        $html .= $this->generateClientDetailsTable($mainInfo);
        $html .= '<br /><br />';
        $html .=   '</td>';
        $html .=   '<td width="50%">';
        
        $html .= '<br /><br /><br /><br /><br /><br />';
        $html .= $this->generateSizeBreakDownTable($firstOrderItem['builder_customizations']['size_breakdown']);
        $html .= '<br /><br />';

        $html .=   '</td>';
        $html .=   '</tr>';
        $html .= '</table>';
        $html .= '<br /><br /><br /><br /><br /><br />';
        $html .= '<table>';
        $html .= '<tr style="height: 100px;"><td></td><td></td><td></td><td></td></tr>';
        $html .= '<tr>';
        $html .=      '<td><img style="margin-top: 30px; width: 200px;" src="' . $frontViewImage  .'"/></td>';
        $html .=      '<td><img style="margin-top: 30px; width: 200px;" src="' . $backViewImage  .'"/></td>';
        $html .=      '<td><img style="margin-top: 30px; width: 200px;" src="' . $leftViewImage  .'"/></td>';
        $html .=      '<td><img style="margin-top: 30px; width: 200px;" src="' . $rightViewImage  .'"/></td>';
        $html .= '</tr>';
        $html .= '<tr style="height: 100px;"><td></td><td></td><td></td><td></td></tr>';
        $html .= '</table>';
        $html .= '</div>';

        $pdf->writeHTML($html, true, false, true, false, '');

        //$pdf->Image($outputFilenameFront, 1, 12, 200);
        //$pdf->Write(0, $bc['roster'][0]['size']);

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
        $html .=            $this->generateRosterTable($roster);
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
        $html .=            $this->generateApplicationsTable($applications);
        $html .=        '</td>';
        $html .=    '</tr>';
        $html .='</table>';

        $pdf->writeHTML($html, true, false, true, false, '');      

        $pdf->Output($path, 'F');

        $transformedPath = '/design_sheets/' . $filename . '.pdf';

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

}
