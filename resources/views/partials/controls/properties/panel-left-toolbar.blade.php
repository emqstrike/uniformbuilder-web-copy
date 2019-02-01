<script type="text/mustache" id="m-left-panel-toolbar">
    <div class="perspective">
        @{{ #perspectives }}
            <a href="javascript:void(0)" class="change-perspective-button" data-perspective="@{{ perspective }}">
                <div class="cp-padding-small cp-width-small">
                    <div class="cp-border cp-padding-small">
                        <img src="@{{ image }}" alt="" width="100%" height="100">
                    </div>
                </div>
            </a>
        @{{ /perspectives }}
    </div>
</script>