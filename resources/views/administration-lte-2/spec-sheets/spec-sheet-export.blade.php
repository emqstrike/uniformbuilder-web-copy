<div style="display:none;">
<table border="1" class="poms-table">
    <textarea name="poms" class="item-poms" style="display:none;">{{ $spec_sheet->poms }}</textarea>
    <tr>
        <td>Name</td>
        <td class="info-cell td-name" >{{$spec_sheet->name}}</td>
    </tr>
    <tr>
        <td>Sport</td>
        <td class="info-cell">{{$spec_sheet->uniform_category}}</td>
    </tr>
    <tr>
        <td>Factory</td>
        <td class="info-cell">{{$spec_sheet->factory}}</td>
    </tr>
    <tr>
        <td class="poms-cell">POMS</td>
    </tr>
    <tr class="sizes-header">
        <td>QC</td>
        <td>ITEM</td>
        <td>+ Tol</td>
        <td>- Tol</td>
    </tr>
</td>
</table>
</div>

<script type="text/javascript" src="/admin-lte-2/jquery/dist/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="/admin-lte-2/jquery-ui/dist/jquery-ui.min.js"></script>
<script type="text/javascript" src="/admin-lte-2/js/libs/underscore/underscore-min.js"></script>

<script>
$(document).ready(function(){
    var array_all_sizes = ['YS','YM','YL','YXL','Y2XL','Y3XL','XS','S','M','L','XL','2XL','3XL','4XL','5XL', '6XL'];
    var poms = JSON.parse($('.item-poms').val());
    var elem = '';
    var ctr = 0 ;
    var qc = 0;
    var qc_text = '';

    _.each(poms, function(pom) {
        qc  = pom.qc_required;
        if (qc == 1) {
            qc_text = 'Y';
        } else {
            qc_text = 'N';
        }
        elem += `<tr><td>`+qc_text+`</td>
                <td>`+pom.pom_properties.name+`</td>
                <td>`+pom.pom_properties.plus_tolerance+`</td>
                <td>`+pom.pom_properties.minus_tolerance+ `</td>`;
        var sizes = pom.sizes;
        var header_elem = '';
        var sizes_ctr = 0;
        _.each(array_all_sizes, function (s) {
            $.each(sizes, function(key, value) {
                var size_key = Object.keys(value).toString();
                var size_value = Object.values(value).toString();
                if (s == size_key) {
                    header_elem += `<td>`+ size_key +`</td>`;
                    elem += `<td>`+size_value+`</td>`
                    sizes_ctr ++;
                }

            });
        });
        if(ctr == 0) {
            $('.sizes-header').append(header_elem);
        }
        ctr++;
        $('.info-cell').prop('colspan', 3 + sizes_ctr);
        $('.poms-cell').prop('colspan', 4 + sizes_ctr);
    });
    $('.poms-table').append(elem);

    function exportToExcel(){
        var htmls = "";
        var uri = 'data:application/vnd.ms-excel;base64,';
        var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
        var base64 = function(s) {
                return window.btoa(unescape(encodeURIComponent(s)))
            };

        var format = function(s, c) {
                return s.replace(/{(\w+)}/g, function(m, p) {
                    return c[p];
                })
            };

        htmls = $('table').prop('outerHTML');

        var ctx = {
                worksheet : 'Worksheet',
                table : htmls
            }
        var name = $('.td-name').text();
        var link = document.createElement("a");
            link.download = name+".xls";
            link.href = uri + base64(format(template, ctx));
            link.click();
    }

    exportToExcel();
});
</script>
