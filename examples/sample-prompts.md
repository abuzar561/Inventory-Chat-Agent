# Sample Prompts

## Greeting

```text
Hello
```

Expected behavior: the agent replies with the fixed greeting and does not call tools.

## Stock Checks

```text
Check rice stock
How many laptops are left?
Do we still have milk?
```

Expected behavior: the agent uses `Check_Inventory_Tool`.

## Stock Updates

```text
Update rice to 40
Set T-shirts quantity to 25
Add 10 phones to stock
```

Expected behavior: the agent uses `Update_Inventory_Tool`.

## Out-of-Scope Messages

```text
Write me a poem
What is the weather?
```

Expected behavior: the agent replies with the fixed out-of-scope message.
