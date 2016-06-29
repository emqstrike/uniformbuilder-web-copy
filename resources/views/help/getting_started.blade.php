@extends('help/help-layout')


@section('content')
<style type="text/css">
    
    .banner small{
        font-size: 1.2em;
    }
/*    ul#nav li{

        border-radius: 4px;
    margin-bottom: 4px;
    display: block;
    color: #2C2D30;
    text-decoration: none;
    padding: 4px 10px 5px;
    font-size: 15px;
    line-height: 18px;
    }*/
    div#mascots img {
    max-width: 100%;
    }
/*    ul#nav {
        position: fixed;
    }*/
/*    ul#nav li a {
    color: black;
    text-decoration: none;
    padding: 4px 10px 5px;
    border-radius: 4px;
    display: block;
}*/
ul#nav li a.active {
    background-color: #3aa3e3;
    color: #FFFFFF;
    padding: 6px 10 7px;
    line-height: 22px;
}
.navContainer {
position: fixed;
min-width: 20%;
}
.navbar-collapse{
    padding: 0;
}
.navContainerr {
    position: fixed;
    width: 23%;
}
@media (max-width: 768px){


    .mobileMenu{
            top: 0;
    border-width: 0 0 1px;
    position: fixed;    
    right: 0;
    left: 0;
    z-index: 1030;

    }
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
                <p>Just click the login button on the top right side of our Customizer beside the Sign Up</p> <img src="/images/help/getting-started/image2.PNG">       
            </div>
            <div id="navigationBar">
                <h1>Navigation bar</h1> 
                <p>On the top center of our Customizer you can choose your sport and sizes to start customizing</p>     
                <img src="/images/help/getting-started/image3.PNG"> 


                <p>Sizes available: Men, Women, Youth Sports: Football, Baseball, Basketball, Lacrosse, Soccer, Wrestling </p>    
                <img src="/images/help/getting-started/image4.PNG"> 
            </div>
             <div id="search">
                <h1>Search</h1> 
                <p>Search is one of our features. You can use it to search styles, team and sport</p><img src="/images/help/getting-started/image5.PNG">            
            </div>
            <div id="selectingStyles">

                <h1>Selecting styles</h1> 
                <p>After selecting sports/style you now customize and create your own design</p>
                <img src="/images/help/getting-started/image6.PNG"> 
            </div>
            <div id="editingProperties">
                <h1>Editing properties</h1> 
                <p>On the left side of the customizer uniform properties will once the style is loaded, default preset will be applied depends on the style.</p>
            </div>
            <div id="teamColors">
                <h1>Team colors</h1> 
                <p>By clicking the colors you can select team color for default color option on the uniform.</p>
                <img src="/images/help/getting-started/image7.PNG"> 
            </div>
            <div id="colorOption">
                <h1>Color option</h1> 
                <p>There are several parts of the uniform that can be customize using color option that is selected on the team colors. You can select the color by clicking the</p>
                <div class="row">
                    <div class= "col-md-6 col-sm-6 col-xs-6"> <img src="/images/help/getting-started/image8.PNG"> </div>
                     <div class= "col-md-6 col-sm-6 col-xs-6">  <img src="/images/help/getting-started/image9.PNG"> </div>
                 </div>
            </div>
             <div id="views">
                <h1>Views</h1> 
                <p>You can select view of the uniform by clicking the options on the bottom of the property window</p>
                 <img src="/images/help/getting-started/image10.PNG"> 
            </div>
             <div id="number">
                <h1>Number</h1> 
                <p>By clicking the numbers on the front view and back view you can modify it by using property(font, colors and size.</p>
                 
            </div>
             <div id="name">
                <h1>Name</h1> 
                <p>By clicking the name on the front/back view and back view you can modify it by using property(font, colors and size.</p>
                
                  <img src="/images/help/getting-started/image13.PNG"> 
            </div>
            <div id="mascots">
                <h1>Mascots</h1> 
                <p>You can choose a team mascot logo and customize the color properties depending on the team color that you pick.</p>
                <div class="row">
                    <div class= "col-md-6 col-sm-6 col-xs-6"> 
                        <img src="/images/help/getting-started/image14.PNG"> 
                    </div>
                    <div class= "col-md-6 col-sm-6 col-xs-6"> 
                        <img src="/images/help/getting-started/image15.PNG"> 
                     </div>
                  </div>
                
            </div>
        </div> 
        <div class="col-md-4">
            <div class="navContainerr">  

                <nav class="navbar navbar-default mobileMenu">

                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                      </button>
                      
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                     <ul class="nav navbar-navd" id="nav" style="top: 140px;">
                            <li>
                                <a href="#signUp" class="active">Sign up</a>
                            </li>
                            <li>
                                <a href="#login" class="">Login</a>
                            </li>
                            <li>
                                <a href="#navigationBar">Navigation bar</a>
                            </li>
                            <li>
                                <a href="#search">Search</a>
                            </li>
                            <li>
                                <a href="#selectingStyles">Selecting styles</a>
                            </li>
                              <li>
                                <a href="#editingProperties">Editing properties</a>
                            </li>
                              <li>
                                <a href="#teamColors">Team colors</a>
                            </li>
                              <li>
                                <a href="#colorOption">Color option</a>
                            </li>
                              <li>
                                <a href="#views">Views</a>
                            </li>
                              <li>
                                <a href="#number">Number</a>
                            </li>
                             <li>
                                <a href="#name">Name</a>
                            </li>
                               <li>
                                <a href="#mascots">Mascots</a>
                            </li>


                            </ul>
                    </div><!-- /.navbar-collapse -->

                </nav>

             </div>
         </div>

    </div>



@endsection