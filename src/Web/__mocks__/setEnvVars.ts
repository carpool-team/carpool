process.env.MAPBOX_KEY = "pk.eyJ1IjoiamtvYnJ5bnNraSIsImEiOiJjazk1anJ4OHQwN2IzM3FyMWh5d2tldnRuIn0.bcgJvcllIlR3K_zUKUbWZw"
process.env.MAPLIGHT = "mapbox://styles/jkobrynski/ck9632hsy2m4q1invvx1jjvo9/draft"
process.env.REST_URL = "https://carpool-rest.azurewebsites.net/api"
process.env.AUTH_URL = "https://carpool-identity.azurewebsites.net/api"
process.env.EMAIL = "help.carpoool@gmail.com"
process.env.EMAIL_USER_ID = "user_u6AU1lYa0QyAuhs3ZjheG"
process.env.EMAIL_SERVICE_ID = "service_d7er38q"

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
	Map: () => ({})
}));

