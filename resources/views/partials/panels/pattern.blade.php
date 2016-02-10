<div class="options_panel" id="pattern_panel">
    
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

</div> <!-- End Patterns Panel -->