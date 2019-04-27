<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Access-Control-Allow-Origin" content="*"/>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Engineering">
    <meta name="csrf-token" content="{{ csrf_token() }}" />
    <meta name="team-store-api" content="{{ env('TEAM_STORE_API_BASE_URL') }}">

    <title>Prolook Sports | Uniform Customizer</title>

    <meta name="description" content="Design your own custom uniforms using the Prolook Uniform Customizer. We offer tons of designs for all sports. Create your custom uniform today.">
    <meta name="keywords" content="custom uniform, custom football uniform, custom basketball uniform, custom baseball uniform, custom volleyball uniform, uniform builder, prolook unifom builder, team uniforms">
    <link rel="icon" type="image/png" href="/images/branding/favicon.ico"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-beta.42/css/uikit.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/roundSlider/1.3.2/roundslider.min.css" />
    <link rel="stylesheet" href="https://simeydotme.github.io/jQuery-ui-Slider-Pips/dist/css/jqueryui.min.css" />
    <link rel="stylesheet" href="https://rawgit.com/simeydotme/jQuery-ui-Slider-Pips/master/dist/jquery-ui-slider-pips.css" />
    <link rel="stylesheet" href="{{$asset_storage}}/richardson/css/richardson-builder.css?v={{$asset_version}}">

    @include('partials.code.rollbar-js')

    <script type="text/javascript" src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>
<div>
    <!-- Preview Panel -->
    @include('partials.panels.debug-panel')
    <!-- End Preview Panel -->
</div>
<section class="uk-section" id="main-container">
    <div class="uk-container uk-container-large">
        <div class="uk-grid-collapse" uk-grid>
            <div class="uk-width-1-1 uk-width-1-2@m uk-width-2-3@l ">
                <div class="uk-grid-collapse uk-flex-center" uk-grid>
                    <div class="uk-width-1-1 uk-width-expand@s">
                        <div class=" uk-grid-collapse uk-flex uk-flex-center" uk-grid>
                            <div class="con-preview uk-width-1-1 uk-width-3-4@s">
                                <div class="uk-inline">
                                    <!-- Main Canvas -->
                                    <div class="uk-cover-container" uk-height-viewport>
                                        <div class="canvas-views" id="main_view">
                                        </div>
                                    </div>

                                    <a href="#" class="uk-position-center-left-out uk-visible@s uk-link-reset" uk-icon="icon: chevron-left; ratio: 2" uk-switcher-item="previous"></a>
                                    <a href="#" class="uk-position-center-right-out uk-visible@s uk-link-reset" uk-icon="icon: chevron-right; ratio: 2" uk-switcher-item="next"></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Left Pane -->
                    <div class="uk-width-1-1 con-preview-pane-thumb-nav uk-flex-center uk-flex-first@s">
                        <div id="preview-pane-thumb-nav" class="uk-grid-small grid-tiny uk-flex-center active-bdr-red uk-margin-bottom" uk-switcher="connect: .con-preview" uk-grid>
                            <div class="uk-width-auto uk-width-1-1@s uk-width-auto@m uk-width-1-1@l">
                                <a href="" class="thumbnail-small bdrr-none uk-link-reset bdr-thin bdr-gray" uk-icon=" ratio: 2">
                                    <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/984010a0a226dc207ee5430a1e00a1b7.png" alt="" width="380" height="629" uk-img>
                                </a>
                            </div>
                            <div class="uk-width-auto uk-width-1-1@s uk-width-auto@m uk-width-1-1@l">
                                <a href="" class="thumbnail-small bdrr-none uk-link-reset bdr-thin bdr-gray" uk-icon=" ratio: 2">
                                    <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/ff11e98804c31eace338c140fc3b4e2f.png" alt="" width="380" height="629" uk-img>
                                </a>
                            </div>
                            <div class="uk-width-auto uk-width-1-1@s uk-width-auto@m uk-width-1-1@l">
                                <a href="" class="thumbnail-small bdrr-none uk-link-reset bdr-thin bdr-gray" uk-icon=" ratio: 2">
                                    <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/decdfb5513247463255f68634de2bcfb.png" alt="" width="380" height="629" uk-img>
                                </a>
                            </div>
                            <div class="uk-width-auto uk-width-1-1@s uk-width-auto@m uk-width-1-1@l">
                                <a href="" class="thumbnail-small bdrr-none uk-link-reset bdr-thin bdr-gray" uk-icon=" ratio: 2">
                                    <img src="https://s3-us-west-2.amazonaws.com/uniformbuilder/uploads/staging/801f4aaa30cc9cb9f960d7c04ece745c.png" alt="" width="380" height="629" uk-img>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Right Pane -->
            <div class="uk-width-1-1 uk-width-1-2@m uk-width-1-3@l">
                <div class="uk-padding-small bgc-light wer">
                    <div class=" uk-text-right">
                        <a class="uk-link-reset uk-text-uppercase" href="">Select new style</a>
                    </div>
                    <h5 class="uk-text-uppercase uk-text-bold uk-margin-remove">Pts 20</h5>
                    <div class="uk-grid-small" uk-grid>
                        <div class="uk-width-expand">
                            <h4 class="uk-text-uppercase uk-text-bold uk-margin-remove uk-text-truncate abrade-ultra-italic">Pts Pro select 3000-8</h4>
                            <h6 class="uk-text-small uk-text-uppercase uk-text-bold uk-margin-remove fc-red abrade-ultra">Sublimated</h6>
                        </div>
                    </div>
                </div>

                <div class="uk-grid-collapse" uk-grid>
                    <!-- Number Navigation -->
                    <div class="uk-width-1-1 uk-width-auto@s left-nav">
                        <div class="uk-flex-center uk-grid-collapse uk-child-width-auto uk-text-right@m active-bgc-red active-bdr-red uk-text-bold" id="property-modifiers-menu" uk-grid>
                            <div class="uk-active">
                                <!-- <a href="" class="group-pane abrade-ultra menu-item group-1 menu-item-fabrics uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Fabric; pos: top-right">1</a> -->
                                <a href="" class="group-pane abrade-ultra menu-item group-1 menu-item-fabrics uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Fabric; pos: left; ">1</a>
                            </div>
                            <div class="">
                                <!-- <a href="" class="group-pane abrade-ultra menu-item group-2 menu-item-parts uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Base Color; pos: top-right">2</a> -->
                                <a href="" class="group-pane abrade-ultra menu-item group-2 menu-item-parts uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Base Color; pos: left; ">2</a>
                            </div>
                            <div class="">
                                <!-- <a href="" class="group-pane abrade-ultra menu-item group-3 menu-item-piping uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Inserts; pos: top-right">3</a> -->
                                <a href="" class="group-pane abrade-ultra menu-item group-3 menu-item-piping uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Inserts; pos: left; ">3</a>
                            </div>
                            <div class="">
                                <!-- <a href="" class="group-pane abrade-ultra menu-item group-4 menu-item-letters uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Pipings; pos: top-right">4</a> -->
                                <a href="" class="group-pane abrade-ultra menu-item group-4 menu-item-letters uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Pipings; pos: left">4</a>
                            </div>
                            <div class="">
                                <!-- <a href="" class="group-pane abrade-ultra menu-item group-5 menu-item-numbers uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Decoration Letters; pos: top">5</a> -->
                                <a href="" class="group-pane abrade-ultra menu-item group-5 menu-item-numbers uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Decoration Letters; pos: left">5</a>
                            </div>
                            <div class="">
                                <!-- <a href="" class="group-pane abrade-ultra menu-item group-6 menu-item-applications uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Decoration Numbers; pos: top">6</a> -->
                                <a href="" class="group-pane abrade-ultra menu-item group-6 menu-item-applications uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Decoration Numbers; pos: left">6</a>
                            </div>
                            <div class="">
                                <!-- <a href="" class="group-pane abrade-ultra menu-item group-7 menu-item-logo uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Decorations; pos: top">7</a> -->
                                <a href="" class="group-pane abrade-ultra menu-item group-7 menu-item-logo uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Decorations; pos: left">7</a>
                            </div>
                        </div>
                    </div>
                    <!-- End Number Navigation -->
                    <div class="uk-width-1-1 uk-width-expand@s pane-main-window" id="right-main-window">
                        @include('partials.panels.materials')

                        @include('partials.panels.colors')

                        @include('partials.panels.patterns')

                        @include('partials.panels.gradients')

                        @include('partials.panels.applications')

                        @include('partials.panels.texts')

                        @include('partials.panels.numbers')

                        @include('partials.panels.graphics')

                        @include('partials.panels.sizes')

                        @include('partials.panels.attachments')

                        @include('partials.panels.mod_main')

                        @include('partials.panels.mod_primary')

                        @include('partials.panels.layers')

                        @include('partials.panels.pipings')

                        @include('partials.panels.randomFeeds')

                        <!-- Richardson Modals file -->
                        @if(env("BRAND") === "Richardson")
                            @include('partials.panels.richardson-application-modal')
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


    <!-- UI Controls --> 

    <!-- Prolook / Base -->
    @include('partials.controls.ui-controls')

    <!-- Richardson UI Controls -->
    @include('partials.controls.ui-controls-richardson')

    <!-- End UI Controls -->


    <!-- Code -->

    <!-- Third Party Scripts -->
    @include('partials.code.includes')

    <!-- Init Code -->
    @include('partials.code.init-code')
    <!-- End Code -->



<script type="text/javascript">
    window.brand_env = '{{ env('BRAND') }}';
</script>
<script src="{{$asset_storage}}/uniform-builder/js/ub.js?v={{$asset_version}}"></script>
</body>
</html>
