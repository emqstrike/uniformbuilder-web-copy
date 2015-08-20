@extends('uniform-builder')

@section('left-pane')
    
    <div id="left-pane" class="pane">

        
        <div id="left-top" class="pane-top">
            
            ///

        </div>

        <div id="left-sidebar" class="pane-sidebar">
            
                            
            <a href="" class="sidebar-buttons" data-filename='materials'>
                <img src="images/sidebar/new.png">
            </a>

            <a href="" class="sidebar-buttons" data-filename='colors'>
                <img src="images/sidebar/load.png">
            </a>

            <a href="" class="sidebar-buttons" data-filename='gradient'>
                <img src="images/sidebar/compare.png">
            </a>

            <a href="" class="sidebar-buttons" data-filename='patterns'>
                <img src="images/sidebar/save.png">
            </a>


        </div>

        <div id="left-main-window" class="pane-main-window">
            
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
                
                materials

            </div>


            <div class="options_panel" id="colors_panel">
                
                colors

            </div>


            <div class="options_panel" id="gradients_panel">
                
                gradients

            </div>


            <div class="options_panel" id="patterns_panel">
                
                patterns

            </div>


            <div class="options_panel" id="texts_panel">
                
                texts

            </div>


            <div class="options_panel" id="numbers_panel">
                
                numbers

            </div>


            <div class="options_panel" id="graphics_panel">
                
                
            
            </div>


            <div class="options_panel" id="sizes_panel">
                

            </div>


        </div>


    </div>
        
@endsection('right-pane')