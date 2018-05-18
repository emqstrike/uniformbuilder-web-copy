
    <!-- R Color Picker List -->

    <script type="text/mustache" id="r-scrolling-color-picker">

        <div id="scrolling-color-picker-container">

            @{{#modifier}}

                <div class='modifier-item' data-name='@{{name}}' data-fullname='@{{fullname}}' data-group-id='@{{group_id}}'>

                    <span class='item-label'>@{{name}}</span> <br />
                    <em>Choose Color: </em>
                    <br /><br />

                    <div class="color-items-container">

                        @{{#colorSet}}
                            <div class="colorset-item" style="background-color: #@{{hex_code}}" data-color-code="@{{color_code}}" data-hex-code="@{{hex_code}}" data-full-name="@{{fullname}}">

                            </div>
                        @{{/colorSet}} 

                        @{{#patternThumbs}}
                            <div class="colorset-item colorset-item-pattern" style="background-image: url(@{{path}}/@{{filename}}.png)">

                            </div>
                        @{{/patternThumbs}} 

                        <br /><br />

                        <button class="edit-pattern-button">Edit Pattern Color</button>

                        <br /><br />

                    </div>
                    
                </div>

            @{{/modifier}}

        </div>

    </script>

    <!-- End R Color Picker List -->
