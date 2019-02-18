@extends("richardson.layout.master")
@section("body")
<div id="richardson-main-container">
    <section class="uk-section index-main-header">
        <div class=" uk-container uk-container-large">
            <div class="uk-grid-collapse uk-flex-center uk-flex-middle uk-grid-match-height" uk-grid>
                <div class="uk-width-1-1 uk-width-1-2@s uk-width-1-2@m">
                    <div class="">
                        <div class="uk-cover-container">
                            <div class="loading">
                                <div class="uk-text-center">
                                    <div uk-spinner="ratio: 15.5"></div>
                                </div>
                            </div>
                            <div class="banner">
                                <canvas width="2698" height="1500"></canvas>
                                <img src="./img/img-banner.png" alt="" uk-cover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="uk-width-1-1 uk-width-1-2@s uk-width-1-2@m uk-flex-first@s">
                    <div class="uk-card uk-card-body uk-flex-middle" uk-grid>
                        <div>
                            <h1 class="uk-heading uk-text-uppercase uk-text-bold abrade-ultra-italic">R-Customizer</h1>
                            <p class="uk-text-lead uk-text-uppercase uk-text-bold">This design tool is made to play, so get creative!</p>
                            <p class=" uk-text-uppercase">*Customized products are only available through authorized dealers</p>
                            <button class="uk-button uk-button-secondary abrade-ultra-italic bgc-darkerGray fc-light">More Info</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <div class="richardson-initial-picker">
        
    </div>
</div>
<script type="text/javascript" src="/richardson/js/uniform-builder-richardson-data.js"></script>
<script type="text/javascript" src="/richardson/js/RichardsonIndex.js"></script>
<script type="text/javascript">
    $(document).ready(function($) {
        ub.richardson.config = {
            host: "{{ env('CUSTOMIZER_HOST') }}",
        }
    });
</script>

<script type="text/mustache" id="m-richardson-index">
    <div class="richardson-index-container">
        <section>
            <div class="uk-grid-collapse uk-child-width-expand@s uk-text-center uk-grid-match-height" uk-grid>
                <div class="uk-padding bgc-red uk-grid-collapse uk-flex uk-flex-middle uk-flex-center" uk-grid>
                    <div>
                        <h2 class="uk-h2 fc-white uk-text-bold abrade-ultra-italic">Design by Model #</h2>
                        <form>
                            <div class="uk-inline con-load-design">
                                <a class="uk-form-icon uk-form-icon-flip bgc-light uk-link-reset" href="#">
                                    <span  class=" fc-red icon icon-right-arrow"></span>
                                </a>
                                <input class="uk-input bgc-red fc-light" type="text" placeholder="Enter Model Number">
                            </div>
                        </form>
                    </div>
                </div>
                <div class="uk-padding bgc-dark uk-grid-collapse uk-flex uk-flex-middle uk-flex-center" uk-grid>
                    <div>
                        <h2 class="uk-h2 fc-white uk-text-bold abrade-ultra-italic">Load a Previous Design</h2>
                        <form>
                            <div class="uk-inline con-load-design">
                                <a class="uk-form-icon uk-form-icon-flip bgc-light uk-link-reset" href="#">
                                    <span  class=" fc-red icon icon-right-arrow"></span>
                                </a>
                                <input class="uk-input bgc-dark fc-light" type="text" placeholder="Enter Design Number">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div class="uk-container block-pattern-container">
                <h3 class="uk-h2 uk-margin-large-top uk-text-uppercase uk-text-bold uk-text-center abrade-ultra-italic">Select a starting point below</h3>
                <ul class="uk-subnav uk-child-width-expand bottom-arrow bac-light top-line tl-red active-fc-red uk-margin-remove-bottom" uk-height-match="target: li > ul"  uk-switcher="connect: .switcher-container">
                    <li class="uk-active block-pattern-item" data-block-pattern="PTS Signature">
                        <div class="uk-text-center">
                            <a href="#" class="uk-text-bold fc-dark abrade-ultra">Pts Signature</a>
                        </div>
                        <div class="uk-cover-container">
                            <canvas width="380" height="429"></canvas>
                            <img src="./img/Untitled-1.svg" alt="" uk-cover>
                        </div>
                        <ul class="uk-list uk-list-bullet uk-padding-small uk-padding-remove-vertical uk-visible@m">
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                    </li>
                    <li class="block-pattern-item" data-block-pattern="PTS Pro Select">
                        <div class="uk-text-center">
                            <a href="#" class="uk-text-bold fc-dark abrade-ultra">Pts Pro Select</a>
                        </div>
                        <div class="uk-cover-container">
                            <canvas width="380" height="429"></canvas>
                            <img src="./img/Untitled-1.svg" alt="" uk-cover>
                        </div>
                        <ul class="uk-list uk-list-bullet uk-padding-small uk-padding-remove-vertical uk-visible@m">
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                    </li>
                    <li class="block-pattern-item" data-block-pattern="PTS Select">
                        <div class="uk-text-center">
                            <a href="#" class="uk-text-bold fc-dark abrade-ultra">Pts Select</a>
                        </div>
                        <div class="uk-cover-container">
                            <canvas width="380" height="429"></canvas>
                            <img src="./img/Untitled-1.svg" alt="" uk-cover>
                        </div>
                        <ul class="uk-list uk-list-bullet uk-padding-small uk-padding-remove-vertical uk-visible@m">
                            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <ul class="uk-switcher switcher-container bgc-light uniform-type-container">
                <li class="uk-container">

                    <div class="uk-margin-medium-top uk-flex uk-flex-center uk-hidden@m" uk-grid>
                        <div class="uk-width-1-1 uk-width-3-4@s">
                            <ul class="uk-list uk-list-bullet uk-padding-small uk-padding-remove-bottom">
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                            </ul>
                        </div>
                    </div>

                    <h3 class="uk-h2 uk-margin-medium-top uk-text-uppercase uk-text-bold uk-text-center abrade-ultra-italic">Select uniform type</h3>

                    <div class="uk-grid-medium uk-child-width-expand@s uk-text-center uk-margin-large-bottom" uk-grid>
                        <div>
                            <a href="javascript:void(0)" data-application-type="sublimated" class="richardson-filter-button uk-button uk-width-1-1 uk-link-reset bgc-red">
                                <h2 class="uk-h2 fc-white uk-text-uppercase uk-text-bold uk-padding uk-padding-remove-horizontal uk-margin-remove abrade-black">Sublimated Fabric</h2>
                            </a>
                            <div class="uk-flex-center uk-grid uk-margin-top" uk-grid>
                                <ul class="uk-list uk-list-bullet uk-text-left uk-width-3-4">
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <a href="javascript:void(0)" data-application-type="tackle_twill" class="richardson-filter-button uk-button uk-width-1-1 uk-link-reset bgc-dark">
                                <h2 class="uk-h2 fc-white uk-text-uppercase uk-text-bold uk-padding uk-padding-remove-horizontal uk-margin-remove abrade-black">Dyed Fabric</h2>
                            </a>
                            <div class="uk-flex-center uk-grid uk-margin-top" uk-grid>
                                <ul class="uk-list uk-list-bullet uk-text-left uk-width-3-4">
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>

                <li class="uk-container">

                    <div class="uk-margin-medium-top uk-flex uk-flex-center uk-hidden@m" uk-grid>
                        <div class="uk-width-1-1 uk-width-3-4@s">
                            <ul class="uk-list uk-list-bullet uk-padding-small uk-padding-remove-bottom">
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                            </ul>
                        </div>
                    </div>

                    <h3 class="uk-h2 uk-margin-medium-top uk-text-uppercase uk-text-bold uk-text-center abrade-ultra-italic">Select uniform type</h3>

                    <div class="uk-grid-medium uk-child-width-expand@s uk-text-center uk-margin-large-bottom" uk-grid>
                        <div>
                            <a href="javascript:void(0)" data-application-type="sublimated" class="richardson-filter-button uk-button uk-width-1-1 uk-link-reset bgc-red">
                                <h2 class="uk-h2 fc-white uk-text-uppercase uk-text-bold uk-padding uk-padding-remove-horizontal uk-margin-remove abrade-black">Sublimated Fabric</h2>
                            </a>
                            <div class="uk-flex-center uk-grid uk-margin-top" uk-grid>
                                <ul class="uk-list uk-list-bullet uk-text-left uk-width-3-4">
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <a href="javascript:void(0)" data-application-type="tackle_twill" class="richardson-filter-button uk-button uk-width-1-1 uk-link-reset bgc-dark">
                                <h2 class="uk-h2 fc-white uk-text-uppercase uk-text-bold uk-padding uk-padding-remove-horizontal uk-margin-remove abrade-black">Dyed Fabric</h2>
                            </a>
                            <div class="uk-flex-center uk-grid uk-margin-top" uk-grid>
                                <ul class="uk-list uk-list-bullet uk-text-left uk-width-3-4">
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="uk-container">

                    <div class="uk-margin-medium-top uk-flex uk-flex-center uk-hidden@m" uk-grid>
                        <div class="uk-width-1-1 uk-width-3-4@s">
                            <ul class="uk-list uk-list-bullet uk-padding-small uk-padding-remove-bottom">
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor dolor sit amet</li>
                            </ul>
                        </div>
                    </div>

                    <h3 class="uk-h2 uk-margin-large-top uk-text-uppercase uk-text-bold uk-text-center abrade-ultra-italic">Select uniform type</h3>

                    <div class="uk-grid-medium uk-text-center uk-margin-large-bottom uk-flex-center" uk-grid>
                        <div class="uk-width-1-1 uk-width-3-4@m">
                            <a href="javascript:void(0)" data-application-type="sublimated" class="richardson-filter-button uk-button uk-width-1-1 uk-link-reset bgc-red">
                                <h2 class="uk-h2 fc-white uk-text-uppercase uk-text-bold uk-padding uk-padding-remove-horizontal uk-margin-remove abrade-black">Sublimated Fabric</h2>
                            </a>
                            <div class="uk-flex-center uk-grid uk-margin-top" uk-grid>
                                <ul class="uk-list uk-list-bullet uk-text-left uk-width-3-4">
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet</li>
                                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
    </div>
</script>


<script type="text/mustache" id="m-richardson-styles">
    <div class="uk-padding-small uk-padding-remove-horizontal">
        <h5 class="uk-h2 uk-text-uppercase uk-text-bold uk-text-center abrade-ultra-italic uk-margin-remove uk-padding-small uk-padding-remove-horizontal uniform-filter-header" data-block-pattern="@{{ block_pattern }}" data-application-type="@{{ application_type }}">
            @{{ block_pattern }} - @{{ application_type }} Fabric
        </h5>

        <ul class="uk-subnav uk-flex-center top-line tl-red active-fc-red primary-filter" uk-switcher>
            <li class="uniform-type-filter" data-type="upper">
                <a href="#">
                    <h5 class="uk-margin-remove uk-text-uppercase uk-text-bold fc-dark abrade-ultra">Jersey</h5>
                </a>
            </li>
            <li class="uniform-type-filter" data-type="lower">
                <a href="#">
                    <h5 class="uk-margin-remove uk-text-uppercase uk-text-bold fc-dark abrade-ultra">Pants</h5>
                </a>
            </li>
        </ul>

        <hr>

        <ul style="list-style: none" class="uk-padding-remove">
            <li>
                <ul class="uk-subnav uk-flex-center bottom-arrow bac-light top-line tl-red active-fc-red secondary-filter" uk-switcher>
                    {{-- Secondary filter --}}
                </ul>

                <div class="uk-padding uk-padding-remove-horizontal bgc-light">
                    <div class="uk-container bgc-light">
                        <div id="uniform-list" class="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid-match uk-grid-small con-card-item uk-text-center" uk-grid>
                            
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</script>

<script type="text/mustache" id="m-richardson-secondary-filter">
<li class="filter-uniform-neck-option" data-filter-neck="all">
    <a href="#">
        <h5 class="uk-margin-remove uk-text-uppercase uk-text-bold fc-dark abrade-ultra">All</h5>
    </a>
</li>
@{{ #labels }}
    <li class="filter-uniform-neck-option" data-filter-neck="@{{ . }}">
        <a href="#">
            <h5 class="uk-margin-remove uk-text-uppercase uk-text-bold fc-dark abrade-ultra">@{{ . }}</h5>
        </a>
    </li>
@{{ /labels }}
</script>

<script type="text/mustache" id="m-richardson-uniforms">
@{{ #uniforms }}
    <div>
        <div class="uk-inline-clip uk-transition-toggle" tabindex="0">
            <img class="uk-padding-small" src="@{{ thumbnail_path }}" alt="">
            <div class="uk-transition-fade uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle uk-padding-remove">
                <a href="@{{ host }}/builder/0/@{{ id }}" class="uk-button uk-button-small padding-tiny-vertical uk-overlay-primary hov-red fc-white uk-text-bold">
                    <div class=" uk-flex uk-flex-middle">
                        <span class="icon icon-customize-this-uniform padding-tiny-vertical"></span>
                        <div class="abrade-ultra-italic uk-margin-small-left uk-visible@s">
                            Customize<span class="uk-visible@l"> this</span><span class="uk-visible@xl"> jersey</span>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="uk-margin-bottom bdr-remove bgc-transparent">
            <h4 class="uk-margin-small-top uk-margin-remove-bottom uk-text-bold abrade-ultra-italic">@{{ name }}</h4>
            <h5 class="uk-margin-remove fc-red uk-text-bold abrade-medium"></h5>
        </div>
    </div>
@{{ /uniforms }}
</script>
@endsection