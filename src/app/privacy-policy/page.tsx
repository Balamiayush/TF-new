import fs from "fs";
import path from "path";
import TermsClient from "../terms-and-conditions/TermsClient";

export default function PrivacyPage() {
  const filePath = path.join(process.cwd(), "content/privacy-policy.md");
  const markdownContent = fs.readFileSync(filePath, "utf8");

  // Pass initialTab="privacy" to render Privacy content by default
  return <TermsClient markdownContent={markdownContent} initialTab="privacy" />;
}