<?php

use App\ShoppingCart\Cart;
use App\ShoppingCart\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class CartTest extends TestCase
{
    /**
     * @return void
     * @test
     */
    public function method_isCompleted_must_return_true_if_the_is_completed_field_is_one()
    {
        $cart = new Cart;
        $cart->is_completed = 1;

        $this->assertTrue($cart->isCompleted());
    }

    /**
     * @return void
     * @test
     */
    public function method_isCompleted_must_return_false_if_the_is_completed_field_is_not_one()
    {
        $cart = new Cart;
        $cart->is_completed = 0;

        $this->assertFalse($cart->isCompleted());
    }

    /**
     * @return void
     * @test
     */
    public function method_hasOwner_must_return_true_if_this_user_is_not_null()
    {
        $user = new User;

        $cart = new Cart;
        $cart->user = $user;

        $this->assertTrue($cart->hasOwner());
    }

    /**
     * @return void
     * @test
     */
    public function method_hasOwner_must_return_false_if_this_user_is_null()
    {
        $cart = new Cart;
        $cart->user = null;

        $this->assertFalse($cart->hasOwner());
    }

    /**
     * @return void
     * @test
     */
    public function method_assignToUser_must_return_true_if_this_save_is_true()
    {
        $cartReflection = new CartReflection(Cart::class);
        $methods = $cartReflection->getAllMethodNamesExcept(["assignToUser"]);

        $cartStub = $this->getMockBuilder(Cart::class)
                        ->setMethods($methods)
                        ->getMock();

        $cartStub->method('save')
                    ->willReturn(true);

        $this->assertTrue($cartStub->assignToUser(0));
    }

    /**
     * @return void
     * @test
     */
    public function method_assignToUser_must_return_false_if_this_save_is_false()
    {
        $cartReflection = new CartReflection(Cart::class);
        $methods = $cartReflection->getAllMethodNamesExcept(["assignToUser"]);

        $cartStub = $this->getMockBuilder(Cart::class)
                        ->setMethods($methods)
                        ->getMock();

        $cartStub->method('save')
                    ->willReturn(false);

        $this->assertFalse($cartStub->assignToUser(0));
    }
}

class CartReflection extends ReflectionClass
{
    public function getAllMethodNamesExcept(array $excluded)
    {
        $methods = array_diff(
            get_class_methods($this->name),
            $excluded
        );

        return $methods;
    }
}
