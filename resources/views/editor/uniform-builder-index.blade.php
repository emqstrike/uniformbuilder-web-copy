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
                data-option='save'">
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

        </div>

    </div>

@endsection('right-pane')