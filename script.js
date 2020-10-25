var citylist =$("#city-list");
var cities = [];
var key = "10bed3fd22a7204ac32c558e968d28f2";

//Format for day
function FormatDay(date){
    var date = new Date();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var outday = (month<10 ? '0' : '') + month + '/' +
        (day<10 ? '0' : '') + day + '/' +
        date.getFullYear() ;
    return outday;
}

// check for stored cities exist and loads the list if so add to choices
var storedCities = JSON.parse(localStorage.getItem("cities"));
if (storedCities !== null) {
    cities = storedCities;
  }
listcities();

//Function storecities()
function storecities(){
   // Stringify and set "cities" key in localStorage to cities array
  localStorage.setItem("cities", JSON.stringify(cities));
}

//Function listcities()
function listcities() {
    citylist.empty();
    
    // Create a new item for each city
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
      var li = $("<li>").text(city);
      li.attr("id","listC");
      li.attr("data-city", city);
      li.attr("class", "list-group-item");
      citylist.prepend(li);
    }
    //Get Response weather for the first city only
    if (!city){
        return
    } 
    else{
        getResponseWeather(city)
    };
}   

$("#enter-city").keypress(function(event) { 
    console.log("here")
    if (event.keyCode === 13) { 
        $("#city-add").click(); 
    } 
}); 


  //When search button clicked
  $("#city-add").on("click", function(event){
      event.preventDefault();

    // Get the ciy
    var city = $("#enter-city").val().trim();
    // Start over if no city entered
    if (city === "") {
        return;
    }
    //Adding enter-city to the city array
    cities.push(city);
    // Store updated cities in localStorage, re-render the list
  storecities();
  listcities();
  location.reload();
  });

  //Function to populate all the forecast data 
  
  function getResponseWeather(cityName){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&appid=" + key; 
    //Clear content of weather-today
    $("#weather-today").empty();
    $.ajax({
      url: queryURL,
      method: "GET",
      error:  function(xhr){
        // alert("An error occured: " + xhr.status + " " + xhr.statusText)
        citydate = $("<h3>").text(cityName + " City not found");
      $("#weather-today").append(citydate);
    },
    }).then(function(response) {
        console.log(response)
      // Create a new table row element
      citydate = $("<h3>").text(response.name + " "+ FormatDay());
      $("#weather-today").append(citydate);
      var convtemp = parseInt((response.main.temp)* 9/5 - 459);
      var citytemp = $("<p>").text("Tempeture: "+ convtemp + " °F");
      $("#weather-today").append(citytemp);
      var cityhumid = $("<p>").text("Humidity: "+ response.main.humidity + " %");
      $("#weather-today").append(cityhumid);
      var citywind = $("<p>").text("Wind Speed: "+ response.wind.speed + " MPH");
      $("#weather-today").append(citywind);
      var CoordLon = response.coord.lon;
      var CoordLat = response.coord.lat;
    
        //Now go get UV index
        var queryURL2 = "https://api.openweathermap.org/data/2.5/uvi?appid="+ key+ "&lat=" + CoordLat +"&lon=" + CoordLon;
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(responseuv) {
            var cityuv = $("<span>").text(responseuv.value);
            var cityuvP = $("<p>").text("UV Index: ");
            cityuvP.append(cityuv);
            $("#weather-today").append(cityuvP);
            // set uv index color 
            if(responseuv.value > 0 && responseuv.value <=2){
                cityuv.attr("class","green")
            }
            else if (responseuv.value > 2 && responseuv.value <= 5){
                cityuv.attr("class","yellow")
            }
            else if (responseuv.value >5 && responseuv.value <= 7){
                cityuv.attr("class","orange")
            }
            else if (responseuv.value >7 && responseuv.value <= 10){
                cityuv.attr("class","red")
            }
            else{
                cityuv.attr("class","violet")
            }
        });
    
        //Section to get forecast  
        var queryURL3 = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
            $.ajax({
            url: queryURL3,
            method: "GET"
        }).then(function(respForecast) { 
            $("#boxes").empty();
            for(var i=5, j=0; j<=4; i=i+8){
                var read_date = respForecast.list[i].dt;
                if(respForecast.list[i].dt != respForecast.list[i+1].dt){
                    var forecastDiv = $("<div>");
                    forecastDiv.attr("class","col-3 m-2 bg-primary")
                    var d = new Date(0);
                    d.setUTCSeconds(read_date);
                    var date = d;
                    var month = date.getMonth()+1;
                    var day = date.getDate();                 
                    var outday = (month<10 ? '0' : '') + month + '/' +
                    (day<10 ? '0' : '') + day + '/' +
                    date.getFullYear();
                    var forecasth4 = $("<h6>").text(outday);
                    //add image to forecast block
                    var imgtag = $("<img>");
                    var skyconditions = respForecast.list[i].weather[0].main;
                    if(skyconditions==="Clouds"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/cloud.png")
                    } else if(skyconditions==="Clear"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/summer.png")
                    }else if(skyconditions==="Rain"){
                        imgtag.attr("src", "https://img.icons8.com/color/48/000000/rain.png")
                    }

                    var ptempK = respForecast.list[i].main.temp;
                    var convtemp = parseInt((ptempK)* 9/5 - 459);
                    var tempP = $("<p>").text("Tempeture: "+ convtemp + " °F");
                    var humidityP = $("<p>").text("Humidity: "+ respForecast.list[i].main.humidity + " %");
                    forecastDiv.append(forecasth4);
                    forecastDiv.append(imgtag);
                    forecastDiv.append(tempP);
                    forecastDiv.append(humidityP);
                    $("#boxes").append(forecastDiv);
                    j++;
                }
            
        }
      
    });
      

    });
    
  }

   $(document).on("click", "#clear-city", function() {
    event.preventDefault();
    citylist.empty();
    localStorage.setItem("cities", "null");
    cities = [];
    });

  //Click function to each Li 
  $(document).on("click", "#listC", function() {
    var thisCity = $(this).attr("data-city");
    getResponseWeather(thisCity);
  });