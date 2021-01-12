# Goblineer Next Frontend ![CI](https://github.com/Goblineer-AH/goblineer-next-frontend/workflows/CI/badge.svg)
React Frontend for Goblineer. Visualises auction house data from World of Warcraft.

## Docker deployment
### Building with Docker
```sh
docker build . -t <your image tag>
```

### Running with Docker
```sh
docker run -it --rm -e API_URL=<your api url> -p 80:80 <your image tag>
```

## Development

Copy `public/config.example.js` to `public/config.js` and edit this line so that it points to your local API instance:
```js
window.REACT_APP_API_URL="http://localhost:5000";
``` 

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
