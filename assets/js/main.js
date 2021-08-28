const api_key = "&appid=2e1c8094edceb4c0845161199bdc2073";
const url = "https://api.openweathermap.org/data/2.5/weather?q=";
const icon = "http://openweathermap.org/img/wn/";



var time = new Date();
if(time.getHours() >= 18 || time.getHours() <= 4){
  document.querySelector(".container").style.background = "linear-gradient(204deg, rgba(0,0,0,1) 0%, rgba(0,35,64,1) 65%, rgba(0,79,56,1) 100%)";
}
else{
  document.querySelector(".container").style.background = "linear-gradient(167deg, rgba(41,78,255,1) 0%, rgba(0,138,255,1) 38%, rgba(87,191,160,1) 100%)";
}

let city;
searchCity = () => {
  let searchRes = document.getElementById("search").value;
  if(searchRes == ""){
    alert("Please enter the city name!");
  }
  else{
    city = searchRes;
    const final_url = url + city + api_key;
    fetch(final_url)
    .then((response) => response.json())
    .then((result) => {
      if(result.cod == "404"){
        document.getElementById("main-content").style.display = "none";
        document.getElementById("error").style.zIndex = 1;
      }
      else{
        document.getElementById("error").style.zIndex = -1;
        document.getElementById("main-content").style.display = "block";
        document.querySelector(".details").style.display = "block";
        console.log(result);
        setCity(result.name);
        setIcon(result.weather[0].icon);
        setTempC(result.main.temp);
        setTempF(result.main.temp);
        if(result.weather[0].main.toLowerCase() === result.weather[0].description.toLowerCase()){
          setMain(result.weather[0].main);
          setDesc("");
        }
        else{
          setMain(result.weather[0].main);
          setDesc(result.weather[0].description);
        }
        setTime();
        setTempMax(result.main.temp_max);
        setCountry(result.sys.country);
        setHumidity(result.main.humidity);
        setPressure(result.main.pressure);
        setWindS(result.wind.speed);
        setWindD(result.wind.deg);
      }
    })
  }
}
setCity = (elem) => {
  document.getElementById("city").innerHTML = elem;
}
setIcon  = (elem) => {
  document.getElementById("icon").src = icon + elem + ".png";
}
setTempC = (elem) => {
  let tempc = Math.floor(elem-273);
  document.getElementById("cel").innerHTML = tempc + " C"
}
setTempF = (elem) => {
  let tempf = Math.floor((elem-273) * 9/5);
  document.getElementById("far").innerHTML = tempf + " F"
}
setMain = (elem) => {
  document.getElementById("main").innerHTML = elem;
}
setDesc = (elem) => {
  document.getElementById("description").innerHTML = elem;
}
setTime = (elem) => {
  document.getElementById("timezone").innerHTML = "Updated on: "+ time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();

}
setCountry =(elem) => {
  document.getElementById("country").innerHTML = "Country Code: " + elem;
}
setHumidity =(elem) => {
  document.getElementById("humidity").innerHTML = "Humidity: " + elem;
}
setPressure =(elem) => {
  document.getElementById("pressure").innerHTML = "Wind Pressure: " + elem;
}
setWindS =(elem) => {
  document.getElementById("wind-speed").innerHTML = "Wind Speed: " + elem;
}
setWindD =(elem) => {
  document.getElementById("wind-deg").innerHTML = "Wind Degree: " + elem;
}
setTempMax = (elem) => {
  document.getElementById("temp-max").innerHTML = "Temp. Max: "+ Math.floor((elem-273)) + " C  /  "+ Math.floor((elem-273) * 9/5) + " F";
}
setTempMin = (elem) => {

  document.getElementById("temp-min").innerHTML = "Temp. Min: "+ Math.floor((elem-273)) + " C  /  "+ Math.floor((elem-273) * 9/5) + " F";
}
