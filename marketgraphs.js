'use strict';

var ctx = document.getElementById("myChart");

var myLineChart = new Chart(ctx, {
    type: 'line',
    data: [2, 3, 5, 7],
    xAxes: [{
            display: true
        }]
    });
