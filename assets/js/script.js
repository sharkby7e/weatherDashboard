console.log("script.js linked")
var searchInput = $('#searchInput')
var searchBar = $('#searchBar')

var prevSearches = $('#prevSearches')
var searchArr = [] 

// var city = ''
// var state = ''
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
  } else {
    searchArr.unshift(cityState)
  }
  if (searchArr.length > 0){
    saveToMemory()
  }
  fetchGeo(cityState)
  console.log(searchArr)
})

function fetchGeo(cityState) {
  var city = cityState[0].trim()
  var state = cityState[1].trim()
  var fetchGeocoding = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + ',' + state + ",US&limit=5&appid=" + owa
  fetch(fetchGeocoding)
    .then(response => response.json()).then(data=>{
      console.log(data)
      lat = data[0].lat
      lon = data[0].lon
      console.log(lat)
      console.log(lon)
      fetchWeather(lat,lon)
    })
}


function fetchWeather(x,y) {
 var fetchLink = "https://api.openweathermap.org/data/2.5/onecall?lat=" + x + "&lon=" + y + "&exclude=minutely,hourly&units=imperial&appid=" + owa
  fetch(fetchLink)
    .then(response => response.json()).then(data => {
    console.log(data)
  })
}

function saveToMemory() {
  localStorage.setItem("memory",JSON.stringify(searchArr))
}

function initializeMemory(){
  var mem =localStorage.getItem('memory')
  if(mem !== null){
    searchArr = JSON.parse(mem)
    console.log(searchArr)
  }else{
    return
  }
}
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
