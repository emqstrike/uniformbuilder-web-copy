<div id="main_viewport" class="row main_viewport">

    <div id="left-pane-column" class="left-pane-column-full">
        <!-- Main Uniform Window -->
        @yield('left-pane')
    </div>

</div>

<div id="main-row" class="row">

    <div id="right-pane-column" class="offset-md-6 col-md-6 uk-hidden">
        <!-- Customizer Sidebar editor -->
        @yield('right-pane')
    </div>

</div>