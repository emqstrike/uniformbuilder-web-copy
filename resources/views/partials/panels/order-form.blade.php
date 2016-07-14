<div id="order-form">

    <span class="back-to-roster-form-button" style="display: none">
        <i class="fa fa-chevron-left" aria-hidden="true"></i> Back to Roster Input
    </span>

    <br />

    <span class='header'>Order Info</span>

    <div class="order-details-block">
        
        <table id="order-details" align="center" border=1>

            <tr class="row-header">
                
                <td width="70%">Order Item</td>
                <td width="30%">QTY</td>

            </tr>

            <tr class="">

                <td class="uniform-name">Grizzlies</td>
                <td class="quantity">100</td>
                
            </tr>
            
        </table>

        <br /><br />
        <table id="size-breakdown"  align="center" border=1>

            <tr class="row-header">
                
                <td width="70%">Size</td>
                <td width="30%">QTY</td>

            </tr>

        </table>
       
    </div>

    <div class="order-tabs-container">

        <div class="order-tab-buttons">

            <div class="order-tab-button active-tab" data-name="client-info">Client / Organization Info</div>
            <div class="order-tab-button" data-name="billing-info">Billing Info</div>
            <div class="order-tab-button" data-name="shipping-info">Shipping Info</div>

        </div>

        <div class="order-tabs">
        
            <div class="order-tab active-tab" data-name="client-info">

                <h2>Client Info</h2>

                <div class="form-group">
                    <label for="client-name">Client Name</label>
                    <input type="text" class="form-control" id="client-name" placeholder="Client Name" name="client-name">
                </div>

                <div class="form-group">
                    <label for="organization">Athletic Director</label>
                    <input type="text" class="form-control" id="athletic-director" placeholder="Athletic Director" name="athletic-director">
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" id="client-email" placeholder="Email" name="client-email">
                </div>

                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="text" class="form-control" id="phone" placeholder="Phone" name="client-phone">
                </div>

                <div class="form-group">
                    <label for="fax">Fax</label>
                    <input type="text" class="form-control" id="fax" placeholder="Fax" name="client-fax">
                </div>

            </div>

            <div class="order-tab" data-name="billing-info">

                <h2>Billing Info</h2>

                <div class="form-group">
                    <label for="client-name">Organization</label>
                    <input type="text" class="form-control" id="billing-organization" placeholder="Organization" name="billing-organization">
                </div>

                <div class="form-group">
                    <label for="billing-contact-name">Contact Name</label>
                    <input type="text" class="form-control" id="billing-contact-name" placeholder="Contact Name" name="billing-contact-name">
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" id="billing-email" placeholder="Email" name="billing-email">
                </div>

                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="text" class="form-control" id="billing-phone" placeholder="Phone" name="billing-phone">
                </div>

                <div class="form-group">
                    <label for="fax">Fax</label>
                    <input type="text" class="form-control" id="billing-fax" placeholder="Fax" name="billing-fax">
                </div>

                <br />
                <h3>
                    Billing Address
                </h3>

                <br />

                <div class="form-group">
                    <label for="billing-address">Address</label>
                    <input type="text" class="form-control" id="billing-address" placeholder="Address" name="billing-address">
                </div>

                <div class="form-group">
                    <label for="billing-city">City</label>
                    <input type="text" class="form-control" id="billing-city" placeholder="City" name="billing-city">
                </div>

                <div class="form-group">
                    <label for="state">State</label>
                    <input type="text" class="form-control" id="billing-state" placeholder="State" name="billing-state">
                </div>

                <div class="form-group">
                    <label for="zip">ZIP</label>
                    <input type="text" class="form-control" id="billing-zip" placeholder="Zip" name="billing-zip">
                </div>

            </div>

            <div class="order-tab" data-name="shipping-info">

                <h2>Shipping Info</h2>

                <div class="form-group">
                    <label for="client-name">Organization</label>
                    <input type="text" class="form-control" id="shipping-organization" placeholder="Organization" name="shipping-organization">
                </div>

                <div class="form-group">
                    <label for="shipping-contact-name">Contact Name</label>
                    <input type="text" class="form-control" id="shipping-contact-name" placeholder="Contact Name" name="shipping-contact-name">
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" id="shipping-email" placeholder="Email" name="shipping-email">
                </div>

                <div class="form-group">
                    <label for="phone">Phone</label>
                    <input type="text" class="form-control" id="shipping-phone" placeholder="Phone" name="shipping-phone">
                </div>

                <div class="form-group">
                    <label for="fax">Fax</label>
                    <input type="text" class="form-control" id="shipping-fax" placeholder="Fax" name="shipping-fax">
                </div>

                <br />
                <h3>
                    Shipping Address
                </h3>
                <br />

                <div class="form-group">
                    <label for="shipping-address">Address</label>
                    <input type="text" class="form-control" id="shipping-address" placeholder="Address" name="shipping-address">
                </div>

                <div class="form-group">
                    <label for="shipping-city">City</label>
                    <input type="text" class="form-control" id="shipping-city" placeholder="City" name="shipping-city">
                </div>

                <div class="form-group">
                    <label for="state">State</label>
                    <input type="text" class="form-control" id="shipping-state" placeholder="State" name="shipping-state">
                </div>

                <div class="form-group">
                    <label for="zip">ZIP</label>
                    <input type="text" class="form-control" id="shipping-zip" placeholder="Zip" name="shipping-zip">
                </div>

            </div>

        </div>

    </div>

    <div class="clearfix"></div>

    <div class="order-details-block">
        
        <br /><br />

        <span class="submit-order">
            <i class="fa fa-check-circle-o" aria-hidden="true"></i> Submit Order
        </span>

        <span class="processing">

            Processing... Please wait. <img src="/images/loading.gif" /> <br />
            Submit Order Button will appear here after the process is done, Thank You!

        </span>

    </div>

</div>