console.log("script.js linked")
var searchInput = $('#searchInput')
var searchBar = $('#searchBar')

var prevSearches = $('#prevSearches')
var searchesArr = {} 

var city = ''
var state = ''
var lat = ''
var lon = ''

const owa = '3311768b9f47cadf7c25fc0ee1786333'

searchBar.on('submit', (e) => {
  e.preventDefault()
  var search = searchInput.val()
  var cityState = search.split(",") 
  city = cityState[0].trim()
  state = cityState[1].trim()
  console.log(city)
  console.log(state)
  fetchGeo()
})

function fetchGeo() {
  var fetchGeocoding = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + ',' + 'state' + "&limit=5&appid=" + owa
  fetch(fetchGeocoding)
    .then(response => response.json()).then(data=>{
      console.log(data)
      lat = data[0].lat
      lon = data[0].lon
      console.log(lat)
      console.log(lon)
      // fetchWeather(lat,lon)
    })
}


// function fetchWeather(x,y) {
//  var fetchWeather = 
// }

//

// declare variables, pointing to divs on page
// fetch call
// array for buttons in the prevSearches, pops when length===4, pushes new searches
