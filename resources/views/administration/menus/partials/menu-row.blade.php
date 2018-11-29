<tr>
    <td>{{ $menu->id }}</td>
    <td>
        @if ($menu->indent != 0)
            @for ($count = 1; $count <= $menu->indent; $count++)
                -
            @endfor
        @endif
        {{ $menu->menu_text }}
    </td>
    <td>{{ $menu->route_name }}</td>
    <td>{{ ucwords($menu->type) }}</td>
    <td>
        @if ($menu->icon_class)
            <span class="{{ $menu->icon_class }}"></span>
        @endif
    </td>
    <td>{{ ucwords($menu->parent_menu) }}</td>
    <td>{{ $menu->brand }}</td>
    <td>{{ $menu->remarks }}</td>
    <td>
        <a href="{{ route('edit_menu', ['id' => $menu->id]) }}" class="btn btn-primary btn-xs"  role="button">
            <i class="glyphicon glyphicon-edit"></i>
            Edit
        </a>

        <a href="{{ route('delete_menu', ['id' => $menu->id]) }}" class="btn btn-danger btn-xs remove-menu" role="button">
            <i class="glyphicon glyphicon-trash"></i>
            Remove
        </a>
    </td>
</tr>