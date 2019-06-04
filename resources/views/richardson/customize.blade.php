@extends("richardson.layout.master-without-footer")
@section("body")
    <div class="uk-section uk-padding-remove main-builder">
        <iframe src="{{ env("CUSTOMIZER_HOST"). "/builder/0/". $uniform_id }}"width="100%" style="height: 100vh !important;"></iframe>
    </div>

    <script type="text/javascript">
        window.mainIframe = document.querySelector(".main-builder iframe");
    </script>
@endsection