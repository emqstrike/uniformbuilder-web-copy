<script type="text/javascript">
    $(document).ready( function () {
        window.ub = {};
        window.ub.richardson = {};
        window.ub.richardson.config = {
            host: "{{ env('CUSTOMIZER_HOST') }}",
            brand: "{{ config('brand.name') }}",
            toString: false,
            app_env: "{{ env('APP_ENV') }}",
            api_host: "{{ config('customizer.api_http_protocol') }}://{{ config('customizer.api_host') }}",
            team_store_api_host: "//{{ env('TEAM_STORE_API_BASE') }}",
            thumbnails_path: "{{ env('S3_PATH') }}" + 'thumbnails/',
            isHeaderVisible: "{{ env('HEADER_VISIBLE') }}"
        };
    });
</script>