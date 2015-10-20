<!-- Save Design Modal -->
<div class="modal bs-modal-sm in" id="save-design-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">×</button>
                <h4 class="modal-title">Save Uniform Design</h4>
            </div>
            <div class="modal-body">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                @if (Session::get('isLoggedIn'))
                <input type="hidden" name="user_id" value="{{ Session::get('userId') }}">
                @endif

                <div class="form-group">
                    <label class="col-sm-3 control-label">Complete Name</label>
                    <div class="col-md-9">
                        <input type="text" class="form-control client" name="client" @if (Session::get('isLoggedIn')) value="{{ Session::get('fullname') }}" disabled @endif>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-3 control-label">Uniform Type</label>
                    <div class="col-md-9">
                        <select name="uniform_type" class='form-control uniform-type'>
                            <option value='basic'>Basic</option>
                            <option value='game'>Game</option>
                            <option value='deluxe'>Deluxe</option>
                        </select>
                    </div>
                </div>

                <div class="clear"></div>

                <div class='form-group tabbable'>
                    <ul class="nav nav-tabs">
                        <li class="active"><a href="#athletic-director" data-toggle="tab">Athletic Director</a></li>
                        <li><a href="#billing-information" data-toggle="tab">Billing Information</a></li>
                        <li><a href="#shipping-information" data-toggle="tab">Shipping Information</a></li>
                        <li><a href="#credit-card-information" data-toggle="tab">Credit Card Information</a></li>
                    </ul>
                    <div class="tab-content">

                        <!-- Athletic Director Information -->
                        <div class="tab-pane active" id="athletic-director">
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="control-label">Organization</label>
                                    <input type='text' class='col-md-9 form-control organization' placeholder='Organization Name'>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">Contact Person</label>
                                    <input type='text' class='col-md-9 form-control contact' placeholder='John Smith'>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">Email Address</label>
                                    <input type='email' class='col-md-9 form-control email' placeholder='john@doe.xyz'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="control-label">Phone Number</label>
                                    <input type='text' class='col-md-9 form-control phone-number' placeholder='(800) 555-1234'>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">Fax Number</label>
                                    <input type='text' class='col-md-9 form-control fax-number' placeholder='(888) 555-4321'>
                                </div>
                            </div>
                        </div>

                        <!-- Billing Information -->
                        <div class="tab-pane" id="billing-information">
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="control-label">Organization</label>
                                    <input type='text' class='col-md-9 form-control organization' placeholder='Organization Name'>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">Contact Person</label>
                                    <input type='text' class='col-md-9 form-control contact' placeholder='John Smith'>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">Email Address</label>
                                    <input type='email' class='col-md-9 form-control email' placeholder='john@doe.xyz'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="control-label">City</label>
                                    <input type='text' class='col-md-9 form-control city' placeholder='City Name'>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">State</label>
                                    <input type='text' class='col-md-9 form-control state' placeholder='State'>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">Zip</label>
                                    <input type='text' class='col-md-9 form-control zip' placeholder='Zip Code'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="control-label">Phone Number</label>
                                    <input type='text' class='col-md-9 form-control phone-number' placeholder='(800) 555-1234'>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">Fax Number</label>
                                    <input type='text' class='col-md-9 form-control fax-number' placeholder='(888) 555-4321'>
                                </div>
                            </div>
                        </div>

                        <!-- Shipping Information -->
                        <div class="tab-pane" id="shipping-information">
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label class="control-label">Organization</label>
                                    <input type='text' class='col-md-9 form-control organization' placeholder='Organization Name'>
                                </div>
                                <div class="form-group col-md-6">
                                    <label class="control-label">Contact Person</label>
                                    <input type='text' class='col-md-9 form-control contact' placeholder='John Smith'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-12">
                                    <label class="control-label">Address</label>
                                    <input type='text' class='col-md-9 form-control address' placeholder='Address'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="control-label">City</label>
                                    <input type='text' class='col-md-9 form-control city' placeholder='City'>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">State</label>
                                    <input type='text' class='col-md-9 form-control state' placeholder='State'>
                                </div>
                                <div class="form-group col-md-4">
                                    <label class="control-label">Zip</label>
                                    <input type='text' class='col-md-9 form-control zip' placeholder='Zip'>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group col-md-4">
                                    <label class="control-label">Phone Number</label>
                                    <input type='text' class='col-md-9 form-control phone-number' placeholder='(800) 555-1234'>
                                </div>
                            </div>
                        </div>

                        <!-- Credit Card Information -->
                        <div class="tab-pane" id="credit-card-information">

                            <form class="creditly-card-form">
                                <section class="creditly-wrapper blue-theme">
                                  <div class="credit-card-wrapper">
                                    <div class="first-row form-group">
                                      <div class="col-sm-8 controls">
                                        <label class="control-label">Card Number</label>
                                        <input class="number credit-card-number form-control"
                                          type="text" name="number"
                                          pattern="(\d*\s){3}\d*"
                                          inputmode="numeric" autocomplete="cc-number" autocompletetype="cc-number" x-autocompletetype="cc-number"
                                          placeholder="&#149;&#149;&#149;&#149; &#149;&#149;&#149;&#149; &#149;&#149;&#149;&#149; &#149;&#149;&#149;&#149;">
                                      </div>
                                      <div class="col-sm-4 controls">
                                        <label class="control-label">CVV</label>
                                        <input class="security-code form-control"·
                                          inputmode="numeric"
                                          pattern="\d*"
                                          type="text" name="security-code"
                                          placeholder="&#149;&#149;&#149;">
                                      </div>
                                    </div>
                                    <div class="second-row form-group">
                                      <div class="col-sm-8 controls">
                                        <label class="control-label">Name on Card</label>
                                        <input class="billing-address-name form-control"
                                          type="text" name="name"
                                          placeholder="John Smith">
                                      </div>
                                      <div class="col-sm-4 controls">
                                        <label class="control-label">Expiration</label>
                                        <input class="expiration-month-and-year form-control"
                                          type="text" name="expiration-month-and-year"
                                          placeholder="MM / YY">
                                      </div>
                                    </div>
                                    <div class="card-type">
                                    </div>
                                  </div>
                                </section>
                                <a class='btn btn-default validate-cc'><span>Validate</span></a>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a class="btn btn-small btn-primary save-uniform-design">
                    Save Design
                </a>
                <button class="btn btn-default close-save-uniform-design-modal" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>