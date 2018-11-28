<script type="text/mustache" id="m-decorations-numbers">
<div id="numbers-panel">
    <div class="content application-numbers-container">
        <h4>DECORATION NUMBERS</h4>
        <div class="add-new-application-numbers">
            <button type="button" class="app-btn w-45 add-app-numbers app-numbers-button"><span class="fa fa-plus-circle"></span> Add Application</button>
            <button type="button" class="app-btn w-45 pull-right view-app-numbers app-numbers-button"><span class="fa fa-eye"></span> View All Application</button>
        </div>

        @{{ #applications }}

        <div class="application">
            <div class="posContainer clearfix app-numbers-wrapper">
                <button type="button" class="app-btn w-45 pull-left active view-numbers-opt app-numbers-button">View</button>
                <button type="button" class="app-btn w-45 pull-right hide-numbers-opt app-numbers-button">Hide</button>
            </div>

            <h4 class="app-numbers-title">@{{ type }} <span class="subtitle">(@{{ perspective }} view) #@{{ code }}</span></h4>
            <input
                type="text"
                value="@{{ text }}"
                class="application-text"
                data-application-type="@{{ application_type }}"
                data-font-id="@{{ font_obj.id }}"
                data-application-layer="@{{ application.layer }}"
                data-application-id="@{{ application.id }}"
            >

            <div class="slidersContainer">
                <div class="clearfix">
                    <h5 class="app-numbers-subtitle">@{{ application.name.toUpperCase() }} TEAM NAME FONT</h5>
                    <div class="posContainer input-group" align="center" style="color: black">
                        <span class="input-group-addon fontStyleLeft" data-direction="previous"><i class="glyphicon glyphicon-arrow-left"></i></span>
                        <span class="font_name form-control" style="font-size: 1.2em; font-family: @{{ font_obj.name }}">@{{ font_obj.caption }}</span>
                        <span class="input-group-addon fontStyleRight" data-direction="next"><i class="glyphicon glyphicon-arrow-right"></i></span>
                    </div>
                </div>

                <div class="manipulator-type-container scale" data-type="scale">
                    <h5>FONT SIZE</h5>
                    <div class="sc scale">
                        <div id="scale-slider" class="slider-control-scale" data-id="@{{ code }}"></div>
                    </div>
                </div>

                <div class="manipulator-type-container move" data-type="move">
                    <h5>POSITION</h5>
                    <div class="sc move">
                        <div id="move-slider-x" class="move x slider-control-move-x" data-id="@{{ code }}"></div>
                        <div id="move-slider-y" class="move y slider-control-move-y" data-id="@{{ code }}"></div>
                    </div>
                </div>

                <div class="manipulator-type-container rotate" data-type="rotate">
                    <h5>ROTATE</h5>
                    <div class="sc rotate">
                        <div id="rotate-slider" class="slider-control-rotate" data-id="@{{ code }}"></div>
                    </div>
                </div>

                <div class="clearfix">
                    <h5>CHOOSE FONT ACCENT</h5>
                    @{{ #accents }}
                    <div class="font-accent @{{ active }}"
                        data-application-id="@{{ application.id }}"
                        data-accent-id="@{{ id }}"
                        data-accent-code="@{{ code }}"
                        >
                        <img class="font-accent-thumbnail" src="@{{ thumbnail }}">
                        @{{{ activeCheck }}}
                    </div>
                    @{{ /accents }}
                </div>

                <div class="clearfix">
                    <h5>CHOOSE FONT COLOR</h5>
                </div>
            </div>
        </div>

        @{{ /applications }}

    </div>
</div>
</script>