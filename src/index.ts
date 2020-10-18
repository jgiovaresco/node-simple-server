import fastify from 'fastify';

const server = fastify({
  logger: {
    prettyPrint: true,
  },
});

export const start = async () => {
  try {
    const address = await server.listen(3000);
    server.log.info(`server listening on ${address}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
