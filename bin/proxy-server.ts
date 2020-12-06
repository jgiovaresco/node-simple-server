import { createServer } from 'http';

import { createProxyServer } from 'http-proxy';
import { BasicAuthResult, parse } from 'basic-auth';

const isAuthenticated = process.env['AUTH'] === 'true';
const proxy = createProxyServer({
  changeOrigin: true,
  autoRewrite: true,
  followRedirects: true,
});
proxy.on('proxyReq', (proxyReq, req) => {
  console.log('Proxy request headers ', req.headers);
});

const server = createServer((req, res) => {
  if (isAuthenticated) {
    const check = ({ name, pass }: BasicAuthResult) =>
      name === 'user' && pass === 'p@ss';
    const credentials = parse(req.headers['proxy-authorization'] ?? '');

    console.log('Received credentials', credentials);
    if (!credentials || !check(credentials)) {
      res.statusCode = 407;
      res.setHeader('Proxy-Authenticate', 'Basic realm="example"');
      res.end('Access denied');
    }
  }

  proxy.web(req, res, { target: 'http://localhost:3000' });
});

console.log(
  `${isAuthenticated ? 'secured ' : ''}reverse proxy started on port 8000...`,
);
server.listen(8000);
