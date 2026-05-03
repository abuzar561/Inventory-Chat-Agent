# Setup Guide

## Prerequisites

- n8n Cloud or a self-hosted n8n instance
- OpenRouter account and API credential in n8n
- Google Sheets OAuth credential in n8n
- Google Sheet with `Name` and `Quantity` columns

## Import the Workflow

1. Open n8n.
2. Select **Import from file**.
3. Choose `workflows/inventory-chat-agent.json`.
4. Open the imported workflow.

## Configure Credentials

Update these nodes after import:

| Node | Credential |
| --- | --- |
| `OpenRouter Chat Model` | OpenRouter credential |
| `Check_Inventory_Tool` | Google Sheets OAuth credential |
| `Update_Inventory_Tool` | Google Sheets OAuth credential |

## Connect the Sheet

Create a sheet with this header row:

```text
Name,Quantity
```

Then replace `REPLACE_WITH_GOOGLE_SHEET_ID` in both Google Sheets tool nodes with your sheet ID.

## Test Commands

Start with simple commands:

```text
Hello
Check rice stock
Update rice to 40
Add 10 bottles of water to stock
```

The agent should respond only to inventory-related messages and should use the Google Sheets tools for stock checks and updates.

## Production Notes

Before using this with real inventory, add:

- role-based access controls
- an audit log for each stock update
- low-stock alert rules
- error handling for missing items
- backups for the source sheet
- clear ownership for manual corrections
