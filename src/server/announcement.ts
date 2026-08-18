import { pb } from "@/lib/pb";

import { PB_COLLECTION } from "@/shared/constants";

import type { AnnouncementRecord } from "@/shared/types";

export async function getAnnouncementRecord() {
  try {
    const record = await pb
      .collection<AnnouncementRecord>(PB_COLLECTION.ANNOUNCEMENTS)
      .getFirstListItem("is_active = true");

    return record;
  } catch (error) {
    console.error("Error fetching Announcement record:", error);

    return null;
  }
}
