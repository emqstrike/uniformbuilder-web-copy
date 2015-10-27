<?php

namespace App\Http\Controllers;

use Session;
use Redirect;
use Illuminate\Http\Request;
use App\APIClients\ColorsAPIClient;
use App\APIClients\MaterialsAPIClient;
use App\APIClients\UniformDesignSetsAPIClient;
use App\APIClients\OrdersAPIClient;
use App\Http\Requests;
use App\Http\Controllers\Controller;

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
        $colors = $this->colorsClient->getColors();
        $categoryId = null;

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
        $params['order'] = null;
        if (Session::has('order'))
        {
            $order = Session::get('order');
            if (isset($config['order_id']))
            {
                if ($order['order_id'] == $config['order_id'])
                {
                    $params['order'] = $order;
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
            $material = $this->materialsClient->getMaterialByCode($order->upper_body_uniform);
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

}
