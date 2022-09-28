
    'use strict';
$(document).ready(function() {
    setTimeout(function() {
    // [ bar-simple ] chart start
  ;
   

    var graph = Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
                value: 10,
                label: 'Nouveau'
            },
            {
                value: 20,
                label: 'En cours'
            },
            {
                value: 70,
                label: 'Terminee'
            },
           
        ],
        colors: [
            '#1de9b6',
            '#A389D4',
            '#04a9f5',
            
        ],
        resize: true,
    });    
    // [ Donut-chart ] end
        }, 700);
});

