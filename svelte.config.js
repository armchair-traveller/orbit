import preprocess from "svelte-preprocess";
import static from "@sveltejs/adapter-static";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: static(),
    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },

  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
