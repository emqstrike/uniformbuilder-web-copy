<?php $alerts = ["success", "danger", "info", "warning"]; ?>

@foreach ($alerts as $alert)
    @if (Session::has($alert))
        <div class="alert alert-{{ $alert }}">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>

            <p>{{ Session::get($alert) }}</p>
        </div>
    @elseif (!is_null(\Request::get($alert)))
        <div class="alert alert-{{ $alert }}">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>

            <p>{{ \Request::get($alert) }}</p>
        </div>
    @endif
@endforeach