// src/app/terms/page.tsx
import fs from "fs";
import path from "path";
import TermsClient from "./TermsClient";

export default function TermsPage() {
  // Reads content/terms-and-conditions.md from root
  const filePath = path.join(process.cwd(), "content/terms-and-conditions.md");
  const markdownContent = fs.readFileSync(filePath, "utf8");

  return <TermsClient markdownContent={markdownContent} />;
}