'use strict';
//Graph is working!!! Now put in real info! haha





//Idea -- this ajax request gives data about ethereum price
//compared with usd
//It returns an object with an array of objects. The objects
//inside contain time(date/hour) and USD value.
//I would like my initial chart to be an hourly view of the
//market value so it will loop through each item in the array
//and see if the time hour matches the current hour
//and if so add that to the data array.
//long term it would be cool if the user could either click "hour"
//or "day" and get different market views.

var grapharray = [];
var grapharray2 = [];
var labelarray = [];
var labelarray2 = [];


function ajax(method, url, handler) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            if (req.status === 200) {
                handler(null, JSON.parse(req.responseText));
            } else {
                //console.log("broken here is your status: "+ req.status);
                handler(req.status, null);
            }
        }
    };
    req.open(method, url);
    req.send();
}

function start() {

    ajax('GET', 'https://etherchain.org/api/statistics/price', thingToDo);

}

function thingToDo(err, data) {

    grapharray = [];
    labelarray = [];
    document.querySelector('canvas').remove();
    // document.querySelector('.chart').appendChild(document.createElement('canvas'));
    document.querySelector('.chart').insertBefore(document.createElement("canvas"), document.querySelector('#edit'));
    document.querySelector('canvas').id = "myChart";
    document.querySelector('#myChart').style.height = "455";
    document.querySelector('#myChart').style.width = "1366";




    if (!err) {
        // console.log(data);
        for (var i = 0; i < data["data"].length; i++) {
            var x = data["data"][i]["time"];
            // var x= x.slice(0,10);
            //console.log(new Date(x));
            var compareDate = new Date(x).getDate();
            var compareMonth = new Date(x).getMonth();
            var time = new Date(x).getHours();


            var today = new Date();
            // today=today.slice(0,15)
            var todaydate = today.getDate();
            var todaymonth = today.getMonth();
            // console.log(today);
            if (compareDate === todaydate && compareMonth === todaymonth) {
                grapharray.push(data["data"][i]["usd"]);
                labelarray.push(time);


            }
        }
        makechart();

        document.querySelector('#edit').innerHTML = "Hour of the day";
    }

}

function makechart() {

    var ctx = document.getElementById("myChart");
    var data = {
        labels: labelarray,
        datasets: [{
            label: "Ether value in USD",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: grapharray,
            // responsive:false


        }]
    };


  new Chart(ctx, {

        type: 'line',
        data: data,
        options: {
            xAxes: [{
                display: true,
            }],
            yAxes: [{
                display: true
            }]

        }

    });
}
// works  before this adding new below

function start2() {
    // grapharray2= [];
    // labelarray2= [];
    ajax('GET', 'https://etherchain.org/api/statistics/price', othergraph);

}

function othergraph(err, data) {
  var x;
    grapharray2 = [];
    labelarray2 = [];
    document.querySelector('canvas').remove();
    // document.querySelector('.chart').appendChild(document.createElement('canvas'));
    document.querySelector('.chart').insertBefore(document.createElement("canvas"), document.querySelector('#edit'));
    document.querySelector('canvas').id = "myChart";
    document.querySelector('#myChart').style.height = "455";
    document.querySelector('#myChart').style.width = "1366";
    if (!err) {

        for (var i = 0; i < data["data"].length; i++) {
            x = data["data"][i]["time"];

            //       // var x= x.slice(0,10);
            //console.log(new Date(x));

            var compareMonth = new Date(x).getMonth();

            var year = new Date(x).getFullYear();

            var today = new Date();

            var todayMonth = today.getMonth();

            var year2 = today.getFullYear();
            //       var todaymonth=today.getMonth();
            //       // console.log(today);

            if (compareMonth === todayMonth && year2 === year) {
                grapharray2.push(data["data"][i]["usd"]);

                var shortLabel = data["data"][i]["time"].slice(5, 10);

                labelarray2.push(shortLabel);


            }
        }
    }
    makeMonthChart();
    document.querySelector('#edit').innerHTML = "Data for the month of " + x.slice(5, 7);


}

function makeMonthChart() {

    var ctx = document.getElementById("myChart");
    var data = {
        labels: labelarray2,

        datasets: [{
            label: "Ether value in USD",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: grapharray2,


        }]
    };


new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            scales: {
                xAxes: [{
                    display: true,
                    ticks: {
                        maxTicksLimit: 30,
                        beginAtZero: true,
                        suggestedMin: 0,
                    }
                }],
                yAxes: [{
                    display: true
                }]
            }
        }

    });
}



document.body.querySelector('#day').addEventListener('click', start);
document.body.querySelector('#month').addEventListener('click', start2);
