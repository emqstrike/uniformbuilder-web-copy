<?php

use App\ShoppingCart\ClientInformation;
use App\ShoppingCart\ShippingInformation;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class ShippingInformationTest extends TestCase
{
    /**
     * @return void
     * @test
     *
     * data in the method name means full_name, athletic_director, email, phone_number, fax
     */
    public function method_same_as_client_info_must_return_true_if_billing_info_data_equals_to_client_info_data()
    {
        $shippingInfo = new ShippingInformation;

        $dummy_info = [
            'full_name' => "Foo Bar",
            'athletic_director' => "Baz Director",
            'email' => "foo@bar.com",
            'phone_number' => "09123456789",
            'fax' => "123456789"
        ];

        $clientInfo = new ClientInformation;
        $clientInfo->full_name = $dummy_info['full_name'];
        $clientInfo->athletic_director = $dummy_info['athletic_director'];
        $clientInfo->email = $dummy_info['email'];
        $clientInfo->phone_number = $dummy_info['phone_number'];
        $clientInfo->fax = $dummy_info['fax'];

        $shippingInfo->full_name = $dummy_info['full_name'];
        $shippingInfo->athletic_director = $dummy_info['athletic_director'];
        $shippingInfo->email = $dummy_info['email'];
        $shippingInfo->phone_number = $dummy_info['phone_number'];
        $shippingInfo->fax = $dummy_info['fax'];

        $result = $shippingInfo->sameAsClientInfo($clientInfo);

        $this->assertTrue($result);
    }

    /**
     * @return void
     * @test
     *
     * data in the method name means full_name, athletic_director, email, phone_number, fax
     */
    public function method_same_as_client_info_must_return_false_if_billing_info_data_not_equals_to_client_info_data()
    {
        $shippingInfo = new ShippingInformation;

        $dummy_info = [
            'full_name' => "Foo Bar",
            'athletic_director' => "Baz Director",
            'email' => "foo@bar.com",
            'phone_number' => "09123456789",
            'fax' => "123456789"
        ];

        $clientInfo = new ClientInformation;
        $clientInfo->full_name = $dummy_info['full_name'];
        $clientInfo->athletic_director = $dummy_info['athletic_director'];
        $clientInfo->email = $dummy_info['email'];
        $clientInfo->phone_number = $dummy_info['phone_number'];
        $clientInfo->fax = $dummy_info['fax'];

        $shippingInfo->full_name = "Foo Baz";
        $shippingInfo->athletic_director = $dummy_info['athletic_director'];
        $shippingInfo->email = $dummy_info['email'];
        $shippingInfo->phone_number = $dummy_info['phone_number'];
        $shippingInfo->fax = $dummy_info['fax'];

        $result = $shippingInfo->sameAsClientInfo($clientInfo);

        $this->assertFalse($result);
    }
}
