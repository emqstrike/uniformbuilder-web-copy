
@forelse ($colors as $color)

    <div class="color_element">
	   
       <button class='btn {{ $event_class }}' data-target='{{ $data_target }}' data-color='#{{ $color->hex_code }}' style='background-color: #{{ $color->hex_code }}; width: 35px; height: 35px; border-radius: 8px; border: 2px solid white;' data-layer="{{{ isset($layer) ? $layer : 'none' }}}" data-placement="bottom" title="{{ $color->name }}"></button>

    </div>

@empty

@endforelse