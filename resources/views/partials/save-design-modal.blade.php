<!-- Save Design Modal -->
<div class="modal bs-modal-sm in" id="save-design-modal" aria-hidden="false">
    <div class="modal-dialog">
        <div class="modal-content">
            <form action="/saveUniformDesign" method="POST" id='save-uniform-design-form'>
                
                <input type='hidden' name="builder_customizations" id="builder_customizations">
                <input type='hidden' name='upper_body_uniform' class='upper_body_uniform' />
                <input type='hidden' name='lower_body_uniform' class='lower_body_uniform' />
                <input type='hidden' name='total_upper_uniforms' class='total_upper_uniforms' />
                <input type='hidden' name='total_lower_uniforms' class='total_lower_uniforms' />
                <input type='hidden' name='upper_front_view' class='upper_front_view' />
                <input type='hidden' name='upper_back_view' class='upper_back_view' />
                <input type='hidden' name='upper_left_view' class='upper_left_view' />
                <input type='hidden' name='upper_right_view' class='upper_right_view' />
                <input type='hidden' name='lower_front_view' class='lower_front_view' />
                <input type='hidden' name='lower_back_view' class='lower_back_view' />
                <input type='hidden' name='lower_left_view' class='lower_left_view' />
                <input type='hidden' name='lower_right_view' class='lower_right_view' />
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">×</button>
                    <h4 class="modal-title">Save Uniform Design</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="_token" value="{{ csrf_token() }}">

                    @if (Session::get('isLoggedIn'))

                        <input type="hidden" name="user_id" value="{{ Session::get('userId') }}">
                        <input type="hidden" name="client" value="{{ Session::get('fullname') }}">
                        <input type="hidden" name="email" value="{{ Session::get('email') }}">

                    @endif

                    <div class="form-group">
                    
                        <label class="col-sm-3 control-label">Design Name: </label>

                        <div class="col-md-9">

                            <input type="text" class="form-control client fe_input" name="design_name" @if (Session::get('isLoggedIn')) value="" @endif>

                        </div>

                    </div>

                    <div class="form-group">

                        <label class="col-sm-3 control-label">Complete Name</label>

                        <div class="col-md-9">

                            <input type="text" class="form-control client fe_input" name="client" @if (Session::get('isLoggedIn')) value="{{ Session::get('fullname') }}" disabled @endif>

                        </div>

                    </div>

                    <div class="form-group">
                        <label class="col-sm-3 control-label">Uniform Type</label>
                        <div class="col-md-9">
                            <select name="uniform_type" class='form-control uniform-type fe_input'>
                                <option value='basic'>Basic</option>
                                <option value='game'>Game</option>
                                <option value='deluxe'>Deluxe</option>
                            </select>
                        </div>
                    </div>

                    <div class='form-group tabbable row-fluid'>
                        <ul class="nav nav-tabs">
                            <li class="active">
                                <a href="#athletic-director" data-toggle="tab">
                                    <i class="fa fa-user"></i>
                                    Athletic Director
                                </a>
                            </li>
                            <li>
                                <a href="#billing-information" data-toggle="tab">
                                    <i class="fa fa-dollar"></i>
                                    Billing Information
                                </a>
                            </li>
                            <li>
                                <a href="#shipping-information" data-toggle="tab">
                                    <i class="fa fa-truck"></i>
                                    Shipping Information
                                </a>
                            </li>
                            <li>
                                <a href="#credit-card-information" data-toggle="tab">
                                    <i class="fa fa-cc"></i>
                                    Credit Card Information
                                </a>
                            </li>
                        </ul>
                        <div class="tab-content">

                            <!-- Athletic Director Information -->
                            <div class="tab-pane active" id="athletic-director">
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Organization</label>
                                        <input name='athletic_director_organization_name' type='text' class='col-md-9 form-control organization fe_input' placeholder='Organization Name'>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Contact Person</label>
                                        <input name='athletic_director_contact_person' type='text' class='col-md-9 form-control contact fe_input' placeholder='John Smith'>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Email Address</label>
                                        <input name='athletic_director_email' type='email' class='col-md-9 form-control email fe_input' placeholder='john@doe.xyz'>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Phone Number</label>
                                        <input name='athletic_director_phone' type='text' class='col-md-9 form-control phone-number fe_input' placeholder='(800) 555-1234'>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Fax Number</label>
                                        <input name='athletic_director_fax' type='text' class='col-md-9 form-control fax-number fe_input' placeholder='(888) 555-4321'>
                                    </div>
                                </div>
                            </div>

                            <!-- Billing Information -->
                            <div class="tab-pane" id="billing-information">
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Organization</label>
                                        <input name='billing_info_organization_name' type='text' class='col-md-9 form-control organization fe_input' placeholder='Organization Name'>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Contact Person</label>
                                        <input name='billing_info_contact_person' type='text' class='col-md-9 form-control contact fe_input' placeholder='John Smith'>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Email Address</label>
                                        <input name='billing_info_email' type='email' class='col-md-9 form-control email fe_input' placeholder='john@doe.xyz'>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label class="control-label">City</label>
                                        <input name='billing_info_city' type='text' class='col-md-9 form-control city fe_input' placeholder='City Name'>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="control-label">State</label>
                                        <input name='billing_info_state' type='text' class='col-md-9 form-control state fe_input' placeholder='State'>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Zip</label>
                                        <input name='billing_info_zip' type='text' class='col-md-9 form-control zip fe_input' placeholder='Zip Code'>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Phone Number</label>
                                        <input name='billing_info_phone' type='text' class='col-md-9 form-control phone-number fe_input' placeholder='(800) 555-1234'>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Fax Number</label>
                                        <input name='billing_info_fax' type='text' class='col-md-9 form-control fax-number fe_input' placeholder='(888) 555-4321'>
                                    </div>
                                </div>
                            </div>

                            <!-- Shipping Information -->
                            <div class="tab-pane" id="shipping-information">
                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <label class="control-label">Organization</label>
                                        <input name='shipping_info_organization_name' type='text' class='col-md-9 form-control organization fe_input' placeholder='Organization Name'>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label class="control-label">Contact Person</label>
                                        <input name='shipping_info_contact_person' type='text' class='col-md-9 form-control contact fe_input' placeholder='John Smith'>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-12">
                                        <label class="control-label">Address</label>
                                        <input name='shipping_info_address' type='text' class='col-md-9 form-control address fe_input' placeholder='Address'>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label class="control-label">City</label>
                                        <input name='shipping_info_city' type='text' class='col-md-9 form-control city fe_input' placeholder='City'>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="control-label">State</label>
                                        <input name='shipping_info_state' type='text' class='col-md-9 form-control state fe_input' placeholder='State'>
                                    </div>
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Zip</label>
                                        <input name='shipping_info_zip' type='text' class='col-md-9 form-control zip fe_input' placeholder='Zip'>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-4">
                                        <label class="control-label">Phone Number</label>
                                        <input name='shipping_info_phone' type='text' class='col-md-9 form-control phone-number fe_input' placeholder='(800) 555-1234'>
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
                                                    <input class="number credit-card-number form-control fe_input"
                                                        type="text"
                                                        name="cc_number"
                                                        pattern="(\d*\s){3}\d*"
                                                        inputmode="numeric" autocomplete="cc-number" autocompletetype="cc-number" x-autocompletetype="cc-number"
                                                        placeholder="&#149;&#149;&#149;&#149; &#149;&#149;&#149;&#149; &#149;&#149;&#149;&#149; &#149;&#149;&#149;&#149;">
                                                </div>
                                                <div class="col-sm-4 controls">
                                                    <label class="control-label">CVV</label>
                                                    <input class="security-code form-control fe_input"
                                                        type="text"
                                                        name="cc_verification"
                                                        inputmode="numeric"
                                                        pattern="\d*"
                                                        placeholder="&#149;&#149;&#149;">
                                                </div>
                                            </div>
                                            <div class="second-row form-group">
                                                <div class="col-sm-8 controls">
                                                    <label class="control-label">Name on Card</label>
                                                    <input class="billing-address-name form-control fe_input"
                                                        type="text"
                                                        name="cc_card_holder_name"
                                                        placeholder="John Smith">
                                                </div>
                                                <div class="col-sm-4 controls">
                                                    <label class="control-label">Expiration</label>
                                                    <input class="expiration-month-and-year form-control fe_input"
                                                        type="text"
                                                        name="cc_expiration_date"
                                                        placeholder="MM / YY">
                                                </div>
                                            </div>
                                            <div class="card-type" style='display: none'>
                                            </div>
                                        </div>
                                    </section>
                                    <a class='btn btn-default validate-cc' style='display: none'><span>Validate</span></a>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <a class="btn btn-small btn-primary save-uniform-design">
                        <i class="fa fa-save"></i>
                        Save Design
                    </a>
                    <button class="btn btn-default close-save-uniform-design-modal" data-dismiss="modal">Close</button>
                </div>
            </form>
        </div>
    </div>
</div>