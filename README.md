# Weather-Dashboard

# Description
GIVEN a weather dashboard with form inputs  
WHEN I search for a city  
THEN I am presented with current and future conditions for that city and that city is added to the search history  
WHEN I view current weather conditions for that city  
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index  
WHEN I view the UV index  
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe  
WHEN I view future weather conditions for that city  
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity  
WHEN I click on a city in the search history  
THEN I am again presented with current and future conditions for that city  
WHEN I open the weather dashboard  
THEN I am presented with the last searched city forecast  

# Psuedocode
create container to hold it all  
create jumbotron container to hold title "Weather Dashboard"  
create 2 columns  
column1 contains "Search for a City:" header  
then a search field to enter city   
next contains list of previous city's this list will be in localstorage and can click for that city's forecast   

column 2 contains row 1 as a card   
line 1 header with city and date    
line 2 temprature Fairenheit.   
line 3 Humidity ###  
line 4 Wind speed ###  
line 5 UV Index ###  

column 2 row 2 just has "5-Day Forecast"  

column 2 row 3  
5 blue boxes for forecast? how many days can get from weather   
each box contains date, temp, humidity, (icon cloud, sun, rain? need to see what avail in weather)  

# Test page
Created test_html with html layout of page

# Website
https://rich30041.github.io/Weather-Dashboard/.