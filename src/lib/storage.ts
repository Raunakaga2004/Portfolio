import { Files } from "files-sdk";
import { neon } from "files-sdk/neon";

// Reads AWS_* env vars injected by `neon deploy`. Bucket declared in neon.ts.
export const files = new Files({ adapter: neon({ bucket: "assets" }) });
