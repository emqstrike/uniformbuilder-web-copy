@extends('help/help-layout')


@section('content')
<style type="text/css">
    
    .banner small{
        font-size: 1.2em;
    }
    ul#nav_list li{

        border-radius: 4px;
    margin-bottom: 4px;
    display: block;
    color: #2C2D30;
    text-decoration: none;
    padding: 4px 10px 5px;
    font-size: 15px;
    line-height: 18px;
    }
</style>
<div class="page-header banner">

    <div class="container">
        <div class="col-md-12">
            <h1>Getting started for new user</h1>
            <small>Welcome! We’ve put together this guide to help you get started and make our Customizer work for you.</small>
        </div>
    </div>

</div>
    <div class="container">
        <div class="col-md-8">
            <div id="signUp">
                <h1>Sign up</h1> 
                <p>Just click the sign up button on the top right side of our Customizer</p>      
                <img src="/images/help/getting-started/image1.png">     

            </div>
            <div id="login">
                <h1>Login</h1> 
                <p>Just click the login button on the top right side of our Customizer beside the Sign Up</p> <img src="/images/help/getting-started/image2.png">       
            </div>
            <div id="navigationBar">
                <h1>Navigation bar</h1> 
                <p>On the top center of our Customizer you can choose your sport and sizes to start customizing</p>     
                <img src="/images/help/getting-started/image3.png"> 


                <p>Sizes available: Men, Women, Youth Sports: Football, Baseball, Basketball, Lacrosse, Soccer, Wrestling </p>    
                <img src="/images/help/getting-started/image4.png"> 
            </div>
             <div id="search">
                <h1>Search</h1> 
                <p>Search is one of our features. You can use it to search styles, team and sport</p>           
            </div>
            <div id="selectingStyles">
                <h1>Selecting styles</h1> 
                <p>Search is one of our features. You can use it to search styles, team and sport</p>
            </div>



        </div> 
         <div class="col-md-4">
            <ul class="section-list stick" id="nav_list" style="top: 140px;">
                <li>
                    <a href="#takeaways" class="active">Sign up</a>
                </li>
                <li>
                    <a href="#sign-up" class="">Login</a>
                </li>
                <li>
                    <a href="#search">Navigation bar</a>
                </li>
                <li>
                    <a href="#selectingStyles">Search</a>
                </li>
                <li>
                    <a href="#selectingStyles">Selecting styles</a>
                </li>

            </ul>
        </div>

        




    </div>




@endsection