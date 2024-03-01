const ipAddressEl = document.getElementById('ip');
const locationEl = document.getElementById('location');
const timezoneEl = document.getElementById('timezone');
const ispEl = document.getElementById('isp');
const formEl = document.getElementById('search-form');

async function fetchAPI(params) {
	console.log(params);
	const API_KEY = 'at_Eeh3bF7YLVsaMVy3jVacaOLBNr5Ph';
	const API_URL = 'https://geo.ipify.org/api/v2/country,city';
	try {
		const response = await fetch(`${API_URL}?apiKey=${API_KEY}${params ?? ''}`);
		const data = await response.json();
		const { ip, isp } = data;
		const { city, region, timezone } = data.location;

		ipAddressEl.innerText = ip;
		locationEl.innerText = `${city}, ${region}`;
		timezoneEl.innerText = timezone;
		ispEl.innerText = isp;
	} catch (error) {
		console.error('Error fetching IP address:', error);
	}
}

function validDomain(domain) {
	const domainRegex =
		/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
	return domainRegex.test(domain);
}

function validIP(ip) {
	const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
	const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

	return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

function search(e) {
	e.preventDefault();
	const searchInput = document.getElementById('search-input').value;
	if (validDomain(searchInput)) {
		fetchAPI(`&domain=${searchInput}`);
	} else if (validIP(searchInput)) {
		fetchAPI(`&ipAddress=${searchInput}`);
	} else {
		alert('Please input a valid IP or domain');
	}
}

formEl.addEventListener('submit', search);

function getInitialLocation() {
	fetchAPI();
}

getInitialLocation();
