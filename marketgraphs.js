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

var grapharray=[];
var labelarray=[];

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

    ajax('GET', 'https://etherchain.org/api/statistics/price', thingToDo);

    function thingToDo(err, data) {
        if (!err) {
            console.log(data);
            for(var i=0; i<data["data"].length; i++){
              var x=data["data"][i]["time"];
              // var x= x.slice(0,10);
              //console.log(new Date(x));
              var compareDate = new Date(x).getDate();
              var compareMonth= new Date(x).getMonth();
              var time= new Date(x).getHours();


              var today = new Date();
              // today=today.slice(0,15)
              var todaydate= today.getDate();
              var todaymonth=today.getMonth();
              // console.log(today);
            if(compareDate===todaydate && compareMonth===todaymonth){
              grapharray.push(data["data"][i]["usd"]);
              labelarray.push(time);


            }
            }
            makechart();
        }

    }

    function makechart(){
    var ctx = document.getElementById("myChart");
    var data = {
        labels: labelarray,
        datasets: [
            {
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

            }
        ]
    };
    console.log(data);

    var myLineChart = new Chart(ctx, {
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
