<!-- Information Modal -->
<div class="modal modal-wide fade" id="view-order-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title"></h4>
            </div>
            <div class="modal-body">
                <table class="table table-striped">
                    <tr>
                        <td>Client</td>
                        <td class='order-client'>
                            <strong></strong>
                        </td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td class='order-email'>
                            <strong></strong>
                        </td>
                    </tr>
                    <tr>
                        <td>Uniform Type</td>
                        <td class='order-uniform-type'>
                            <strong></strong>
                        </td>
                    </tr>
                    <tr>
                        <td>Status</td>
                        <td class='order-status'>
                            <strong></strong>
                        </td>
                    </tr>
                </table>
                <div class="tabbable">
                    <ul class="nav nav-tabs">
                        <li class="active">
                            <a href="#tab-athletic-dir" data-toggle="tab">Athletic Director</a>
                        </li>
                        <li>
                            <a href="#tab-billing-info" data-toggle="tab">Billing Information</a>
                        </li>
                        <li>
                            <a href="#tab-shipping-info" data-toggle="tab">Shipping Information</a>
                        </li>
                        <!-- <li>
                            <a href="#tab-team-roster" data-toggle="tab">Team Roster</a>
                        </li> -->
                        <!-- <li>
                            <a href="#tab-front-view" data-toggle="tab">Front View</a>
                        </li>
                        <li>
                            <a href="#tab-back-view" data-toggle="tab">Back View</a>
                        </li>
                        <li>
                            <a href="#tab-right-view" data-toggle="tab">Right View</a>
                        </li>
                        <li>
                            <a href="#tab-left-view" data-toggle="tab">Left View</a>
                        </li> -->
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tab-athletic-dir">
                            <table class="table table-striped">
                                <tr>
                                    <td>Athletic Organization</td>
                                    <td class='order-director-organization'>
                                        <strong></strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Athletic Director</td>
                                    <td class='order-director-contact-person'>
                                        <strong></strong>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="tab-pane" id="tab-billing-info">
                            <table class="table table-striped">
                                <tr>
                                    <td>Billing Organization</td>
                                    <td class='order-bill-organization'>
                                        <strong></strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Billing Contact Person</td>
                                    <td class='order-bill-contact-person'>
                                        <strong></strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Billing Email</td>
                                    <td class='order-bill-email'>
                                        <strong></strong>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="tab-pane" id="tab-shipping-info">
                            <table class="table table-striped">
                                <tr>
                                    <td>Shipping Organization</td>
                                    <td class='order-ship-organization'>
                                        <strong></strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Shipping Contact Person</td>
                                    <td class='order-ship-contact-person'>
                                        <strong></strong>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="tab-pane" id='tab-team-roster'>
                            <table class='table table-bordered table-striped order-items'>
                            </table>
                        </div>
                        <!-- <div class="tab-pane" id='tab-front-view'>
                            <img src="" class='upper-uniform' />
                            <img src="" class='lower-uniform' />
                        </div>
                        <div class="tab-pane" id='tab-back-view'>
                            <img src="" class='upper-uniform' />
                            <img src="" class='lower-uniform' />
                        </div>
                        <div class="tab-pane" id='tab-right-view'>
                            <img src="" class='upper-uniform' />
                            <img src="" class='lower-uniform' />
                        </div>
                        <div class="tab-pane" id='tab-left-view'>
                            <img src="" class='upper-uniform' />
                            <img src="" class='lower-uniform' />
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>