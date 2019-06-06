@extends("richardson.layout.master-without-footer")
@section("body")
    <script type="text/javascript">
        $(document).ready(function() {
            // Add main Frame to know that the customizer is embeded
            window.mainFrame = document.querySelector(".main-builder iframe")
            // Create function the will handle that will get the design ID and Application
            window.isMessage = function(designID, applicationID) {
                // Get the window of the customizer
                var richardsonWindow = mainFrame.contentWindow;
                if (typeof richardsonWindow !== "undefined") {
                    // Trigger the isMessage function inside the customizer
                    richardsonWindow.is.isMessage(designID, applicationID);
                }
            }
        })
    </script>
    <div class="uk-section uk-padding-remove main-builder">
        <iframe src="{{ env("CUSTOMIZER_HOST"). "/builder/0/". $uniform_id }}"width="100%" style="height: 100vh !important;"></iframe>
    </div>


@endsection