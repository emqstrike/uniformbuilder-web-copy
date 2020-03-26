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
        <button class="show-stock-mascot uk-button uk-button-primary" type="button">Mascot</button>
        <button class="upload-create uk-button uk-button-primary" type="button">MODAL</button>
    </div>
    @include('prolook-v2.modals.create-upload-design')
    @include('prolook-v2.modals.inksoft-mascots')
    @include('prolook-v2.modals.inksoft-design-editor')
</body>
<script type="text/javascript" language="javascript" src="https://stores.inksoft.com/designer/html5/common/js/launcher.js"></script>
<!-- INIT -->
<script type="text/javascript">
    window.api_host = "https://{{ env('API_HOST') }}";
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
        UserStockMascot.events.init();
        CreateUploadInksoft.events.init();
    });
</script>
<script src="/uniform-builder/js/ub.min.js"></script>
</html>