<!DOCTYPE html>
<html>
<head>
    <title></title>
    <link rel="stylesheet" href="/node_modules/uikit/dist/css/uikit.min.css">
    <link rel="stylesheet" href="/uniform-builder/css/uniform-builder.min.css">
    <script src="/jquery/jquery-2.1.4.min.js"></script>
    <script src="/node_modules/uikit/dist/js/uikit.min.js"></script>
    <script src="/node_modules/uikit/dist/js/uikit-icons.min.js"></script>
    <script src="/underscore/underscore.js"></script>
    <script src="/js/libs/mustache/mustache-2.2.3.min.js"></script>
</head>

<body class="uk-section">
    <div class="uk-container">
        <button class="show-stock-mascot uk-button uk-button-primary" type="button">SELECT MODAL</button>
    </div>
    @include('prolook-v2.modals.inksoft-mascots')
</body>
<script type="text/javascript" language="javascript" src="https://stores.inksoft.com/designer/html5/common/js/launcher.js"></script>
<!-- INIT -->
<script type="text/javascript">
    function getJSON(url, successHandler, errorHandler) {
        var xhr = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('get', url, true);
        xhr.onreadystatechange = function() {
            var status;
            var data;
            // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
            if (xhr.readyState == 4) { // `DONE`
                status = xhr.status;
                if (status == 200) {
                    data = JSON.parse(xhr.responseText);
                    successHandler && successHandler(data);
                } else {
                    errorHandler && errorHandler(status);
                }
            }
        };
        xhr.send();
    }
    
    $(document).ready(function() {
        InksoftMascot.events.init();
    });
</script>
<script src="/uniform-builder/js/ub.min.js"></script>

<script type="text/mustache" id="inksoft-design-categories">
    @{{ #categories }}
        @{{ #isParent }}
            <li class="uk-parent">
                <a href="#">@{{ Name }}</a>

                <ul class="uk-nav-sub">
                    @{{ #Children }}
                        <li>
                            <a href="javascript:void(0)" class="category-item uk-text-break" data-category-id="@{{ ID }}">@{{ Name }}</a>
                        </li>
                    @{{ /Children }}
                </ul>
            </li>
        @{{ /isParent }}

        @{{ ^isParent }}
            <li>
                <a href="javascript:void(0)" class="category-item" data-category-id="@{{ ID }}">@{{ Name }}</a>
            </li>
        @{{ /isParent }}
    @{{ /categories }}
</script>

<script type="text/mustache" id="inksoft-stock-mascot-items">
    @{{ #mascots }}
        <div class="mascot-item" data-stock-mascot-id="@{{ ID }}">
            <a class="uk-inline-clip pointer bgc-white mascot-btn" tabindex="0" data-type="@{{ type }}" data-name="@{{ Name }}" data-stock-mascot-id="@{{ ID }}" data-image="https://images.inksoft.com@{{ ImageUrl }}">
                <div class="uk-padding-small uk-button-default uk-box-shadow-hover-medium">
                    <img class="" src="https://images.inksoft.com@{{ ImageUrl }}" alt="img" loading="lazy">
                </div>
                
                <div class="uk-position-cover uk-overlay uk-overlay-primary uk-flex uk-flex-center uk-flex-middle uk-hidden activation-container">
                </div>
            </a>

            <div class="uk-margin-small-top uk-text-center">
                <h6 class="uk-margin-remove uk-text-small text-mini">@{{ Name }}</h6>
            </div>
        </div>
    @{{ /mascots }}
</script>


<script type="text/mustache" id="inksoft-stock-mascot-preview">
    <div class="uk-inline-clip pointer bgc-white mascot-btn">
        <div class="uk-padding-small">
            <img class="" src="@{{ image }}" alt="img" loading="lazy">
        </div>

        <div class="uk-margin-small-top">
            <h6 class="uk-margin-remove uk-text-small text-mini uk-text-truncate uk-text-center">@{{ name }}</h6>
        </div>
    </div>
    <hr>
    <div class="">
        <a href="javascript:void(0)" 
            class="uk-button uk-button-small uk-button-secondary uk-width-1-1 uk-text-capitalize edit-current-mascot"
            data-stock-mascot-id="@{{ id }}"
            data-type="@{{ type }}"
        >
            Edit mascots
        </a>
    </div>
</script>
</html>