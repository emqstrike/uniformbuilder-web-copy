@extends('uniform-builder')

@section('left-pane')
    
    <div id="left-pane" class="pane">

        
        <div id="left-top" class="pane-top">
        

        </div>

      
        <div id="left-sidebar" class="pane-sidebar">

            <a class="btn-new sidebar-buttons new"
                data-filename='materials'
                data-status="new"
                data-option='new'>
            </a>

@if (Session::get('isLoggedIn'))
            <a class="btn-load sidebar-buttons load open-design"
                data-filename='load'
                data-option='load'>
            </a>

            <a class="btn-compare sidebar-buttons compare compare-design"
                data-filename='compare'
                data-option='compare'>
            </a>

            <a class="btn-save sidebar-buttons save open-save-design-modal"
                data-filename='save'
                data-option='save'>
            </a>
@endif

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
            <a class="btn change-view" data-view="pattern" id="view_pattern"><img src=""></a>

        </div>

    </div>


@endsection('left-pane')


@section('right-pane')
    

    <div id="right-pane" class="pane">

        
        <div id="right-top" class="pane-top">
            

        </div>

        <div id="right-sidebar" class="pane-sidebar">

            <a href="" class="sidebar-buttons materials" data-filename='materials'>
            </a>

            <a href="" class="sidebar-buttons colors" data-filename='colors'>
            </a>

            <a href="" class="sidebar-buttons patterns" data-filename='patterns'>
            </a>

            <a href="" class="sidebar-buttons gradients" data-filename='gradients'>
            </a>

            <a href="" class="sidebar-buttons texts open-team-roster-modal" data-filename='texts'>
            </a>

            <a href="" class="sidebar-buttons numbers" data-filename='numbers'>
            </a>

            <a href="" class="sidebar-buttons graphics" data-filename='graphics'>
            </a>

            <a href="" class="sidebar-buttons sizes" data-filename='sizes'>
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

                <div class="options_panel_section">

                    <button id="toggle_pattern_preview">Pattern Preview</button>
                    
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