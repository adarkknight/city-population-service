# City Population Service
This project provides an API for getting and updating population data for specified cities and states. 

## Getting Started
1. clone the repository
```git clone [git@github.com:adarkknight/city-population-service.git]```

2. Install dependencies
```npm install```

3. Run the project
```npm start```

The API server will be accessible at **http://127.0.0.1:5555**.

## Endpoints
- **GET /api/population/state/:state/city/:city**
- **PUT /api/population/state/:state/city/:city**

Use an API testing tool (Postman, Insomnia) to make requests.

Example GET:
http://127.0.0.1:5555/api/population/state/Alabama/city/Huntsville

 - You should receive a response containing the population, along with a 200 status code.

Example PUT:
http://127.0.0.1:5555/api/population/state/Cheese/city/Swiss

Provide a JSON body of:
{
	"population": "100"
}

 - If the city/state combination exists, you will receive a 200 status code
 - If the city/state combination does not exist, you will receive a 201 status code


## Testing
``` npm run test```
