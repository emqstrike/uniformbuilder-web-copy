<!-- Add Material Option Modal -->
<div class="modal modal-wide fade" id="add-multiple-options-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/administration/material_option/save" role="form" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <input type="hidden" class="material-id" name="material_id">
            <input type="hidden" class="material-option-id" name="material_option_id">
            <input type="hidden" name="form-action" id="form-action" value="">
            <input type="hidden" name="boundary_properties" id="boundary-properties">
            <input type="hidden" name="applications_properties" id="application-properties">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title"><span style='color: blue'></span></h4>
            </div>
            <div class="modal-body front-options">
                <h4>FRONT</h4>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Layer</th>
                            <th>Type</th>
                            <th>Image File</th>
                            <th>Thumbnail</th>
                        </tr>
                    </thead>
                    <tbody id="options-row-container">
                        <tr class="options-row">
                            <td><input type="text" class="mo_name"></td>
                            <td>
                                <select name="mo_layer" disabled>
                                    <option value = '1' class="layer-number">1</option>
                                </select>
                            </td>
                            <td>
                                <select name="mo_setting_type">
                                    <option value='part'>Part</option>
                                    <option value='shape'>Shape</option>
                                    <option value='piping'>Piping</option>
                                    <option value='panel'>Panel</option>
                                    <option value='static_layer'>Static Layer</option>
                                    <option value='highlights'>Highlights</option>
                                    <option value='shadows'>Shadows</option>
                                </select>
                            </td>
                            <td>
                                <input type="file" class="options-src">
                            </td>
                            <td>
                                <!-- <a class="thumbnail-link" data-toggle="popover" data-img=""><i class="fa fa-eye"></i></a> -->
                                <img class="thumb-container" data-toggle="popover" data-img="" style="width: 30px; height: 30px;">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <a class="btn btn-primary clone-row"><i class="fa fa-plus"></i> Add option</a>
                </div>
            </div>
            <div class="modal-footer">
                <input type="submit" class="btn btn-primary save-changes" value="Upload">
                <button class="btn btn-danger confirm-no" data-dismiss="modal">Cancel</button>
            </div>
            </form>
        </div>
    </div>
</div>