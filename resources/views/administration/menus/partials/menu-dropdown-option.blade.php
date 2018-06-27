<option @if(isset($currentMenu)) @if($currentMenu->parent_id == $menu->id) selected="selected" @endif @endif value="{{ $menu->id }}">
    @if ($menu->indent != 0)
        @for ($count = 1; $count <= $menu->indent; $count++)
            -
        @endfor
    @endif
    {{ ucwords($menu->menu_text) }}
</option>