<!-- Logo Dropdown -->
<script  type="text/mustache" id="logo-dropdown">
    <hr />
        <div class='logo_drop btn' data-id='@{{application_id}}'>
            Choose a Logo: <i class='fa fa-caret-down'></i>
        </div>
        
        <div class='logo-controls' id='controls-@{{application_id}}' data-id='@{{application_id}}'>

    <hr />
</script>

<!-- Logo Upload Dialog -->
<script  type="text/mustache" id="logo-upload-dialog">

 <div data-id='@{{application_id}}' class='row logo-container' id='logo-container-@{{application_id}}'>
 </div>
 <hr />
 <div class='row'>
      <div col-md-12>
      <form>
          <input type='file' id='file-src-@{{application_id}}' data-id='@{{application_id}}' name='material_option_path'>
      </form>
      </div>
 </div>
 <hr />
 </script>



<!-- Logo Picker -->
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

