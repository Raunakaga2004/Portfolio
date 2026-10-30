import { createHash, timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { createMcpServer } from "@/lib/mcp";

// Remote MCP endpoint: POST /api/mcp with `Authorization: Bearer $MCP_TOKEN`, or `?token=$MCP_TOKEN` for clients
// that can't set headers (claude.ai connectors). Fails closed if MCP_TOKEN is unset.
// ponytail: token in URL can land in access logs; switch to OAuth if that matters.
const hash = (s: string) => createHash("sha256").update(s).digest();

function authorized(req: Request) {
  const token = process.env.MCP_TOKEN;
  const given = req.headers.get("authorization")?.replace(/^Bearer /, "") ?? new URL(req.url).searchParams.get("token");
  return !!token && !!given && timingSafeEqual(hash(given), hash(token));
}

async function handler(req: Request) {
  if (!authorized(req)) return new Response("Unauthorized", { status: 401 });
  // Stateless: fresh server + transport per request, plain JSON responses (no SSE streams to keep alive on Vercel).
  const transport = new WebStandardStreamableHTTPServerTransport({ sessionIdGenerator: undefined, enableJsonResponse: true });
  await createMcpServer(() => revalidatePath("/")).connect(transport);
  return transport.handleRequest(req);
}

export { handler as GET, handler as POST, handler as DELETE };
