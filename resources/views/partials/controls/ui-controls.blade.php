
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

                <img src="/images/main-ui/pickers/@{{code}}.png{{$asset_version}}">

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
            
            <div class="main-picker-items grow @{{disabledClass}}" data-picker-type="sports" data-item="@{{name}}" title="@{{name}} Uniforms @{{tooltip}}">

            @if (@tooltip != "")
                <div class="cSoon">@{{tooltip}}</div>
            @endif
                <img src="/images/main-ui/pickers/@{{gender}}/@{{code}}.png{{$asset_version}}">

                <span class="main-picker-item-caption">
                    @{{name}}
                </span>

            </div>

        @{{/picker_items}}

    </script>

<!-- End Sports Pickers -->

<!-- Uniforms Picker -->

    <script type="text/mustache" id="m-picker-items-uniforms">

        @{{#picker_items}}
            
            <div class="main-picker-items grow" data-picker-type="uniforms" data-item="@{{name}}">

                <img src="@{{thumbnail_path}}{{$asset_version}}">

                <span class="main-picker-item-caption">
                    <span class="type"></span>
                    <img src='/images/main-ui/shadow.png' />
                    <strong class="type">@{{#test}}@{{factory_code}}@{{/test}}</strong>
                    <strong class="uniform-name">@{{name}}</strong> <br />
                    <span class="calculatedPrice">@{{calculatedPrice}}</span>
                </span>

            </div>

        @{{/picker_items}}

    </script>

<!-- End Uniforms Pickers -->

<!-- Uniforms Picker -->

    <script type="text/mustache" id="m-picker-items-search-results">

        @{{#picker_items}}
            
            <div class="main-picker-items grow" data-picker-type="search-result" data-id = "@{{id}}" data-uniform-type = "@{{type}}" data-item="@{{name}}">

                <img width='280' src="@{{thumbnail}}{{$asset_version}}">

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
                            <span class='inside-label'>@{{name}}</span>
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
                            <div class="name" style="">@{{name}}</div>
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

<!-- Roster Table -->
    
    <script type="text/mustache" id="m-roster-table">

        @{{#tabs}}
        <div class="tab" data-size="@{{.}}">

            <table class="roster-table" align="center" data-size="@{{.}}">
                            
                <tr class="thead">
                    
                    <th class='count'></th><th class="thnumber">Size</th><th class="wide">Last Name</th><th class="thnumber">Number</th><th class="thnumber">Quantity</th><th  class="wide sleevetype">Sleeve Type</th><th class="wide lastnameapplication">Last Name Application</th><th class="action"></th>

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
                    
                    <td>
                        <input type="text" name="lastname" value="" class="lastname" maxlength="12" />
                    </td>

                    <td>
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

        <table>
           
            <tr class="header">
                <td>Date</td>
                <td>Order ID</td>
                <td>Order Info</td>
                <td>Client</td>
                <td>Status</td>
                <td>&nbsp;</td>
            </tr>

            @{{#orders}}

                <tr>
                    <td>@{{created_at}}</td>
                    <td><strong> @{{order_id}}</strong></td>
                    <td class="order-info">

                        @{{#items}}

                            <img class="thumbs" src="@{{thumbnails.front_view}}"/><img class="thumbs" src="@{{thumbnails.left_view}}"/><img class="thumbs" src="@{{thumbnails.right_view}}"/><img class="thumbs" src="@{{thumbnails.back_view}}"/><br />
                            <strong> @{{description}}</strong>, <a href="@{{design_sheet}}" target="_new">View PDF</a> <br />

                        @{{/items}}


                    </td>
                    <td>@{{client}}</td>
                    <td>@{{status}}</td> 
                    
                    <td class="action">
                        
                        <span class="action-button" data-order-id="@{{order_id}}"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> View / Edit Info</span>
                        
                    </td>

                </tr>

            @{{/orders}}

        </table>

    </script>   

<!-- End Orders Table -->

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
                    
                    <strong class="feedback-message">Prolook Uniform Customizer is still in the development and testing phase, if you want to report any errors, or if you have any feedback regarding your experience, please use the form below. Your feedback is significant so that we can improve this product for you and for other users as well. Thank you! </strong> <br/ ><br />
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
                    
                    <strong>Prolook Uniform Customizer is still in the development and testing phase, if you want to report any errors, or if you have any feedback regarding your experience, please use the form below. Your feedback is significant so that we can improve this product for you and for other users as well. Thank you! </strong> <br/ ><br />
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

<!-- Profile -->

    <script type="text/mustache" id="m-profile-page">

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

