@include('administration.menus.partials.menu-dropdown-option')

@if (isset($menu->subMenu))
    @foreach ($menu->subMenu as $menu)
        @if (isset($menu->subMenu))
            @include('administration.menus.partials.menu-dropdown')
        @else
            @include('administration.menus.partials.menu-dropdown-option')
        @endif
    @endforeach
@endif