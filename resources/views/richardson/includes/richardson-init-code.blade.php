<script type="text/javascript">
    $(document).ready( function () {
        window.ub = {};
        window.ub.richardson = {};
        window.ub.config = {
            host: "{{ env('CUSTOMIZER_HOST') }}",
            brand: "{{ config('brand.name') }}",
            toString: false,
            app_env: "{{ env('APP_ENV') }}",
            api_host: "{{ config('customizer.api_http_protocol') }}://{{ config('customizer.api_host') }}",
            team_store_api_host: "//{{ env('TEAM_STORE_API_BASE') }}",
            thumbnails_path: "{{ env('S3_PATH') }}" + 'thumbnails/',
            isHeaderVisible: "{{ env('HEADER_VISIBLE') }}",
            @if (isset($styles))
            styles: {
                page: "{{ $styles['page'] }}",
                block_pattern: "{{ $styles['block_pattern'] }}",
                uniform_type: "{{ $styles['uniform_type'] }}",
            },
            @endif
        };

        @if (Session::get('isLoggedIn'))

            window.ub.user = {
                id: {{ Session::get('userId') }},
                fullname: "{{ Session::get('fullname') }}",
                firstName: "{{ Session::get('firstName') }}",
                lastName: "{{ Session::get('lastName') }}",
                email: "{{ Session::get('email') }}",
                zip: "{{ Session::get('zip') }}",
                state: "{{ Session::get('state') }}",
                defaultRepID: "{{ Session::get('default_rep_id') }}",
                headerValue: "{{ base64_encode(Session::get('accessToken')) }}",
            };

            window.ub.valid = {{ Session::get('userId') }};

        @else
            window.ub.user = false;
        @endif
    });
</script>