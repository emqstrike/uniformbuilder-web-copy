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
                        <td>
                            <input type="text" class="form-control order-client">
                        </td>
                    </tr>
                    <!-- <tr>
                        <td>Email</td>
                        <td>
                            <input type="text" class="form-control order-email">
                        </td>
                    </tr> -->
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
                        <!-- <li class="active">
                            <a href="#tab-athletic-dir" data-toggle="tab">Athletic Director</a>
                        </li> -->
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
                        <!-- <div class="tab-pane active" id="tab-athletic-dir">
                            <table class="table table-striped">
                                <tr>
                                    <td>Athletic Organization</td>
                                    <td>
                                        <input type="text" class="form-control order-director-organization">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Athletic Director</td>
                                    <td>
                                        <input type="text" class="form-control order-director-contact-person">
                                    </td>
                                </tr>
                            </table>
                        </div> -->
                        <div class="tab-pane active" id="tab-billing-info">
                            <table class="table table-striped">
                                <tr>
                                    <td>Billing Organization</td>
                                    <!-- <td class='order-bill-organization'>
                                        <strong></strong>
                                    </td> -->
                                    <td>
                                        <input type="text" class="form-control order-bill-organization">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Billing Contact Person</td>
                                    <!-- <td class='order-bill-contact-person'>
                                        <strong></strong>
                                    </td> -->
                                    <td>
                                        <input type="text" class="form-control order-bill-contact-person">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Billing Email</td>
                                    <!-- <td class='order-bill-email'>
                                        <strong></strong>
                                    </td> -->
                                    <td>
                                        <input type="text" class="form-control order-bill-email">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Billing Address</td>
                                    <!-- <td class='order-bill-email'>
                                        <strong></strong>
                                    </td> -->
                                    <td>
                                        <input type="text" class="form-control order-bill-address">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Billing City</td>
                                    <!-- <td class='order-bill-email'>
                                        <strong></strong>
                                    </td> -->
                                    <td>
                                        <input type="text" class="form-control order-bill-city">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Billing State</td>
                                    <!-- <td class='order-bill-email'>
                                        <strong></strong>
                                    </td> -->
                                    <td>
                                        <input type="text" class="form-control order-bill-state">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Billing Zip</td>
                                    <!-- <td class='order-bill-email'>
                                        <strong></strong>
                                    </td> -->
                                    <td>
                                        <input type="text" class="form-control order-bill-zip">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Billing Phone</td>
                                    <!-- <td class='order-bill-email'>
                                        <strong></strong>
                                    </td> -->
                                    <td>
                                        <input type="text" class="form-control order-bill-phone">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Billing Fax</td>
                                    <!-- <td class='order-bill-email'>
                                        <strong></strong>
                                    </td> -->
                                    <td>
                                        <input type="text" class="form-control order-bill-fax">
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="tab-pane" id="tab-shipping-info">
                            <table class="table table-striped">
                                <tr>
                                    <td>Shipping Organization</td>
                                    <td>
                                        <input type="text" class="form-control order-ship-organization">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Shipping Contact Person</td>
                                    <td>
                                        <input type="text" class="form-control order-ship-contact-person">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Shipping Address</td>
                                    <td>
                                        <input type="text" class="form-control order-ship-address">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Shipping City</td>
                                    <td>
                                        <input type="text" class="form-control order-ship-city">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Shipping State</td>
                                    <td>
                                        <input type="text" class="form-control order-ship-state">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Shipping Zip</td>
                                    <td>
                                        <input type="text" class="form-control order-ship-zip">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Shipping Phone</td>
                                    <td>
                                        <input type="text" class="form-control order-ship-phone">
                                    </td>
                                </tr>
                                <tr>
                                    <td>Shipping Email</td>
                                    <td>
                                        <input type="text" class="form-control order-ship-email">
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
                <!-- <button class="btn btn-primary update-order-info" data-dismiss="modal">Update</button> -->
                <a href="#" class="btn btn-primary update-order-info">Update</a>
                <button class="btn btn-default confirm-no" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>