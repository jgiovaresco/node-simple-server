import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { RouteGenericInterface, RouteOptions } from 'fastify/types/route';

interface RouteInterface extends RouteGenericInterface {}

export const GetWithCookies: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteInterface
> = {
  method: 'GET',
  url: '/cookie',
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
  handler: (request, reply) => {
    reply
      .setCookie('cabinet-web', 'cabinet-web-duo', {
        path: '/',
        domain: 'cabinet.tax.gov.ua',
        // expires: new Date(2022, 1, 1),
      })
      .setCookie('gar', 'foo', {})

      .send({ hello: 'world' });
  },
};
