<!-- Logo Dropdown -->
<script  type="text/mustache" id="logo-list">

        @{{#logo_set}}

            <div class='col-md-4'>
        
                <a class='thumbnail logo_picker' data-application-id='@{{element_id}}' data-id='@{{id}}'>

                    <img class='logo_picker' src='@{{dataUrl}}' data-application-id='@{{element_id}}' data-id='@{{id}}'>
                
                </a>

            </div>

        @{{/logo_set}}

</script>

<!-- Logo Adjustments Panel -->
<script  type="text/mustache" id="logo-controls">
    
    <div class='row'>

    </div>

    <div class='logo_sliders' data-id='@{{application_id}}'>
    
        Rotation:
        <div class='logo_slider rotation_slider' data-id='@{{application_id}}'></div>
        <br />
        
        Opacity:
        <span data-target='logo' data-label='opacity' data-id='@{{application_id}}'>100</span>% 
        <div class='logo_slider opacity_slider' data-id='@{{application_id}}'></div>
        <br />

        Scale:
        <span data-target='logo' data-label='scale' data-id='@{{application_id}}'>100</span>%
        <div class='logo_slider scale_slider' data-id='@{{application_id}}'></div>
        <br />
        
        X Position:
        <span></span>
        <div class='x_slider logo_slider' data-id='@{{application_id}}'></div>
        <br />

        Y Position:
        <span></span>
        <div data-id='@{{application_id}}' class='y_slider logo_slider'></div>

    </div>
    <br />
    
    <div class='flip-container'>
        <input type='checkbox' id='flip_logo_@{{application_id}}' value data-target='logo' data-label='flip' data-id='@{{application_id}}'> Flip Logo
        <br />
    </div>
    <br />

</script>

