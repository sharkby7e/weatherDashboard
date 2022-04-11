console.log("script.js linked")
var today = moment()
var searchInput = $('#searchInput')
var searchBar = $('#searchBar')
var prevSearches = $('#prevSearches')

var prevSearches = $('#prevSearches')
var searchArr = [] 
var loc = ""

var lat = ''
var lon = ''

const owa = '3311768b9f47cadf7c25fc0ee1786333'

searchBar.on('submit', (e) => {
  e.preventDefault()
  var search = searchInput.val()
  var cityState = search.split(",") 
  if (searchArr.length === 4){
    searchArr.pop()
    searchArr.unshift(cityState)
    makeButtons()
  } else if(searchArr.length>0) {
    searchArr.unshift(cityState)
    makeButtons()
  } else{
    searchArr.push(cityState)
    makeButtons()
  }
  saveToMemory()
  loc = cityState[0] + ',' + cityState[1]
  // console.log(loc)
  fetchGeo(cityState)
  console.log(searchArr)
})

function fetchGeo(cityState) {
  var city = cityState[0].trim()
  var state = cityState[1].trim()
  var fetchGeocoding = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + ',' + state + ",US&limit=5&appid=" + owa
  fetch(fetchGeocoding)
    .then(response => response.json()).then(data=>{
      lat = data[0].lat
      lon = data[0].lon
      fetchWeather(lat,lon)
    })
}

function fetchWeather(x,y) {
  var fetchLink = "https://api.openweathermap.org/data/2.5/onecall?lat=" + x + "&lon=" + y + "&exclude=minutely,hourly&units=imperial&appid=" + owa
  var weatherObj = {}
  fetch(fetchLink)
    .then(response => response.json()).then(data => {
      console.log(data)
      weatherObj = {
        city: loc,
        current: {
          //icon, date, humidity, wind, uv index(formatted)
          date: today.format('MM/DD/YY'),
          icon: data.current.weather[0].icon,
          temp: data.current.temp + ' °F',
          hum: data.current.humidity,
          wind: data.current.wind_speed,
          uv: data.current.uvi
        },
      }
      var future = []
      for(let i = 0; i < 5; i++){
        var futWeath = {
          //date, icon, temp, humidity
          date: today.add(1,'d').format('MM/DD/YY'),
          temp: data.daily[i].temp.max,
          icon: data.daily[i].weather[0].icon,
          hum: data.daily[i].humidity + "%"
        }
        future.push(futWeath)
      }
      weatherObj.future=future
      // console.log(weatherObj)
      displayWeather(weatherObj)

  })
}

function displayWeather(obj) {
  console.log(obj)
  
}
function saveToMemory() {
  localStorage.setItem("memory",JSON.stringify(searchArr))
}

function initializeMemory(){
  var mem =localStorage.getItem('memory')
  if(mem !== null){
    searchArr = JSON.parse(mem)
    // console.log(searchArr)
  }else{
    return
  }
  makeButtons()
}

function makeButtons() {
  prevSearches.empty()
  for(let i = 0; i<searchArr.length; i++){
    var content = searchArr[i][0] + ',' + searchArr[i][1]  
    // console.log(content)
    var newBtn = $("<button>").attr('data-city', i)
    newBtn.text(content)
    prevSearches.append(newBtn)
  }
}

prevSearches.on('click', function(e)  {
  var element = $(e.target)
  var index = element.attr('data-city')
  fetchGeo(searchArr[index])
  loc = searchArr[index][0] + ',' + searchArr[index][1]
  // console.log(loc)
})
initializeMemory()

//data structure draft
// array of objects holding previous searches
// obj cityForecast {
//  name : 
//  current : {
//    temp: etc
//
//  }
//  future [{
//  temp etc
//  },]
//
// }
// moment().add(1, 'd')
// for loop for creating future 5 days iterates through cityForecast.future
// declare variables, pointing to divs on page
// fetch call
// array for buttons in the prevSearches, pops when length===4, pushes new searches
