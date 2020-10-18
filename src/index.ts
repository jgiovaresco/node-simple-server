import fastify from 'fastify';

import { GetWithDelay, GetXmlResponse, SimplePost } from './routes';

const server = fastify({
  logger: {
    prettyPrint: true,
  },
});

server.route(GetWithDelay);
server.route(GetXmlResponse);
server.route(SimplePost);

export const start = async () => {
  try {
    const address = await server.listen(3000);
    server.log.info(`server listening on ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
