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

                    <div class="table-responsive">
                        <table id="orders-list" class="table table-bordered"></table>
                    </div>
                </div>

                <div class="modal-footer">
                    <button class="btn btn-default close-save-uniform-design-modal" data-dismiss="modal">Close</button>
                </div>
            </div>
        </form>
    </div>
</div>