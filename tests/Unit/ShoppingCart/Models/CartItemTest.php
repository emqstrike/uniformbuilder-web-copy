<?php

use App\ShoppingCart\CartItem;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class CartItemTest extends TestCase
{
    /**
     * @return void
     * @test
     */
    public function method_images_must_return_array_with_keys_left_image_front_image_back_image_and_right_image()
    {
        $cartItem = new CartItem;
        $cartItem->left_image = null;
        $cartItem->front_image = null;
        $cartItem->back_image = null;
        $cartItem->right_image = null;

        $keys = array_keys($cartItem->images());
        $expected = ["left_image", "front_image", "back_image", "right_image"];

        $this->assertSame($expected, $keys);
    }
}
