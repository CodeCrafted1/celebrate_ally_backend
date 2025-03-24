# Express TypeScript Server

A simple Express server built with TypeScript, running with Docker, Redis, and PostgreSQL.

## Prerequisites

- Node.js 18 or higher
- Docker and Docker Compose
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
JWT_SECRET=your_jwt_secret
PORT=4000
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=flowly-db
```

## Setup

### Local Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start the production server:
```bash
npm start
```

### Docker Setup

1. Build and start all services (PostgreSQL, Redis, and the application):
```bash
docker-compose up --build
```

2. To run in detached mode:
```bash
docker-compose up -d
```

3. To stop all services:
```bash
docker-compose down
```

## Available Scripts

- `npm run dev`: Starts the development server with hot-reload
- `npm run build`: Builds the TypeScript code to JavaScript
- `npm start`: Runs the built JavaScript code
- `npm run dev:start`: Starts the development server with Docker

## API Endpoints

- `GET /`: Returns a welcome message
- `GET /public/*`: Serves static files from the public directory

## Port Configuration

- Application runs on port 4000
- PostgreSQL runs on port 5432
- Redis runs on port 6379

## Database

The application uses PostgreSQL as the main database and Redis for caching. Both services are automatically configured when using Docker Compose.

## Development

The application uses:
- Express.js for the web server
- TypeScript for type safety
- PostgreSQL for the database
- Redis for caching
- Docker for containerization
- Morgan for HTTP request logging
- Helmet for security headers
- CORS for cross-origin resource sharing

## Troubleshooting

If you can't connect to the server:
1. Ensure all Docker containers are running: `docker-compose ps`
2. Check the logs: `docker-compose logs app`
3. Verify the port mapping in docker-compose.yml
4. Make sure no other service is using port 4000 