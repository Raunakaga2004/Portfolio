import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { prisma } from "./prisma";
import { getContent } from "./getContent";
import { SECTION_KEYS, sectionSchemas } from "./content";

// Content-editing MCP tools, shared by the local stdio server (mcp/server.ts) and the remote route (app/api/mcp).
// Same schemas + table as the admin form (app/admin/actions.ts).
export function createMcpServer(onWrite?: () => void) {
  const server = new McpServer({ name: "portfolio-admin", version: "1.0.0" });
  const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });

  server.registerTool(
    "get_content",
    {
      description: "Read current portfolio content (DB, falling back to defaults). Omit section to get all sections.",
      inputSchema: { section: z.enum(SECTION_KEYS as [string, ...string[]]).optional() },
      annotations: { readOnlyHint: true },
    },
    async ({ section }) => {
      const content = await getContent();
      return json(section ? content[section as keyof typeof content] : content);
    },
  );

  for (const key of SECTION_KEYS) {
    server.registerTool(
      `update_${key}`,
      {
        description: `Replace the whole "${key}" section. Call get_content first and send back the full edited object; omitted array items are deleted. imageKey must be an existing "images/<id>.<ext>" key (uploads go through the admin panel).`,
        inputSchema: sectionSchemas[key],
        annotations: { destructiveHint: true, idempotentHint: true },
      },
      async (data: object) => {
        await prisma.section.upsert({ where: { key }, create: { key, data }, update: { data } });
        onWrite?.();
        return json({ ok: true, section: key });
      },
    );
  }

  return server;
}
