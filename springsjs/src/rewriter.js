export default {
	async fetch(_request, env, ctx) {
		const request = new Request(_request);
		request.headers.set("origin", "https://developers.cloudflare.com");
		request.headers.set("referer", "https://developers.cloudflare.com/");

		const url = new URL(request.url);
		url.hostname = "developers.cloudflare.com";
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
			writer.on('span,p', {
				element(e) {
					e.setAttribute('style', 'color:purple');
				}
			});

			return writer.transform(response);
		}

		return fetch(url.toString(), request);
	},
};
