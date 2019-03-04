<?php

use App\ShoppingCart\User;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;
use Illuminate\Foundation\Testing\WithoutMiddleware;

class UserTest extends TestCase
{
    /**
     * @return void
     * @test
     */
    public function method_getId_must_return_the_value_of_id_field()
    {
        $user = new User;
        $user->id = 1;
        $expected = 1;

        $this->assertSame($expected, $user->getId());
    }

    /**
     * @return void
     * @test
     */
    public function method_getFullName_must_return_the_value_of_combine_first_name_and_last_name_value()
    {
        $user = new User;
        $user->first_name = "Foo";
        $user->last_name = "Bar";
        $expected = "Foo Bar";

        $this->assertSame($expected, $user->getFullName());
    }

    /**
     * @return void
     * @test
     */
    public function method_generateNewLoggedInToken_must_return_true_if_this_save_is_true()
    {
        $cartReflection = new UserReflection(User::class);
        $methods = $cartReflection->getAllMethodNamesExcept(["generateNewLoggedInToken"]);

        $cartStub = $this->getMockBuilder(User::class)
                        ->setMethods($methods)
                        ->getMock();

        $cartStub->method('save')
                    ->willReturn(true);

        $this->assertTrue($cartStub->generateNewLoggedInToken());
    }

    /**
     * @return void
     * @test
     */
    public function method_generateNewLoggedInToken_must_return_false_if_this_save_is_false()
    {
        $cartReflection = new UserReflection(User::class);
        $methods = $cartReflection->getAllMethodNamesExcept(["generateNewLoggedInToken"]);

        $cartStub = $this->getMockBuilder(User::class)
                        ->setMethods($methods)
                        ->getMock();

        $cartStub->method('save')
                    ->willReturn(false);

        $this->assertFalse($cartStub->generateNewLoggedInToken());
    }
}

class UserReflection extends ReflectionClass
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