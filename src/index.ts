import fastify from 'fastify';
import fastifyFormbody from 'fastify-formbody';
import fastifyMultipart from 'fastify-multipart';
import fastifyCookie from 'fastify-cookie';
import fastifyRawBody from 'fastify-raw-body';

import {
  GetWith301Redirect,
  GetWithCookies,
  GetWithDelay,
  GetWithHtmlAndMetaRefresh,
  GetXmlResponse,
  MultipartPost,
  SimpleGet,
  SimplePost,
  UrlEncodedPost,
} from './routes';
import digestAuth from './plugins/digest-auth.plugin';
import { DigestSimplePost } from './routes/auth';

async function newServer() {
  const server = fastify({
    logger: {
      prettyPrint: true,
    },
  });
  await server.register(fastifyRawBody, { global: false });
  await server.register(fastifyFormbody);
  await server.register(fastifyMultipart, { attachFieldsToBody: true });
  await server.register(fastifyCookie, { secret: 'my-secret' });
  await server.register(digestAuth, {
    prefix: '/digest',
    username: 'guest',
    password: 'guest',
    realm: 'Digest Auth',
  });

  server.route(DigestSimplePost);

  server.route(GetWith301Redirect);
  server.route(GetWithCookies);
  server.route(GetWithDelay);
  server.route(GetWithHtmlAndMetaRefresh);
  server.route(GetXmlResponse);
  server.route(MultipartPost);
  server.route(SimpleGet);
  server.route(SimplePost);
  server.route(UrlEncodedPost);

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
