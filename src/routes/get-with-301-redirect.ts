import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { RouteGenericInterface, RouteOptions } from 'fastify/types/route';

interface RouteInterface extends RouteGenericInterface {
  Querystring: { delaySec: string };
}

let redirect = false;

export const GetWith301Redirect: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteInterface
> = {
  method: 'GET',
  url: '/301-redirect',
  handler: (_, reply) => {
    redirect = !redirect;
    if (redirect) {
      reply.redirect(301, 'http://google.com');
      return;
    }

    reply.send('Not redirected');
  },
};
