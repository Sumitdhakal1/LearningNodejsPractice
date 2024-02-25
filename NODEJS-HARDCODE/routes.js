const fs = require('fs');

const requestHadler = (req, res) => {
    const url = req.url;
    const method = req.method
    if (url === '/') {
        res.write('<html>')
        res.write('<head><title>enter message</title></head>')
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>')
        return res.end()
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        });

        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            fs.writeFileSync('message.txt', message)
            //  console.log(parseBody)
        });
        fs.writeFileSync('message.txt', 'dummy')
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end()
    }
    res.setHeader('Content-type', 'text/html')
    res.write('<html>')
    res.write('<head><title>my first heading</title></head>')
    res.write('<body><h1>hello from my node</h1></body>')
    res.write('</html>')
    res.end();

};
// 1st way
// module.exports =requestHadler;

//second way
// module.exports ={
//     handler:requestHadler,
//     sometext:'sumit'
// }

// third way
//  module.exports.handler = requestHadler;

exports.handler = requestHadler;
// exports.sometext= 'sumit';
