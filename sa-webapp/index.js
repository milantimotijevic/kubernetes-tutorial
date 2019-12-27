const Hapi = require('@hapi/hapi');
const Axios = require('axios');

const init = async () => {

	const server = Hapi.server({
		port: 3001,
		routes: {
			cors: true,
		}
	});

	server.route({
		method: 'POST',
		path: '/sentiment',
		handler: async (request, h) => {

			try {
				const resp = await Axios({
					method: 'post',
					url: `${process.env.LOGIC_SERVICE}/sentiment`,
					data: request.payload,
					headers: {'Content-Type': 'application/json'}
				});

				return resp.data;
			} catch (err) {
				console.log(err);
				return {
					errorCode: 'OMFG',
					errorDetails: JSON.stringify(err)
				};
			}
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
