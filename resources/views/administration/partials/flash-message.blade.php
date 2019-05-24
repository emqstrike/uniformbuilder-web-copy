@if (Session::has('flash_message_success'))
    <div class="alert alert-success" role="alert">
        {{ Session::get('flash_message_success') }}
    </div>
@endif

@if (Session::has('flash_message_error'))
    <div class="alert alert-danger" role="alert">
        @if (gettype(Session::get('flash_message_error')) == 'object')
            <ul>
                @foreach (Session::get('flash_message_error') as $error)
                    <li>{{ $error[0] }}</li>
                @endforeach
            </ul>
        @else
            {{ Session::get('flash_message_error') }}
        @endif
    </div>
@endif