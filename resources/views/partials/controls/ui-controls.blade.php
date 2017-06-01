
<!-- Start Mascot UI's -->

    <!-- Mascot Dropdown -->
    <script  type="text/mustache" id="mascot-dropdown">
        
        <hr />

            <div class='mascot_drop btn' data-id='@{{application_id}}'>
                Choose a Mascot: <i class='fa fa-caret-down'></i>
            </div>
            
            <div class='mascot-controls' id='controls-@{{application_id}}' data-id='@{{application_id}}'>

        <hr />
        
    </script>

    <!-- Mascot Upload Dialog -->
    <script  type="text/mustache" id="mascot-upload-dialog">

        <div data-id='@{{application_id}}' class='row mascot-container' id='mascot-container-@{{application_id}}'>
        </div>

    </script>

    <!-- Mascot Picker -->
    <script  type="text/mustache" id="mascot-list">

            @{{#mascot_set}}

                <div class='col-md-4'>
            
                    <a class='thumbnail mascot_picker' data-application-id='@{{element_id}}' data-id='@{{id}}'>

                        <img class='mascot_picker' src='@{{icon}}' data-application-id='@{{element_id}}' data-id='@{{id}}'>
                    
                    </a>

                </div>

            @{{/mascot_set}}

    </script>

    <!-- Mascot Adjustments Panel -->
    <script  type="text/mustache" id="mascot-controls">

        <div class="mascot_color_picker_container" data-id='@{{application_id}}'>
        </div>

        <br />
    
        <div class='mascot_sliders' data-id='@{{application_id}}'>

            Size:

            <div class='radio_sizes'>
                <div class="radio">
                  <label>
                    <input type="radio" name="mascot_sizes" id="optionsRadios1" value="1" data-id='@{{application_id}}' checked>
                    1
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="mascot_sizes" id="optionsRadios2" value="2" data-id='@{{application_id}}'>
                    2
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="mascot_sizes" id="optionsRadios3" value="3" data-id='@{{application_id}}'>
                    3
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="mascot_sizes" id="optionsRadios3" value="4" data-id='@{{application_id}}'>
                    4
                  </label>
                </div>
            </div>



            <!--  

            Rotation:
            <div class='mascot_slider rotation_slider' data-id='@{{application_id}}'></div>
            <br />
            
            Opacity:
            <span data-target='mascot' data-label='opacity' data-id='@{{application_id}}'>100</span>% 
            <div class='mascot_slider opacity_slider' data-id='@{{application_id}}'></div>
            <br />

            Scale:
            <span data-target='mascot' data-label='scale' data-id='@{{application_id}}'>100</span>%
            <div class='mascot_slider scale_slider' data-id='@{{application_id}}'></div>
            <br />
            
            X Position:
            <span></span>
            <div class='x_slider mascot_slider' data-id='@{{application_id}}'></div>
            <br />

            Y Position:
            <span></span>
            <div data-id='@{{application_id}}' class='y_slider mascot_slider'></div>
            <br />

        </div>
        <br />
        
        <div class='flip-container'>
            <input type='checkbox' id='flip_mascot_@{{application_id}}' value data-target='mascot' data-label='flip' data-id='@{{application_id}}'> Flip Mascot
            <br />
        </div>
        <br />

        -->

    </script>

<!-- End Mascot UI's -->

<!-- Start Logo UI's -->

    <!-- Logo Dropdown -->
    <script  type="text/mustache" id="logo-dropdown">
        <hr />
            <div class='logo_drop btn' data-id='@{{application_id}}'>
                Choose a Logo / Image: <i class='fa fa-caret-down'></i>
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

<!-- End Logo UI's -->



<!-- Start Typography UI's -->

    <script  type="text/mustache" id="text-ui">
       
        <hr />

        <div class='ub_label'>Preview Text</div>
        <input type='text' class='applications player_number' data-application-id='@{{application_id}}' value='@{{sample_text}}'>
        <br /><br />

        <div class='ub_label'>Font Style</div>
        <div class='font_style_drop' style='font-family:@{{first_font_name}};' data-id='@{{application_id}}' data-font-id='@{{first_font_id}}' data-font-name='@{{first_font_name}}'>
            @{{first_font_name}}<i class='fa fa-caret-down'></i>
        </div>

        <div class='ub_label'>Accent</div><div class='accent_drop' data-id='@{{application_id}}'>
            Choose an Accent...<i class='fa fa-caret-down'></i>
        </div>

        <div class='tab_container_color' data-id='@{{application_id}}'>


            <div class='btn ub active' data-id='@{{application_id}}' data-option='colors'>
                Colors
            </div>
            
            <div class='btn ub' data-option='gradients' data-id='@{{application_id}}'>
                Gradients
            </div>

            <div class='btn ub' data-id='@{{application_id}}' data-option='patterns'>
                Patterns
            </div>


            <div class='colors_container colors' data-id='@{{application_id}}' data-option='colors'>
                
                <div class='ub_label'>Base Color</div><div class='color_drop' data-id='@{{application_id}}'>
                    Choose a Color...<i class='fa fa-caret-down'></i>
                </div>
                <div class='other_color_container' data-id='@{{application_id}}'></div>

            </div>

            <div class='colors_container gradients' data-id='@{{application_id}}' data-option='gradients'>
                Gradients
            </div>

            <div class='colors_container patterns' data-id='@{{application_id}}' data-option='patterns'>
                Patterns
            </div>

        </div>

        <div class='row'>
        </div>
        
        <div class='logo_sliders' data-id='@{{application_id}}'>

            Font Size:
            <span data-target='logo' data-label='font_size' data-id='@{{application_id}}'>100</span>px
            <div class='logo_slider font_size_slider' data-id='@{{application_id}}'></div>
            <br />

            Size:

            <div class='radio_sizes'>

                @{{#sizes}}
                
                    <div class="radio">
                
                      <label>
                
                        <input type="radio" name="text_sizes" id="optionsRadios@{{size}}" value="@{{size}}" data-id='@{{application_id}}' checked>
                        @{{size}}
                
                      </label>
                
                    </div>
                
                @{{/sizes}}

            </div>

            Rotation:
            <div class='logo_slider rotation_slider' data-id='@{{application_id}}'></div>
            <br />
            
            Opacity: 
            <span data-target='logo' data-label='opacity' data-id='@{{application_id}}'>100</span>%
            <div class='logo_slider opacity_slider' data-id='@{{application_id}}'></div>
            <br />

            Scale Width:
            <span data-target='logo' data-label='scale_x' data-id='@{{application_id}}'>100</span>%
            <div class='logo_slider scale_slider_x' data-id='@{{application_id}}'></div>
            <br />
            
            Scale Height:
            <span data-target='logo' data-label='scale_y' data-id='@{{application_id}}'>100</span>%
            <div class='logo_slider scale_slider_y' data-id='@{{application_id}}'></div>
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
        <hr />

    </script>

<!-- End Typography UI's -->

    

<!-- UI V1 -->

    <script type="text/mustache" id="team-color-main-picker">
    
        <div class="team-color-main-picker-container">
            
            <em>

                Here...

            </em>

        </div>

    </script>

<!-- End UI V1 -->

    <script type="text/mustache" id="m-color-picker-buttons">

        @{{#colors}}
            
            <div class='color_item_group'>
                <button class="grow color_picker_item" data-color="@{{name}}" data-color-code="@{{color_code}}" data-hex="#@{{hex_code}}"  style="background-color: #@{{hex_code}};">
                    @{{color_code}}
                </button>

                <div>
                    @{{abbr}}
                </div>
            </div>

        @{{/colors}}

    </script>

<!-- Gender Picker -->

    <script type="text/mustache" id="m-picker-items">

        @{{#picker_items}}
            
            <div class="main-picker-items grow @{{disabledClass}}" data-picker-type="gender" data-item="@{{name}}">

                <img src="/images/main-ui/pickers/@{{code}}.png?v={{$asset_version}}">

                <span class="main-picker-item-caption">
                    @{{name}}
                </span>

            </div>

        @{{/picker_items}}

        <div class="main-picker-items grow disabled" style="display: none;">

        </div>

    </script>

<!-- End Gender Picker -->

<!-- Sports Picker -->

    <script type="text/mustache" id="m-picker-items-sport">

        @{{#picker_items}}
            
            <div class="main-picker-items sports grow @{{disabledClass}}" data-gender="@{{gender}}" data-picker-type="sports" data-item="@{{name}}" title="@{{name}} Uniforms @{{tooltip}}">

            @if (@tooltip != "")
                <div class="cSoon">@{{tooltip}}</div>
            @endif
                <img src="/images/main-ui/pickers/@{{gender}}/@{{code}}.png?v={{$asset_version}}">

                <span class="main-picker-item-caption">
                    @{{name}}
                </span>

            </div>

        @{{/picker_items}}


        @{{#apparel}}
            
            <div class="main-picker-items apparel grow @{{disabledClass}}" data-gender="@{{gender}}" data-picker-type="sports" data-item="@{{name}}" title="@{{name}} Uniforms @{{tooltip}}">

            @if (@tooltip != "")
                <div class="cSoon">@{{tooltip}}</div>
            @endif
                <img src="/images/main-ui/pickers/@{{gender}}/@{{code}}.png?v={{$asset_version}}">

                <span class="main-picker-item-caption">
                    @{{name}}
                </span>

            </div>

        @{{/apparel}}

    </script>

<!-- End Sports Pickers -->

<!-- Uniforms Picker -->

    <script type="text/mustache" id="m-picker-items-uniforms">

        @{{#picker_items}}
            
            <div class="main-picker-items grow @{{sport}}" data-picker-type="uniforms" data-option="@{{neck_option}}" data-item="@{{name}}" data-id="@{{id}}">

                <img src="@{{thumbnail_path}}?v={{$asset_version}}">

                <span class="main-picker-item-caption"> 
                    <span class="type"></span>
                    <strong class="uniform-name">@{{name}}</strong> <br />
                    <span class="callForTeamPricing">Call for Team Pricing</span>
                    <span class="calculatedPrice">@{{calculatedPrice}}</span>
                    <span class="youthPrice @{{parsedPricingTable.youth_sale}}">
                        Youth from <strong>$@{{parsedPricingTable.youth_min_msrp}}</strong>
                    </span>
                    <span class="youthPriceSale @{{parsedPricingTable.youth_sale}}">
                        Youth now from <strong>$@{{parsedPricingTable.youth_min_web_price_sale}}</strong> <div class="sale-badge">Sale!</div>
                    </span>
                    
                    <span class="adultPrice @{{parsedPricingTable.adult_sale}}">
                        <span class='adult-label'>Adult from</span> <strong>$@{{parsedPricingTable.adult_min_msrp}}</strong>
                    </span>

                    <span class="adultPriceSale @{{parsedPricingTable.adult_sale}}">
                        <span class='adult-label'>Adult now from </span><strong>$@{{parsedPricingTable.adult_min_web_price_sale}}</strong> <div class="sale-badge">Sale!</div>
                    </span>

                    <strong class="type">@{{#uniform_type}}@{{uniform_application_type}}@{{/uniform_type}}</strong> <!-- <strong class="type">@{{block_pattern}}</strong> -->
                </span> 

            </div>

        @{{/picker_items}}

    </script>

<!-- End Uniforms Pickers -->

<!-- Uniforms Picker -->

    <script type="text/mustache" id="m-picker-items-search-results">

        @{{#picker_items}}
            
            <div class="main-picker-items grow" data-picker-type="search-result" data-id = "@{{id}}" data-uniform-type = "@{{type}}" data-item="@{{name}}">

                <img width='280' src="@{{thumbnail}}?v={{$asset_version}}">

                <span class="main-picker-item-caption">
                    @{{name}}
                </span>

            </div>

        @{{/picker_items}}

        <div class="main-picker-items grow disabled">

        </div>

        <div class="main-picker-items grow disabled">

        </div>

        <div class="main-picker-items grow disabled">

        </div>

    </script>

<!-- End Uniforms Pickers -->

<!-- Pattern Picker -->
    
    <script type="text/mustache" id="m-pattern-popup">

        <div id="primaryPatternPopup" data-status="hidden">

            <div class="header">

                PATTERNS

                <div class="close-popup">
                        
                    <i class="fa fa-times" aria-hidden="true"></i>

                </div>
             
            </div>
            
            <div class="main-content">
                
                <div class="patternPopupResults">

                    @{{#patterns}}

                        <div class="item grow" style="background-image: url('@{{icon}}')" data-pattern-id="@{{id}}">
                            <div class="name">@{{name}}</div>
                        </div>

                    @{{/patterns}}

                </div>

            </div>

            <div class="footer">
                
                

            </div>

        </div>

    </script>


<!-- End Pattern Picker -->

<!-- Pattern Picker -->
    
    <script type="text/mustache" id="m-font-popup">

        <div id="primaryFontPopup" data-status="hidden">

            <div class="header">

                Font ( <strong>@{{applicationType}}</strong> )

                <div class="close-popup">
                        
                    <i class="fa fa-times" aria-hidden="true"></i>

                </div>
             
            </div>
            
            <div class="main-content">
                
                <div class="fontPopupResults">

                    @{{#fonts}}

                        <div class="item grow" style="font-family: @{{name}}" data-font-id="@{{id}}">
                            <span class='inside-label'>@{{caption}}</span>
                            <div class="name" style="padding-top:@{{paddingTop}} ;font-size: @{{sampleSize}}">@{{sampleText}}</div>
                        </div>

                    @{{/fonts}}

                </div>

            </div>

            <div class="footer">
                
                

            </div>

        </div>

    </script>


<!-- End Pattern Picker -->

<!-- Quick Registration Popup -->
    
    <script type="text/mustache" id="m-quick-registration-popup">

        <div id="primaryQuickRegistrationPopup" data-status="hidden">

            <div class="header">

                <span class="text">Quick Registration</span>

                <div class="close-popup">
                        
                    <i class="fa fa-times" aria-hidden="true"></i>

                </div>
             
            </div>
            
            <div class="main-content">

                <br />

                <em class="instructions">You're not logged in, please enter your email so we can create an account for you. A temporary password will be emailed to you.</em> <br /><br />

                <!-- <label class="quickRegistrationEmail">Email:</label>
                <input type="email" name="quickRegistrationEmail" class="quickRegistrationEmail" /><br /> -->

                <div class="form-group form-group-sm input-group quickEmailContainer">
                    <span class="input-group-addon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
                    <input type="email" name="quickRegistrationEmail" class="form-control col-sm-2 quickRegistrationEmail" placeholder="Email Address">
                </div>

                <div class="form-group form-group-sm input-group quickPasswordContainer">
                    <span class="input-group-addon"><i class="fa fa-key" aria-hidden="true"></i></span>
                    <input type="password" name="quickRegistrationPassword" class="form-control col-sm-2 quickRegistrationPassword">
                </div>

                <em class="message"></em>

                <br /><br /><br /><br />
                

            </div>

            <div class="footer">

                <span class="login-here"><a class="login-link">Already have an account?</a></span> <span class="next">Next</span>

            </div>

        </div>

    </script>


<!-- End Quick Registration Popup -->

<!-- Pattern Picker -->
    
    <script type="text/mustache" id="m-accent-popup">

        <div id="primaryAccentPopup" data-status="hidden">

            <div class="header">

                ACCENTS

                <div class="close-popup">
                        
                    <i class="fa fa-times" aria-hidden="true"></i>

                </div>
             
            </div>
            
            <div class="main-content">
                
                <div class="accentPopupResults">

                    @{{#accents}}

                        <div class="item grow" style="background-image: url(/images/sidebar/@{{thumbnail}})" data-accent-id="@{{id}}">
                            <div class="name" style="">@{{title}}</div>
                        </div>

                    @{{/accents}}

                </div>

            </div>

            <div class="footer">
                
                

            </div>

        </div>

    </script>

<!-- End Pattern Picker -->

<!-- Mascot Picker -->
    
    <script type="text/mustache" id="m-mascot-popup">

         <div id="primaryPatternPopup" data-status="hidden">

            <div class="header">

                <div class="popup_header">

                    Mascots

                </div>

                <div class="mascot_search">

                    <input class="mascot_search" type="text" placeholder="Search and Press Enter..." />

                </div>

                <div class="close-popup">
                        
                    <i class="fa fa-times" aria-hidden="true"></i>

                </div>
             
            </div>
            
            <div class="main-content">

                <div class="categories">

                    <!--     <span class="category_item" data-category="all">All</span> -->
                    @{{#categories}}
                    <span class="category_item" data-category="category-@{{id}}">@{{name}}</span>
                    @{{/categories}}

                </div>
                
                <div class="patternPopupResults">

                    @{{#mascots}}

                        <div class="item grow all @{{name}} @{{category}} category-@{{mascot_category_id}}" style="background-image: url('@{{icon}}')" data-mascot-id="@{{id}}">
                            <div class="name">@{{name}}</div>
                        </div>

                    @{{/mascots}}

                </div>

            </div>

            <div class="footer">
                
                

            </div>

        </div>
    </script>


<!-- End Mascot Picker -->

<!-- New Mascot Picker -->

    <script type="text/mustache" id="m-new-mascot-popup-categories">

        <span class="category_item back" data-category="back"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</span>

        @{{#categories}}
            <span class="category_item" data-category-name="@{{name}}" data-category="@{{id}}">@{{name}}</span>
        @{{/categories}}

    </script>            

    <script type="text/mustache" id="m-new-mascot-items">

        @{{#mascots}}

        <div class="item grow all @{{name}} @{{category}} category-@{{mascot_category_id}}" style="background-image: url('@{{icon}}')" data-mascot-id="@{{id}}">
            <div class="name">@{{name}}</div>
        </div>

        @{{/mascots}}

    </script>
    
    <script type="text/mustache" id="m-new-mascot-popup">

         <div id="primaryMascotPopup" data-status="hidden">

            <div class="header">

                <div class="top">

                    <div class="popup_header">Mascots </div>
                    <div class="close-popup"> <i class="fa fa-times" aria-hidden="true"></i> </div>

                </div>

                <div class="bottom">

                    <div class="tabs">

                        <span class="mascot-tab tab active" data-button="browse">Browse</span>
                        <span class="mascot-tab tab" data-button="upload">Upload</span>

                    </div>

                    <div class="mascot_search">

                        <input class="mascot_search" type="text" placeholder="Search and Press Enter..." />

                    </div>
                    
                </dib>

             
            </div>
            
            <div class="main-content">

                <div class="upload">
                    
                    <h4>UPLOAD CUSTOM LOGO / ARTWORK REQUEST</h4>

                    <div class="row">
                        
                        <div class="col-md-6 col1">
                    
                            <img id ="preview" src="/images/uiV1/upload1.png" /> <br />

                            <span class="file-input">

                                <input id="custom-artwork" name="file" type="file" multiple />

                            </span>

                            <em class="unsupported-file"></em>

                        </div>

                        <div class="col-md-6 col2">
                        
                            <ol>
                                <li>Upload logo using the form on the left, at least (512px x 512px)</li>
                                <li>A temporary placeholder (PL Logo), will be used in the uniform while our Graphic Artists prepare your logo.</li>
                                <li>You will receive a notification via email once it is prepared. </li>
                            </ol>

                            <div class="button_footer">
                                <span class="ok_btn" data-status="processing">Processing...  <img src="/images/loading.gif" /></span> <span class="cancel_btn close-popup">Cancel</span>    
                            </div>
                            
                             
                        </div>

                    </div>

                </div>


                <div class="groups_categories">
                    
                    <!-- <span class="groups_category_item all" data-category="all">All</span> -->

                    @{{#groups_categories}}
                    <span class="groups_category_item" data-category-name="@{{name}}" data-category="@{{id}}">@{{name}}</span>
                    @{{/groups_categories}}

                </div>

                <div class="categories">
                    <span class="category_item back" data-category="back"><i class="fa fa-arrow-left" aria-hidden="true"></i> Back</span>

                    @{{#categories}}
                    <span class="category_item" data-category="category-@{{id}}">@{{name}}</span>
                    @{{/categories}}

                </div>
                
                <div class="patternPopupResults">

                    @{{#mascots}}

                    <div class="item grow all @{{name}} @{{category}} category-@{{mascot_category_id}}" style="background-image: url('@{{icon}}')" data-mascot-id="@{{id}}">
                        <div class="name">@{{name}}</div>
                    </div>

                    @{{/mascots}}


                </div>

            </div>

            <div class="footer">
                
            </div>

        </div>
    </script>


<!-- End New Mascot Picker -->

<!-- Tail Sweep Picker -->
    
    <script type="text/mustache" id="m-tailsweep-popup">

        <div id="primaryTailSweepPopup" data-status="hidden">

            <div class="header">

                Tailsweeps

                <div class="close-popup">
                        
                    <i class="fa fa-times" aria-hidden="true"></i>

                </div>
             
            </div>
            
            <div class="main-content">
                
                <div class="tailSweepPopupResults">

                    @{{#tailsweeps}}

                        <div class="item grow" style="background-image: url(/images/tailsweeps/thumbnails/@{{thumbnail}})" data-tailsweep-code="@{{code}}" data-tailsweep-id="@{{id}}">
                            <div class="name" style="">@{{title}}</div>
                        </div>

                    @{{/tailsweeps}}

                </div>

            </div>

            <div class="footer">
                
                

            </div>

        </div>

    </script>

<!-- End Tail Sweep Picker -->

<!-- Tail Sweep Picker w/ Preview -->
    
    <script type="text/mustache" id="m-tailsweep-popup-with-preview">

        <div id="primaryTailSweepPopup" data-status="hidden">

            <div class="header">

                Tailsweeps

                <div class="close-popup">
                        
                    <i class="fa fa-times" aria-hidden="true"></i>

                </div>

                  <div class="size-container">

                    <span class="container-label">Select Tailsweep Size: </span>

<!--                         
                    <span class="sizeButton" data-size="short">Short</span>
                    <span class="sizeButton active defaultShadow" data-size="medium">Medium</span>
                    <span class="sizeButton" data-size="long">Long</span>
-->
                    
                    <span class="sizeButton" data-size="1">1</span>
                    <span class="sizeButton" data-size="2">2</span>
                    <span class="sizeButton" data-size="3">3</span>
                    <span class="sizeButton" data-size="4">4</span>
                    <span class="sizeButton" data-size="5">5</span>
                    <span class="sizeButton" data-size="6">6</span>
                    <span class="sizeButton" data-size="7">7</span>
                    <span class="sizeButton" data-size="8">8</span>
                    <span class="sizeButton" data-size="9">9</span>
                    <span class="sizeButton" data-size="10">10</span>
                    <span class="sizeButton" data-size="11">11</span>
                    <span class="sizeButton" data-size="12">12</span>

                </div>
             
            </div>

            <div class="main-content">

                
                
                <div class="tailSweepPopupResults">

                    @{{#tailsweeps}}

                        <div class="item grow" data-tailsweep-code="@{{code}}" data-tailsweep-id="@{{id}}">

                            <div class="text-preview" data-short="@{{short}}" data-medium="@{{medium}}" data-long="@{{long}}" data-tailsweep-code="@{{code}}" data-sample-text="@{{sampleText}}">@{{sampleText}}@{{medium}}</div>

                            <div class="name" style="">@{{title}}</div>
                            
                        </div>

                    @{{/tailsweeps}}

                </div>

            </div>

            <div class="footer">
                
              

            </div>

        </div>

    </script>

<!-- End Tail Sweep Picker w/ Preview -->

<!-- Sizes Circle Button -->

    <script type="text/mustache" id="m-circle-sizes">

        <span class="adult-sizes">ADULT SIZES:</span>
        
        @{{#adult}}
            <span data-status="off" data-size="@{{.}}" class="size">@{{.}}</span>
        @{{/adult}}

        <br />

        <span class="youth-sizes">YOUTH SIZES:</span>

        @{{#youth}}
            <span data-status="off" data-size="@{{.}}" class="size">@{{.}}</span>
        @{{/youth}}

    </script>

<!-- End Sizes Circle Button-->

<!-- Tab Buttons Container -->

    <script type="text/mustache" id="m-tabButtons-sizes">

        <span class='adult-header'>Adult Sizes: </span>
        
        @{{#adult}}
            <span class="tabButton" data-category="adult" data-size="@{{.}}">@{{.}}</span>
        @{{/adult}}

        <span class='youth-header'>Youth Sizes: </span>

        @{{#youth}}
            <span class="tabButton" data-category="youth" data-size="@{{.}}">@{{.}}</span>
        @{{/youth}}

    </script>

<!-- End Tab Buttons Container -->

<!-- Roster Table -->
    
    <script type="text/mustache" id="m-roster-table">

        @{{#tabs}}
        <div class="tab" data-size="@{{.}}">

            <table class="roster-table" align="center" data-size="@{{.}}">
                            
                <tr class="thead">
                    
                    <th class='count'></th><th class="thnumber">Size</th><th class="wide thlastname">Last Name</th><th class="thnumber thPlayerNumberInput">Number</th><th class="thnumber">Quantity</th><th  class="wide sleevetype">Sleeve Type</th><th class="wide lastnameapplication">Last Name Application</th><th class="action"></th>

                </tr>

            </table>

                <br />

                <span class="add-player" data-size="@{{.}}">

                    <i class="fa fa-plus-circle" aria-hidden="true"></i> Add Player
                </span>

            </div>
            @{{/tabs}}

    </script>

<!-- End Roster Table -->

<!-- Roster Table Field -->

    <script type="text/mustache" id="m-roster-table-field">

                <tr class="roster-row" data-size="@{{size}}" data-index="@{{index}}">
                    <td>@{{index}}</td>
                    
                    <td>
                        <input type="text" name="size" value="@{{size}}" class="size" disabled />
                    </td>
                    
                    <td class="PlayerLastNameInput">
                        <input type="text" name="lastname" class="lastname" maxlength="12" value="@{{name}}" />
                    </td>

                    <td class="PlayerNumberInput">
                        <input type="text" name="number" value="@{{number}}" class="number" maxlength="5" />
                    </td>

                    <td>
                       <input type="text" name="quantity" value="1" class="quantity" maxlength="5" />  
                    </td>

                    <td class="sleevetype">
                        <select class="sleeve-type">
                            <option value="Motion Cut">Motion Cut</option>
                            <option value="Quarterback Cut">Quarterback Cut</option>
                            <option value="Lineman Cut">Lineman Cut</option>
                        </select>
                    </td>

                    <td class="lastnameapplication">
                        <select class="lastname-application">
                            <option value="None">None</option>
                            <option value="Directly To Jersey">Directly To Jersey</option>
                            <option value="Nameplate">Nameplate</option>
                        </select>
                    </td>
                    <td>
                        <span class="clear-row" data-index="@{{index}}" data-size="@{{size}}">
                            <i class="fa fa-times-circle" aria-hidden="true"></i>
                        </span>
                    </td>

                </tr>
    </script>   

<!-- End Roster Table Field -->

<!-- Orders Table -->

    <script type="text/mustache" id="m-orders-table">

        <br />

        <table class="data-table">
           <thead>
                <tr class="header">

                    <td>Date</td>
                    <td>Time</td>
                    <td>Order ID</td>
                    <td>Thumbnails</td>
                    <td>Client</td>
                    <td>Status</td>
                    <td>Submitted</td>
                    <td>&nbsp;</td>

                </tr> 

           </thead>
            
           <tbody>
                @{{#orders}}

                    <tr class="saved-order-row" data-id="@{{id}}"> 
                        <td>@{{created_at}}</td>
                        <td>@{{created_at_time}}</td>
                        <td>
                            <strong>@{{order_id}}</strong> <br />
                        </td>
                        <td class="order-info">

                            @{{#items}}

                                <strong> @{{description}}</strong> / <a href="@{{design_sheet}}" target="_new">View PDF</a> <br /><br />
                                
                                <img class="thumbs" src="@{{thumbnails.front_view}}" data-file="@{{thumbnails.front_view}}" />
                                <img class="thumbs" src="@{{thumbnails.left_view}}"  data-file="@{{thumbnails.left_view}}"  />
                                <img class="thumbs" src="@{{thumbnails.right_view}}" data-file="@{{thumbnails.right_view}}" />
                                <img class="thumbs" src="@{{thumbnails.back_view}}"  data-file="@{{thumbnails.back_view}}"  />

                                <br />

                            @{{/items}}

                        </td>
                        <td>@{{client}}</td>
                        <td>@{{status}}</td>
                        <td>@{{submitted}}</td>
                        
                        <td class="action">

                            <span class="action-button edit" data-id="@{{id}}" data-order-id="@{{order_id}}"><i class="fa fa-eye" aria-hidden="true"></i> Edit Order </span> <br />
                            <span class="action-button delete" data-id="@{{id}}" data-order-id="@{{order_id}}"><i class="fa fa-remove" aria-hidden="true"></i> Delete Order </span>
                            
                        </td>

                    </tr>

                @{{/orders}} 

           </tbody>
           <tfoot>                
                <td></td>
                <td class="data-table-filter-hide"></td>               
                <td class="data-table-filter-hide"></td>
                <td class="data-table-filter-hide"></td>
                <td></td>
                <td></td>
                <td class="data-table-filter-hide"></td>
                <td class="data-table-filter-hide"></td>

           </tfoot>
            

        </table>

    </script>   

<!-- End Orders Table -->

<!-- Message Popup -->

    <script type="text/mustache" id="m-message-popup">

        <div id="primaryMessagePopup" data-status="hidden">

            <div class="header">

                Message (@{{type}})

                <div class="close-popup">
                        
                    <i class="fa fa-times" aria-hidden="true"></i>

                </div>
             
            </div>
            
            <div class="main-content">
                
                <div class="label">From: </div>
                <div class="value">@{{sender_name}}</div>
                <div class="label">Subject: </div>
                <div class="value">@{{subject}}</div>
                <div class="label">Message: </div>
                <div class="value">@{{content}}</div>

                <div class="reply-box">
                    
                    <div class="label">Reply: </div>
                    <div class="inputbox">
                        
                        <textarea name="reply" rows="10" cols="100" maxlength="500"></textarea>

                    </div>

                    <div class="command-bar">
                        
                        <span class="submit-reply" data-message-id="@{{id}}">Submit</span>

                    </div>

                </div>

            </div>

            <div class="footer">
                
                

            </div>

        </div>

    </script>


<!-- End Message Popup -->

<!-- Messages Table -->

    <script type="text/mustache" id="messages-table">

        <br />

        <table>

            <tr class="header">

                <td></td>
                <td>Type</td>
                <td>Date</td>
                <td>From</td>
                <td>To</td>
                <td>Subject</td>
                <td>Message</td>
                <td>Action</td>

            </tr>

            @{{#messages}}

                <tr class="message-row" data-id="@{{id}}" data-read="@{{read}}">                
                    <td class="status-preview"><strong>@{{statusPreview}}</strong></td>
                    <td>@{{type}}</td>
                    <td class="time" data-time="@{{created_at}}">@{{created_at}}</td>
                    <td class="from"><strong>@{{sender_name}}</strong></td>
                    <td class="from"><strong>@{{recepient_name}}</strong></td>
                    <td class="subject">@{{subject}}</td>
                    <td class="message-info">@{{contentPreview}}</td>
                    <td class="action"><span class="action-button view-message" data-id="@{{id}}" data-type= "@{{type}}">View</span></td> 

                </tr>

            @{{/messages}}

        </table>

    </script>   

<!-- End Messages Table -->

<!-- Right Pane Messages Table -->

    <script type="text/mustache" id="m-messages-table">

        <br />

        <table>
           
            <tr class="header">
                <td>Type</td>
                <td>Date</td>
                <td>Order Code</td>
                <td>Subject</td>
                <td>Content</td>
                <td>Status</td>
            </tr>

            @{{#messages}}

                <tr>
                    <td>Type</td>
                    <td>@{{created_at}}</td>
                    <td><strong> @{{order_code}}</strong></td>
                    <td class="subject">@{{subject}}</td>
                    <td class="message-info">@{{content}}</td>
                    <td>@{{read}}</td> 
                </tr>

            @{{/messages}}

        </table>

    </script>   

<!-- End Right Pane Messages Table -->

<!-- Order Submitted -->

    <script type="text/mustache" id="m-feedback-form">

        <div class="feedback-form">

            <h4>Thank you for submitting your order!</h4>

            <span class="message">@{{message}}</span>

            <div class="row">
                
                <div class="col-md-3">
                    <img src="@{{imgFront}}" />
                </div>

                <div class="col-md-3">
                    <img src="@{{imgLeft}}" />
                </div>

                <div class="col-md-3">
                    <img src="@{{imgRight}}" />
                </div>

                <div class="col-md-3">
                    <img src="@{{imgBack}}" />
                </div>

            </div>

            <div class="row">
                
                <div class="col-md-12">
                    
                    <strong class="feedback-message">This Prolook Uniform Customizer is still in the development and testing phase.  If you want to report any errors, or if you have any feedback regarding your experience, please use the form below. Your feedback is important so that we can improve this product for you and for other users as well. Thank you!</strong> <br/ ><br />
                    <textarea id="feedback-message" placeholder="Please enter your message here! :)"></textarea>

                </div>

            </div>

            <div class="row">
                
                <div class="col-md-12 ok-footer">
                    
                    <span class="ok-btn">OK</span>

                </div>
                
            </div>
            
        </div>

    </script>   

<!-- End Order Submitted -->

    <script type="text/mustache" id="m-feedback-form-free">

        <div class="free-feedback-form">

            <h3><i class="fa fa-comment" aria-hidden="true"></i> FEEDBACK</h3>

            <div class="row">
                
                <div class="col-md-12">
                    
                    <strong>This Prolook Uniform Customizer is still in the development and testing phase.  If you want to report any errors, or if you have any feedback regarding your experience, please use the form below. Your feedback is important so that we can improve this product for you and for other users as well. Thank you!</strong> <br/ ><br />
                    <textarea id="feedback-message" placeholder="Please enter your message here! :)"></textarea>

                </div>

            </div>

            <div class="row">
                
                <div class="col-md-12 ok-footer">
                    
                     <span class="ok-btn">OK</span> <span class="cancel-btn">CANCEL</span>

                </div>
                
            </div>
            
        </div>

    </script>   

<!-- End Order Submitted -->

<!-- My Saved Designs Table -->

    <script type="text/mustache" id="m-saved-designs-table">
        
        <br />
      
        <table class="data-table">
            <thead>
                <tr class="header">
                    <td>Date</td>
                    <td>Time</td>
                    <td>Sport</td>
                    <td>Name / Notes</td>
                    <td>Thumbnails</td>
                    <td>&nbsp;</td>
                </tr>
            </thead>
            <tbody>
                @{{#savedDesigns}}
                    <tr class="saved-design-row" data-id="@{{id}}">
                        <td class="created-at">@{{created_at}}</td>
                        <td>@{{created_at_time}}</td>                       
                        <td>@{{sport}}</td>
                        <td>
                            <strong>@{{name}}</strong><br /><em>@{{notes}}</em>
                        </td>                        
                        <td>
                        
                            <img class="tview" src="@{{front_thumbnail}}" data-file="@{{front_thumbnail}}" />
                            <img class="tview" src="@{{back_thumbnail}}"  data-file="@{{back_thumbnail}}"  />
                            <img class="tview" src="@{{right_thumbnail}}" data-file="@{{right_thumbnail}}" />
                            <img class="tview" src="@{{left_thumbnail}}"  data-file="@{{left_thumbnail}}"  />                       
                        </td>                        
                        <td class="action">

                            <span class="action-button view" data-saved-design-id="@{{id}}" data-name="@{{name}}"><i class="fa fa-eye" aria-hidden="true"></i> Load Design</span>
                            <span class="action-button share share-uniform-design" data-saved-design-id="@{{id}}" data-name="@{{name}}"><i class="fa fa-envelope-o" aria-hidden="true"></i> Share Via Email</span>
                            <hr />
                            <span class="action-button delete" data-saved-design-id="@{{id}}" data-name="@{{name}}"><i class="fa fa-trash-o" aria-hidden="true"></i> Delete Design</span>
                        </td>
                    </tr>
                @{{/savedDesigns}}
            </tbody>

            <tfoot>               
                <td></td>
                <td class="data-table-filter-hide"></td>
                <td></td>
                <td class="data-table-filter-hide"></td>
                <td class="data-table-filter-hide"></td>
                <td class="data-table-filter-hide"></td>
            </tfoot>
        </table>

    </script>   

<!-- End Saved Designs Table -->


<!-- Profile -->

    <script type="text/mustache" id="m-profile-page">

        <div class="form-group">
            <label for="first-name">First Name</label>
            <input type="text" class="form-control" id="first-name" placeholder="First Name" name="first-name" value="@{{firstName}}">
        </div>

        <div class="form-group">
            <label for="last-name">Last Name</label>
            <input type="text" class="form-control" id="last-name" placeholder="Last Name" name="last-name" value="@{{lastName}}">
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" id="email" placeholder="Email" name="email" value="@{{email}}" disabled>
        </div>

        <div class="form-group btn-footer">
            <span class="btn update-profile">Update</span>
        </div>

    </script>   

<!-- End Profile -->

<!-- Sigunup -->

    <script type="text/mustache" id="m-signup-page">



    </script>   

<!-- End Sigunup -->

<!-- Sigunup -->

    <script type="text/mustache" id="m-forgot-password">



    </script>   

<!-- End Sigunup -->

<!-- Tertiary links -->

    <script type="text/mustache" id="m-tertiary-links">

    <span class="slink-small tertiary main-picker-items active" data-picker-type="gender" data-item="All">All</span>

    @{{#block_patterns}}

        <span class="slink-small tertiary main-picker-items" data-picker-type="gender" data-item="@{{item}}">@{{alias}}</span>

    @{{/block_patterns}}

    </script>   

<!-- End Tertiary links -->

<!-- Quarternary links -->

    <script type="text/mustache" id="m-quarternary-links">

    <!-- <span class="slink-small quarternary main-picker-items active" data-picker-type="gender" data-item="All">All</span> -->

    @{{#block_patterns}}

        <span class="slink-small quarternary main-picker-items" data-picker-type="gender" data-item="@{{item}}">@{{alias}}</span>

    @{{/block_patterns}}

    </script>   

<!-- End Quarternary links -->

<!-- Save Design -->

    <script type="text/mustache" id="m-save-design">

        <div class="save-design">

            <h3><i class="fa fa-floppy-o" aria-hidden="true"></i> Save Design</h3>

            <div class="row">

                <div class="col-md-12 input-container">

                    <strong>NAME OF DESIGN</strong><br />
                    <input type="text" name="design-name" class="design-name" placeholder="name of design"><br />

                    <strong>NOTES</strong><br />
                    <textarea id="design-notes" placeholder="notes..."></textarea>
                    
                </div>

            </div>

            <div class="row please-wait">
                
                <div class="col-md">

                    <em class="uploading">
                        Uploading thumbnails, please wait ...<img class="views" src="/images/loading.gif" />
                    </em>
                    
                </div>
                
            </div>

            <div class="row">
                
                <div class="col-md-3">

                    <img class="views front_view" />

                </div>
                
                <div class="col-md-3">

                    <img class="views left_view"/>
                    
                </div>
                
                <div class="col-md-3">

                    <img class="views right_view"/>
                    
                </div>

                <div class="col-md-3">
                
                    <img class="views back_view"/>

                </div>

            </div>

            <div class="row save-design-footer">
                
                <div class="col-md-12 ok-footer">
                    
                    <span class="cancel-btn">CANCEL</span> <span class="ok-btn">OK</span>

                </div>
                
            </div>

             <div class="row saving-please-wait">
                
                <div class="col-md-12">

                    <em class="saving">
                        Saving design, please wait ...<img class="views" src="/images/loading.gif" />
                    </em>
                    
                </div>
                
            </div>
            
        </div>

    </script>   

<!-- End Save Design -->

<!-- Logged In Nav -->

    <script type="text/mustache" id="m-loggedInNavbar">

        <a href="/messages" id="messages">

            <i class="fa fa-envelope-o" aria-hidden="true"></i> My Notifications <span class="badge"></span>

        </a>

        <a href="#" id="feedback">

            <i class="fa fa-comment" aria-hidden="true"></i> Have Feedback?

        </a>

         <div class = "btn-group">

            <button type="button" id="firstname" class="btn">

                <i class="fa fa-user" aria-hidden="true"></i> <strong class="hello">Hello @{{firstName}}!</strong>

            </button>

            <button type = "button" class = "btn dropdown-toggle" data-toggle = "dropdown">

                <span class = "caret"></span>
                <span class = "sr-only">Toggle Dropdown</span>

            </button>

            <ul class = "dropdown-menu" role="menu">
                
                <li><a href="/my-profile"><i class="fa fa-user" aria-hidden="true"></i> MY PROFILE</a></li>
                <li class="divider"></li>

                <li><a href="/my-orders"><i class="fa fa-list-ul" aria-hidden="true"></i> MY ORDERS</a></li>
                <li><a href="/my-saved-designs"><i class="fa fa-folder-open-o" aria-hidden="true"></i> MY SAVED DESIGNS</a></li>
                <li class="divider"></li>
                <li><a href="/changePassword"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> CHANGE PASSWORD</a></li>
                <li class="divider"></li>
                <li><a href="/logout"><i class="fa fa-sign-out" aria-hidden="true"></i> LOG OUT</a></li>

            </ul>

        </div>

     </script>

<!-- End Logged In Nav -->

<!-- Piping Sizes -->

    <script type="text/mustache" id="m-piping-sizes">

        <label class="applicationLabels size">Size</label>

        @{{#items}}

            <span class="piping-sizes-buttons" data-type="@{{name}}" data-size="@{{size}}">
                @{{size}}
            </span> 

        @{{/items}}

    </script>

<!-- End Piping Sizes -->

<!-- Piping Colors -->

    <script type="text/mustache" id="m-piping-colors">

        <label class="applicationLabels colors"># of Colors</label> 

        @{{#items}}

            <span class="piping-colors-buttons" data-type="@{{name}}" data-value="@{{val}}">
                @{{val}}
            </span>

        @{{/items}}

    </script>

<!-- End Piping Colors -->

<!-- Main Piping Sidebar -->

    <script type="text/mustache" id="m-piping-sidebar">

        <div id="pipingsUI">
          <div class="header">
          <div class="toggle" data-status="@{{status}}"><div class="valueContainer"><div class="toggleOption on">ON</div><div class="toggleOption off">OFF</div></div></div>
          <div class="body">
              <div class="cover"></div>
              <div class="ui-row">

                  <label class="applicationLabels">Type</label>
                  <span class="piping-type">@{{type}}</span>                       

              </div>

              <div class="ui-row size-row">

              </div>

              <div class="ui-row colors-row">
                  
              </div>

              <div class="clearfix"></div>

              <div class="ui-row">
                  <div class="column1"> &nbsp;
                      <div class="colorContainer"><br />
                      </div>
                  </div>
              </div>
          </div>
        </div>
        
    </script>

<!-- End Main Piping Sidebar -->


<!-- Random Feed Sizes -->

    <script type="text/mustache" id="m-randomFeed-sizes">

        <label class="applicationLabels size">Size</label>

        @{{#items}}

            <span class="randomFeed-sizes-buttons" data-type="@{{name}}" data-size="@{{size}}">
                @{{size}}
            </span> 

        @{{/items}}

    </script>

<!-- End Random Feed Sizes -->

<!-- Random Feed Colors -->

    <script type="text/mustache" id="m-randomFeed-colors">

        <label class="applicationLabels colors"># of Colors</label> 

        @{{#items}}

            <span class="randomFeed-colors-buttons" data-type="@{{name}}" data-value="@{{val}}">
                @{{val}}
            </span>

        @{{/items}}

    </script>

<!-- End randomFeed Colors -->


<!-- Main Random Feed Sidebar -->

    <script type="text/mustache" id="m-randomFeed-sidebar">

        <div id="randomFeedsUI">
          <div class="header">
          <div class="toggle" data-status="@{{status}}"><div class="valueContainer"><div class="toggleOption on">ON</div><div class="toggleOption off">OFF</div></div></div>
          <div class="applicationType">Random Feed <span class="header-type">(@{{type}})</span></div>
          <div class="body">
              <div class="cover"></div>
              <div class="ui-row">

                  <label class="applicationLabels">Location</label>
                  <span class="randomFeed-type">@{{type}}</span>                       

              </div>

              <div class="ui-row size-row">

              </div>

              <div class="ui-row colors-row">
                  
              </div>

              <div class="clearfix"></div>

              <div class="ui-row">
                  <div class="column1"> &nbsp;
                      <div class="colorContainer"><br />
                      </div>
                  </div>
              </div>
          </div>
        </div>
        
    </script>

<!-- End Main Random Feed Sidebar -->

<!-- Add New Free-Form Location -->

    <script type="text/mustache" id="m-add-free-form-application">

        <div id="add-new-free-form-application">

            <label>1. What type of application do you want to add?</label>

            <div class="application-container">

                <span class="optionButton" data-type="player_number"><div class="icon"><img src="/images/main-ui/icon-number-large.png"></div><div class="caption">Player Number</div></span>
                <span class="optionButton" data-type="team_name"><div class="icon"><img src="/images/main-ui/icon-text-large.png"></div><div class="caption">Team Name</div></span>
                <span class="optionButton" data-type="player_name"><div class="icon"><img src="/images/main-ui/icon-text-large.png"></div><div class="caption">Player Name</div></span>
                <span class="optionButton" data-type="mascot"><div class="icon"><img src="/images/main-ui/icon-mascot-large.png"></div><div class="caption">Mascot</div></span>                            
                
            </div>

            <br />
            <label>2. What perspective do you want to add the application?</label>

            <div class="perspective-container">

                <span class="perspective" data-id="front">Front</span>
                <span class="perspective" data-id="back">Back</span>
                <span class="perspective" data-id="left">Left</span>
                <span class="perspective" data-id="right">Right</span>
                
            </div>

            <br />
            <label>3. Which part do you want to add the application on?</label>

            <div class="part-container">

                @{{#parts}}

                    <span class="part" data-id="@{{name}}">@{{name}}</span>

                @{{/parts}}
                
            </div>

            <br />
            <label class="leftrightPart">4. <span class="partName">Sleeve</span> has a left and right part, which side do you want to put the application on?</label>

            <div class="side-container">

                <span class="side" data-id="na">N/A</span>
                <span class="side" data-id="left">Left</span>
                <span class="side" data-id="right">Right</span>
                
            </div>

            <hr />

            <div class="footer-buttons">

                <span class="button okButton">Ok</span> <span class="button cancelButton">Cancel</span>

            </div>
            
        </div>
        
    </script>

<!-- End Add New Free-Form Location -->

<script type="text/mustache" id="m-save-design-ok">
    
    <div class="save-design-post-dialog">

        <p class='left'>
            Your design '<strong>@{{designName}}</strong>' was saved successfully! You can stay and continue working with this style, or go to other sections using one of the options below. Thank you! 
        </p>

        <p>
            <button class="btn save-dialog stay">Stay and Continue working on this Uniform</button>   
        </p>
        
        <br />
        <p>
            Or do any of the following: <br />
            <button class="btn save-dialog select-another-uniform">Select a New Uniform Style to work on</button> <br />
            <button class="btn save-dialog my-saved-designs">Go to 'My Saved Designs'</button> 
        </p>
    </div>
    
</script>

<script type="text/mustache" id="m-loading-screen">
    
    <div class="loading-screen">

        <div class="logo-container">
            
            <img src="/images/pl-logo-white.png" class="logo-white" /> <br />
            

            <div class="qoute">
            I don't count my situps, i only start counting when it starts hurting. When i feel pain, that's when i start counting, because that's when it really counts. <br />
            - Muhammad Ali
            </div>

        </div>

        
        <div class="loading-messages">
            <!-- <strong>@{{startTime}}</strong><br /> -->

            <span class="title">@{{title}}</span><br />

        </div>

    </div>
    
</script>
