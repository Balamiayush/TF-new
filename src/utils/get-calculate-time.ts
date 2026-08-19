import { htmlToPlainText } from "./html-to-plain-text";

export function calculateReadTime(html: string) {
  // Convert HTML to plain text
  const text = htmlToPlainText(html);

  // Count words
  const words = text.trim().split(/\s+/).length;

  // Average reading speed
  const wordsPerMinute = 200;

  // Calculate minutes
  const minutes = Math.ceil(words / wordsPerMinute);

  return minutes;
}