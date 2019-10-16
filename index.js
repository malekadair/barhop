
const api_key = 'S8KmYElllBSl6MnACfDatQhts9YOS0_NwnSRThX8W2AlXKaMAM85JlHDrfEKfCkdmgy8srUjZmd7h3sZKgNoQO0-KKLQRBNtlrDOq2MYnAsktNFIhLi7gtDgUgilXXYx'

let url = new URL('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search')

const options = {
	method: 'GET',
	headers: new Headers({
		'Authorization': `Bearer ${api_key}`,
		'Content-Type': 'application/json'
	})
}

const params = {
	'limit': 50,
	'categories': 'bars',
	'radius': 20000,
	'longitude': '-86.641051',
	'latitude': '41.936442'
}

Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))



function setPrice(){

}

function createResultsHTML(){

}

function getCoordinates(){

}

function renderResults(data){
	// getCoordinates()
	let addressUrl = $(data.businesses[0].location.display_address)
	console.log(addressUrl)
	let replacedAddress = encodeURIComponent(addressUrl[0]) + '%20'+ encodeURIComponent(addressUrl[1])
	console.log(replacedAddress)

	$('.main-header').text('Here are the closest bars to you:')
	$('.barImg').prop('src', `${data.businesses[0].image_url}`)
	$('.barName').text(`${data.businesses[0].name}`)
	$('.website').prop('href', `${data.businesses[0].url}`)
	$('.addressLookUp').prop('href', `https://www.google.com/maps/dir//${replacedAddress}`)

	// $("#results").text(data.businesses[0].name)
}

// function success(position) {
//   let crd = position.coords;


//   // console.log('Your current position is:');
//   // console.log(`Latitude : ${crd.latitude}`);
//   // console.log(`Longitude: ${crd.longitude}`);
//   // console.log(`More or less ${crd.accuracy} meters.`);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error);







$(document).ready(function(){
	$("#button").click(function(){
		fetch(url, options)
			.then(res => res.json())
			// .then(data => console.log(data))
			.then(data => {
				console.log(data);
				renderResults(data);
				// $("#results").text(data.businesses[0].name)
			})
	});
});