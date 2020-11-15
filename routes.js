const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write(`
            <html lang="en">
                <head><title>Hello Welcome to my page!!!!</title></head>
                <body>
                    <h1>Hello from my server!</h1>
                    <form action="/create-user" method="post">
                        <input type="text" name="username"><button type="submit">Send</button>
                    </form>
                </body>
            </html>
        `);
        return res.end();
    }

    if (url === '/users') {
        res.write(`
            <html lang="en">
                <head><title>Users</title></head>
                <body>
                <ul>
                    <li>User 1 </li>
                    <li>User 2</li>
                    <li>User 3</li>
                </ul>
                </body>
            </html>
        `);
        return res.end();
    }

    if (url === 'create-user' && method === 'post') {
        const body = [];

        req.on('data', (chunk) => {
           console.log(chunk);
           body.push(chunk);
        });

        req.on('end', () => {
           const parsedBody = Buffer.concat(body).toString();
           console.log(parsedBody);
           const message = parsedBody.split('=')[1];
           console.log(message);

           res.statusCode = 302;
           res.setHeader('Location', '/');
           return res.end();
        });
    }

    // Send response (set header)
    res.setHeader('Content-Type', 'text/html');
// Set response to be simple html page
    res.write(`
        <html lang="en">
        <head><title>My First Node App</title></head>
        <body><h1>Hello!</h1></body>
        </html>
    `);
    res.end();
}

exports.handler = requestHandler;
