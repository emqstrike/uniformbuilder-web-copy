<!-- Maintenance Message -->
    <script type="text/mustache" id="m-maintenance-message">
        
        Prolook Customizer will have a scheduled system maintenance and will be offline temporarily on Sunday, August 5th from 8:00 PM EST - 5:00 AM EST. <br />The customizer will be under testing for the rest of the week, please report via the [Feedback] function any issue you might discover. This will help us a lot in improving the custommizer for everyone. Thank you! <br /><br /> #LiveYourGame
        
    </script>


<!-- Start Mascot UI's -->

    <!-- Mascot Dropdown -->
    <script type="text/mustache" id="mascot-dropdown">
        
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

                @{{#is_men}}
                    <img src="@{{thumbnail_male}}?v={{$asset_version}}">
                @{{/is_men}}

                @{{#is_women}}
                    <img src="@{{thumbnail_female}}?v={{$asset_version}}">
                @{{/is_women}}

                @{{#is_youth}}
                    <img src="@{{thumbnail_youth}}?v={{$asset_version}}">
                @{{/is_youth}}

                <span class="main-picker-item-caption">
                    @{{#alias}}
                        @{{alias}}
                    @{{/alias}}
                    @{{^alias}}
                        @{{name}}
                    @{{/alias}}
                </span>

            </div>

        @{{/picker_items}}

        @{{#esports}}
            
            <div class="main-picker-items apparel grow @{{disabledClass}}" data-gender="@{{gender}}" data-picker-type="sports" data-item="@{{name}}" title="@{{name}} Uniforms @{{tooltip}}">

            @if (@tooltip != "")
                <div class="cSoon">@{{tooltip}}</div>
            @endif
                
                @{{#is_men}}
                    <img src="@{{thumbnail_male}}?v={{$asset_version}}">
                @{{/is_men}}

                @{{#is_women}}
                    <img src="@{{thumbnail_female}}?v={{$asset_version}}">
                @{{/is_women}}

                @{{#is_youth}}
                    <img src="@{{thumbnail_youth}}?v={{$asset_version}}">
                @{{/is_youth}}

                <span class="main-picker-item-caption">
                    @{{#alias}}
                        @{{alias}}
                    @{{/alias}}
                    @{{^alias}}
                        @{{name}}
                    @{{/alias}}
                </span>

            </div>

        @{{/esports}}

        @{{#apparel}}
            
            <div class="main-picker-items apparel grow @{{disabledClass}}" data-gender="@{{gender}}" data-picker-type="sports" data-item="@{{name}}" title="@{{name}} Uniforms @{{tooltip}}">

            @if (@tooltip != "")
                <div class="cSoon">@{{tooltip}}</div>
            @endif
                
                @{{#is_men}}
                    <img src="@{{thumbnail_male}}?v={{$asset_version}}">
                @{{/is_men}}

                @{{#is_women}}
                    <img src="@{{thumbnail_female}}?v={{$asset_version}}">
                @{{/is_women}}

                @{{#is_youth}}
                    <img src="@{{thumbnail_youth}}?v={{$asset_version}}">
                @{{/is_youth}}

                <span class="main-picker-item-caption">
                    @{{#alias}}
                        @{{alias}}
                    @{{/alias}}
                    @{{^alias}}
                        @{{name}}
                    @{{/alias}}
                </span>

            </div>

        @{{/apparel}}

    </script>

<!-- End Sports Pickers -->

<!-- Uniforms Picker -->

    <!-- version 1 -->

    <script type="text/mustache" id="m-picker-items-uniforms">

        @{{#picker_items}}
            
            <div class="main-picker-items grow @{{sport}}" data-picker-type="uniforms" data-option="@{{neck_option}}" data-item="@{{name}}" data-id="@{{id}}" data-youth-price="@{{parsedPricingTable.youth_min_msrp}}" data-adult-price="@{{parsedPricingTable.adult_min_msrp}}">

                <img class='front' src="@{{thumbnail_path}}?v={{$asset_version}}">
                <img class='left' src="@{{thumbnail_path_left}}?v={{$asset_version}}">

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

                    <strong class="type">@{{#uniform_type}}@{{uniform_application_type}}@{{/uniform_type}}</strong>
                    <!-- <strong class="type">@{{block_pattern}}</strong> -->
                    <div class="favorite"><i class="fa fa-star" aria-hidden="true"></i> Favorite <i class="fa fa-star" aria-hidden="true"></i></div>
                    <div class="price_item_template_name">@{{price_item_template_name}}</div>
                    <div class="material_id">@{{id}}</div>

                </span> 

            </div>

        @{{/picker_items}}

    </script>

    <!-- version 2 -->

    <script type="text/mustache" id="m-picker-items-uniforms-v2">

        @{{#picker_items}}
            
            <li class="mix @{{type}} @{{block_pattern_fv2}} @{{block_pattern_fv2_blank}} @{{block_pattern_fv2_favorite}} @{{neck_option_fv2}} @{{uniform_application_type}}" data-name="@{{name}}">

            <div class="main-picker-items grow @{{sport}}" data-gender="@{{gender}}" data-picker-type="uniforms" data-option="@{{neck_option}}" data-item="@{{name}}" data-id="@{{id}}" data-youth-price="@{{parsedPricingTable.youth_min_msrp}}" data-adult-price="@{{parsedPricingTable.adult_min_msrp}}">

                <img class='front' src="@{{thumbnail_path}}?v={{$asset_version}}">
                <img class='left' src="@{{thumbnail_path_left}}?v={{$asset_version}}">

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

                    <strong class="type">@{{#uniform_type}}@{{uniform_application_type}}@{{/uniform_type}}</strong>
                    <!-- <strong class="type">@{{block_pattern}}</strong> -->
                    <div class="favorite"><i class="fa fa-star" aria-hidden="true"></i> Favorite <i class="fa fa-star" aria-hidden="true"></i></div>
                    <div class="price_item_template_name">@{{price_item_template_name}}</div>
                    <div class="material_id">@{{id}}</div>

                </span> 

            </div>

        </li>

        @{{/picker_items}}

        <li class="gap"></li>
        <li class="gap"></li>
        <li class="gap"></li>

    </script>

    <!-- end version 2 -->

<!-- End Uniforms Pickers -->

<!-- Search Resuls Picker -->

    <script type="text/mustache" id="m-picker-items-search-results">

        @{{#picker_items}}
            
            <div class="main-picker-items grow" data-picker-type="uniforms" data-id = "@{{id}}" data-uniform-type = "@{{type}}" data-item="@{{name}}">

                <img class='front' src="@{{thumbnail_path}}?v={{$asset_version}}">
                <img class='left' src="@{{thumbnail_path_left}}?v={{$asset_version}}">

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

                    <strong class="type">@{{#uniform_type}}@{{uniform_application_type}}@{{/uniform_type}}</strong>
                    <!-- <strong class="type">@{{block_pattern}}</strong> -->
                    <div class="favorite"><i class="fa fa-star" aria-hidden="true"></i> Favorite <i class="fa fa-star" aria-hidden="true"></i></div>
                    <div class="price_item_template_name">@{{price_item_template_name}}</div>
                    <div class="material_id">@{{id}}</div>

                </span> 

            </div>

        @{{/picker_items}}

    </script>

<!-- End Search Results Pickers -->

<!-- Favorites Resuls Picker -->

    <script type="text/mustache" id="m-picker-items-favorites">

        @{{#picker_items}}
            
            <div class="main-picker-items grow" data-picker-type="search-result" data-id = "@{{id}}" data-uniform-type = "@{{type}}" data-item="@{{name}}">

                <img src="@{{thumbnail_path}}?v={{$asset_version}}">

                <span class="main-picker-item-caption">
                    <strong>@{{name}}</strong> <br />
                    <strong class="type">@{{#uniform_type}}@{{uniform_application_type}}@{{/uniform_type}}</strong>

                    <div class="favorite"><i class="fa fa-star" aria-hidden="true"></i> Favorite <i class="fa fa-star" aria-hidden="true"></i></div>
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

<!-- End Favorites Pickers -->

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
            <div class="name">@{{id}}: @{{name}}</div>
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

                            <br />
                            <div class="col-md-12 notes-container">

                                <label for="state">Notes:<br />( If you have any additional notes on how we should prepare the mascot, please type them below. Thank you! )</label>
                                <br /><br />
                                <textarea rows="7" name="custom-artwork-additional-notes" class="form-control" type="text" placeholder="Additional Notes" required></textarea>                               

                            </div>

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


<!-- New Inksoft De Picker -->

    <script type="text/mustache" id="m-inksoft-designs-preview"> 

       <div id="primaryInksoftDesignStudioPreview" data-status="hidden">
       </div>

    </script>            

    <script type="text/mustache" id="m-inksoft-designs-selection">

        <div id="primaryInksoftDesignStudioSelection" data-status="hidden">
        </div>
       
    </script>
    
    <script type="text/mustache" id="m-inksoft-design-studio-container">

         <div id="primaryInksoftDesignStudio" data-status="hidden">

            <div class="header">

                
              
            </div>
            
            <div class="main-content">

                

            </div>

            <div class="footer">
                
                

            </div>

        </div>
        
    </script>


<!-- End New Inksoft Design Picker -->


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
                            <option value="Specialist Cut">Specialist Cut</option>
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
                                
                                <img class="thumbs grow" src="@{{thumbnails.front_view}}" data-file="@{{thumbnails.front_view}}" />
                                <img class="thumbs grow" src="@{{thumbnails.left_view}}"  data-file="@{{thumbnails.left_view}}"  />
                                <img class="thumbs grow" src="@{{thumbnails.right_view}}" data-file="@{{thumbnails.right_view}}" />
                                <img class="thumbs grow" src="@{{thumbnails.back_view}}"  data-file="@{{thumbnails.back_view}}"  />

                                <br />

                            @{{/items}}

                        </td>
                        <td>@{{client}}</td>
                        <td>@{{status}}</td>
                        <td>@{{submitted}}</td>
                        
                        <td class="action">

                            <span class="action-button edit" data-id="@{{id}}" data-order-id="@{{order_id}}"><i class="fa fa-eye" aria-hidden="true"></i> Edit Order </span>
                            <span class="action-button delete" data-id="@{{id}}" data-order-id="@{{order_id}}"><i class="fa fa-remove" aria-hidden="true"></i> Delete Order </span>
                            <span class="action-button view" data-id="@{{id}}" data-order-id="@{{order_id}}"><i class="fa fa-eye" aria-hidden="true"></i> View Order Status and Details </span>

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
                    <td class="type">@{{type}}</td>
                    <td class="time" data-time="@{{created_at}}">@{{created_at}}</td>
                    <td class="from"><strong>@{{sender_name}}</strong></td>
                    <td class="from"><strong>@{{recepient_name}}</strong></td>
                    <td class="subject">@{{subject}}</td>
                    <td class="message-info">@{{contentPreview}}</td>
                    <td class="action"><span class="action-button view-message" data-id="@{{id}}" data-type= "@{{type}}">View</span></td> 

                </tr>

            @{{/messages}}

        </table>

        <span class="message-count">Messages: n</span>

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
                            <br>
                            @{{ #product_id }}
                                Product ID: <strong>@{{ product_id }}</strong>
                                <a href="{{ env('TEAM_STORE_BASE_URL') . '/visit-product-by-code/' }}@{{ store_code }}/@{{ product_id }}"
                                target="_blank" style="text-decoration: none">
                                Open on Team Store
                                </a>
                            @{{ /product_id}}
                            <br>
                            @{{ #store_code }}
                                Store Code: <strong>@{{ store_code }}</strong>
                            @{{ /store_code}}
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
    <form id="myProfile">
        <div class="alert alert-success hidden" id="myProfileAlert" role="alert">
            <strong>Success!</strong> Profile successfully updated!
        </div>

        <div class="form-group">
            <label for="first-name">First Name</label>
            <input type="text" class="form-control" id="first-name" placeholder="First Name" name="first-name" value="@{{firstName}}" pattern="[a-zA-Z][a-zA-Z0-9\s]*" required>
        </div>

        <div class="form-group">
            <label for="last-name">Last Name</label>
            <input type="text" class="form-control" id="last-name" placeholder="Last Name" name="last-name" value="@{{lastName}}" pattern="[a-zA-Z][a-zA-Z0-9\s]*" required>
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" id="email" placeholder="Email" name="email" value="@{{email}}" disabled>
        </div>

        <br />

        <!-- Start Row 2 -->
        <div class="row">

            <div class="col-md-12">

                <div class="row">
                    
                    <div class="col-md-3"></div>

                    <div class="col-md-6">

                        <h3>Location and Assigned Rep</h3>
                        <hr />

                    </div>

                </div>

                <div class="row">

                    <div class="col-md-3"></div>

                    <div class="col-md-2">
                        
                        <p>
                            <em>

                                We have representatives to help you make the most of this site, just enter your zip code and click the <strong>[Find Rep]</strong> button, and select anyone that will appear on the dropdown. 
                                <br /><br />

                                Note:
                                <br />

                                If you have worked with a Rep previously just select his name on the list. If you don't have any matching Rep's on your area we will just assign someone to work with you. It is still ok to proceed without a rep at this point and you can still use the customizer.
                                <br /><br />

                                Thanks for using PROLOOK!

                            </em>
                        </p>

                    </div>

                    <div class="col-md-4">

                        <div class="col-md-12">

                            <label for="state">State</label>
                            <input name="state" class="form-control" type="text" placeholder="State" value="@{{state}}" pattern="[a-zA-Z][a-zA-Z0-9\s]*" required>                                

                        </div>

                        <div class="col-md-12">

                            <br />
                            <label for="zip">Zip</label>
                            <input name="zip" class="form-control" type="text" placeholder="Zip Code" value="@{{zip}}" required>                                

                        </div>

                         <div class="col-md-12">

                            <br />
                            <input name="find-rep" class="form-control btn findRep" type="button" value="Find Rep" required>                                
                            <br /><br />
                            <span class="message-rep"></span>

                        </div>                                            

                        <div class="col-md-12">

                            <br />
                            <label for="rep">Rep</label>
                            <select class="form-control" name="rep" disabled="">
                            </select>
                            
                        </div>

                    </div>

                </div>

                <div class="row">
                    
                    <div class="col-md-3"></div>

                    <div class="col-md-6">

                        <hr />

                    </div>

                </div>

            </div>
        </div>
        <!-- End Row 2 -->

        <div class="form-group btn-footer">
            <button class="btn">Update</button>
        </div>
    </form>
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

            <h3><i class="fa fa-floppy-o" aria-hidden="true"></i> @{{title}}</h3>

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

            @if (Session::get('userHasTeamStoreAccount'))

            <div class="checkbox" align="center">
                <label>
                    <input type="checkbox" name="is_add_to_team_store" checked="checked" id="is_add_to_team_store"> Add to my Team Store
                </label>
            </div>

            @else
            <input type="hidden" name="is_add_to_team_store" value="0">

            @endif

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

                <span class="optionButton" data-type="player_number"><div class="icon"><img src="/images/main-ui/icon-number-large.png"></div><div class="caption">Player #</div></span>
                <span class="optionButton" data-type="team_name"><div class="icon"><img src="/images/main-ui/icon-text-large.png"></div><div class="caption">Team Name</div></span>
                <span class="optionButton" data-type="player_name"><div class="icon"><img src="/images/main-ui/icon-text-large.png"></div><div class="caption">Player Name</div></span>
                <span class="optionButton" data-type="mascot"><div class="icon"><img src="/images/main-ui/icon-mascot-large.png"></div><div class="caption">Stock Mascot</div></span>                            
                <span class="optionButton" data-type="embellishments"><div class="icon"><img src="/images/main-ui/icon-embellishments-large.png"></div><div class="caption">Custom Mascot</div></span>                            

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
            <label>2. Which part do you want to add the application on?</label>

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
            <button class="btn save-dialog stay">Stay and Continue working on this style.</button>   
        </p>
        
        <br />
        <p>
            Or do any of the following: <br />
            <button class="btn save-dialog select-another-uniform">Select a New Style to work on</button> <br />
            <button class="btn save-dialog my-saved-designs">Go to 'My Saved Designs'</button> 
        </p>
    </div>
    
</script>

<script type="text/mustache" id="m-save-design-guest">
    
    <div class="save-design-post-dialog">

        <p class='left'>
            Your design '<strong>@{{designName}}</strong>' was saved successfully!
        </p>

        <p>
           Please check your email for your temporary password so you can retrieve your saved designs. Thank you.
        </p>

    </div>
    
</script>

<script type="text/mustache" id="m-loading-screen">
    
    <div class="loading-screen">

        <div class="logo-container">
            
            <img src="@{{logo}}" class="logo-white" /> <br />
          
            <div class="qoute">
                <span class='qoute-symbol'><i class="fa fa-quote-left" aria-hidden="true"></i></span>
                <span class='qoute-text'>One thing that can never be sacrificed is your preparation and your work ethic.</span>
                <br />
                <div class="author-container">
                    -<span class="author"> Peyton Manning</span>    
                </div>
            </div>
           
        </div>

        
        <div class="loading-messages">
            <!-- <strong>@{{startTime}}</strong><br /> -->

            <span class="title">@{{title}}<strong>@{{uniformName}}</strong></span><br />

        </div>

    </div>
    
</script>

<script type="text/mustache" id="m-preview-panel-content">
    
    <div class="rotation-container">

        <label>Code:</label><strong class="number">@{{applicationCode}}</strong>
        <br /><br />

        <label>Position:</label><strong class="number">x: @{{positionX}}, y: @{{positionY}} (FE)</strong> 
        <strong class="number">x: @{{positionXBackend}}, y: @{{positionYBackend}} (BE)</strong> 
        <br />
        <label>Scale:</label><strong class="number">x: @{{scaleX}}, y: @{{scaleY}} </strong> 
        <br /> 

        <label>Rotation:</label><strong class="number">Radians: @{{radians}}, Degrees: @{{degrees}}</strong> 
        <br />

    </div>
    
</script>

<script type="text/mustache" id="m-no-favorite">
    
    <div class="no-favorite-styles">

        You have no favorite styles.

    </div>
    
</script>

<script type="text/mustache" id="m-picker-message">
    
    <div class="generic-message">

       @{{message}} <br />
       @{{didYouMean}} <br /><br />
       
    </div>
    
</script>

<script type="text/mustache" id="m-did-you-mean-link-templates">
    
    <div class="did-you-mean-links">

       @{{#gender}}

            <a href ="/styles/@{{.}}/@{{alias.shortCode}}" class="">

                <img class="grow" src = "/images/main-ui/pickers/@{{#toUpper}}@{{.}}@{{/toUpper}}/@{{alias.thumbFilename}}" />
                <div class="link-text">@{{.}} / @{{alias.urlAlias}}</div>

            </a>

       @{{/gender}}

    </div>
    
</script>

<script type="text/mustache" id="m-sales-reps-options">

    @{{#rep}}

        <option value="@{{id}}" data-sort='3' data-dealer="@{{dealer}}" data-name="@{{last_name}}, @{{first_name}}"> @{{last_name}}, @{{first_name}} - (@{{dealer}})</option>
        
    @{{/rep}}

</script>

<script type="text/mustache" id="m-order-info-messages">
    
    <table>

        <tr class="header">

            <td></td>
            <td>Date</td>
            <td>From</td>
            <td>Subject</td>
            <td>Message</td>
            <td>Action</td>

        </tr>

        @{{#messages}}

            <tr class="message-row" data-id="@{{id}}" data-read="@{{read}}">

                <td class="status-preview"><strong>@{{statusPreview}}</strong></td>
                <td class="time" data-time="@{{created_at}}">@{{created_at}}</td>
                <td class="from"><strong>@{{sender_name}}</strong></td>
                <td class="subject">@{{subject}}</td>
                <td class="message-info">@{{content}}</td>
                <td class="action"><span class="action-button view-message" data-id="@{{id}}" data-type= "@{{type}}">View</span></td> 

            </tr>

        @{{/messages}}

    </table>

    <span class="message-count">Messages: n</span>
    
</script>

<script type="text/mustache" id="m-car-notification-thread-container">
    
    @{{#messages}}

        <div class='msg'>

            <span class='date-time'>
                @{{created_at}}
            </span>

            <br /><br />

            <span class='content'>
                @{{content}}
            </span>
            
        </div>

        <hr class='thread-container'>
        
    @{{/messages}}

</script>



<script type="text/mustache" id="m-loading">
    
    <div class="text-center">Loading @{{type}} ... <img width="50" src="/images/loading.gif" /></div>

</script>

<script type="text/mustache" id="m-sizing-table">

    <center>

    <table>

        <tr>

            @{{#entries}}

            <td>
            
                <table border="1" cellpadding="3">
                    
                    <tr>
                        <td colspan="3" align="center">SLEEVES: @{{sleeveType}}</td>
                    </tr>

                    <tr>
                        <td align="center" width="20%">SIZE</td>
                        <td align="center" width="60%">NUMBERS</td> 
                        <td align="right" width="20%">COUNT</td>
                    </tr>

                    @{{#sizes}}
                        <tr>
                            <td align="center">@{{size}}</td>
                            <td align="center">@{{sizeString}}</td>
                            <td align="right">@{{total}}</td>
                        </tr>
                    @{{/sizes}}

                </table>

                <br />
                <br />

                </td>

            @{{/entries}}

        </tr>

    </table>

    </center>

</script>

<script type="text/mustache" id="m-name-drop-dialog">

    <div class="svg-dialog-container">

        <div class="row">
            
            <div class="col-md-8">
                
                <div id="namedrop-container" class="svg-container">
                    
                </div>

            </div>

            <div class="col-md-4">
                
                Sidebar

            </div>

        </div>
        
    </div>

</script>

<script type="text/mustache" id="m-patterns-panel">

    <div class="sub1 patternThumb">

        <span class="patternThumb"><img src="@{{thumbnail}}"/></span><br />
        <span class="pattern">@{{name}}</span>
        <br />

    </div>

    <div class="colorContainer">

        @{{{colorString}}}

    </div>

    <input type="text" id="pattern-slider" value="" />

</script>

<script type="text/mustache" id="m-tailsweep-panel">

     <div class="column1 applications tailsweeps">

        <div class="sub1 tailSweepThumb"><br />
            <span class="tailSweepThumb"><img src="/images/tailsweeps/thumbnails/@{{thumbnail}}"/></span><br />                                                             
            <span class="tailsweep">@{{code}}</span>
            <span class="flipButton">Vertical</span>        
        </div>

        <div class="sizeContainer">

            <span class="sizeLabel">LENGTH</span>
            <span class="sizeItem" data-size="short">Short</span>        
            <span class="sizeItem" data-size="medium">Medium</span>        
            <span class="sizeItem" data-size="long">Long</span>        

            <span class="sizeLabel">LENGTH 2</span>
            <span class="sizeItem sizeItem2" data-size="1">1</span>        
            <span class="sizeItem sizeItem2" data-size="2">2</span>        
            <span class="sizeItem sizeItem2" data-size="3">3</span>        
            <span class="sizeItem sizeItem2" data-size="4">4</span>        
            <span class="sizeItem sizeItem2" data-size="5">5</span>        
            <span class="sizeItem sizeItem2" data-size="6">6</span>        
            <br />        
            <span class="sizeItem sizeItem2" data-size="7">7</span>        
            <span class="sizeItem sizeItem2" data-size="8">8</span>        
            <span class="sizeItem sizeItem2" data-size="9">9</span>        
            <span class="sizeItem sizeItem2" data-size="10">10</span>        
            <span class="sizeItem sizeItem2" data-size="11">11</span>        
            <span class="sizeItem sizeItem2" data-size="12">12</span>        

            <label class="applicationLabels">Rotated</label>
            <span class="angleItem" data-angle="straight">Straight</span>        
            <span class="angleItem" data-angle="rotated">Rotated</span>        

        </div>

    </div>

</script>


<!-- Custom Artwork Requests --> 

    <script type="text/mustache" id="m-custom-artwork-requests">

        <br />

        <table class="data-table">

           <thead>

                <tr class="header">

                    <td>Date</td>
                    <td>Reference ID / Name</td>
                    <td>Type</td>
                    <td>Status</td>
                    <td>Submitted Artwork</td>
                    <td>Preview</td>
                    <td>Review</td>

                </tr> 

           </thead>
            
           <tbody>

                @{{#car}}

                    <tr class="custom-artwork-request-row" data-id="@{{id}}"> 
                        
                        <td>@{{created_at}}</td>
                        
                        <td>
                            <span class="link" data-reference-id="@{{reference_id}}" data-type="@{{type}}" title="Open @{{#titleCase}}@{{type}}@{{/titleCase}} (@{{reference_id}})."> 
                                
                                @{{reference_id}} <br />

                            </span>

                            <span class="name"> 
                                @{{saved_design_name}}
                                @{{client_name}}
                            </span>

                        </td>

                        <td>@{{#titleCase}}@{{type}}@{{/titleCase}}</td>
                        <td>@{{#titleCase}}@{{status}}@{{/titleCase}}</td>

                        <td>
                            
                            @{{#parsedProperties}}

                                <img src="@{{file}}" />

                            @{{/parsedProperties}}

                        </td>

                        <td>

                            @{{#parsedProperties}}

                                <span class="btn" data-code="@{{code}}" data-btn-type="preview" data-action="preview-submitted-artwork" data-reference-id="@{{reference_id}}" data-type="@{{type}}" title="Preview the artwork you submitted in a popup">
                                    Preview Submitted Artwork
                                </span>

                                <br />
                                
                                <span class="btn" data-code="@{{code}}" data-btn-type="preview" data-action="preview-prepared-artwork" data-reference-id="@{{reference_id}}" data-type="@{{type}}" title="Preview the artwork you submitted after its been processed by the our Graphic Artists">
                                    Preview Processed Mascot
                                </span>

                            @{{/parsedProperties}}

                        </td>
                        
                        <td class="action">

                            <span class="btn" target="_blank" data-btn-type="preview" data-action="preview-in-customizer" data-reference-id="@{{reference_id}}" data-type="@{{type}}" title="Open the customizer with the style you created.">
                                Preview Mascot In Customizer
                            </span>

                            {{--  <span class="action-button edit" data-id="@{{id}}" data-order-id="@{{reference_id}}"><i class="fa fa-eye" aria-hidden="true"></i> Edit Order </span>
                            <span class="action-button delete" data-id="@{{id}}" data-order-id="@{{reference_id}}"><i class="fa fa-remove" aria-hidden="true"></i> Delete Order </span>
                            <span class="action-button view" data-id="@{{id}}" data-order-id="@{{reference_id}}"><i class="fa fa-eye" aria-hidden="true"></i> View Order Status and Details </span> --}}

                        </td>

                    </tr>

                @{{/car}} 

           </tbody>

    {{--    

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

    --}}

        </table>

    </script>   

    <script type="text/mustache" id="m-custom-artwork-requests-mascot-preview">

        <div id="mascotRealTimePreview">
            
            <div class="preview-header">
                <h3>@{{mascot.id}} / @{{mascot.name}}</h3>
            </div>

            <div id="preview-canvas"></div>

            <div class="color-pickers">
                
            </div>

            <div class="notes">
                
                <em>Use this screen to preview the mascots prepared for the artwork you submitted, you can change the color of the inidividual layers.</em>

            </div>

            <div class="footer">

                <span class="btn" id="close">Close</span>

            </div>

        </div>

</script>   

<script type="text/mustache" id="m-car-approve-dialog">
    
    <div class="approve-dialog">
        
        <p class="notice">
            <em>
                @{{note}}
            </em>
        </p>
        
        <table class="approve-reject-table">
     
            <tr class="header-row">
                    
                <td>Location #</td>
                <td>Mascot ID</td>
                <td>Thumbnail</td>
            <td>Link To PDF</td>
                <td>Approve / Reject</td>
                <td>Notes</td>

            </tr>
            
            @{{#artworks}}

            <tr class="content-row">

                <td class="location">@{{code}}</td>
                <td class="mascot-id">@{{mascot_id}}</td>
                <td class="thumb">Thumbnail</td>
                <td class="link-to-pdf"><a href=""></a></td>
                <td class="approve-reject">
                        
                    <span class="btn approve active" data-state="approve" data-code="@{{code}}">Approve</span>
                    <span class="btn reject" data-state="reject" data-code="@{{code}}">Reject</span>

                </td>
                <td class="notes">
                    
                    <textarea class="notes" rows=3 cols=30 data-code="@{{code}}"></textarea>

                </td>
                
            </tr>
                
            @{{/artworks}}

        </table>

        <hr />

        <div class="footer-buttons">

            <span class="btn cancel">Cancel</span>
            <span class="btn submit">Submit</span>
            
        </div>

    </div>
            
</script>

<!-- Embellishment Popup -->
    
    <script type="text/mustache" id="m-embellishment-popup">

        <div id="primaryEmbellishmentPopup" data-status="hidden">

            <div class="header">

                Custom Mascots

                <div class="close-popup">
                        
                    <i class="fa fa-times" aria-hidden="true"></i>

                </div>
             
            </div>

            <div class="navbar-main">
                
                <ul class="embellishment-tabs">
                    <li class="active" data-type="existing">Option #1: Select From Existing Designs</li>
                    <li data-type="upload">Option #3: Upload A File</li>
                    <li data-type="create">Option #2: Create A New Artwork</li>
                </ul>

            </div>

            <div class="navbar-top">
                
                <span class="active-archive-tab active" title="View Active Designs" data-type="active" data-tipped-options="position: 'topright'" >
                    <i class="fa fa-list" aria-hidden="true"></i><span class="text">Active</span>
                </span>
                <span class="active-archive-tab archives" title="View Archived Designs" data-type="archived" data-tipped-options="position: 'topright'" >
                    <i class="fa fa-archive" aria-hidden="true"></i><span class="text">Archives</span>
                </span>

                <input class="search-bar" type="text" name="search-bar" placeholder="Search Active Designs"/>

            </div>

            <div class="clearfix"></div>
            
            <div class="main-content">
                
                <div class="embellishmentPopupResults">

                    @{{#myEmbellishments}}

                        <div class="item grow" style="background-image: url(@{{png_filename}})" data-design-name="@{{design_name}}" data-design-id="@{{design_id}}" data-id="@{{id}}" data-filename="@{{png_filename}}" data-svg-filename="@{{svg_filename}}">
                            
                            <div class="name" style="">@{{design_name}}</div>
                            
                            <div class="archive" data-type="archive"  style="" data-design-id="@{{design_id}}" data-design-name="@{{design_name}}" data-id="@{{id}}" data-id="" data-tipped-options="position: 'topright'" title="Archive this design">
                                <i class="fa fa-archive" aria-hidden="true"></i>
                            </div>

                        </div>

                    @{{/myEmbellishments}}

                </div>

            </div>

            <div class="sidebar">

                <span class="name"></span> / <a class="previewLink" target="_new" href=''>Fullsize Preview</a> <br />

                <img class="preview" /> <br /><br />
                

                <br />

                <span class="btn add-to-uniform">Add to Uniform</span>

            </div>

            <div class="footer">
                
                

            </div>

        </div>

    </script>

    <!-- For Updating Embellishments at runtime --> 

        <script type="text/mustache" id="m-loading-animation">    
            
            <span class="loading-container">
                <img src="/images/loading-animation.gif" class="loading-gif"/>
            </span>

        </script>

        <script type="text/mustache" id="m-embellishment-popup-update-items">

            @{{#myEmbellishments}}

                <div class="item grow" style="background-image: url(@{{png_filename}})" data-design-name="@{{design_name}}" data-design-id="@{{design_id}}" data-id="@{{id}}" data-filename="@{{png_filename}}" data-svg-filename="@{{svg_filename}}">
                    
                    <div class="name" style="">@{{design_name}}</div>
                    
                    <div class="archive" data-type="archive" style="" data-design-id="@{{design_id}}" data-design-name="@{{design_name}}" data-id="@{{id}}" data-id="" data-tipped-options="position: 'topright'" title="Archive this design">
                        <i class="fa fa-archive" aria-hidden="true"></i>
                    </div>

                </div>

            @{{/myEmbellishments}}

        </script>

        <script type="text/mustache" id="m-embellishment-popup-update-items-restore">

            @{{#myEmbellishments}}

                <div class="item grow" style="background-image: url(@{{png_filename}})" data-design-name="@{{design_name}}" data-design-id="@{{design_id}}" data-id="@{{id}}" data-filename="@{{png_filename}}" data-svg-filename="@{{svg_filename}}">
                    
                    <div class="name" style="">@{{design_name}}</div>
                    
                    <div class="restore" style="" data-type="restore" data-design-id="@{{design_id}}" data-design-name="@{{design_name}}" data-id="@{{id}}" data-id="" data-tipped-options="position: 'topright'" title="Restore this design">
                        <i class="fa fa-undo" aria-hidden="true"></i>
                    </div>

                </div>

            @{{/myEmbellishments}}

        </script>

    <!-- End For Updating Embellishments at runtime -->


<!-- End Embellishment Popup -->

<!-- Embellishment Sidebar -->
    
    <script type="text/mustache" id="m-embellishment-sidebar">
        
        <div class="ui-row">
            <div class="colorContainer embellishment-buttons-container">

                <span class="btn edit-embellishment">Edit Current</span>

                <!-- 
                <span class="btn select-embellishment">Upload File (.ai, etc)</span>
                <span class="btn new-embellishment">Create New</span>
                -->

                <!-- Split button -->
                <div class="btn-group dropup other-options">
                  <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Select from previous, etc... <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu">

                    <li>
                        <a href="#" class="select-existing"><i class="fa fa-folder-open-o" aria-hidden="true"></i> Select from previous Art</a>
                    </li>

                    <li role="separator" class="divider"></li>
                    
                    <li>
                        <a href="#" class="create-new"><i class="fa fa-plus" aria-hidden="true"></i> Create New</a>
                    </li>

                    <li>
                        <a href="#" class="upload-file"><i class="fa fa-upload" aria-hidden="true"></i> Upload File</a>
                    </li>

                  </ul>
                </div>

            </div>
         </div>

    </script>

<!-- End Embellishment Sidebar -->

<!-- Debug Panel -->

<script type="text/mustache" id="m-debug-panel-contents">
    
    <div class="header">
        @{{{materialName}}} 
    </div>

    <div class="contents">
        @{{{content}}} <br />
        @{{{title}}}
    </div>
    
</script>

<!-- End Debug Panel -->

<!-- Embellishment Sidebar -->

    <script type="text/mustache" id="m-embellishment-preview-vector">
    
        <div class="vectorInfoPreview">

            <div class="header"> 
               VECTOR LAYER
            </div>

            <div class="form-group"> 
               @{{{name}}} 
           </div>

           <div class="form-group"> 
               <img class= "vector-thumb" src = "@{{{baseVectorPath}}} " />
               <br />
               <label>Source Image</label><br />
               <a href="@{{{baseVectorPath}}}" target="_new">Open in New Tab</a>
           </div>

           <h5>COLORS </h5>

           @{{#colors}}

                <div class="form-group"> 
                   <span class="color-container" style="background-color: @{{hexCode}}; color: #ffffff">
                       @{{hexCode}} (@{{colorCode}})
                   </span><br />
               </div>            

           @{{/colors}}

        </div>

    </script>
    
    <script type="text/mustache" id="m-embellishment-preview-font">

        <style type="text/css">
            
            @font-face {
                font-family: @{{{name}}};
                src: url(@{{{fontPath}}});
            }

        </style>
    
        <div class="fontInfoPreview">
  
            <div class="header"> 
               FONT LAYER
            </div>

            <div class="form-group input-text" style="color: @{{fillcolor}}; font-family: @{{{name}}}"> 
               @{{{text}}} 
            </div>

            <div class="form-group"> 
               <label>Font:</label><br />
               @{{{style}}} / @{{{name}}} 
            </div>

            <div class="form-group"> 
               <label>Font File</label><br />
               <a href="@{{{fontPath}}}">Download Font</a>
            </div>

            <h5 style="display: @{{displayStroke}}">Stroke Color: </h5>
            @{{#strokeColor}}
                <div class="form-group" style="display: @{{displayStroke}}"> 
                   <span class="color-container" style="background-color: @{{hexCode}}; color: #ffffff">
                       @{{hexCode}} (@{{colorCode}})
                   </span><br />
                </div>            
            @{{/strokeColor}}

           <h5>Fill Color: </h5>

           @{{#fillColor}}
                <div class="form-group"> 
                   <span class="color-container" style="background-color: @{{hexCode}}; color: #ffffff">
                       @{{hexCode}} (@{{colorCode}})
                   </span><br />
               </div>            
           @{{/fillColor}}


        </div>
        </div>

    </script>

<!-- End Embellishment Sidebar -->

<!-- Embellishment Preview -->

<!-- End Embellishment Preview -->

<!-- Manipulator Panels -->

    <script type="text/mustache" id="m-manipulator-panel">

        <div class="manipulator-container">

            <ul class="tab-navs">
                <li class="tab rotate" data-action="rotate"></li>
                <li class="tab move" data-action="move"></li>
                <li class="tab scale" data-action="scale"></li>
                <li class="tab close" data-action="close">
                    <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                </li>
            </ul>
            
            <div class="containers">
                
                <div class="manipulator-type-container move" data-type="move"> 
                    <div class="sc move"><div id="move-slider-x" class="move x"></div><div id="move-slider-y" class="move y"></div></div>
                </div>

                <div class="manipulator-type-container rotate" data-type="rotate">
                    <div class="sc rotate"><div id="rotate-slider"></div></div>
                </div>

                <div class="manipulator-type-container scale" data-type="scale">
                    <div class="sc scale"><div id="scale-slider"></div></div>
                </div>

            </div>
            
        </div>

    </script>

<!-- End Manipulator Panels -->

<!-- States -->
    
    <script type="text/mustache" id="m-us-states">

        <option value="0">Select your state</option>

        @{{#states}}
            <option value="@{{code}}">@{{name}} (@{{code}})</option>
        @{{/states}}

    </script>


<!-- End States -->

<!-- ORDER FORM Error list -->
    
    <script type="text/mustache" id="m-order-form-error">
        
        <ul style="display: table;margin: 0 auto;">
            @{{#errors}}
                <li>
                    <span>@{{message}}</span>
                    <a id="@{{id}}-btn" onClick="ub.funcs.gotoField('#@{{id}}')">Go to field.</a>
                </li>
            @{{/errors}}
        </ul>
        
    </script>
<!-- End ORDER FORM Error list -->

@include('partials.controls.team-store-products-picker')