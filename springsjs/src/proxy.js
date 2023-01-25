export default {
	async fetch(_request, env, ctx) {
		const request = new Request(_request);
		request.headers.set("origin", "https://developers.cloudflare.com");
		request.headers.set("referer", "https://developers.cloudflare.com/");

		const url = new URL(request.url);
		url.hostname = "www.google.com";
		url.port = 443;

		return fetch(url.toString(), request);
	},
};
