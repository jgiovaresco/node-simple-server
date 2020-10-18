import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { RouteGenericInterface, RouteOptions } from 'fastify/types/route';

interface RouteInterface extends RouteGenericInterface {
  Reply: any;
}

export const SimplePost: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteInterface
> = {
  method: 'POST',
  url: '/simple-post',
  schema: {
    body: {
      type: 'array',
    },
    response: {
      200: {
        type: 'array',
      },
    },
  },
  handler: request => {
    return request.body as any;
  },
};
