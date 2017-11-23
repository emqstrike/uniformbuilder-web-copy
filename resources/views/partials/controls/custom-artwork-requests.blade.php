<script type="text/mustache" id="m-custom-artwork-requests">

    <br />

    <table class="data-table">

       <thead>

            <tr class="header">

                <td>Date</td>
                <td>Reference ID</td>
                <td>Type</td>
                <td>Status</td>
                <td>Submitted Artwork</td>
                <td>Preview</td>
                <td>Review</td>

            </tr> 

       </thead>
        
       <tbody>

            @{{#car}}

                <tr class="custom-artwork-request-row" data-id="@{{id}}"> 
                    
                    <td>@{{created_at}}</td>
                    
                    <td>
                        <span class="link" data-reference-id="@{{reference_id}}" data-type="@{{type}}" title="Open @{{#titleCase}}@{{type}}@{{/titleCase}} (@{{reference_id}}) in a new tab."> @{{reference_id}} </span>
                    </td>

                    <td>@{{#titleCase}}@{{type}}@{{/titleCase}}</td>
                    <td>@{{#titleCase}}@{{status}}@{{/titleCase}}</td>

                    <td>
                        
                        @{{#parsedProperties}}

                            <img src="@{{file}}" />

                        @{{/parsedProperties}}

                    </td>

                    <td>

                        <span class="btn" data-btn-type="preview" data-action="preview-submitted-artwork" data-reference-id="@{{reference_id}}" data-type="@{{type}}" title="Preview the artwork you submitted in a popup">
                            Preview Submitted Artwork
                        </span>
                        <br />
                        <span class="btn" data-btn-type="preview" data-action="preview-prepared-artwork" data-reference-id="@{{reference_id}}" data-type="@{{type}}" title="Preview the artwork you submitted after its been processed by the our Graphic Artists">
                            Preview Processed Mascot
                        </span>

                    </td>
                    
                    <td class="action">

                        <span class="btn" data-btn-type="preview" data-action="preview-in-customizer" data-reference-id="@{{reference_id}}" data-type="@{{type}}" title="Open the customizer with the style you created.">
                            Preview Mascot In Customizer
                        </span>

                        {{--  <span class="action-button edit" data-id="@{{id}}" data-order-id="@{{reference_id}}"><i class="fa fa-eye" aria-hidden="true"></i> Edit Order </span>
                        <span class="action-button delete" data-id="@{{id}}" data-order-id="@{{reference_id}}"><i class="fa fa-remove" aria-hidden="true"></i> Delete Order </span>
                        <span class="action-button view" data-id="@{{id}}" data-order-id="@{{reference_id}}"><i class="fa fa-eye" aria-hidden="true"></i> View Order Status and Details </span> --}}

                    </td>

                </tr>

            @{{/car}} 

       </tbody>

{{--    

		<tfoot>       

            <td></td>
            <td class="data-table-filter-hide"></td>               
            <td class="data-table-filter-hide"></td>
            <td class="data-table-filter-hide"></td>
            <td></td>
            <td></td>
            <td class="data-table-filter-hide"></td>
            <td class="data-table-filter-hide"></td>

        </tfoot>

--}}

    </table>

</script>   

<script type="text/mustache" id="m-custom-artwork-requests-mascot-preview">



</script>   


