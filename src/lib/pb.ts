import PocketBase from "pocketbase";

import { publicEnv } from "@/config/env";

export const pb = new PocketBase(publicEnv.POCKETBASE_BASE_URL);

export function getFileUrl(
  record: {
    [key: string]: unknown;
  },
  fileName: string,
) {
  return pb.files.getURL(record, fileName);
}
