@extends("richardson.layout.master")
@section("body")

<div class="uk-section">
    <div class="uk-padding uk-padding-remove-vertical">
        <h2 class="uk-heading-divider uk-text-center abrade-ultra-italic">My Saved Design</h2>
        <div class="uk-padding-large uk-padding-remove-vertical">
            <table class="uk-table uk-table-striped uk-text-center uk-table-middle designs-list-table uk-hidden abrade" border="1">
                <thead>
                    <tr>
                        <th class="uk-width-auto uk-text-center">Date</th>
                        <th class="uk-width-auto uk-text-center">Time</th>
                        <th class="uk-width-auto uk-text-center">Sport</th>
                        <th class="uk-width-1-4 uk-text-center">Name/Notes</th>
                        <th class="uk-width-1-3 uk-text-center">Thumbnails</th>
                        <th class="uk-width-auto uk-text-center"></th>
                    </tr>
                </thead>
                <tbody class="my-designs-list">

                </tbody>
                <tfoot>
                    <td></td>
                    <td class="data-table-filter-hide"></td>
                    <td></td>
                    <td class="data-table-filter-hide"></td>
                    <td class="data-table-filter-hide"></td>
                    <td class="data-table-filter-hide"></td>
                </tfoot>
            </table>

            <div class="uk-child-width-1-1 my-designs-list-loading uk-flex uk-flex-center uk-text-center" uk-grid>
                <div uk-spinner="ratio: 8">
                </div>
                <div>
                    <p>Loading saved designs .... </p>
                </div>
            </div>
        </div>
    </div>
</div>

@include("richardson.includes.richardson-init-code")
<script type="text/javascript" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/moment/moment.js"></script>
<script type="text/javascript" src="/richardson/js/MySavedDesign.js"></script>
<script type="text/mustache" id="m-richardson-my-saved-design">
    @{{ #savedDesigns }}
        <tr class="design-item-@{{ id }}">
            <td>@{{ date }}</td>
            <td>@{{ time }}</td>
            <td>@{{ sport }}</td>
            <td>
                <h3 class="uk-text-bold uk-text-uppercase abrade">
                    @{{ name }}
                </h3>
                <p>
                    @{{ notes }}
                </p>
            </td>
            <td>
                <div class="uk-grid-match uk-child-width-1-2@s uk-child-width-1-4@m uk-text-center" uk-grid>
                    <div>
                        <img class="uk-height-small" src="@{{ low_res_front_thumbnail }}" data-file="@{{front_thumbnail}}">
                    </div>
                    <div>
                        <img class="uk-height-small" src="@{{ low_res_back_thumbnail }}" data-file="@{{back_thumbnail}}">
                    </div>
                    <div>
                        <img class="uk-height-small" src="@{{ low_res_left_thumbnail }}" data-file="@{{left_thumbnail}}">
                    </div>
                    <div>
                        <img class="uk-height-small" src="@{{ low_res_right_thumbnail }}" data-file="@{{right_thumbnail}}">
                    </div>
                </div>
            </td>
            <td>
                <div class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-top">
                    <button class="load-design uk-button uk-button-small padding-tiny-vertical uk-overlay-primary hov-red fc-white uk-text-bold abrade uk-text-capitalize" data-saved-design-id="@{{ id }}" data-name="@{{ name }}">Load Design</button>
                </div>
                <div class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-top">
                    <button class="share-design uk-button uk-button-small padding-tiny-vertical uk-overlay-primary hov-red fc-white uk-text-bold abrade uk-text-capitalize" data-saved-design-id="@{{ id }}" data-name="@{{ name }}">Share via Email</button>
                </div>
                <hr clss="uk-margin-remove">
                <div class="uk-padding-small uk-padding-remove-horizontal uk-padding-remove-top">
                    <button class="delete-design uk-button uk-button-small padding-tiny-vertical uk-overlay-primary hov-red fc-white uk-text-bold abrade uk-text-capitalize" data-saved-design-id="@{{ id }}" data-name="@{{ name }}">Delete Design</button>
                </div>
            </td>
        </tr>
    @{{ /savedDesigns }}
</script>
@endsection