import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';

import { RouteGenericInterface, RouteOptions } from 'fastify/types/route';

interface RouteInterface extends RouteGenericInterface {
  Body: any;
  Reply: any;
}

export const UrlEncodedPost: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteInterface
> = {
  method: 'POST',
  url: '/url-encoded',
  config: {
    rawBody: true,
  },
  handler: async request => {
    return {
      raw: (request as any).rawBody,
      parsed: request.body,
    };
  },
};
