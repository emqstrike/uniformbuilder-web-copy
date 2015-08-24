@extends('uniform-builder')

@section('left-pane')
    
    <div id="left-pane" class="pane">

        
        <div id="left-top" class="pane-top">
            
            ///

        </div>

      
        <div id="left-sidebar" class="pane-sidebar">
            
                            
            <a class="sidebar-buttons" data-filename='materials'>
                <img src="images/sidebar/new.png">
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
        
              <canvas class="canvas-views" id="front_view" width="447" height="496">
                    
              </canvas>          

              <canvas class="canvas-views" id="back_view" width="447" height="496">

              </canvas>          

              <canvas  class="canvas-views" id="left_view" width="447" height="496">

              </canvas>

              <canvas class="canvas-views" id="right_view" width="447" height="496">

              </canvas>
    
        </div>

        <div id="camera-views" class="">
    
            <a class="btn change-view" data-view="front" id="view_front"><img src=""></a>
            <a class="btn change-view" data-view="back"  id="view_back"><img src=""></a>
            <a class="btn change-view" data-view="left"  id="view_left"><img src=""></a>
            <a class="btn change-view" data-view="right" id="view_right"><img src=""></a>

        </div>
    

    </div>


@endsection('left-pane')


@section('right-pane')
    

    <div id="right-pane" class="pane">

        
        <div id="right-top" class="pane-top">
            
            ///

        </div>

        <div id="right-sidebar" class="pane-sidebar">


            <a href="" class="sidebar-buttons" data-filename='materials'>

                <img src="images/sidebar/materials.png">

            </a>

            <a href="" class="sidebar-buttons" data-filename='colors'>

                <img src="images/sidebar/colors.png">

            </a>

            <a href="" class="sidebar-buttons" data-filename='gradients'>

                <img src="images/sidebar/gradients.png">

            </a>

            <a href="" class="sidebar-buttons" data-filename='patterns'>

                <img src="images/sidebar/patterns.png">

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
                
                    <label>Team Color</label> &nbsp; &nbsp; <button class="btn btn-default">Color 1</button> &nbsp; &nbsp; <button class="btn btn-default">Color 2</button>

                </div>

                <div class="options_panel_section">
                
                    <label>Base Color</label>  &nbsp; &nbsp; <button class="btn btn-default">Color</button> &nbsp; &nbsp; <button class="btn btn-default">Gradient</button>  &nbsp; &nbsp; <button class="btn btn-default">Pattern</button>

                </div>

                <div class="options_panel_section" id="color_panel_section">

                    <div class="color_panel_container">
                
                        @include('partials.colors', ['data_target' =>'pants', 'event_class' => 'change-color',])

                        <br /><br />

                    </div>    

                </div>

                <div class="options_panel_section">
                
                    <label>Piping 1</label>  &nbsp; &nbsp; <button class="btn btn-default">Color</button> &nbsp; &nbsp; <button class="btn btn-default">Gradient</button>  &nbsp; &nbsp; <button class="btn btn-default">Pattern</button>

                </div>

                <div class="options_panel_section">
                
                    <label>Piping 2</label>  &nbsp; &nbsp; <button class="btn btn-default">Color</button> &nbsp; &nbsp; <button class="btn btn-default">Gradient</button>  &nbsp; &nbsp; <button class="btn btn-default">Pattern</button>

                </div>

                <div class="options_panel_section">
                
                    <label>Sleeve</label>  &nbsp; &nbsp; <button class="btn btn-default">Color</button> &nbsp; &nbsp; <button class="btn btn-default">Gradient</button>  &nbsp; &nbsp; <button class="btn btn-default">Pattern</button>

                </div>

                <div class="options_panel_section">
                
                    <label>Sleeve Piping</label>  <a class= "btn btn-default" href = "#" rel= "popover" data-placement = "top" data-popover-content = "#myPopover" >Show</a>

                    <div id="myPopover" class="hide">


                        <div class="color_panel_container" id="popover_color_panel">
                    
                            @include('partials.colors', ['data_target' =>'pants', 'event_class' => 'change-color',])

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