'use strict';
//This code will take an input amount in ethers and convert it to
//usd or btc
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

function start(){
ajax('GET', 'https://etherchain.org/api/basic_stats', thingToDo);
}

function thingToDo(err, data) {
    if (!err) {
        //console.log(data);

      var convertTo=document.body.querySelector('select').value;

      var  conversionRate=data["data"]["price"][convertTo];
      var amount=document.querySelector('#searchinput').value;
      var value = amount*conversionRate;
      console.log("your ether amount in "+ convertTo + " is "+ value);
    }
}
document.body.querySelector('button').addEventListener('click', start);
// This is a working section
