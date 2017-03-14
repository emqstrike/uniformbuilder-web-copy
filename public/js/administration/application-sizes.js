$(document).ready(function(){

    if( $('#old_configurations').val() ){
        console.log('has a value');
        var data = JSON.parse($('#old_configurations').val());
        console.log(data);
        loadConfigurations(data);
    }

    window.table = '<hr><table class="table table-bordered"><tbody>';
    var app_numbers_options = buildAppNumOptions();
    window.table += `<tr>
                        <td>Application Numbers</td>
                        <td>
                            <select class="form-control app-numbers" multiple="multiple">
                                `+app_numbers_options+`
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>
                            <select class="form-control app-type">
                                <option value="upper">Upper</option>
                                <option value="lower">Lower</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Sizes</td>
                        <td>
                            <select class="form-control app-sizes" multiple="multiple">
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </td>
                    </tr>
                    </tbody>
                    </table>`;

    $(".add-configuration").click(function(e) {
        e.preventDefault();
        $('.config-content').append(window.table);
        refreshSelectBoxes();
    });

    function loadConfigurations(data){
        var app_numbers_options = buildAppNumOptions();
        var app_numbers_ref = [];
        var sizes = [];
        data.forEach(function(entry, i) {
            var upper_selected = null;
            var lower_selected = null;
            var app_nums = entry.applicationNumbers;
            var xsize = [];
            entry.sizes.forEach(function(z) {
                xsize.push(z.size);
            });
            sizes.push(xsize);
            // console.log(sizes);
            app_numbers_ref.push(entry.applicationNumbers);  
            if(entry.type == "upper"){
                upper_selected = "selected"
            }
            if(entry.type == "lower"){
                lower_selected = "selected"
            }
            var app_num_class = "app-num-"+i;
            var app_size_class = "app-size-"+i;
            // console.log(app_num_class);
            var template = `<hr><table class="table table-bordered"><tbody><tr>
                                <td>Application Numbers</td>
                                <td>
                                    <select class="form-control app-numbers `+app_num_class+`" multiple="multiple">
                                        `+app_numbers_options+`
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Type</td>
                                <td>
                                    <select class="form-control app-type">
                                        <option value="upper" `+upper_selected+`>Upper</option>
                                        <option value="lower" `+lower_selected+`>Lower</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Sizes</td>
                                <td>
                                    <select class="form-control app-sizes `+app_size_class+`" multiple="multiple">
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </td>
                            </tr>
                            </tbody>
                            </table>`;
            // console.log(template);
            $('#config_content').append(template);
        });
        setTimeout(refreshSelect2s(app_numbers_ref, sizes), 1000);
    }

    function refreshSelect2s(app_numbers_ref, sizes){
        refreshSelectBoxes();
        // console.log(sizes);
        app_numbers_ref.forEach(function(entry, i) {

            var app_num_class = ".app-num-"+i;
            var app_size_class = ".app-size-"+i;

            $(app_num_class).select2('val', entry);
            $(app_size_class).select2('val', sizes[i]);

        });
        refreshJSON();
    }

    function refreshJSON(){
        var data = [];
        $("table").each(function(i) {
            var app_nums = $(this).find('.app-numbers').val();
            var sizes = $(this).find('.app-sizes').val();
            var arrnums = [];
            try{
                app_nums.forEach(function(entry) {
                    // console.log(typeof entry);
                    entry = parseInt(entry);
                    arrnums.push(entry);
                    // console.log(typeof entry);
                });

                var structured_sizes = [];
                sizes.forEach(function(entry) {
                    structured_sizes.push({
                        'size' : parseInt(entry)
                    });
                });
            } catch(err){
                // console.log(err.message);
            }
            // console.log(arrnums);
            var x = {
                'applicationNumbers' : arrnums,
                'type' : $(this).find('.app-type').val(),
                'sizes' : structured_sizes,
            }
            data.push(x);
        });
        $('#configurations').val(JSON.stringify(data));
    }

    function buildAppNumOptions(){
        var elem = '';
        for(var i = 1; i <= 51; i++){
            elem += '<option value="'+i+'">'+i+'</option>';
        }
        return elem;
    }

    function refreshSelectBoxes(){
        $(".app-numbers").each(function(i) {
            $(this).select2({
                placeholder: "Select application numbers",
                multiple: true,
                allowClear: true
            });
        });

        $(".app-sizes").each(function(i) {
            $(this).select2({
                placeholder: "Select application sizes",
                multiple: true,
                allowClear: true
            });
        });
    }

    $("#create_application_size").on("change", ".app-numbers", function(e){
        refreshJSON();
    });

    $("#create_application_size").on("change", ".app-type", function(e){
        refreshJSON();
    });

    $("#create_application_size").on("change", ".app-sizes", function(e){
        refreshJSON();
    });
});