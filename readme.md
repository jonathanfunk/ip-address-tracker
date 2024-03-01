# IP Address Tracker

This project is a solution to the [IP Address Tracker challenge](https://www.frontendmentor.io/challenges/ip-address-tracker-I8-0yYAH0) from Frontend Mentor.

## Overview

The IP Address Tracker allows users to track information about an IP address or domain. It provides details such as location, timezone, and ISP. The project integrates with the [IPify](https://www.ipify.org/) API for geolocation data.

## Features

- **IP and Domain Tracking:** Enter an IP address or domain to get information about its location.
- **Map Integration:** View the location on an interactive map powered by LeafletJS.

## Demo

You can see a live demo of the project [here](https:iptracker.jon-funk.com).

## Technologies Used

- HTML
- CSS
- JavaScript
- LeafletJS for maps

## Setup

1. Clone the repository: `git clone https://github.com/your-username/ip-address-tracker.git`
2. Open `index.html` in your preferred browser.

## API Key

To use the IPify API, you need to [sign up](https://www.ipify.org/sign-up) and get your API key. Add your API key to the `script.js` file.

```javascript
const API_KEY = 'your-api-key';
```
