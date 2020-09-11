const button=document.querySelector("button")
let forecast=document.querySelector(".forecast")
let temp=document.querySelector(".temp")
let country=document.getElementById("country")
let city=document.getElementById("city")
let icon=document.querySelector(".icon")
populateUI()
function getData(city, country){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=9df8c0407c102e47b33df91715eda0aa`)
    .then(res=> res.json())
    .then(data=>{
        console.log(data)
        let temp_feed=data.main.temp
        localStorage.setItem("temp_feed",temp_feed)
        let forecast_feed=data.weather[0].description
        localStorage.setItem("forecast_feed",forecast_feed)
        let icon_feed= `https://api.openweathermap.org/img/w/${data.weather[0].icon}.png`
        icon.src=icon_feed
        forecast.innerHTML=forecast_feed
        temp.innerHTML=`${temp_feed} °F`
    })
}

function populateUI(){
    const savedCountry=localStorage.getItem('country')
    const savedCity=localStorage.getItem('city')
    const savedTemp=localStorage.getItem('temp_feed')
    const savedForecast=localStorage.getItem('forecast_feed')
   if(savedCity !==null && savedCountry !==null && savedForecast !==null && savedTemp !==null){
        country.value=savedCountry
        city.value=savedCity
        forecast.innerHTML=savedForecast
        temp.innerHTML=savedTemp
   }
  
}
button.addEventListener("click", ()=>{
    localStorage.setItem("country",country.value)
    localStorage.setItem("city",city.value)
    getData(city.value, country.value)
    
})
