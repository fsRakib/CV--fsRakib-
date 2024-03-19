// Importing required modules
const http = require('http');
const fs = require('fs');
const path = require('path');

// Port number
const PORT = 5000;

// Function to serve HTML file
const serveHTML = (response) => {
    // Read the HTML file
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
        if (err) {
            // Error handling
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Internal Server Error');
        } else {
            // Sending the HTML content
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.end(data);
        }
    });
};

// Function to serve static files (images, CSS, etc.)
const serveStaticFile = (response, filename, contentType) => {
    // Read the file
    fs.readFile(path.join(__dirname, filename), (err, data) => {
        if (err) {
            // Error handling
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end('Internal Server Error');
        } else {
            // Sending the file content
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data);
        }
    });
};

// Create a server
const server = http.createServer((req, res) => {
    // Serve static files (images, CSS)
    if (req.url === '/style.css') {
        serveStaticFile(res, 'style.css', 'text/css');
    } else if (req.url === '/image/profile.png') {
        serveStaticFile(res, 'image/profile.png', 'image/png');
    } else {
        // Serve the HTML file for other requests
        serveHTML(res);
    }
});

// Start listening on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
