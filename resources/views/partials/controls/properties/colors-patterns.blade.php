<!-- Colors Properties -->
<script type="text/mustache" id="m-colors">

    <div id="properties-colors">
        @{{ #colors }}
        <li>@{{ id }} @{{ name }}</li>
        @{{ /colors }}
    </div>

</script>
<!-- /Colors Properties -->

<!-- Color Wheel Properties -->
<script type="text/mustache" id="m-color-wheel">

    <div id="team-color-picker"></div>
    <div id="cw"></div>

</script>
<!-- /Colors Wheel Properties -->


<!-- Patterns Properties -->
<script type="text/mustache" id="m-patterns">

    <div id="properties-patterns">
        @{{ #patterns }}
        <li>@{{ id }} @{{ name }}</li>
        <img src="@{{ icon }}">
        @{{ /patterns }}
    </div>

</script>
<!-- /Patterns Properties -->

<!-- Colors&Patterns Properties -->
<script type="text/mustache" id="m-colors-patterns">
@{{ #modifiers }}
<div class="cp-padding-small cp-padding-remove-vertical">
    <div class="row">
        <div class="col-md-12 cp-padding-remove">
            <div class="cp-text-uppercase cp-fc-white">
                <h4 class="header cp-text-bold">@{{ name }}</h4>
                <p style="font-weight: bold;">Choose Color / Pattern</p>
            </div>
        </div>

        <div class="col-md-12 cp-margin-bottom-medium cp-padding-remove">
            <p>COLOR</p>
            @{{ #colors }}
            <div class="color-main-container">
                <div class="color_element sublimated color-container-button">
                    <button class="grow change-color whitebtn cp-new-color-box color-selector-button" style="background-color: #@{{ hex_code}};" data-color-name="@{{ name}}">
                    </button>
                    <span class="label">@{{ name }}</span>
                </div>
            </div>
            @{{ /colors }}
        </div>

        <div class="col-md-12 cp-padding-remove">
            <p>PATTERN</p>
            @{{ #patterns }}
                <div class="color_element sublimated pattern-main-container">
                    <div class="pattern-container-button" data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                        <button class="grow change-color whitebtn cp-new-color-box pattern-selector-button" style="background-image: url('@{{ icon }}');">
                        </button>
                    </div>
                </div>
            @{{ /patterns }}
        </div>
        <div class="col-md-12 cp-margin-top-small cp-padding-remove">
            <div class="edit-pattern-modal-container">
            </div>
            <hr>
        </div>
    </div>
</div>
<div class="modal fade" id="pattern-change-color" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <a type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></a>
                </div>
                <div>
                    <h4 class="modal-title cp-fc-black" id="myModalLabel">Pattern Color</h4>
                </div>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-4">
                        <div>
                            <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/patterns/staging/armour318d1133a476537e23dd9e24/thumbnail.png" alt="" width="100%" height="150">
                        </div>
                        <div class="cp-text-center">
                            <p class="cp-text-uppercase cp-text-medium">Armour</p>
                        </div>
                    </div>
                    <div class="col-md-8">
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
                            <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
                            <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
                            <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
                        </ul>

                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="home">
                                <div>
                                    <p class="cp-fc-black">COLOR 1</p>
                                    @{{ #colors }}
                                        <div class="col-md-2 cp-padding-remove cp-margin-top-small color-container-button">
                                            <div data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                                                <button class="color-selector-button cp-modal-color" style="background-color: #@{{ hex_code}};" data-color-name="@{{ name}}">
                                                </button>
                                            </div>
                                        </div>
                                    @{{ /colors }}
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="profile">
                                <div>
                                    <p class="cp-fc-black">COLOR 2</p>
                                    @{{ #colors }}
                                        <div class="col-md-2 cp-padding-remove cp-margin-top-small color-container-button">
                                            <div data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                                                <button class="color-selector-button cp-modal-color" style="background-color: #@{{ hex_code}};" data-color-name="@{{ name}}">
                                                </button>
                                            </div>
                                        </div>
                                    @{{ /colors }}
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="messages">
                                <div>
                                    <p class="cp-fc-black">COLOR 3</p>
                                    @{{ #colors }}
                                        <div class="col-md-2 cp-padding-remove cp-margin-top-small color-container-button">
                                            <div data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                                                <button class="color-selector-button cp-modal-color" style="background-color: #@{{ hex_code}};" data-color-name="@{{ name}}">
                                                </button>
                                            </div>
                                        </div>
                                    @{{ /colors }}
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="settings">
                                <div>
                                    <p class="cp-fc-black">COLOR 4</p>
                                    @{{ #colors }}
                                        <div class="col-md-2 cp-padding-remove cp-margin-top-small color-container-button">
                                            <div data-toggle="tooltip" data-placement="top" title="@{{ name }}">
                                                <button class="color-selector-button cp-modal-color" style="background-color: #@{{ hex_code}};" data-color-name="@{{ name}}">
                                                </button>
                                            </div>
                                        </div>
                                    @{{ /colors }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <div>
                    <button type="button" class="btn btn-default cp-button-medium" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-default cp-button-medium">Save changes</button>
                </div>
            </div>
        </div>
    </div>
</div>
@{{ /modifiers }}
</script>
<!-- /Colors&Patterns Properties