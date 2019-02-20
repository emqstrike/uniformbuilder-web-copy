@extends("richardson.layout.master")
@section("body")
<h3 class="uk-h2 uk-text-uppercase uk-text-bold uk-text-center abrade-ultra-italic">Sublimated Fabric</h3>

<ul class="uk-subnav uk-flex-center top-line tl-red active-fc-red" uk-switcher="connect: .switcher-container">
    <li>
        <a href="#">
            <h5 class="uk-margin-remove uk-text-uppercase uk-text-bold fc-dark abrade-ultra">Jersey</h5>
        </a>
    </li>
    <li>
        <a href="#">
            <h5 class="uk-margin-remove uk-text-uppercase uk-text-bold fc-dark abrade-ultra">Pants</h5>
        </a>
    </li>
</ul>

<hr>

<ul class="uk-switcher switcher-container">
    <li>
        {{-- Jersey --}}
        <ul class="uk-subnav uk-flex-center bottom-arrow bac-light top-line tl-red active-fc-red" uk-switcher="connect: .switcher-fabric">
            <li>
                <a href="#">
                    <h5 class="uk-margin-remove uk-text-uppercase uk-text-bold fc-dark abrade-ultra">All</h5>
                </a>
            </li>
            <li>
                <a href="#">
                    <h5 class="uk-margin-remove uk-text-uppercase uk-text-bold fc-dark abrade-ultra">2-Button</h5>
                </a>
            </li>
            <li>
                <a href="#">
                    <h5 class="uk-margin-remove uk-text-uppercase uk-text-bold fc-dark abrade-ultra">V-neck</h5>
                </a>
            </li>
        </ul>

        <ul class="uk-switcher switcher-fabric uk-padding uk-padding-remove-horizontal bgc-light">
            <li class="uk-container bgc-light">
                <div id="m-all-products" class="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid-match uk-grid-small con-card-item uk-text-center" uk-grid>
                    {{-- Uniform Here --}}
                </div>
            </li>
            <li class="uk-container bgc-light">
                <div id="m-2-button" class="uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m uk-grid-match uk-grid-small con-card-item uk-text-center" uk-grid>
                    {{-- Uniform Here --}}
                </div>
            </li>
        </ul>
    </li>
    <li class="uk-text-center">
        {{-- Pant --}}
    </li>
</ul>
@endsection