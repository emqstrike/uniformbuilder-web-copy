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
                            Gender:
                        </td>
                        <td>
                            <span class="label label-default modal-material-gender">GENDER</span>
                        </td>
                    </tr>
                </table>
                <div class='tabbable'>
                    <ul class="nav nav-tabs">
@if (env('BUILDER_APPROACH') == '3D')
                        <li class="active"><a href="#tab-material-image" data-toggle="tab">Base Material</a></li>
                        <li><a href="#tab-bump-map-image" data-toggle="tab">Bump Map</a></li>
                        <li><a href="#tab-shadow-image" data-toggle="tab">Shadow</a></li>
                        <li><a href="#tab-highlight-image" data-toggle="tab">Highlight</a></li>
@elseif (env('BUILDER_APPROACH') == '2D')
                        <li class="active"><a href="#tab-front-view-image" data-toggle="tab">Front View</a></li>
                        <li><a href="#tab-front-shape-image" data-toggle="tab">Front Shape</a></li>
                        <li><a href="#tab-back-view-image" data-toggle="tab">Back View</a></li>
                        <li><a href="#tab-back-shape-image" data-toggle="tab">Back Shape</a></li>
                        <li><a href="#tab-right-side-view-image" data-toggle="tab">Right Side View</a></li>
                        <li><a href="#tab-right-side-shape-image" data-toggle="tab">Right Side Shape</a></li>
                        <li><a href="#tab-left-side-view-image" data-toggle="tab">Left Side View</a></li>
                        <li><a href="#tab-left-side-shape-image" data-toggle="tab">Left Side Shape</a></li>
@endif
                    </ul>
                    <div class="tab-content">
@if (env('BUILDER_APPROACH') == '3D')
                        <div class="tab-pane active" id="tab-material-image" align='center'>
                            <img src="https://dummyimage.com/300" class="material-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-bump-map-image" align='center'>
                            <img src="https://dummyimage.com/300" class="bump-map-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-shadow-image" align='center'>
                            <img src="https://dummyimage.com/300" class="shadow-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-highlight-image" align='center'>
                            <img src="https://dummyimage.com/300" class="highlight-image" width="300px" height="300px">
                        </div>
@elseif (env('BUILDER_APPROACH') == '2D')
                        <div class="tab-pane active" id="tab-front-view-image" align='center'>
                            <img src="https://dummyimage.com/300" class="front-view-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-front-shape-image" align='center'>
                            <img src="https://dummyimage.com/300" class="front-view-shape" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-back-view-image" align='center'>
                            <img src="https://dummyimage.com/300" class="back-view-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-back-shape-image" align='center'>
                            <img src="https://dummyimage.com/300" class="back-view-shape" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-right-side-view-image" align='center'>
                            <img src="https://dummyimage.com/300" class="right-side-view-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-right-side-shape-image" align='center'>
                            <img src="https://dummyimage.com/300" class="right-side-view-shape" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-left-side-view-image" align='center'>
                            <img src="https://dummyimage.com/300" class="left-side-view-image" width="300px" height="300px">
                        </div>
                        <div class="tab-pane" id="tab-left-side-shape-image" align='center'>
                            <img src="https://dummyimage.com/300" class="left-side-view-shape" width="300px" height="300px">
                        </div>
@endif
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>