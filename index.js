
const params = {
	'limit': 50,
	// 'categories': (bars, All),
	'radius': 20000,
	'longitude': '41.936442',
	'latitude': '-87.641051'}


const url = `https://api.yelp.com/v3/businesses/search?`+ $.param(params)
const api_key = 'S8KmYElllBSl6MnACfDatQhts9YOS0_NwnSRThX8W2AlXKaMAM85JlHDrfEKfCkdmgy8srUjZmd7h3sZKgNoQO0-KKLQRBNtlrDOq2MYnAsktNFIhLi7gtDgUgilXXYx'

console.log(url)

const options = {
	method: 'GET',
	headers: new Headers({
		'Authorization': `Bearer ${api_key}`,
		'Access-Control-Allow-Origin': '*',
		'Origin':'http://localhost:3000',
		'Content-Type': 'application/json'
	}),
	'mode': 'cors'
}



fetch(url, options)
	.then(response => console.log(response))
	// .then(json => console.log(json))
	.catch(error => console.log(error))



// 	headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');
// headers.append('Authorization', 'Basic ' + base64.encode(username + ":" +  password));
// headers.append('Origin','http://localhost:3000');

// fetch(sign_in, {
//     mode: 'cors',
//     credentials: 'include',
//     method: 'POST',
//     headers: headers
// })