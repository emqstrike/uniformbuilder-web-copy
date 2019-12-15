<script>
    try {
        var $zoho = $zoho || {};
        $zoho.salesiq = $zoho.salesiq || {
            widgetcode:"b122af8e0746322084e888cc4eb0979a67c851fc227c5e73271feec78d0c9736",
            values:{},
            ready:function(){
                $zoho.salesiq.floatbutton.position("bottomleft");
            }
        };

        (function() {
            var d = document;
            s = d.createElement("script");
            s.type = "text/javascript";s
            s.id = "zsiqscript";
            s.defer = true;
            s.src = "https://salesiq.zoho.com/widget";
            t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s,t);
            d.write("<div id='zsiqwidget'></div>");
        })();
    } catch(err) {
        console.error(err.message);
    }
</script>