import { createBullBoard } from "@bull-board/api";
import { HonoAdapter } from "@bull-board/hono";
import { serve } from "bun";
import { serveStatic } from "hono/bun";
import { Hono } from "hono";

const run = async () => {
    const app = new Hono();

    const serverAdapter = new HonoAdapter(serveStatic);

    createBullBoard({ queues: [], serverAdapter});

    const basePath = '/ui'
    serverAdapter.setBasePath(basePath);
    app.route(basePath, serverAdapter.registerPlugin());

    const server = serve({ fetch: app.fetch, port: 3000 })

    console.log(`Listening on ${server.url}`);
};

await run()
