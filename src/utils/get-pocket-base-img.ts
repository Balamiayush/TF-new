export function getPocketBaseImageUrl(
  collectionId?: string,
  recordId?: string,
  fileName?: string,
  fallback = "/placeholder-image.webp"
): string {
  if (!collectionId || !recordId || !fileName) return fallback;

  const baseUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || "";
  return `${baseUrl}/api/files/${collectionId}/${recordId}/${fileName}`;
}