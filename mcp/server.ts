import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createMcpServer } from "../src/lib/mcp";

// Local stdio MCP server (`npm run mcp`). No auth — anyone who can run this already has .env.local DB creds.
// Writes here can't call revalidatePath, so the homepage picks them up via `revalidate` in app/page.tsx.
createMcpServer().connect(new StdioServerTransport());
