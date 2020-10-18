import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { RouteGenericInterface, RouteOptions } from 'fastify/types/route';

interface RouteInterface extends RouteGenericInterface {
  Querystring: { delaySec: string };
}

export const GetWithDelay: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteInterface
> = {
  method: 'GET',
  url: '/delay',
  schema: {
    querystring: {
      delaySec: { type: 'number' },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
  handler: request => {
    const delaySec = Number.parseInt(request.query['delaySec'] || '2');

    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ hello: 'world' });
      }, delaySec * 1000);
    });
  },
};
