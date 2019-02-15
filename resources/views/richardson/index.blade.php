@extends("richardson.layout.master")
@section("body")
<section class="uk-section">
    <div class=" uk-container uk-container-large">
        <div class="uk-grid-collapse uk-flex-center uk-flex-middle uk-grid-match-height" uk-grid>
            <div class="uk-width-1-1 uk-width-1-2@s uk-width-1-2@m">
                <div class="">
                    <div class="uk-cover-container">
                        <canvas width="2698" height="1500"></canvas>
                        <img src="./img/img-banner.png" alt="" uk-cover>
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
    <div class="uk-container">
        <h3 class="uk-h2 uk-margin-large-top uk-text-uppercase uk-text-bold uk-text-center abrade-ultra-italic">Select a starting point below</h3>
        <ul class="uk-subnav uk-child-width-expand bottom-arrow bac-light top-line tl-red active-fc-red uk-margin-remove-bottom" uk-height-match="target: li > ul"  uk-switcher="connect: .switcher-container">
            <li>
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
            <li>
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
            <li>
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
    <ul class="uk-switcher switcher-container bgc-light">
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

            <h3 class="uk-h2 uk-margin-medium-top uk-text-uppercase uk-text-bold uk-text-center abrade-ultra-italic">Select a uniform type</h3>

            <div class="uk-grid-medium uk-child-width-expand@s uk-text-center uk-margin-large-bottom" uk-grid>
                <div>
                    <a href="/styles/Pts-signature/types/sublimated" class="uk-button uk-width-1-1 uk-link-reset bgc-red">
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
                    <a href="/styles/Pts-signature/types/sublimated" class="uk-button uk-width-1-1 uk-link-reset bgc-dark">
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

            <h3 class="uk-h2 uk-margin-medium-top uk-text-uppercase uk-text-bold uk-text-center abrade-ultra-italic">Select a uniform type again</h3>

            <div class="uk-grid-medium uk-child-width-expand@s uk-text-center uk-margin-large-bottom" uk-grid>
                <div>
                    <a href="#" class="uk-button uk-width-1-1 uk-link-reset bgc-red">
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
                    <a href="#" class="uk-button uk-width-1-1 uk-link-reset bgc-dark">
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

            <h3 class="uk-h2 uk-margin-large-top uk-text-uppercase uk-text-bold uk-text-center abrade-ultra-italic">Select a uniform type again please</h3>

            <div class="uk-grid-medium uk-text-center uk-margin-large-bottom uk-flex-center" uk-grid>
                <div class="uk-width-1-1 uk-width-3-4@m">
                    <a href="/styles/Pts-signature/types/sublimated" class="uk-button uk-width-1-1 uk-link-reset bgc-red">
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
@endsection