<!-- Open Design Modal -->
<div class="modal bs-modal-sm in" id="open-design-modal" aria-hidden="false">
    <div class="modal-dialog"> 
        <form class="form-horizontal" role="form" id='open-design-form'>
            <div class="modal-content"> 
                <div class="modal-header"> 
                    <button type="button" class="close" data-dismiss="modal">×</button> 
                    <h4 class="modal-title">Open Saved Uniform Designs</h4> 
                </div> 
                <div class="modal-body">
                    @if (Session::get('isLoggedIn'))
                    <input type="hidden" name="user_id" value="{{ Session::get('userId') }}">
                    @endif

                    <div id="orders-list" class="container-fluid">
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-default close-save-uniform-design-modal" data-dismiss="modal">Close</button>
                </div>
            </div>
        </form>
    </div>
</div>

<script id='list-saved-designs' type="text/mustache">
<div class='col-md-3'>
    <img height='50em' src="@{{upper_front_thumbnail_path}}" />
    <img height='50em' src="@{{upper_back_thumbnail_path}}" />
    @{{uniform_type}}
    @{{status}}
    <br />
    <a href="/order/@{{order_id}}" class="btn btn-xs btn-default" data-toggle="tooltip" data-placement="bottom" title="Open"><span class="fa fa-folder-open-o"></span>
    </a>
    <a href="#" class="btn btn-xs btn-default share-uniform-design" data-order-id="@{{order_id}}" data-toggle="tooltip" data-placement="bottom" title="Share"><span class="fa fa-mail-forward"></span>
    </a>
    <a href="#" class="btn btn-xs btn-default delete-uniform-design" data-order-id="@{{id}}" data-toggle="tooltip" data-placement="bottom" title="Delete"><span class="fa fa-trash"></span>
    </a>
</div>
</script>