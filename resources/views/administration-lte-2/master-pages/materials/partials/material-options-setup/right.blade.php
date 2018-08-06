<table class="table table-bordered material-options-setup">
    <thead>
        <th>
            @foreach ($options as $option)
                @if ($option->perspective == "right")
                    @if ($option->setting_type == "highlights")
                        <img src="{{ $option->material_option_path }}" style="border: 1px solid black; padding: 5px; margin-left: 10px; margin-top: 10px; height: 50px; width: 50px; float: left; position: relative;">
                    @endif
                @endif
            @endforeach

            <h4>RIGHT</h4>
        </th>
    </thead>

    <tbody class="sortable-items">
        @foreach ($options as $option)
            @if ($option->perspective == "right" )
                <tr>
                    <td>
                        <input type="hidden" name="option_id[]" value="{{ $option->id }}">
                        <input class="right layer" type="number" name="layer_level[]" value="{{ $option->layer_level }}" style="width: 40px;">
                        <input class="right name"  data-perspective="right" type="text " name="name[]" value="{{ $option->name }}" style="width: 160px;">
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Group ID: </span>
                        <input class="right group-id" data-name="{{ $option->name }}" data-perspective="right" type="number" name="group_id[]" value='{{ ($option->group_id) ? "$option->group_id" : "" }}' style="width: 40px;">
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">TID: </span>
                        <input class="right tcid" data-name="{{ $option->name }}" data-perspective="right" type="number" name="team_color_id[]" value='{{ ($option->team_color_id) ? "$option->team_color_id" : "" }}' style="width: 40px;">
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Color: </span>
                        <input class="right default-color" data-name="{{ $option->name }}" data-perspective="right" type="text" name="default_color[]" value='{{ ($option->default_color) }}' style="width: 40px;">
                        <span class="label" style="margin-top: 0; background-color: #808080; width: 20px;">Allow Pattern: </span>
                        <input class="front allow-pattern" data-name="{{ $option->name }}" data-perspective="right" type="text" name="allow_pattern[]" value='{{ ($option->allow_pattern) }}' style="width: 40px;">
                        <input class="delete-multiple-material-options" name="deleteCheckedMaterialsOptions[]" type="checkbox" class="check" value="{{ $option->id }}">
                    </td>
                </tr>
            @endif
        @endforeach
    </tbody>
</table>