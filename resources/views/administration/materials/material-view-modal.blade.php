<!-- Information Modal -->
<div class="modal fade" id="view-material-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">
                <table class='table table-bordered'>
                    <tr>
                        <td>
                            Code:
                        </td>
                        <td>
                            <span class="label label-default modal-material-code">CODE</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Type:
                        </td>
                        <td>
                            <span class="label label-default modal-material-type">TYPE</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Uniform Category:
                        </td>
                        <td>
                            <span class="label label-default modal-material-uniform-category">UNIFORM CATEGORY</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Base Color:
                        </td>
                        <td>
                            <span class="label label-default modal-material-base-color">BASE COLOR</span>
                            <div modal-material-base-color-code>&nbsp;</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Gender:
                        </td>
                        <td>
                            <span class="label label-default modal-material-gender">GENDER</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Lining Type:
                        </td>
                        <td>
                            <span class="label label-default modal-material-lining-type">LINING TYPE</span>
                        </td>
                    </tr>
                </table>
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#tab-material-image" data-toggle="tab">Base Material</a></li>
                        <li><a href="#tab-bump-map-image" data-toggle="tab">Bump Map</a></li>
                        <li><a href="#tab-shadow-image" data-toggle="tab">Shadow</a></li>
                        <li><a href="#tab-highlight-image" data-toggle="tab">Highlight</a></li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-material-image" align='center'>
                            <img src="" class="material-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-bump-map-image" align='center'>
                            <img src="" class="bump-map-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-shadow-image" align='center'>
                            <img src="" class="shadow-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-highlight-image" align='center'>
                            <img src="" class="highlight-image" width="300px" height="300px">
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>