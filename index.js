
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
	// 'categories': (bars, All),
	'radius': 20000,
	'longitude': '41.936442',
	'latitude': '-87.641051'
}


Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

$(document).ready(function(){
	$("#button").click(function(){
		fetch(url, options)
			.then(res => res.json())
			.then(data => $("#results").text(data.businesses[0].name))
	});
});