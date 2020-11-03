import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { RouteGenericInterface, RouteOptions } from 'fastify/types/route';

interface RouteInterface extends RouteGenericInterface {
  Querystring: { delaySec: string };
}

export const GetWithHtmlAndMetaRefresh: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteInterface
> = {
  method: 'GET',
  url: '/get-with-html-and-meta-refresh',
  handler: (request, reply) => {
    reply
      .status(303)
      .header(
        'location',
        'http://mockbin.org/bin/c5861d7b-6923-4c45-aaa8-68a7f36813a5?foo=bar&foo=baz',
      )
      .header('content-type', 'text/html; charset=UTF-8').send(`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="refresh" content="30;url='http://mockbin.org/bin/c5861d7b-6923-4c45-aaa8-68a7f36813a5?foo=bar&foo=baz'" />

        <title>Redirecting to http://mockbin.org/bin/c5861d7b-6923-4c45-aaa8-68a7f36813a5?foo=bar&foo=baz</title>
    </head>
    <body>
        Redirecting to <a href="http://mockbin.org/bin/c5861d7b-6923-4c45-aaa8-68a7f36813a5?foo=bar&foo=baz">http://mockbin.org/bin/c5861d7b-6923-4c45-aaa8-68a7f36813a5?foo=bar&foo=baz</a>.
    </body>
</html>
      `);
  },
};
