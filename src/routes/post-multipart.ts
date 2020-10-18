import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';

import { RouteGenericInterface, RouteOptions } from 'fastify/types/route';

type Part = {
  name: string;
  value: string | { filename: string; content: string };
};

interface RouteInterface extends RouteGenericInterface {
  Body: any;
  Reply: any;
}

export const MultipartPost: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteInterface
> = {
  method: 'POST',
  url: '/multipart',
  handler: async request => {
    const parts: Part[] = [];

    const body: any[] = Object.values(request.body);
    for (const input of body) {
      if (input.file) {
        parts.push({
          name: input.fieldname,
          value: {
            filename: input.filename,
            content: (await input.toBuffer()).toString('utf-8'),
          },
        });
      } else {
        parts.push({
          name: input.fieldname,
          value: input.value,
        });
      }
    }
    return parts;
  },
};
