<div class="options_panel" id="mod_primary_panel">

    <div class="options_panel_header">
        <span class="header_text" id="primary_options_header">PRIMARY OPTIONS</span>
    </div>

    <div class="options_panel_section" id="primary_options_container">
        
        <a href="" class="btn_tabs" data-type="smiley" onclick="$('#primary_options_colors').show(); $('#primary_options_colors_advanced').hide(); return false;"> 
            <img src="/images/sidebar/smiley.png" />
        </a>

        <a href="" class="btn_tabs" data-type="einstein" style='display: none;' onclick="$('#primary_options_colors').hide(); $('#primary_options_colors_advanced').show(); return false;">
            <img src="/images/sidebar/einstein.png"/>
        </a>

        <hr />

        <div id="primary_options_colors" style='float: left;'>
        
            <input type='text' id='primary_text' style="float: left; margin-top: -2px;"></input>
            
        </div>

        <div id="primary_options_colors_advanced" style='float: left; display: none'>
        
            <div><input type="text" id="primary_text_left" style="float: left; margin-top: -2px;"></input></div>
            <div><input type="text" id="primary_text_right" style="float: left; margin-top: -2px;"></input></div>
        
        </div>

        <div id="primary_options_patterns">
            <div></div>
        </div>

        <div id="primary_options_applications">
            <div></div>
        </div>

    </div>
</div> <!-- End Sizes Panel -->