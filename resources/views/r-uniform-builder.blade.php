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

    @include('partials.code.rollbar-js')
    @include('partials.code.stylesheets')

    <script type="text/javascript" src='https://www.google.com/recaptcha/api.js'></script>
</head>
<body>
<div>
    <!-- Preview Panel -->
    @include('partials.panels.debug-panel')
    <!-- End Preview Panel -->
</div>
<section class="uk-section">
    <div class="uk-container uk-container-large">
        <div class="uk-grid-collapse" uk-grid>
            <div class="uk-width-1-1 uk-width-1-2@m uk-width-2-3@l ">
                <div class="uk-grid-collapse uk-flex-center" uk-grid>
                    <div class="uk-width-1-1 uk-width-expand@s">
                        <div class=" uk-grid-collapse uk-flex uk-flex-center" uk-grid>
                            <div class="con-preview uk-width-1-1 uk-width-3-4@s">
                                <div class="uk-inline">
                                    <!-- Main Canvas -->
                                    <div class="canvas-views" id="main_view">
                                        <div class="verbiage-container">
                                            <p class="verbiage-text">
                                                &quot;The finished product color may vary slightly from image shown on your monitor. This may be caused by brightness, contrast or other monitor settings.&quot;
                                            </p>
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
                        <div class="uk-flex-center uk-grid-collapse uk-child-width-auto uk-text-right@m active-bgc-red active-bdr-red uk-text-bold" uk-switcher="connect: .con-customizer" uk-grid>
                            <div class="uk-active">
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Fabric; pos: top-right">1</a>
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Fabric; pos: left; ">1</a>
                            </div>
                            <div class="">
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Base Color; pos: top-right">2</a>
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Base Color; pos: left; ">2</a>
                            </div>
                            <div class="">
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Inserts; pos: top-right">3</a>
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Inserts; pos: left; ">3</a>
                            </div>
                            <div class="">
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Pipings; pos: top-right">4</a>
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Pipings; pos: left">4</a>
                            </div>
                            <div class="">
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Decoration Letters; pos: top">5</a>
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Decoration Letters; pos: left">5</a>
                            </div>
                            <div class="">
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Decoration Numbers; pos: top">6</a>
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Decoration Numbers; pos: left">6</a>
                            </div>
                            <div class="">
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Decorations; pos: top">7</a>
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Decorations; pos: left">7</a>
                            </div>
                            <div class="">
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-hidden@s" uk-tooltip="title: Richardson Logo; pos: top">8</a>
                                <a href="" class="uk-icon-button bdrr-none bdr-thin bdr-light uk-link-reset uk-visible@s" uk-tooltip="title: Richardson Logo; pos: left">8</a>
                            </div>
                        </div>
                    </div>
                    <!-- End Number Navigation -->
                    <div class="uk-width-1-1 uk-width-expand@s">
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script type="text/javascript">
    window.brand_env = '{{ env('BRAND') }}';

    if (brand_env === "Richardson") {
        document.getElementById("main_container").style.display = "none";
    }
</script>
</body>
</html>
