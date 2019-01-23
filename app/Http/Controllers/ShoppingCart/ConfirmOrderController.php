<?php

namespace App\Http\Controllers\ShoppingCart;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Http\Controllers\Controller;

class ConfirmOrderController extends Controller
{
    public function index()
    {
        return view('shopping-cart.confirm-order');
    }

    public function confirmOrder()
    {
        // var orderInput = {

        //     action: action,

        //     order: {

        //         client: _clientName,  
        //         submitted: _submitted,
        //         user_id: _user_id,
        //         user_name: ub.user.fullname,
        //         origin: ub.config.app_env,
        //         test_order: ub.funcs.submitAsTestOrder(),

        //     },
        //     athletic_director: {

        //         organization: _clientOrgName,
        //         contact: _athleticDirector,
        //         email: _clientEmail,
        //         phone: _clientPhone,
        //         fax: _clientFax,

        //     },
        //     billing: {

        //         organization: _billingOrganization,
        //         contact: _billingContactName,
        //         email: _billingEmail,
        //         address: _billingAddress,
        //         city: _billingCity,
        //         state: _billingState,
        //         phone: _billingPhone,
        //         fax: _billingFax,
        //         zip: _billingZip,

        //     },
        //     shipping: {

        //         organization: _shippingOrganization,
        //         contact: _shippingContactName,
        //         email: _shippingEmail,
        //         address: _shippingAddress,
        //         city: _shippingCity,
        //         state: _shippingState,
        //         phone: _shippingPhone,
        //         fax: _shippingFax,
        //         zip: _shippingZip,

        //     },
        //     order_items: [
        //         {

        //             brand: ub.current_material.material.brand,
        //             item_id: _itemID,
        //             block_pattern_id: _blockPatternID,
        //             neck_option: _neckOption,
        //             description: _uniformName,
        //             type: ub.current_material.material.type,
        //             builder_customizations: JSON.stringify(ub.current_material.settings),
        //             set_group_id: 0,
        //             factory_order_id: '',
        //             design_sheet : ub.current_material.settings.pdfOrderForm,
        //             roster: _transformedRoster,
        //             price: ub.funcs.getPrice(ub.current_material.material),
        //             applicationType: _type,
        //             application_type: ub.config.uniform_application_type, 
        //             additional_attachments: ub.data.orderAttachment,
        //             notes: _notes,
        //         },
        //     ]
        // };
    }
}
