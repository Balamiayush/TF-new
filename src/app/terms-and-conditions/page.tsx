import fs from "fs";
import path from "path";
import TermsClient from "./TermsClient";

export default function TermsPage() {
  const filePath = path.join(process.cwd(), "content/terms-and-conditions.md");
  const markdownContent = fs.readFileSync(filePath, "utf8");

  return <TermsClient markdownContent={markdownContent} />;
}