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

    public function getOrders($status = null)
    {
        $endpoint = 'orders';
        if (!is_null($status))
        {
            $endpoint .= '/' . $status;
        }
        $response = $this->get($endpoint);
        $result = $this->decoder->decode($response->getBody());

        $orders = [];
        if ($result->success)
        {
            $orders = $result->orders;
        }
        return $orders;
    }

    public function getOrdersArtwork($status = null)
    {
        $endpoint = 'orders/artworks';
        if (!is_null($status))
        {
            $endpoint .= '/' . $status;
        }

        $response = $this->get($endpoint);
        $result = $this->decoder->decode($response->getBody());

        $orders = [];
        if ($result->success)
        {
            $orders = $result->orders;
        }
        return $orders;
    }

    public function getOrderItems($id)
    {
        $response = $this->get('order/items/' . $id);
        $result = $this->decoder->decode($response->getBody());
        if ($result->success)
        {
            return $result->order;
        }
        return null;
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

    public function countOrdersByStatus($status)
    {
        $response = $this->get('orders/count/' . $status);

        return $this->decoder->decode($response->getBody());
    }

    public function countNewOrders()
    {
        return $this->countOrdersByStatus('new');
    }

    public function countCancelledOrders()
    {
        return $this->countOrdersByStatus('cancelled');
    }

    public function countPendingOrders()
    {
        return $this->countOrdersByStatus('pending');
    }

    public function countFinishedOrders()
    {
        return $this->countOrdersByStatus('finished');
    }

    public function countCompletedOrders()
    {
        return $this->countOrdersByStatus('completed');
    }

}