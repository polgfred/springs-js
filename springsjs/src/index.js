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

		return fetch(url.toString(), request);
	},
};
