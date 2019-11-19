// Old Analytics Code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-75629672-2', 'auto');
        ga('send', 'pageview');

// New Analytics Code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-3860127-1', 'auto');
        ga('send', 'pageview');

// Live Chat Tracker
window.__lc = window.__lc || {};
        window.__lc.license = 7737151;
        (function() {
             // var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
             // lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
             // var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
            var $zoho = $zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
                widgetcode:"b122af8e0746322084e888cc4eb0979a67c851fc227c5e73271feec78d0c9736",
                values:{},
                ready:function(){}
            };

            var d = document;
            var s = d.createElement("script");
            s.type = "text/javascript";
            s.id = "zsiqscript";
            s.defer = true;
            s.src = "https://salesiq.zoho.com/widget";
            var t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s,t);
            d.write("<div id='zsiqwidget'></div>");
        })();