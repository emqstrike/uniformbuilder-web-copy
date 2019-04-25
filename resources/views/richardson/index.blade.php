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
                                    <div uk-spinner="ratio: 15.4"></div>
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
@include("richardson.includes.richardson-init-code")
<script type="text/javascript" src="/richardson/js/uniform-builder-richardson-data.js"></script>
<script type="text/javascript" src="/richardson/js/RichardsonIndex.js"></script>
@include("richardson.includes.m-picker")
@endsection