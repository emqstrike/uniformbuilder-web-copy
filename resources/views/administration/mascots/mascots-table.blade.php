<section class="content" id="mascots_container_box">
    <div class="row">
        <div class="col-xs-12">
            <div class="box">
                <div class="box-header">
                    <h1>
                        <span class="glyphicon glyphicon-th-list"></span>
                        Mascots
                        <small>
                            <a href="/administration/mascot/add" class='btn btn-xs btn-success'>
                                <span class="glyphicon glyphicon-plus-sign"></span>
                                Add New Mascot
                            </a>
                        </small>
                    </h1>
                    <div class="col-md-12">
                        <h3>Categories</h3>
                    </div>
                    <div class="col-md-12">
                        @foreach($mascot_categories as $mascot_category)
                            <a href="#" class='btn btn-md btn-primary btn-mascot-category' data-category="{{ $mascot_category->name }}">
                                {{ $mascot_category->name }}
                            </a>
                        @endforeach
                        <a href="#" class='btn btn-md btn-default btn-mascot-category' data-category="*">
                            ALL
                        </a>
                    </div>
                </div>
                
                <div class="box-body" id="box_body">
                    <table data-toggle='table' class='data-table table table-bordered patterns'>
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Mascot Name</th>
                                <th>Code</th>
                                <th>Active Status</th>
                                <th>Category <p style="color: red; display: inline;">
                                <?php $ctr = 0; ?>
                                @foreach ($mascots as $mascot)
                                    <?php $ctr++; ?>
                                @endforeach
                                <?php echo "[ ".$ctr." ]"; ?></p>
                                </th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                @forelse ($mascots as $mascot)

                    <tr class='mascot-row mascot-{{ $mascot->id }} {{ (!$mascot->active) ? ' inactive' : '' }}'>
                        <td>
                            @if ($mascot->icon)
                            <img src="{{ $mascot->icon }}" width="100px" height="100px">
                            @else
                            <img src="https://dummyimage.com/100" width="100px" height="100px">
                            @endif
                        </td>
                        <td>
                            {{ $mascot->name }}
                        </td>
                        <td>
                            {{ $mascot->code }}
                        </td>
                        <td>
                            <div class="onoffswitch">
                                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox toggle-mascot" id="switch-{{ $mascot->id }}" data-mascot-id="{{ $mascot->id }}" {{ ($mascot->active) ? 'checked' : '' }}>
                                <label class="onoffswitch-label" for="switch-{{ $mascot->id }}">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                        </td>
                        <td>
                            {{ $mascot->category }}
                        </td>
                        <td>
                            <a href="/administration/mascot/edit/{{ $mascot->id }}" class="btn btn-primary btn-xs edit-mascot" data-mascot-id="{{ $mascot->id }}" role="button">
                                <i class="glyphicon glyphicon-edit"></i>
                                Edit
                            </a>
                            <a href="#" class="btn btn-default btn-xs show-mascot" role="button"
                                data-mascot-name="{{ $mascot->name }}"
                                data-mascot-id="{{ $mascot->id }}">
                                <li class="glyphicon glyphicon-info-sign"></li>
                                View
                            </a>
                            <a href="#" class="btn btn-danger pull-right btn-xs delete-mascot" data-mascot-id="{{ $mascot->id }}" role="button">
                                <i class="glyphicon glyphicon-trash"></i>
                                Remove
                            </a>
                        </td>
                    </tr>

                @empty

                    <tr>
                        <td colspan='3'>
                            No Mascots
                        </td>
                    </tr>

                @endforelse

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>