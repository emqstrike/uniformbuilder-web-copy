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
<!-- /Colors Properties -->


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

<script type="text/mustache" id="m-new-color-pattern-picker">
    
</script>