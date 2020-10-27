import fastify from 'fastify';
import fastifyMultipart from 'fastify-multipart';
import fastifyCookie from 'fastify-cookie';

import {
  GetWithCookies,
  GetWithDelay,
  GetXmlResponse,
  MultipartPost,
  SimpleGet,
  SimplePost,
} from './routes';
import digestAuth from './plugins/digest-auth.plugin';
import { DigestSimplePost } from './routes/auth';

async function newServer() {
  const server = fastify({
    logger: {
      prettyPrint: true,
    },
  });
  await server.register(fastifyMultipart, { attachFieldsToBody: true });
  await server.register(fastifyCookie, { secret: 'my-secret' });
  await server.register(digestAuth, {
    prefix: '/digest',
    username: 'guest',
    password: 'guest',
    realm: 'Digest Auth',
  });

  server.route(DigestSimplePost);

  server.route(GetWithCookies);
  server.route(GetWithDelay);
  server.route(GetXmlResponse);
  server.route(MultipartPost);
  server.route(SimpleGet);
  server.route(SimplePost);

  return server;
}

export const start = async () => {
  const server = await newServer();

  try {
    const address = await server.listen(3000);
    server.log.info(`server listening on ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
