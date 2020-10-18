import {
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { RouteGenericInterface, RouteOptions } from 'fastify/types/route';

interface RouteInterface extends RouteGenericInterface {
  Reply: string;
}

export const GetXmlResponse: RouteOptions<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteInterface
> = {
  method: 'GET',
  url: '/xml',
  schema: {
    response: {
      200: {
        type: 'string',
      },
    },
  },
  handler: (request, reply) => {
    reply.header('Content-Type', 'application/xml')
      .send(`<?xml version="1.0" encoding="UTF-8"?>
<wps:ExecuteResponse
\txmlns:xs="http://www.w3.org/2001/XMLSchema"
\txmlns:ows="http://www.opengis.net/ows/1.1"
\txmlns:wps="http://www.opengis.net/wps/1.0.0"
\txmlns:xlink="http://www.w3.org/1999/xlink"
        xml:lang="en" service="WPS" serviceInstance="http://localhost:8080/geoserver/ows?"
        statusLocation="http://localhost:8080/geoserver/ows?service=WPS&amp;version=1.0.0&amp;request=GetExecutionStatus&amp;executionId=59e1bc28-1899-4441-b531-db950d401205"
        version="1.0.0">
\t<wps:Process wps:processVersion="1.0.0">
\t\t<ows:Identifier>gs:DownloadAnimation</ows:Identifier>
\t\t<ows:Title>Animation Download Process</ows:Title>
\t\t<ows:Abstract>Builds an animation given a set of layer definitions, area of interest, size and a series of times for animation frames.</ows:Abstract>
\t</wps:Process>
\t<wps:Status creationTime="2018-04-30T15:03:26.037Z">
\t\t<wps:ProcessAccepted>Process accepted.</wps:ProcessAccepted>
\t</wps:Status>
</wps:ExecuteResponse>`);
  },
};
