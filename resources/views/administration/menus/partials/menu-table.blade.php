@include('administration.menus.partials.menu-row')

<tr>
    @if (isset($menu->subMenu))
        @foreach ($menu->subMenu as $menu)
            @if (isset($menu->subMenu))
                @include('administration.menus.partials.menu-table')
            @else
                @include('administration.menus.partials.menu-row')
            @endif
        @endforeach
    @endif
</tr>