@extends("richardson.layout.master-without-footer")
@section("body")
    <script type="text/javascript">
        $(document).ready(function() {

            window.mainFrame = document.querySelector(".main-builder iframe")


            window.is.isMessage = function(designID, application) {
                console.log(designID, application)

            }
        })
    </script>
    <div class="uk-section uk-padding-remove main-builder">
        <iframe src="{{ env("CUSTOMIZER_HOST"). "/builder/0/". $uniform_id }}"width="100%" style="height: 100vh !important;"></iframe>
    </div>


@endsection