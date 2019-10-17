
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
	'limit': 10,
	'categories': 'bars',
	'radius': 1000,
	'latitude': null,
	'longitude': null,
	'open_now': true,
	'price': '1',
}




function setPrice(){

}

function createResultsHTML(biz){
	let newAddress = createUrl(biz)
	const gMapsUrl = 'https://www.google.com/maps/dir//'
		return biz.businesses.map((biz, index) => {
			return `<li><img class="barImg" id="barImg${index+1}" src="${biz.image_url}" alt="Bar Image">
			<h4 class="barName">${index+1}. ${biz.name}</h4>
			<!-- <img src="" alt="Bar rating"> -->
			<p class="barDescription"></p>
			<a class="website" target="_blank" href="${biz.url}">Website</a>
			<a class="addressLookUp" target="_blank" href="${gMapsUrl}${newAddress}">Let's Barhop!</a></li>`
		})
}

function getCoordinatesData(){

}

function createUrl(data){
	//builds URL into format that can be added to google maps search
	let addressUrl = $(data.businesses[0].location.display_address)
	console.log(addressUrl)
	let replacedAddress = encodeURIComponent(addressUrl[0]) + '%20'+ encodeURIComponent(addressUrl[1])
	console.log(replacedAddress)
	return replacedAddress;
}

function renderResults(data){
	const resultsHTML = createResultsHTML(data);

	$('#results').html(resultsHTML);

	// getCoordinates()

	//creates URL used to link to directions.
	// let newAddress = createUrl(data)

	// //current version of manipulating DOM
	// $('.main-header').text('Here are the closest bars to you:')
	// $('.barImg').prop('src', `${data.businesses[0].image_url}`)
	// $('.barName').text(`${data.businesses[0].name}`)
	// $('.website').prop('href', `${data.businesses[0].url}`)
	// $('.addressLookUp').prop('href', `https://www.google.com/maps/dir//${newAddress}`)


	$('.hidden').removeClass('hidden')
}

function success(position) {
  let crd = position.coords;
	let lat = crd.latitude;
	let lng = crd.longitude;

	params.latitude = lat
	params.longitude = lng

	console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
	console.log(`More or less ${crd.accuracy} meters.`);
	
	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

	fetch(url, options)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				console.log(createResultsHTML(data));

				renderResults(data);
			})
}
	
function error(err) {
	
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

// navigator.geolocation.getCurrentPosition(success, error);






$(document).ready(function(){
	$("#button").click(function(){
		navigator.geolocation.getCurrentPosition(success, error);
	});
});

// sorting example

// let numbers = [4, 2, 5, 1, 3];
// numbers.sort((a, b) => a - b);
// console.log(numbers);