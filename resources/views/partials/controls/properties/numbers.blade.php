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
        </div>
        @{{ /applications }}
    </div>
</div>
</script>