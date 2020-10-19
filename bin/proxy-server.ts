import { createProxyServer } from 'http-proxy';

const proxy = createProxyServer({
  target: 'http://localhost:3000',
}).listen(8000);

proxy.on('proxyReq', (proxyRes, req, res) => {
  console.log(proxyRes.getHeaders());
});
