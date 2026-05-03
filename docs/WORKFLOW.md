# Workflow Reference

## Node Overview

| Node | Purpose |
| --- | --- |
| `When chat message received` | Public n8n chat trigger for user messages. |
| `AI Agent` | Routes user intent and decides when to use tools. |
| `OpenRouter Chat Model` | Supplies the language model for the agent. |
| `Simple Memory` | Stores short chat context per session. |
| `Check_Inventory_Tool` | Reads inventory records from Google Sheets. |
| `Update_Inventory_Tool` | Appends or updates rows in Google Sheets by item name. |

## Agent Rules

The system prompt is intentionally strict:

- greeting-only messages receive a fixed greeting response
- non-inventory messages are rejected
- inventory checks must use `Check_Inventory_Tool`
- inventory updates must use `Update_Inventory_Tool`
- the agent should not invent stock data

## Data Model

The workflow expects a Google Sheet with:

| Column | Type | Notes |
| --- | --- | --- |
| `Name` | text | Item name. Used as the matching key. |
| `Quantity` | text or number | Current stock quantity. |

## Extension Ideas

- Add low-stock alerts with a scheduled trigger.
- Add Telegram, WhatsApp, or email frontends.
- Add a transaction log sheet for every stock update.
- Add a separate supplier reorder workflow.
- Add item categories and locations for warehouse-style inventory.
