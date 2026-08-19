import { htmlToText } from "html-to-text";

export function htmlToPlainText(html: string): string {
  if (!html || typeof html !== "string") {
    return "";
  }

  return htmlToText(html, {
    wordwrap: false,
    selectors: [
      { selector: "img", format: "skip" },
      { selector: "script", format: "skip" },
      { selector: "style", format: "skip" },
      { selector: "svg", format: "skip" },
      
      { selector: "h1", format: "inline" },
      { selector: "h2", format: "inline" },
      { selector: "h3", format: "inline" },
      { selector: "h4", format: "inline" },
      
      { selector: "a", options: { ignoreHref: true } },
    ],
  });
}