<li class="menu-container @if (isset($menu->subMenu)) has-sub-menu @endif">
    <div id="menu-{{ $menu->id }}" class="menu sortable-container">
        <div class="sortable-head">
            <strong>{{ $menu->menu_text }}</strong>

            <span class="arrow-down pull-right">
                <i class="fa fa-caret-down" aria-hidden="true"></i>
            </span>
        </div>

        <div class="sortable-body">
            <input type="hidden" name="id[]" class="menu-id form-control" value="{{ $menu->id }}">
            <input type="hidden" name="order_id[]" class="order-id form-control">
            <input type="hidden" name="parent_id[]" class="parent-id form-control" value="{{ $menu->parent_id }}">
            <input type="hidden" name="menu_item_code[]" class="menu-item-code form-control" value="{{ $menu->menu_item_code }}">

            <div class="form-group">
                <label>Route Names</label>
                <input type="text" name="route_name[]" class="route-name form-control" value="{{ $menu->route_name }}">
            </div>

            <div class="form-group">
                <label>Menu Text</label>
                <input type="text" name="menu_text[]" class="menu-text form-control" value="{{ $menu->menu_text }}">
            </div>

            <div class="form-group">
                <label>Type</label>
                <div>
                    <select name="type[]" class="form-control">
                        <option value="header" @if ($menu->type == 'header') selected="selected" @endif>Header</option>
                        <option value="link" @if ($menu->type == 'link') selected="selected" @endif>Link</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label>Icon</label>
                <div>
                    <span class="demo-icon" style="margin-right: 10px;"></span>
                    <button type="button" class="btn btn-primary picker-button">Pick an Icon</button>

                    @if ($menu->icon_class)
                        <input type="hidden" name="icon_class[]" class="icon-class-input form-control" value="{{ $menu->icon_class }}" />
                    @else
                        <input type="hidden" name="icon_class[]" class="icon-class-input form-control" value="fa fa-music" />
                    @endif
                </div>
            </div>

            <hr>

            <div class="form-group">
                <button class="btn btn-default remove-menu">Remove</button>
            </div>
        </div>
    </div>

    @if (isset($menu->subMenu))
        <ol>
            @foreach ($menu->subMenu as $menu)
                @include('administration-lte-2.menus.partials.menu-list')
            @endforeach
        </ol>
    @endif

    @if ($menu->parent_id == 0)
        <ol></ol>
    @endif
</li>