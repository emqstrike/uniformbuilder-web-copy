<!-- Confirmation Modal -->
<div class="modal confirmation-modal" @if (isset($confirmation_modal_id)) id="{{ $confirmation_modal_id }}" @else id="confirmation-modal" @endif aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Title</h4>
            </div>
            <div class="modal-body">Message</div>
            <div class="modal-footer">
                <button class="btn btn-flat btn-danger @if (isset($yes_class_name)) {{ $yes_class_name }} @else confirm-yes @endif" data-value=''
                @if (isset($attributes))
                    @if (count($attributes) > 0)
                        @foreach ($attributes as $attribute)
                            data-{{ $attribute }}=""
                        @endforeach
                    @endif
                @endif
                >
                    <li class="glyphicon glyphicon-ok"></li>
                    Yes
                </button>
                <button class="btn btn-flat btn-default confirm-no" data-dismiss="modal">
                    <li class="glyphicon glyphicon-remove"></li>
                    No
                </button>
            </div>
        </div>
    </div>
</div>
