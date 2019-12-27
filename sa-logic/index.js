const Hapi = require('@hapi/hapi');

const init = async () => {

	const server = Hapi.server({
		port: 3002,
		routes: {
			cors: true,
		}
	});

	server.route({
		method: 'POST',
		path: '/sentiment',
		handler: async (request, h) => {

			return {
				sentence: request.payload.sentence,
				polarity: 'WHATEVER LOLZ'
			};
		}
	});

	await server.start();
	console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

	console.log(err);
	process.exit(1);
});

init();
