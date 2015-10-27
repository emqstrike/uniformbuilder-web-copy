<?php
namespace App\APIClients;

class OrdersAPIClient extends APIClient
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getOrder($id)
    {
        $response = $this->get('order/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->order;
        }
        return null;
    }

    public function getOrderByOrderId($orderId)
    {
        $response = $this->get('order/orderId/' . $orderId);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->order;
        }
        return null;
    }

    public function getOrders()
    {
        $response = $this->get('orders');
        $result = $this->decoder->decode($response->getBody());

        $orders = [];
        if ($result->success)
        {
            $orders = $result->orders;
        }
        return $orders;
    }

    public function updateStatus($data)
    {
        $response = $this->post('order/updateStatus', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

    public function saveOrder($data)
    {
        $response = $this->post('order', [
            'json' => $data
        ]);

        return $this->decoder->decode($response->getBody());
    }

}