import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

const fetch = createStartHandler(defaultStreamHandler);

export default {
  async fetch(request: Request) {
    try {
      const response = await fetch(request);
      if (response.status >= 500) {
        const body = await response.clone().text();
        return new Response(`SSR 500: ${body}`, {
          status: 500,
          headers: { "content-type": "text/plain; charset=utf-8" },
        });
      }
      return response;
    } catch (err) {
      console.error("SSR Error:", err);
      return new Response(
        `Error: ${err instanceof Error ? err.message : String(err)}\n${err instanceof Error ? err.stack : ""}`,
        {
          status: 500,
          headers: { "content-type": "text/plain; charset=utf-8" },
        }
      );
    }
  },
};