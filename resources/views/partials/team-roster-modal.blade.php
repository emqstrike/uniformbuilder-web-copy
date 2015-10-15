<!-- Team Roster Modal -->
<div class="modal bs-modal-sm in" id="team-roster-modal" aria-hidden="false">
    <div class="modal-dialog"> 
        <div class="modal-content"> 
            <div class="modal-header"> 
                <button type="button" class="close" data-dismiss="modal">×</button> 
                <h4 class="modal-title">Uniform Information</h4> 
            </div> 
            <div class="modal-body">
                <form class="form-horizontal" role="form" id='team-roster-form' method="POST">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                    <input type="hidden" name="user_id" value="{{ Session::get('userId') }}">

                    <div class="table-responsive">
                        <table class="table table-bordered table-hover table-roster-list">
                            <tr>
                                <th>Number</th>
                                <th>Name</th>
                                <th>Application</th>
                                <th>Size</th>
                                <th></th>
                            </tr>

                        </table>

                        <a class="btn btn-sm btn-info add-roster-record">
                            <i class="fa fa-plus"></i>
                            Add More
                        </a>
                    </div>
                </form>
            </div> 
            <div class="modal-footer">
                <button class="btn btn-primary save-team-roster">Save Team Roster</button>
                <button class="btn btn-default close-team-roster-modal" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<script id="roster-record" type="text/x-handlebars-template">
    <tr>
        <td class='row-roster-number col-md-1'>
            <input type='number' class='form-control roster-number' size='3' />
        </td>
        <td class='row-roster-name'>
            <input type='text' class='form-control roster-name' />
        </td>
        <td class='row-roster-application'>
            <select class='form-control roster-application'>
                <option value='direct'>Directed to Jersey</option>
                <option value='nameplate'>Nameplate only</option>
                <option value='nameplate-sawn'>Nameplate sawn on Jersey</option>
            </select>
        </td>
        <td class='row-roster-size'>
            <select class='form-control roster-size'>
                <option value='YXS'>Youth Extra Small</option>
                <option value='YS'>Youth Small</option>
                <option value='YM'>Youth Medium</option>
                <option value='YL'>Youth Large</option>
                <option value='YXL'>Youth Extra Large (XL)</option>
                <option value='Y2XL'>Youth Double Extra Large (Y2XL)</option>
                <option value='Y3XL'>Youth Triple Extra Large (Y3XL)</option>
                <option value='XS'>Extra Small</option>
                <option value='S'>Small</option>
                <option value='M'>Medium</option>
                <option value='L'>Large</option>
                <option value='XL'>Extra Large (XL)</option>
                <option value='2XL'>Double Extra Large (2XL)</option>
                <option value='3XL'>Triple Extra Large (2XL)</option>
            </select>
        </td>
        <td>
            <a class="btn btn-sm btn-danger remove-roster-record" data-row-number="@{{ $rowNumber }}">
                <i class="fa fa-trash-o"></i>
                Remove
            </a>
        </td>
    </tr>
</script>