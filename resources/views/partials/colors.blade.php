@forelse ($colors as $color)
	<button class='btn change-color' data-target='{{ $data_target }}' data-color='0x{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }};' data-toggle="tooltip" data-placement="bottom" title="{{ $color->name }}"></button>
@empty

@endforelse