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

            <div id="uniform_name"></div>
            <div id="uniform-price-youth"></div>
            <div id="uniform-price-adult"></div>
            <div id="uniform-price-call-for-team-pricing">(Call for Team Pricing)</div>
            <div id="saved_design_name"></div>

            <div id="order-status"></div>

            <div id="return-to-customizer">
                <button id="button-return-to-customizer">Return to Customizer</button>
            </div>

            <div id="top-left-side-toolbar">
            
            
            </div>

            <div class="canvas-views" id="main_view">
            </div>

        </div>

        <div id="change-views" style="display: none; width:0px; height: 0px; margin-top: 100000px !important;" class="old-change-views">
            
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

    <div id="property-modifiers-menu" class="hidden">
        <a href="#" class="group-pane tippy-menu-item group-1 menu-item-fabrics" data-tippy-content="FABRICS" data-item="fabrics">1</a>
        <a href="#" class="group-pane tippy-menu-item group-2 menu-item-parts" data-tippy-content="PARTS" data-item="parts">2</a>
        <a href="#" class="group-pane tippy-menu-item group-3 menu-item-inserts" data-tippy-content="INSERTS" data-item="inserts">3</a>
        <a href="#" class="group-pane group-4 menu-item-pipings">4</a>
        <a href="#" class="group-pane tippy-menu-item group-5 menu-item-letters" data-tippy-content="LETTERS" data-item="letters">5</a>
        <a href="#" class="group-pane tippy-menu-item group-6 menu-item-numbers" data-tippy-content="NUMBERS" data-item="numbers">6</a>
        <a href="#" class="group-pane tippy-menu-item group-7 menu-item-applications" data-tippy-content="APPLICATIONS" data-item="applications">7</a>
        <a href="#" class="group-pane tippy-menu-item group-8 menu-item-logo" data-tippy-content="LOGO" data-item="logo">8</a>
    </div>

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

        <!-- 

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

        -->

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

            @include('partials.panels.layers')

            @include('partials.panels.pipings')

            @include('partials.panels.randomFeeds')

        </div>

        <div id="right-main-window" class="pane-main-window save-pane special_modifiers footer_buttons_container">        

            <a class="footer-buttons change-view" data-view="colors">
                <i class="fa fa-tint" aria-hidden="true"></i>
                <br /><span>Colors</span>
            </a>

            <a class="footer-buttons change-view" data-view="patterns">
                <i class="fa fa-th" aria-hidden="true"></i>
                <br /><span>Patterns</span>
            </a>

            <a class="footer-buttons change-view" data-view="layers">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <br /><span>Applications</span>
            </a>

            <a class="footer-buttons change-view hidden" data-view="pipings">
                <i class="fa fa-bars" aria-hidden="true"></i>
                <br /><span>Pipings</span>
            </a>

            <a class="footer-buttons change-view hidden" data-view="randomFeed">
                <i class="fa fa-random" aria-hidden="true"></i>
                <br /><span>Random Feed</span>
            </a>

            <a class="footer-buttons change-view" data-view="locations" style="display: none;">

                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <br /><span>Locations</span>
                
            </a>

            <a class="footer-buttons change-view" data-view="locations-add" style="display: none;">
                <i class="fa fa-plus" aria-hidden="true"></i>
                <br /><span>Add Location</span>
            </a>

            <a class="footer-buttons change-view disabled" data-view="save">
                <i class="fa fa-floppy-o" aria-hidden="true"></i>
                <br /><span>Save Design</span>
            </a>

            <!-- 
            <a class="footer-buttons change-view disabled" data-view="open-design">
                <i class="fa fa-folder-open-o" aria-hidden="true"></i>
                <br /><span>Open Design</span>
            </a>
            -->

            <!--
            <a class="footer-buttons change-view" data-view="start-over">
                <i class="fa fa-refresh" aria-hidden="true"></i>
                <br /><span>Start Over</span>
            </a>
            -->

            <a class="footer-buttons change-view disabled" data-view="team-info" name="team-info">
                <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                <br /><span>ORDER NOW!</span>
            </a>

        </div>  

        <div id="right-main-window" class="pane-main-window save-pane special_modifiers footer_buttons_container">        

            <a class="footer-buttons change-view" data-view="front">
                F
                <br /><span>Front View</span>
            </a>

            <a class="footer-buttons change-view" data-view="back">
                B
                <br /><span>Back View</span>
            </a>

            <a class="footer-buttons change-view" data-view="left">
                L
                <br /><span>Left View</span>
            </a>

            <a class="footer-buttons change-view" data-view="right">
                R
                <br /><span>Right View</span>
            </a>

            <a class="footer-buttons change-view" data-view="zoom">
                <i class="fa fa-search"></i>
                <br /><span>Zoom</span>
            </a>

            <a class="footer-buttons change-view" data-view="home">
                <i class="fa fa-home" aria-hidden="true"></i>
                <br /><span>Home</span>
            </a>


        </div>  

        <!-- 

        <div id="right-main-window" class="pane-main-window save-pane special_modifiers">        

            <div id="design_name_container">

                <div class="usage_note">
                    If you can't finish the design now,<br />you can SAVE and continue working on it later:
                </div>
                
                <div class="save_box">

                    <a class="btn change-view save open-save-design-modal" data-view="save" id="view_save_footer"><i class="fa fa-save"></i> SAVE</a>

                </div>

                <div id="f">

                    <input id="simple_toggle" type="checkbox" checked />

                </div>

            </div>
     
        </div>

        -->

    </div>

@endsection('right-pane')