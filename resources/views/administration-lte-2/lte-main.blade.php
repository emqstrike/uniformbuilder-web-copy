@inject('sampleMenu', 'App\Menus\V1Menu')

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Administration | {{ env('APP_TITLE') }}</title>

        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
        <link rel="stylesheet" href="/admin-lte-2/datatables/css/dataTables.bootstrap.min.css">
        <link rel="stylesheet" href="/admin-lte-2/font-awesome/css/font-awesome.min.css">
        <link rel="stylesheet" href="/admin-lte-2/Ionicons/css/ionicons.min.css">
        <link rel="stylesheet" href="/admin-lte-2/dist/css/AdminLTE.min.css">
        <link rel="stylesheet" href="/admin-lte-2/dist/css/skins/_all-skins.min.css">
        <link rel="stylesheet" type="text/css" href="/admin-lte-2/css/libs/pnotify/pnotify.custom.min.css">
        <link rel="stylesheet" type="text/css" href="/admin-lte-2/css/libs/spectrum/spectrum.css">
        <link rel="stylesheet" type="text/css" href="/admin-lte-2/css/libs/select2/select2.min.css">
        <link rel="stylesheet" href="/plugins/datepicker/datepicker3.css">
        <link rel="stylesheet" href="/plugins/daterangepicker/daterangepicker-bs3.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
        <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">
        <link rel="stylesheet" href="/admin-lte-2/bootstrap/dist/css/bootstrap.min.css">

        <style>
            #breadcrumbs {
                margin: 0 15px;
            }

            .breadcrumb {
                background: #ffffff;
            }

            .sidebar li.header {
                text-transform: uppercase;
            }
        </style>

        @yield('styles')

        <style type="text/css">
            @yield('custom-styles')
        </style>
    </head>

    <body class="skin-black sidebar-mini sidebar-collapse">
        <div id="application-container">
            @yield('slidein-panel')

            <div id="panel" class="wrapper">
                @yield('panel-overlay')

                @include('administration-lte-2.lte-main-topbar')
                @include('administration-lte-2.lte-side-menu')
                
                <div class="content-wrapper">
                    <section class="content">
                        @include('administration-lte-2.partials.breadcrumb')
                        @yield('content')
                    </section>
                </div>
            </div>
        </div>

        @if (Session::get('accessToken'))
            <script type="text/javascript">
                window.headerValue = "{{ base64_encode(Session::get('accessToken')) }}";
                window.api_host = "{{ env('API_HOST') }}";
                window.customizer_host = "{{ env('CUSTOMIZER_HOST') }}";
                window.endpoint_version = "{{ env('ENDPOINT_VERSION') }}";
                window.accessToken = "{{ Session::get('accessToken') }}";
                window.app_url = "{{ env('APP_URL') }}";
                window.application_brand = "{{ env('BRAND') }}";
                
                @if (Session::get('isLoggedIn'))
                    window.loggedInUser = {{ Session::get('userId') }};
                @endif
            </script>
        @endif

        <script type="text/javascript" src="/admin-lte-2/jquery/dist/jquery-3.3.1.min.js"></script>
        <script type="text/javascript" src="/admin-lte-2/jquery-ui/dist/jquery-ui.min.js"></script>
        <script type="text/javascript" src="/admin-lte-2/datatables/js/jquery.dataTables.min.js"></script>
        <script type="text/javascript" src="/admin-lte-2/datatables/js/dataTables.bootstrap.min.js"></script>
        <script src="/admin-lte-2/bootstrap/dist/js/bootstrap.min.js"></script>
        <script src="/admin-lte-2/jquery-slimscroll/jquery.slimscroll.min.js"></script>
        <script src="/admin-lte-2/fastclick/lib/fastclick.js"></script>
        <script src="/admin-lte-2/dist/js/adminlte.min.js"></script>
        <script type="text/javascript" src="/js/bootbox.min.js"></script>
        <script type="text/javascript" src="/admin-lte-2/js/libs/pnotify/pnotify.custom.min.js"></script>
        <script type="text/javascript" src="/admin-lte-2/js/libs/spectrum/spectrum.js"></script>
        <script type="text/javascript" src="/admin-lte-2/js/libs/underscore/underscore-min.js"></script>
        <script type="text/javascript" src="/admin-lte-2/js/libs/select2/select2.min.js"></script>
        <script src="https://unpkg.com/vue-multiselect@2.1.0"></script>
        <script type="text/javascript" src="/js/administration/common.js"></script>
        <script src="/plugins/daterangepicker/daterangepicker.js"></script>
        <script src="/plugins/datepicker/bootstrap-datepicker.js"></script>
        <script src="/js/libs/axios.js"></script>
        <script src="/js/libs/axios-global-config.js"></script>
        <script src="https://unpkg.com/vue@2.5.18/dist/vue.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vuetify@1.5.14/dist/vuetify.min.js"></script>

        @yield('scripts')
        @yield('custom-scripts')
    </body>
</html>