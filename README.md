# Inventory Chat Agent

![n8n](https://img.shields.io/badge/n8n-workflow-EA4B71?logo=n8n&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-LLM%20provider-111827)
![Google Sheets](https://img.shields.io/badge/Google%20Sheets-inventory%20store-34A853?logo=googlesheets&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

An n8n AI workflow that lets users manage grocery inventory through natural-language chat commands. The agent understands stock checks and stock updates, then uses Google Sheets as the inventory database.

## Highlights

- Chat-first inventory assistant built in n8n.
- Uses an AI Agent node with an OpenRouter chat model.
- Reads and updates a Google Sheet through dedicated inventory tools.
- Supports natural commands like "check rice stock" or "update milk to 12".
- Includes a sanitized workflow export ready for import into n8n.
- Documents sheet schema, credentials, setup, testing, and extension ideas.
- Adds automated workflow validation with GitHub Actions.

## Workflow

The workflow export lives at:

```text
workflows/inventory-chat-agent.json
```

It includes:

- public n8n Chat Trigger
- AI Agent
- OpenRouter Chat Model
- Simple Memory
- Google Sheets inventory check tool
- Google Sheets inventory update tool

## Quick Start

1. Import `workflows/inventory-chat-agent.json` into n8n.
2. Create or connect an OpenRouter credential.
3. Create or connect a Google Sheets OAuth credential.
4. Create a Google Sheet with these columns:

```text
Name,Quantity
```

5. Replace the placeholder sheet ID in both Google Sheets nodes.
6. Activate or test the workflow from the Chat Trigger.

See [docs/SETUP.md](docs/SETUP.md) for the full setup guide.

## Example Commands

```text
Hello
Check how many laptops are left
Add 10 phones to stock
Update T-shirts to 25 pieces
Set rice quantity to 40
```

More examples are available in [examples/sample-prompts.md](examples/sample-prompts.md).

## Validation

```bash
node scripts/validate-workflow.js
```

The validator checks that the workflow JSON is valid, required nodes exist, placeholders are used instead of personal credential IDs, docs are present, and the README does not contain corrupted text.

## Important Disclaimer

This project is a portfolio automation template. Before using it in a real business, review access control, credential security, audit logging, error handling, backup strategy, and sheet-level permissions.

## License

This project is licensed under the [MIT License](LICENSE).
