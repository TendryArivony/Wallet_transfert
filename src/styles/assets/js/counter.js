"use strict";
$(document).ready(function(){
    (function($) {
        /* ========   animatePieCharts   ================= */

        function animatePieCharts() {       
            if(typeof $.fn.easyPieChart != 'undefined'){

                $(".chart").each(function() {   
                    var $t = $(this);
                    var n = $t.parent().width();
                    var r = $t.attr("data-barSize");                
                    if (n < r) {
                        r = n;
                    }               
                    $t.easyPieChart({
                        animate: 1300,
                        lineCap: "square",
                        lineWidth: $t.attr("data-lineWidth"),
                        size: r,
                        barColor: $t.attr("data-barColor"),
                        trackColor: $t.attr("data-trackColor"),
                        scaleColor: "transparent",
                        onStep: function(from, to, percent) {
                            $(this.el).find('.chart-percent span').text(Math.round(percent));
                        }   
                    });             
                });         
            }
        }
        /* =======  When document is ready, do  ==================== */   
        $(document).ready(function() {  
            var chart_offset = $('.chart').offset().top,
            chart_outer_height = $('.chart').outerHeight(),
            chart_height = $(window).height(),
            wS = $(this).scrollTop();
            if (wS > (chart_offset+chart_outer_height-chart_height)){
                animatePieCharts(); 
            }       
        });

        /* ==========================================================================
   When the window is scrolled, do
   ========================================================================== */
   
   $(window).on('scroll',function() {        
    var chart_offset = $('.chart').offset().top,
    chart_outer_height = $('.chart').outerHeight(),
    chart_height = $(window).height(),
    wS = $(this).scrollTop();
    if (wS > (chart_offset+chart_outer_height-chart_height)){
        animatePieCharts(); 
    }   
   });
    })(window.jQuery);
    
        
});






