var MySavedDesign = {
    init: function() {
        $(".designs-list-table").on("click", ".load-design", MySavedDesign.onLoadSavedDesign);
        $(".designs-list-table").on("click", ".share-design", MySavedDesign.onShareSavedDesign);
        $(".designs-list-table").on("click", ".delete-design", MySavedDesign.onDeleteSavedDesign);
        MySavedDesign.getMySavedDesign();
        
    },

    onDeleteSavedDesign: function() {
        var name = $(this).data("name");
        var design_id = $(this).data("saved-design-id");

        UIkit.modal.confirm("Are you sure you want to delete "+ name + "?").then(function() {
            MySavedDesign.deleteSavedDesign(design_id, name);
        }, function () {
            console.log('Rejected.')
        });
    },

    onLoadSavedDesign: function() {
        var name = $(this).data("name");
        var design_id = $(this).data("saved-design-id");

        var url = '/my-saved-design/' + design_id + '/render';
        window.open(url, '_blank');
    },

    runDataTable: function() {
        $('.designs-list-table').DataTable({
            "paging": true,
            "lengthChange": false,
            "searching": true,
            "ordering": false,
            "info": true,
            "autoWidth": true,
            initComplete: function () {
                this.api().columns().every( function () {
                    var column = this;
                    var select = $('<select><option value=""></option></select>')
                        .appendTo( $(column.footer()).empty())
                        .on('change', function () {
                            var val = $.fn.dataTable.util.escapeRegex(
                                $(this).val()
                            );

                            column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                        });

                    column.data().unique().sort().each( function ( d, j ) {
                        select.append( '<option value="'+d+'">'+d+'</option>' )
                    });
                });
                $(".data-table-filter-hide select").hide(); 
                $(".designs-list-table thead th").removeAttr("style");
                $(".dataTables_filter input[type='search']").addClass("uk-input")
                $(".dataTables_filter label").attr( "style","margin-bottom: 10px;" );
                $(".dataTables_info").attr( "style","margin-top: 10px;" );
                $(".dataTables_filter input").attr( "style","width: 300px;margin-left: 10px;" );
            }
        });
    },

    onShareSavedDesign: function() {
        var name = $(this).data("name");
        var design_id = $(this).data("saved-design-id");
    },

    getMySavedDesign: function() {
        $.ajax({
            url: ub.config.api_host + '/api/saved_design/getByUserId/' + ub.user.id,
            type: "GET", 
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},
            
            success: function (response) {
                if (response.success) {
                    var data = {
                        savedDesigns: MySavedDesign.parseMyDesigns(response.saved_designs),
                    }

                    data.savedDesigns.forEach(function (value, i) {
                        data.savedDesigns[i].date = moment(value.created_at).format("LL");
                        data.savedDesigns[i].time = moment(value.created_at).format("LT");;
                    });

                    $(".my-designs-list").html("");
                    var template = document.getElementById("m-richardson-my-saved-design").innerHTML;
                    var render = Mustache.render(template, data);
                    $(".my-designs-list").html(render);

                    MySavedDesign.runDataTable()

                    $(".designs-list-table").removeClass("uk-hidden");
                    $(".my-designs-list-loading").addClass("uk-hidden");
                }
            }
        });
    },

    parseMyDesigns: function(designs) {
        var _parsedDesigns = designs;
        _.each(designs, function (design) {
            _.each(design.items, function (item){
                var _bc = JSON.parse(item.builder_customizations);
                item.thumbnails = _bc.thumbnails;
            }) 
        });

        return _parsedDesigns;
    },

    deleteSavedDesign: function(id, name) {
        data = {
            id: id,
        }

        $.ajax({
            url: ub.config.api_host + '/api/saved_design/delete/',
            data: JSON.stringify(data),
            type: "POST", 
            crossDomain: true,
            contentType: 'application/json',
            headers: {"accessToken": (ub.user !== false) ? atob(ub.user.headerValue) : null},

            success: function (response) {
                $('tr.design-item-'+ id).fadeOut();
            }
        });
    },

    modifyTable: function() {
        $table_filter = $('div.dataTables_wrapper div.dataTables_filter');
        $filter_input = $('div.dataTables_wrapper div.dataTables_filter input');
        $table_header = $('div.dataTables_wrapper th');

        $table_filter.prepend('<span id="dataTable-filter-icon" class="uk-form-icon uk-form-icon-flip" href="#" uk-icon="icon: search"></span>');
        $table_filter.attr('class', 'dataTables_filter uk-inline uk-align-right');
        $filter_input.attr('type', 'text');
        $filter_input.attr('style', 'width: 200px; padding-right: 30px');
    }
}

$(document).ready(MySavedDesign.init);