import express from 'express';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const directory = path.dirname(fileURLToPath(import.meta.url));

const publicFiles = {
    '/': {
        filename: 'index.html',
        contentType: 'text/html; charset=utf-8',
    },
    '/styles.css': {
        filename: 'styles.css',
        contentType: 'text/css; charset=utf-8',
    },
    '/processor.js': {
        filename: 'processor.js',
        contentType: 'text/javascript; charset=utf-8',
    },
    '/app.js': {
        filename: 'app.js',
        contentType: 'text/javascript; charset=utf-8'
    }
};

// A named export lets tests create a server without starting the normal port.
export function createServer() {
    // Express handles routing and adds helpful request/response methods.
    const app = express();
    app.disable('x-powered-by'); //Prevents express from advertising itself in
    // Preserve the original exact, case-sensitive URL matching. For Security
    app.set('case sensitive routing', true);
    app.set('strict routing', true);

    // Middleware runs before routes. next() passes control to the next handler.
    app.use((request, response, next) => {
        if (request.method !== 'GET') {
            return response.set('Allow', 'GET').status(405).json({
                error: 'Use a GET request.',
            });
        }
        next();
    });

    app.get('/mystery', (request, response) => {
        // json() sets the JSON content type and serializes the object for us.
        return response.json({
            message: "Ayo!",
        });
    });

    app.get('/mystery/fourth', (request, response) => {
        // json() sets the JSON content type and serializes the object for us.
        return response.json({
            message: "Heyho!",
        });
    });

    /* Because this is being run on a local host, we will need to serve up our own
    * directory files to the browser*/
    // Register each allowed file as an Express route. No private files are exposed.
    for (const [route, file] of Object.entries(publicFiles)) {
        app.get(route, (request, response, next) => {
            response.type(file.contentType);
            // sendFile() reads and sends the file; forward errors to our error handler.
            response.sendFile(path.join(directory, 'public', file.filename), (error) => {
                if (error) next(error);
            });
        });
    }

    // If no route matched, send the same JSON 404 as the original server.
    app.use((request, response) => {
        response.status(404).json({ error: 'Page not found.' });
    });

    // Express recognizes error middleware by its four parameters, including next.
    app.use((error, request, response, next) => {
        console.error(error);
        // If output already started, let Express finish handling the connection.
        if (response.headersSent) return next(error);
        response.status(500).json({ error: 'Something went wrong on the server.' });
    });

    // Express is the request handler; return a Node server to keep the test API.
    return http.createServer(app);
}

// In ES modules, compare this file's URL with the command-line entry file's URL.
// Importing server.js in a test therefore does not start listening automatically.
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
    // PORT is an environment variable; a .env file is not loaded automatically.
    const port = Number(process.env.PORT || 3002);
    const server = createServer();
    server.on('error', (error) => {
        console.error(`Could not start the website: ${error.message}`);
        process.exitCode = 1;
    });
    // Bind to this computer only.
    server.listen(port, '127.0.0.1', () => {
        console.log(`Website running at http://127.0.0.1:${server.address().port}`);
        console.log('Press Ctrl+C to stop.');
    });
}