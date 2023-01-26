import { getAssetFromKV } from "@cloudflare/kv-asset-handler";
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
const assetManifest = JSON.parse(manifestJSON);

export default {
    async fetch(request, env, ctx) {
        return await getAssetFromKV({
            request,
            waitUntil: ctx.waitUntil.bind(ctx),
        }, {
            ASSET_NAMESPACE: env.__STATIC_CONTENT,
            ASSET_MANIFEST: assetManifest,
        });
    },
};
