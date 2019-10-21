
const api_key = 'S8KmYElllBSl6MnACfDatQhts9YOS0_NwnSRThX8W2AlXKaMAM85JlHDrfEKfCkdmgy8srUjZmd7h3sZKgNoQO0-KKLQRBNtlrDOq2MYnAsktNFIhLi7gtDgUgilXXYx'

let url = new URL('https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search')

let budget = null;

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
	'radius': 40000,
	'latitude': null,
	'longitude': null,
	'open_now': true,
	'price': null,
}

function roundNumber(decimal){
	return Math.round(Number(decimal));
}

function createResultsHTML(biz){
	const gMapsUrl = 'https://www.google.com/maps/dir//'
	let newAddress = createUrl(biz)
		return biz.map((biz, index) => {
			
			let roundNumDistance = roundNumber(biz.distance)

			return `<li><img class="barImg" id="barImg${index+1}" src="${biz.image_url}" alt="Bar Image">
			<div class="bizText">
				<h4 class="barName">${index+1}. ${biz.name}</h4>
				<p class="rating">Rating: ${biz.rating}/5 stars</p>
				<p class="distance">${roundNumDistance}m Away</p>
				<p class="price">${biz.price}</p>
			</div>
			<div class="bizBtns">
				<a class="website btn" target="_blank" href="${biz.url}">Website</a>
				<a class="addressLookUp btn" target="_blank" href="${gMapsUrl}${newAddress}">Let's Barhop!</a></li>
			</div>`
		})
}

function createUrl(data){
	//builds URL into format that can be added to google maps search
	let addressUrl = $(data[0].location.display_address)
	console.log(addressUrl)
	let replacedAddress = encodeURIComponent(addressUrl[0]) + '%20'+ encodeURIComponent(addressUrl[1])
	console.log(replacedAddress)
	return replacedAddress;
}

function sortResults(bizList) {
	return bizList.businesses.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
}

function renderResults(data){
	//sorts the array of objects based distance closest to furthest.
	const sortedData = sortResults(data)
	//creates HTML to be added to DOM
	const resultsHTML = createResultsHTML(sortedData);

	$('.holdPlease').addClass('hidden');
	$('#resultsList').html(resultsHTML);
	$('#results').removeClass('hidden');

}

function success(position) {
	//get's user's coordinates and sets to appropriate variables
  let crd = position.coords;
	let lat = crd.latitude;
	let lng = crd.longitude;
	//get's pricepoint based on user input and sets to appropriate variable
	let priceVal = $('input[name=answer]:checked').val()

	//sets price param to selected $ amount
	params.price = priceVal;
	
	//sets lng/lat params to user's location
	params.latitude = lat;
	params.longitude = lng;

	console.log (params.latitude , params.longitude )
	

	//console log for my own reference while coding
	console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
	console.log(`More or less ${crd.accuracy} meters.`);
	
	
	//builds url based on params object
	Object.keys(params).forEach(function (key) {
		//clears searchParams object to avoid duplicating parameters
		url.searchParams.delete(key);
		//builds url with params
		url.searchParams.append(key, params[key])})

	//fetches the all-important object of nearby businesses
	fetch(url, options, params)
		.then(res => res.json())
		.then(data => {
			console.log(data);
			renderResults(data);
		})
}
	
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

function renderCurrent(){
	$('#results').addClass('hidden');
	$('#current').removeClass('hidden');
}

function callUber(){
	console.log("calling uber")
	window.open("https://m.uber.com/ul/", "_blank")
}

function changePrice (){
	$('.priceForm').removeClass('hidden');
	$('#results').addClass('hidden');
}

$(() => {
	$('.priceForm').on('submit', function(e){
		e.preventDefault()
		navigator.geolocation.getCurrentPosition(success, error);
		$('.priceForm').addClass('hidden');
		$('.holdPlease').removeClass('hidden');
	});
	$('#results').on('click', '.addressLookUp', function(){
		console.log('we made it this far. dont stop now!')
		renderCurrent();
	})
	$('#results').on('click', '.changePriceBtn', function(){
		console.log("change price button----ACTIVATE!")
		changePrice();
	})
	$('#current').on('click', '.goHome', function() {
		console.log("BOOOOO! you cant go home yet, the party's just starting!")
		callUber();
	})
	$('#current').on('click', '.nextBar', function(){
		console.log("Attaboy! let's bounce!")
		$('#current').addClass('hidden')
		$('.holdPlease').removeClass('hidden');
		navigator.geolocation.getCurrentPosition(success, error)
	})
})