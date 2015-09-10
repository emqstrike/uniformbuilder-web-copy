@extends('uniform-builder')

@section('left-pane')
    
    <div id="left-pane" class="pane">

        
        <div id="left-top" class="pane-top">
        

        </div>

      
        <div id="left-sidebar" class="pane-sidebar">
            
                            
            <a class="btn-new sidebar-buttons" data-filename='materials' data-status="new">
                <img class="btn-new" src="images/sidebar/new.png">
            </a>

            <a class="sidebar-buttons" data-filename='colors'>
                <img src="images/sidebar/load.png">
            </a>

            <a class="sidebar-buttons" data-filename='gradient'>
                <img src="images/sidebar/compare.png">
            </a>

            <a class="sidebar-buttons" data-filename='patterns'>
                <img src="images/sidebar/save.png">
            </a>


        </div>

        <div id="left-main-window" class="pane-main-window">

            <div class="canvas-views" id="main_view" width="496" height="550">
              
            </div>
    
        </div>

        <div id="camera-views" class="">
    
            <a class="btn change-view" data-view="right" id="view_right"><img src=""></a>
            <a class="btn change-view" data-view="front" id="view_front"><img src=""></a>
            <a class="btn change-view" data-view="back"  id="view_back"><img src=""></a>
            <a class="btn change-view" data-view="left"  id="view_left"><img src=""></a>
            <a class="btn change-view" data-view="pattern"  id="view_pattern"><img src=""></a>

        </div>

    </div>


@endsection('left-pane')


@section('right-pane')
    

    <div id="right-pane" class="pane">

        
        <div id="right-top" class="pane-top">
            
            

        </div>

        <div id="right-sidebar" class="pane-sidebar">


            <a href="" class="sidebar-buttons" data-filename='materials'>

                <img src="images/sidebar/materials.png">

            </a>

            <a href="" class="sidebar-buttons" data-filename='colors'>

                <img src="images/sidebar/colors.png">

            </a>

             <a href="" class="sidebar-buttons" data-filename='patterns'>

                <img src="images/sidebar/patterns.png">

            </a>

            <a href="" class="sidebar-buttons" data-filename='gradients'>

                <img src="images/sidebar/gradients.png">

            </a>

           

            <a href="" class="sidebar-buttons" data-filename='texts'>

                <img src="images/sidebar/texts.png">

            </a>

            <a href="" class="sidebar-buttons" data-filename='numbers'>

                <img src="images/sidebar/numbers.png">

            </a>

            <a href="" class="sidebar-buttons" data-filename='graphics'>

                <img src="images/sidebar/graphics.png">

            </a>

            <a href="" class="sidebar-buttons" data-filename='sizes'>

                <img src="images/sidebar/sizes.png">

            </a>


        </div>

        <div id="right-main-window" class="pane-main-window">
            
      
            <div class="options_panel" id="materials_panel">
                
                <div class="options_panel_header">
                
                    <span class="header_text">MATERIAL OPTIONS</span>

                </div>

            </div>


            <div class="options_panel" id="colors_panel">
                
                <div class="options_panel_header">
                
                    <span class="header_text">COLOR OPTIONS</span>

                </div>

                 <div class="options_panel_section">
                
                    <label>Team Color</label> 

                </div>

                <div class="options_panel_section">
                
                    <label>Base</label>  

                </div>

                <div class="options_panel_section" id="color_panel_section">

                    <div class="color_panel_container">
                
                        @include('partials.colors', ['data_panel' => 'base', 'data_target' =>'shape', 'event_class' => 'change-color',])

                        <br /><br />

                    </div>  

                      

                </div>

               

                <div class="options_panel_section">
                
                    <label>Popup Test</label> 
                        

                        &nbsp;

                        <a class= "btn btn-default popper_button" href = "#" rel= "popover" data-placement = "top" data-popover-content = "#myPopover" >

                            <div class="color_element popper_button">
                                <div id="popper" class="popper popper_button"></div>    
                            </div>

                        </a>

                    <div id="myPopover" class="hide">

                        <div class="color_panel_container" id="popover_color_panel">
                    
                            @include('partials.colors', ['data_panel' => 'patterns', 'data_target' =>'layer_1', 'event_class' => 'change-color','selection' => 'popper'])

                            <br /><br />

                        </div>    

                    </div>

                </div>



            </div>


            <div class="options_panel" id="gradients_panel">
                
                <div class="options_panel_header">
                
                    <span class="header_text">GRADIENTS OPTIONS</span>

                </div>

            </div>


            <div class="options_panel" id="patterns_panel">
                
               <div class="options_panel_header">
                
                    <span class="header_text">PATTERNS OPTIONS</span>

                </div>

                <div class="options_panel_section">
            
                    <label>LAYER 1</label>

                    <div class="color_panel_container">
                
                        @include('partials.colors', ['data_panel' => 'patterns', 'data_target' =>'layer_1', 'event_class' => 'change-color',])
                        
                    </div>   

                </div>


                <div class="options_panel_section">
            
                    <label>LAYER 2</label>

                    <div class="color_panel_container">
                
                        @include('partials.colors', ['data_panel' => 'patterns', 'data_target' =>'layer_2', 'event_class' => 'change-color',])
                        
                    </div>   

                </div>

                <div class="options_panel_section">
            
                    <label>LAYER 3</label>

                    <div class="color_panel_container">
                
                        @include('partials.colors', ['data_panel' => 'patterns', 'data_target' =>'layer_3', 'event_class' => 'change-color',])
                        
                    </div>   

                </div>

                <div class="options_panel_section">
            
                    <label>LAYER 4</label>

                    <div class="color_panel_container">
                
                        @include('partials.colors', ['data_panel' => 'patterns', 'data_target' =>'layer_4', 'event_class' => 'change-color',])
                        
                    </div>   

                </div>

            </div>


            <div class="options_panel" id="texts_panel">
                
                <div class="options_panel_header">
                
                    <span class="header_text">TEXTS OPTIONS</span>

                </div>

            </div>


            <div class="options_panel" id="numbers_panel">
                
                <div class="options_panel_header">
                
                    <span class="header_text">NUMBER OPTIONS</span>

                </div>

            </div>


            <div class="options_panel" id="graphics_panel">
                
                <div class="options_panel_header">
                
                    <span class="header_text">GRAPHICS OPTIONS</span>

                </div>
                
            </div>


            <div class="options_panel" id="sizes_panel">

                <div class="options_panel_header">
                
                    <span class="header_text">SIZES OPTIONS</span>

                </div>

            </div>

        </div>


    </div>
        
@endsection('right-pane')