/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npx wrangler dev src/index.js` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npx wrangler publish src/index.js --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(_request, env, ctx) {
		const request = new Request(_request);
		request.headers.set("origin", "https://www.google.com");
		request.headers.set("referer", "https://www.google.com/");

		const url = new URL(request.url);
		url.hostname = "www.google.com";
		url.port = 443;

		const accept = request.headers.get('accept');
		if (accept?.indexOf('text/html') >= 0) {
			const response = await fetch(url.toString(), request);

			const writer = new HTMLRewriter();
			writer.on('h1,h2,h3,h4,h5,h6', {
				element(e) {
					e.setAttribute('style', 'color:red');
				}
			});
			writer.on('p', {
				element(e) {
					e.setAttribute('style', 'color:purple');
				}
			});

			return writer.transform(response);
		}

		return fetch(url.toString(), request);
	},
};
