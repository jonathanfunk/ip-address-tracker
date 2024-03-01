const ipAddressEl = document.getElementById('result-ip');
const locationEl = document.getElementById('result-location');
const timezoneEl = document.getElementById('result-timezone');
const ispEl = document.getElementById('result-isp');
const formEl = document.getElementById('search-form');
let map;

async function fetchLocationData(params) {
	console.log(params);
	const API_KEY = 'at_Eeh3bF7YLVsaMVy3jVacaOLBNr5Ph';
	const API_URL = 'https://geo.ipify.org/api/v2/country,city';
	try {
		const response = await fetch(`${API_URL}?apiKey=${API_KEY}${params ?? ''}`);
		const data = await response.json();
		const { ip, isp } = data;
		const { city, region, timezone, lat, lng } = data.location;

		ipAddressEl.innerText = ip;
		locationEl.innerText = `${city}, ${region}`;
		timezoneEl.innerText = timezone;
		ispEl.innerText = isp;
		console.log(lat, lng);
		initMap(lat, lng);
	} catch (error) {
		console.error('Error fetching IP address:', error);
	}
}

function initMap(lat, lng) {
	const customIcon = L.icon({
		iconUrl: './images/icon-location.svg',
		iconAnchor: [16, 32],
		popupAnchor: [0, -32],
	});
	if (!map) {
		map = L.map('map', { zoomControl: false }).setView([lat, lng], 13);
		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 19,
			attribution:
				'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);
	} else {
		map.setView([lat, lng], 13);
	}

	map.eachLayer((layer) => {
		if (layer instanceof L.Marker) {
			map.removeLayer(layer);
		}
	});
	L.marker([lat, lng], { icon: customIcon }).addTo(map);
}

function isValidDomain(domain) {
	const domainRegex =
		/^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
	return domainRegex.test(domain);
}

function isValidIP(ip) {
	const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
	const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;

	return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

function handleSearch(e) {
	e.preventDefault();
	const searchInput = document.getElementById('search-input').value;
	if (isValidDomain(searchInput)) {
		fetchLocationData(`&domain=${searchInput}`);
	} else if (isValidIP(searchInput)) {
		fetchLocationData(`&ipAddress=${searchInput}`);
	} else {
		alert('Please input a valid IP or domain');
	}
}

formEl.addEventListener('submit', handleSearch);

function getInitialLocation() {
	fetchLocationData();
}

getInitialLocation();
