@if (Session::has('flash_message_success'))
    <div class="alert alert-success" role="alert">
        {{ Session::get('flash_message_success') }}
    </div>
@endif

@if (Session::has('flash_message_error'))
    <div class="alert alert-danger" role="alert">
        {{ Session::get('flash_message_error') }}
    </div>
@endif