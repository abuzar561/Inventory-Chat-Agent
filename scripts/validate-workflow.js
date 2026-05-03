const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const workflowPath = path.join(root, "workflows", "inventory-chat-agent.json");
const failures = [];

const requiredFiles = [
  "README.md",
  "LICENSE",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  ".editorconfig",
  ".gitattributes",
  ".gitignore",
  ".github/workflows/validate.yml",
  "package.json",
  "workflows/inventory-chat-agent.json",
  "docs/SETUP.md",
  "docs/WORKFLOW.md",
  "docs/SHEET_SCHEMA.md",
  "examples/inventory-sheet-template.csv",
  "examples/sample-prompts.md",
  "scripts/validate-workflow.js"
];

const requiredNodes = [
  "When chat message received",
  "AI Agent",
  "OpenRouter Chat Model",
  "Simple Memory",
  "Check_Inventory_Tool",
  "Update_Inventory_Tool"
];

function fail(message) {
  failures.push(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function listFiles(directory) {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if ([".git", "node_modules"].includes(entry.name)) {
      return [];
    }

    if (entry.isDirectory()) {
      return listFiles(fullPath);
    }

    return [fullPath];
  });
}

function isTextFile(filePath) {
  const textBasenames = new Set([
    ".editorconfig",
    ".gitattributes",
    ".gitignore",
    "LICENSE"
  ]);

  return [
    ".csv",
    ".js",
    ".json",
    ".md",
    ".txt",
    ".yml"
  ].includes(path.extname(filePath)) || textBasenames.has(path.basename(filePath));
}

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    fail(`Missing required file: ${file}`);
  }
}

if (fs.existsSync(path.join(root, "Inventory Agent.json"))) {
  fail("Workflow export should live in workflows/inventory-chat-agent.json.");
}

let workflow;

try {
  workflow = JSON.parse(fs.readFileSync(workflowPath, "utf8"));
} catch (error) {
  fail(`Workflow JSON is invalid: ${error.message}`);
}

if (workflow) {
  if (workflow.name !== "Inventory Chat Agent") {
    fail("Workflow name should be Inventory Chat Agent.");
  }

  const nodes = Array.isArray(workflow.nodes) ? workflow.nodes : [];
  const nodeNames = new Set(nodes.map((node) => node.name));

  for (const nodeName of requiredNodes) {
    if (!nodeNames.has(nodeName)) {
      fail(`Workflow missing node: ${nodeName}`);
    }
  }

  if (!workflow.connections || Object.keys(workflow.connections).length < 5) {
    fail("Workflow should include the expected AI agent connections.");
  }

  const memoryNode = nodes.find((node) => node.name === "Simple Memory");
  const sessionKey = memoryNode?.parameters?.sessionKey || "";

  if (sessionKey.includes("Telegram Trigger")) {
    fail("Simple Memory should not reference a missing Telegram Trigger node.");
  }

  const workflowContent = JSON.stringify(workflow);
  const placeholders = [
    "REPLACE_WITH_OPENROUTER_CREDENTIAL_ID",
    "REPLACE_WITH_GOOGLE_SHEETS_CREDENTIAL_ID",
    "REPLACE_WITH_GOOGLE_SHEET_ID"
  ];

  for (const placeholder of placeholders) {
    if (!workflowContent.includes(placeholder)) {
      fail(`Workflow missing placeholder: ${placeholder}`);
    }
  }
}

const packageJson = JSON.parse(readText("package.json"));

if (packageJson.scripts?.validate !== "node scripts/validate-workflow.js") {
  fail("package.json should expose npm run validate.");
}

const readme = readText("README.md");

for (const section of ["Highlights", "Workflow", "Quick Start", "Validation", "Important Disclaimer"]) {
  if (!readme.includes(`## ${section}`)) {
    fail(`README missing section: ${section}`);
  }
}

const forbiddenPatterns = [
  { label: "mojibake text", regex: /[\u00f0\u0178\u00e2\u0161\u00ef\u00b8]/ },
  { label: "local absolute path", regex: /[A-Z]:\\/ },
  { label: "private credential assignment", regex: /(api[_-]?key|secret|password)\s*=/i },
  { label: "n8n exported instance id", regex: /"instanceId"\s*:/i },
  { label: "private Google Sheet id", regex: /docs\.google\.com\/spreadsheets\/d\/(?!REPLACE_WITH_GOOGLE_SHEET_ID)[A-Za-z0-9_-]{20,}/ }
];

for (const filePath of listFiles(root).filter(isTextFile)) {
  const relativePath = path.relative(root, filePath).replace(/\\/g, "/");
  const content = fs.readFileSync(filePath, "utf8");

  for (const { label, regex } of forbiddenPatterns) {
    if (regex.test(content)) {
      fail(`${relativePath} contains ${label}.`);
    }
  }
}

if (failures.length > 0) {
  console.error("Workflow validation failed:");

  for (const failure of failures) {
    console.error(`- ${failure}`);
  }

  process.exit(1);
}

console.log("Workflow validation passed.");
