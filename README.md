# RNdeliverable

This is a small React Native project using Expo. The application can be run locally or inside a Docker container.

## Requirements
- Node.js 18
- npm

## Running Locally
Install dependencies and start the Expo development server:

```bash
npm install
npm start
```

## Docker
A `Dockerfile` is provided to containerize the project.

### Build the image
```bash
docker build -t rndeliverable .
```

### Run the container
```bash
docker run -p 8081:8081 rndeliverable
```

The Expo server will start inside the container and can be accessed on port `8081`.
