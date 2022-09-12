var searchInput = document.getElementById("searchInput");
var locationList = [];
var currentList = [];
var weatherList = [];
// var list=[];
var myDate = new Date();
var month = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
if(searchInput!=null){

searchInput.value.addEventListener("keyup",search)}
function search(searchInput){
    if(locationList.includes(searchInput.value)){
        getData(searchInput.value)
        getNextData(searchInput.value)
    }
    }
    

function getData() {
    var myHttp = new XMLHttpRequest();
    myHttp.open("Get", `https://api.weatherapi.com/v1/forecast.json?key=9b0112c10e814333b4c151309220806&q=Cairo`)
    myHttp.send();
    myHttp.addEventListener("readystatechange", function () {
        if (myHttp.status == 200 && myHttp.readyState == 4) {
            locationList = JSON.parse(myHttp.response).location;
            currentList = JSON.parse(myHttp.response).current;
            display(locationList, currentList);

        }
    })
}
function display(locationList, currentList) {
    var temp = "";
    temp += `
       <div class="title">
           <p class="float-start" id="day">${day[myDate.getDay()]}</p>
           <p class="float-end" id="date">${myDate.getDate()} ${month[myDate.getMonth()]}</p>
       </div>
       <div class="clr"></div>
       <p id="city">${locationList.name}</p>
       <h1 id="degree" >${currentList.temp_c}<sup>o</sup></sup>C<img src="https:${currentList.condition.icon}"></h1>
       <p class="text-primary" id="condition">${currentList.condition.text}</p>
       <div class="row">
       <span class="col-md-3" id="rain">
       <img src="images/icon-umberella@2x.png " class="col-md-5 float-start" >
       <p class="float-end">20%</p></span>
       <span class="col-md-3" id="wind">
       <img src="images/icon-wind@2x.png"class="col-md-5 float-start" >
       <p class="float-end">${currentList.wind_kph}</p></span>
       <span class="col-md-3" id="compass">
       <img src="images/icon-compass@2x.png"class="col-md-5 float-start">
       <p class="float-end">East</p></span>
    </div>`
    document.getElementById("today").innerHTML = temp;
}
function getNextData(){
    var myHttp = new XMLHttpRequest();
    myHttp.open("Get", `http://api.weatherapi.com/v1/forecast.json?key=9b0112c10e814333b4c151309220806&q=07112&days=7&q=Cairo`)
    myHttp.send();
    myHttp.addEventListener("readystatechange", function () {
    if (myHttp.status == 200 && myHttp.readyState == 4) {
        weatherList = JSON.parse(myHttp.response).forecast;
        // list=JSON.parse(myHttp.response)
        displayNext(weatherList);
    }
    }
    )}
function displayNext(weatherList) {
    var temp = ""
    for (var i = 1; i <weatherList.forecastday.length; i++) {
        temp += `
        <div class="nextDay float-start col-md-6 text-center">
    <div class="title">
           <p class="text-center" id="day">${day[i]}</p></div>
           <img src="https:${weatherList.forecastday[i].day.condition.icon}"class="m-3 w-25">
           <h3>${weatherList.forecastday[i].day.maxtemp_c}<sup>o</sup>C</h3>
           <p>${weatherList.forecastday[i].day.mintemp_c}<sup>o</sup>C</p>
           <p  class="text-primary">${weatherList.forecastday[i].day.condition.text}</p></div>
    `
    }


    document.getElementById("days").innerHTML = temp
}
getData("Cairo");
getNextData("Cairo");











// async function search(a) {
//     let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`);
//     if (t.ok && 400 != t.status) {
//         let a = await t.json();
//         displayCurrent(a.location, a.current),
//             displayAnother(a.forecast.forecastday)
//     }
// }
// document.getElementById("search").addEventListener("keyup", a => {
//     search(a.target.value)
// });
// var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// function displayCurrent(a, t) {
//     if (null != t) {
//         var e = new Date(t.last_updated.replace(" ", "T"));
//         let n = `<div class="today forecast">\n
//          <div class="forecast-header"  id="today">\n
//              <div class="day">${days[e.getDay()]}</div>\n
//               <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>\n
//                  </div> \x3c!-- .forecast-header --\x3e\n
//                    <div class="forecast-content" id="current">\n
//                       <div class="location">${a.name}</div>\n
//                        <div class="degree">\n
//                           <div class="num">${t.temp_c}<sup>o</sup>C</div>\n
//                            \n        <div class="forecast-icon">\n
//                                <img src="https:${t.condition.icon}" alt="" width=90>\n
//                                      </div>\t\n    \n    </div>\n
//                                         <div class="custom">${t.condition.text}</div>\n
//                                            <span><img src="images/icon-umberella.png" alt="">20%</span>\n\t\t\t\t\t\t\t\t<span>
/* <img src="images/icon-wind.png" alt="">18km/h</span>\n\t\t\t\t\t\t\t\t<span>
<img src="images/icon-compass.png" alt="">East</span>\n   */
//                                              </div>\n</div>`; document.getElementById("forecast").innerHTML = n
//     }
// } function displayAnother(a) {
//     let t = "";
//     for (let e = 1; e < a.length; e++)t += `\t<div class="forecast">\n
//         <div class="forecast-header">\n
//             <div class="day">${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</div>\n
//                     </div> \x3c!-- .forecast-header --\x3e\n
//                          <div class="forecast-content">\n
//                                   <div class="forecast-icon">\n
//                                                <img src="https:${a[e].day.condition.icon}" alt="" width=48>\n
//                                                     </div>\n
//                                                             <div class="degree">${a[e].day.maxtemp_c}<sup>o</sup>C</div>\n
//                                                                        <small>${a[e].day.mintemp_c}<sup>o</sup></small>\n
//                                                                        <div class="custom">${a[e].day.condition.text}</div>\n
//                                                                            </div>\n
//                                                                               </div>`;
//     document.getElementById("forecast").innerHTML += t
// }
// search("cairo");