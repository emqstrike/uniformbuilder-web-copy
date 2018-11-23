<script type="text/mustache" id="m-decorations-numbers">
<div id="numbers-panel">
    <div class="content">
        <h5>Decoration Numbers</h5>
        <div class="menu-selection">
            <div class="pad-large">
                <span class="button">
                    Add Application
                </span>
            </div>
            <div class="pad-large">
                <span class="button">
                    View All Applications
                </span>
            </div>
        </div>

        @{{ #applications }}
        <div class="application">
            <li>@{{ application.name }}</li>
            <input
                type="text"
                value="@{{ text }}"
                class="application-text"
                data-application-type="@{{ application_type }}"
                data-font-id="@{{ font_obj.id }}"
                data-application-layer="@{{ application.layer }}"
                data-application-id="@{{ application.id }}"
            >
            <select
                class="font-style"
                data-application-type="@{{ application_type }}"
                data-application-layer="@{{ application.layer }}"
                data-application-id="@{{ application.id }}"
            >
                @{{ #fonts }}
                <option value="@{{ id }}">
                    @{{ caption }}
                </option>
                @{{ /fonts }}

            </select>

            <div class="slidersContainer">
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
                <div class="thumbnailContainer @{{ active }}" data-accent-id="@{{ id }}">
                    <img class="number-accent-thumbnail" src="@{{ thumbnail }}" height="50px">
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