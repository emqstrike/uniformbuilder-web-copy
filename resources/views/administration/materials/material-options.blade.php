<div class="row">
    <div class="col-md-3">
        <span class="label label-info">FRONT</span>                        
        @foreach ($material->options as $option)
            @if ($option->perspective == "front")
                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;"
                     class="material-option-{{ $option->id }}  material-option-item"
                     data-material-option-name="{{ $option->name }}">
                    @if ($material->thumbnail_path)
                    <img src="{{ $material->thumbnail_path }}"
                         class="pull-right"
                         width="45px"
                         height="45px"
                         alt="{{ $material->slug }}">
                    @else
                    <img src="http://dummyimage.com/100"
                         width="45px" 
                         height="45px" 
                         alt="{{ $material->slug }}">
                    @endif
                    <a href="#" class="btn btn-default btn-xs delete-material-option pull-right" data-material-option-id="{{ $option->id }}" role="button">
                        <i class="glyphicon glyphicon-trash"></i>
                    </a><br>
                    <a class="btn btn-success btn-xs edit-material-option"
                            data-material-option-name="{{ $option->name }}"
                            data-material-option-layer-level="{{ $option->layer_level }}"
                            data-material-option-setting-type="{{ $option->setting_type }}"
                            data-material-option-setting-code="{{ $option->setting_code }}"
                            data-material-option-path="{{ $option->material_option_path }}"
                            data-material-option-perspective="{{ $option->perspective }}"
                            data-material-option-id="{{ $option->id }}"
                            data-material-option-colors='{{ $option->colors }}'
                            data-material-option-gradients='{{ $option->gradients }}'
                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                            data-material-name="{{ $material->name }}"
                            data-material-id="{{ $material->id }}">{{ $option->name }} <i class="glyphicon glyphicon-edit"></i></a>
                    <span class="label label-primary" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                </div>
            @endif
        @endforeach
        </div>
        <div class="col-md-3">
        <span class="label label-info">BACK</span>
        @foreach ($material->options as $option)
            @if ($option->perspective == "back")
                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;"
                     class="material-option-{{ $option->id }}  material-option-item"
                     data-material-option-name="{{ $option->name }}">
                    @if ($material->thumbnail_path)
                    <img src="{{ $material->thumbnail_path }}"
                         class="pull-right"
                         width="45px"
                         height="45px"
                         alt="{{ $material->slug }}">
                    @else
                    <img src="http://dummyimage.com/100"
                         width="45px"
                         height="45px"
                         alt="{{ $material->slug }}">
                    @endif
                    <a href="#" class="btn btn-default btn-xs delete-material-option pull-right"
                                data-material-option-id="{{ $option->id }}"
                                role="button">
                        <i class="glyphicon glyphicon-trash"></i>
                    </a><br>
                    <a class="btn btn-success btn-xs edit-material-option"
                            data-material-option-name="{{ $option->name }}"
                            data-material-option-layer-level="{{ $option->layer_level }}"
                            data-material-option-setting-type="{{ $option->setting_type }}"
                            data-material-option-setting-code="{{ $option->setting_code }}"
                            data-material-option-path="{{ $option->material_option_path }}"
                            data-material-option-perspective="{{ $option->perspective }}"
                            data-material-option-id="{{ $option->id }}"
                            data-material-option-colors='{{ $option->colors }}'
                            data-material-option-gradients='{{ $option->gradients }}'
                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                            data-material-name="{{ $material->name }}"
                            data-material-id="{{ $material->id }}">{{ $option->name }} <i class="glyphicon glyphicon-edit"></i></a>
                    <span class="label label-primary" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                </div>
            @endif
        @endforeach
        </div>
        <div class="col-md-3">
        <span class="label label-info">RIGHT</span>
        @foreach ($material->options as $option)
            @if ($option->perspective == "right")
                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;"
                     class="material-option-{{ $option->id }}  material-option-item"
                     data-material-option-name="{{ $option->name }}">
                    @if ($material->thumbnail_path)
                    <img src="{{ $material->thumbnail_path }}"
                         class="pull-right"
                         width="45px"
                         height="45px"
                         alt="{{ $material->slug }}">
                    @else
                    <img src="http://dummyimage.com/100"
                         width="45px"
                         height="45px"
                         alt="{{ $material->slug }}">
                    @endif
                    <a href="#" class="btn btn-default btn-xs delete-material-option pull-right"
                                data-material-option-id="{{ $option->id }}"
                                role="button">
                        <i class="glyphicon glyphicon-trash"></i>
                    </a><br>
                    <a class="btn btn-success btn-xs edit-material-option"
                            data-material-option-name="{{ $option->name }}"
                            data-material-option-layer-level="{{ $option->layer_level }}"
                            data-material-option-setting-type="{{ $option->setting_type }}"
                            data-material-option-setting-code="{{ $option->setting_code }}"
                            data-material-option-path="{{ $option->material_option_path }}"
                            data-material-option-perspective="{{ $option->perspective }}"
                            data-material-option-id="{{ $option->id }}"
                            data-material-option-colors='{{ $option->colors }}'
                            data-material-option-gradients='{{ $option->gradients }}'
                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                            data-material-name="{{ $material->name }}"
                            data-material-id="{{ $material->id }}">{{ $option->name }} <i class="glyphicon glyphicon-edit"></i></a>
                    <span class="label label-primary" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                </div>
            @endif
        @endforeach
        </div>
        <div class="col-md-3">
        <span class="label label-info">LEFT</span>
        @foreach ($material->options as $option)
            @if ($option->perspective == "left")
                <div style="margin-top: 3px; border: 1px solid #dcdcdc; padding: 3px; border-radius: 5px;"
                     class="material-option-{{ $option->id }}  material-option-item"
                     data-material-option-name="{{ $option->name }}">
                    @if ($material->thumbnail_path)
                    <img src="{{ $material->thumbnail_path }}"
                         class="pull-right"
                         width="45px"
                         height="45px"
                         alt="{{ $material->slug }}">
                    @else
                    <img src="http://dummyimage.com/100"
                         width="45px"
                         height="45px"
                         alt="{{ $material->slug }}">
                    @endif
                    <a href="#" class="btn btn-default btn-xs delete-material-option pull-right"
                                data-material-option-id="{{ $option->id }}"
                                role="button">
                        <i class="glyphicon glyphicon-trash"></i>
                    </a><br>
                    <a class="btn btn-success btn-xs edit-material-option"
                            data-material-option-name="{{ $option->name }}"
                            data-material-option-layer-level="{{ $option->layer_level }}"
                            data-material-option-setting-type="{{ $option->setting_type }}"
                            data-material-option-setting-code="{{ $option->setting_code }}"
                            data-material-option-path="{{ $option->material_option_path }}"
                            data-material-option-perspective="{{ $option->perspective }}"
                            data-material-option-id="{{ $option->id }}"
                            data-material-option-colors='{{ $option->colors }}'
                            data-material-option-gradients='{{ $option->gradients }}'
                            data-material-option-blend='{{ ($option->is_blend) ? "yes" : "no" }}'
                            data-material-name="{{ $material->name }}"
                            data-material-id="{{ $material->id }}">{{ $option->name }} <i class="glyphicon glyphicon-edit"></i></a>
                    <span class="label label-primary" style="margin-top: 0;">L-{{ $option->layer_level }}</span>
                </div>
            @endif
        @endforeach
    </div>
</div>