@forelse ($colors as $color)
	<button class='btn {{ $event_class }}' data-target='{{ $data_target }}' data-color='#{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-placement="bottom" title="{{ $color->name }}"></button>
@empty

@endforelse