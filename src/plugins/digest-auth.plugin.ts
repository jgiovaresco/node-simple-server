import { createHash } from 'crypto';
import { FastifyPluginCallback, FastifyReply } from 'fastify';
import fp from 'fastify-plugin';

export interface DigestAuthOptions {
  prefix?: string;

  username: string;
  password: string;
  realm: string;
}

const digestAuthPlugin: FastifyPluginCallback<DigestAuthOptions> = async (
  instance,
  options,
  next,
) => {
  instance.addHook('onRequest', (req, reply, done) => {
    if (!isAppliable(req.routerPath, options)) {
      done();
      return;
    }

    if (!req.headers.authorization) {
      authenticateUser(reply, options);
      done();
    }

    // authorize the request without checking the header
    done();
  });

  next();
};

function isAppliable(path: string, options: DigestAuthOptions) {
  if (options.prefix) {
    return path.match(options.prefix);
  }
  return true;
}

function authenticateUser(reply: FastifyReply, options: DigestAuthOptions) {
  const hash = cryptoUsingMD5(options.realm);

  reply
    .status(401)
    .header(
      'WWW-Authenticate',
      'Digest realm="' +
        options.realm +
        '",qop="auth",nonce="' +
        Math.random() +
        '",opaque="' +
        hash +
        '"',
    )
    .send('Authorization is needed.');
}

function cryptoUsingMD5(data: string) {
  return createHash('md5').update(data).digest('hex');
}

export default fp(digestAuthPlugin, {
  fastify: '3.x',
  name: 'digest-auth',
});
