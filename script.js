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

function start() {
    ajax('GET', 'https://etherchain.org/api/basic_stats', thingToDo);
}

function thingToDo(err, data) {
    if (!err) {
        //console.log(data);

        var convertTo = document.body.querySelector('select').value;
        if (convertTo === "btc" || convertTo === "usd") {
            var conversionRate = data["data"]["price"][convertTo];

            var amount = document.querySelector('#searchinput').value;

            var value = (amount * conversionRate).toFixed(2);

            console.log("your ether amount in " + convertTo + " is " + value);

            document.body.querySelector('#result1').innerHTML = "your ether amount in " + convertTo + " is " + value;
            document.body.querySelector('.startOver1').style.display = "block";
        } else {
            ajax('GET', 'http://api.fixer.io/latest?base=USD', function(error, data2) {
                if (!error) {
                    var rateobj = data2["rates"];


                    var convertTo = (document.body.querySelector('#othercurrency').value).toUpperCase();
                    //console.log(convertTo);
                    //console.log(rateobj[convertTo]);
                    //if(rateobj["price"].indexOf(convertTo!== -1))
                    if (rateobj.hasOwnProperty(convertTo)) {

                        var amount = document.querySelector('#searchinput').value * data["data"]["price"]["usd"];
                        var value = (amount * rateobj[convertTo]).toFixed(2);
                        console.log("your ether amount in " + convertTo + " is " + value);
                        document.body.querySelector('#result1').innerHTML = "your ether amount in " + convertTo + " is " + value;
                        document.body.querySelector('.startOver1').style.display = "block";

                    } else {
                        //console.log("we don't have that conversion rate. Sorry for the inconvience")
                        document.body.querySelector('#result1').innerHTML = "we don't have that conversion rate. Sorry for the inconvience";
                        document.body.querySelector('.startOver1').style.display = "block";
                    }
                }
            });
        }
    }
}

// function placeRates(err, data) {
//     if (!err) {
//       var rateobj=data["rates"];
//       return(rateobj);
//     }
//   }
function startother() {
    ajax('GET', 'https://etherchain.org/api/basic_stats', otherThing);
}


document.body.querySelector('#initial').addEventListener('click', start);
// This is a working section

document.body.querySelector('#second').addEventListener('click', startother);

document.body.querySelector('.startOver').addEventListener('click', handlereset);
document.body.querySelector('.startOver1').addEventListener('click', handlereset);

function otherThing(err, data) {
    if (!err) {
        //console.log(data);


        var convertFrom = document.body.querySelector('#currency').value;
        if (convertFrom === "btc" || convertFrom === "usd" || convertFrom === "BTC" || convertFrom === "USD") {
            convertFrom = convertFrom.toLowerCase();

            var conversionRate = data["data"]["price"][convertFrom];

            var amount = document.querySelector('#startingamount').value;

            var value = amount / conversionRate;

            //console.log("your " + convertFrom + " amount in  ethers is " + value);
            document.body.querySelector('#result2').innerHTML = "your " + convertFrom + " amount in  ethers is " + value;
        } else {
            ajax('GET', 'http://api.fixer.io/latest?base=USD', function(error, data2) {
                if (!error) {
                    var rateobj = data2["rates"];
                    //  console.log(rateobj);

                    var convertFrom = (document.body.querySelector('#currency').value).toUpperCase();
                    //console.log(convertTo);
                    //  console.log(convertFrom);
                    if (rateobj.hasOwnProperty(convertFrom)) {
                        var amount = document.querySelector('#startingamount').value / rateobj[convertFrom];
                        //console.log(amount);
                        var conversionRate = data["data"]["price"]["usd"];


                        var value = (amount / conversionRate).toFixed(4);


                        console.log("your " + convertFrom + " amount in  ethers is " + value);
                        document.body.querySelector('#result2').innerHTML = "your " + convertFrom + " amount in  ethers is " + value;
                        document.body.querySelector('.startOver').style.display = "block";
                    } else {
                        document.body.querySelector('#result2').innerHTML = "We don't have the conversion rate. Sorry for the inconvience";
                        document.body.querySelector('.startOver').style.display = "block";
                    }
                }
            });
        }
    }

}

document.querySelector('.square2').style.height = "90px";
document.querySelector('.square2').style.width = "90px";
document.querySelector('.square2').addEventListener('click', to);

function to() {
    document.querySelector('.disapear').style.display = "none";
    document.querySelector('.lower').style.display = 'block';

}

document.querySelector('.square3').style.height = "90px";
document.querySelector('.square3').style.width = "90px";
document.querySelector('.square3').addEventListener('click', from);

function from() {
    document.querySelector('.upper').style.display = 'block';
    document.querySelector('.disapear').style.display = "none";
}

function handlereset() {
    document.querySelector('.disapear').style.display = "block";
    document.querySelector('.upper').style.display = 'none';
    document.querySelector('.lower').style.display = 'none';
    document.body.querySelector('.startOver').style.display = "none";
    document.body.querySelector('.startOver1').style.display = "none";
    document.getElementById("form1").reset();
    document.getElementById("form2").reset();
    document.body.querySelector('#result2').innerHTML = "";
    document.body.querySelector('#result1').innerHTML = "";
}
