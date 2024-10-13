// * Search Input
let  searchInput = document.getElementById('searchInput');

// * Today Variables
let todayLocation = document.getElementById('cityName')
let todayDay = document.getElementById('todayDay')
let todayNum = document.getElementById('todayDate')
let todayMonth = document.getElementById('todayMonth')
let todayConditionImg =  document.getElementById('todayConditionImg')
let todayTemp = document.getElementById('todayTemp')
let todayConditionTxt = document.getElementById('todayConditionTxt')
let humidity =  document.getElementById('humidity')
let wind =  document.getElementById('wind')
let windDirection = document.getElementById('windDirection')

// * next days Variables
let nextDay = document.getElementsByClassName('next-day')
let nextMaxTemp =  document.getElementsByClassName('next-max-temp')
let nextMinTemp =  document.getElementsByClassName('next-min-temp')
let nextConditionImg = document.getElementsByClassName('next-condition-img')
let nextConditionTxt = document.getElementsByClassName('next-condition-txt')

// * step one : fetch API
async function getData(city){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4918f45fc245493bbc373542241310&q=${city}&days=3`)
    let weatherData = await response.json()
    return weatherData
}


// * step two : display today data
function displayTodayData(todayData){
    let todayDate = new Date()
    todayDay.innerHTML = todayDate.toLocaleDateString("en-US" , {weekday:"long"})
    todayNum.innerHTML = todayDate.getDate()
    todayMonth.innerHTML = todayDate.toLocaleDateString("en-US" , {month:"long"})
    todayLocation.innerHTML = todayData.location.name
    todayTemp.innerHTML = todayData.current.temp_c
    todayConditionTxt.innerHTML = todayData.current.condition.text
    todayConditionImg.src = todayData.current.condition.icon
    humidity.innerHTML =  todayData.current.humidity
    wind.innerHTML = todayData.current.wind_kph
    windDirection.innerHTML = todayData.current.wind_dir

}


// * step three : display tomorrow and after tomorrow data
function displayNextDay(nextData){
    let forecastData = nextData.forecast.forecastday
    for (let i = 0; i < 2; i++){
        let nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleDateString("en-US" , {weekday:"long"})
        nextMaxTemp[i].innerHTML=forecastData[i+1].day.maxtemp_c
        nextMinTemp[i].innerHTML=forecastData[i+1].day.mintemp_c
        nextConditionTxt[i].innerHTML=forecastData[i+1].day.condition.text
        nextConditionImg[i].src = forecastData[i+1].day.condition.icon
    }

    
}

// * Function tgama3 kol da
async function launch(city="Cairo"){
    let weatherData = await getData(city)

    // ! to handle errors
    if (!weatherData.error){
        displayTodayData(weatherData)
        displayNextDay(weatherData)
    }
}
launch()


searchInput.addEventListener("input", function(){
    launch(searchInput.value)
})