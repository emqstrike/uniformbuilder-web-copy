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

            <div class="canvas-views" id="main_view">
            </div>

        </div>

        <div id="change-views">
            
            <a class="btn change-view home" data-view="home" id="view_home"><i class="fa fa-home"></i></a>
            <a class="btn change-view zoom" data-view="zoom" id="view_zoom"><i class="fa fa-search"></i></a>    
            
            <a class="btn change-view" data-view="front" id="view_front">F</a>
            <a class="btn change-view" data-view="back" id="view_back">B</a>
            <a class="btn change-view" data-view="left"  id="view_left">L</a>
            <a class="btn change-view" data-view="right"  id="view_right">R</a>

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

            <a href="" class="sidebar-buttons applications" data-filename='applications'>
            </a>

            <a href="" class="sidebar-buttons texts" data-filename='texts'>
            </a>

            <a href="" class="sidebar-buttons numbers" data-filename='numbers'>
            </a>

            <a href="" class="sidebar-buttons graphics" data-filename='graphics'>
            </a>

            <a href="" class="sidebar-buttons sizes" data-filename='sizes'>
            </a>

            <a href="" class="sidebar-buttons attachments" data-filename='attachments'>
            </a>

            <a href="" class="sidebar-buttons mod_main" data-filename='mod_main'>
            </a>

            <a href="" class="sidebar-buttons mod_primary" data-filename='mod_primary'>
            </a>

        </div>

        <div id="right-main-window" class="pane-main-window team-color-pane team_color_pane options_panel">        

            <div class="options_panel_header">
                <span class='team_color_header'>TEAM COLORS</span>
            </div>
            <div class="team_color_picker_container">

                <div class='team_color_picker_container_group'>
                    
                    <div class="team_color_picker_item" data-id='1' data-status="closed">
                    

                        <i class="fa fa-caret-down color-caret-down" aria-hidden="true"></i>

                    </div>

                    <div class='team_color_picker_item_label'>
                        
                    </div>

                </div>            

                <div class='team_color_picker_container_group'>     

                    <div class="team_color_picker_item" data-id='2' data-status="closed">

                        <i class="fa fa-caret-down color-caret-down" aria-hidden="true"></i>
                        
                    </div>

                    <div class='team_color_picker_item_label'>
                        
                    </div>

                </div>

                <div class='team_color_picker_container_group'>

                    <div class="team_color_picker_item" data-id='3' data-status="closed">

                        <i class="fa fa-caret-down color-caret-down" aria-hidden="true"></i>
                        
                    </div>

                    <div class='team_color_picker_item_label'>
                        
                    </div>

                </div>

                <div class='team_color_picker_container_group'>

                    <div class="team_color_picker_item" data-id='4' data-status="closed">

                        <i class="fa fa-caret-down color-caret-down" aria-hidden="true"></i>
                        
                    </div>

                    <div class='team_color_picker_item_label'>
                        
                    </div>

                </div>

            </div>

        </div> 

        </div>

        <div id="right-main-window" class="pane-main-window">

            @include('partials.panels.materials')

            @include('partials.panels.colors')

            @include('partials.panels.patterns')

            @include('partials.panels.gradients')

            @include('partials.panels.applications')

            @include('partials.panels.texts')

            @include('partials.panels.numbers')

            @include('partials.panels.graphics')

            @include('partials.panels.sizes')

            @include('partials.panels.attachments')

            @include('partials.panels.mod_main')

            @include('partials.panels.mod_primary')

        </div>

        <div id="right-main-window" class="pane-main-window save-pane special_modifiers">        

            <div id="design_name_container">

                <div class="usage_note">
                    If you can't finish the design now,<br />you can SAVE and continue working on it later:
                </div>
                
                <div class="save_box">

                    <!-- 
                    <label>Save As: </label> <span id="design_name_input"></span> &nbsp;
                    <i class="fa fa-pencil-square-o"></i>    
                    -->

                    <a class="btn change-view save open-save-design-modal" data-view="save" id="view_save_footer"><i class="fa fa-save"></i> SAVE</a>

                </div>

                <div id="simple_toggle_container">

                    <input id="simple_toggle" type="checkbox" checked />

                </div>

            </div>
     
        </div>


    </div>

@endsection('right-pane')