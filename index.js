const url = `https://api.yelp.com/v3/businesses/search`
const api_key = 'S8KmYElllBSl6MnACfDatQhts9YOS0_NwnSRThX8W2AlXKaMAM85JlHDrfEKfCkdmgy8srUjZmd7h3sZKgNoQO0-KKLQRBNtlrDOq2MYnAsktNFIhLi7gtDgUgilXXYx'

const options = {
	headers: new Headers({
		'Authorization': 'Bearer %s' % api_key,
		// 'mode': 'no-cors',
		'Access-Control-Allow-Origin': true
	})
}

const params = {
			'limit': 50,
			// 'categories': (bars, All),
			'radius': 20000,
			'longitude': '41.936442',
			'latitude': '-87.641051'}


fetch(url, params, options)
	.then(response => response.json())
	.then(json => console.log(json))