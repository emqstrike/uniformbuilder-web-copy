@if ($menu['type'] == 'header')
    <li class="header">
        {{ $menu['menu_text'] }}
    </li>
@else  
    <li @if (($menu['parent_id'] == 0) && ($menu['route_name'] == '#')) class="treeview" @endif>
        @if ($menu['route_name'] == '#')
            <a href="#">
        @else
            <a href="{{ route($menu['route_name']) }}">
        @endif
            <i class="{{ $menu['icon_class'] }}"></i>

            @if ($menu['parent_id'] == 0)
                <span>{{ $menu['menu_text'] }}</span>

                @if ($menu['route_name'] == '#') 
                    <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                    </span>
                @endif
            @else
                {{ $menu['menu_text'] }}
            @endif
        </a>

        @if (isset($menu['menus']))
            <ul class="treeview-menu">
                @foreach ($menu['menus'] as $menu)
                    @include('administration-lte-2.partials.menus.menu')
                @endforeach
            </ul>
        @endif
    </li>
@endif