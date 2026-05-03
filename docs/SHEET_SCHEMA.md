# Sheet Schema

The default workflow uses a single Google Sheet tab named `Sheet1`.

## Required Columns

| Column | Required | Description |
| --- | --- | --- |
| `Name` | Yes | Item name, used to match updates. |
| `Quantity` | Yes | Current stock quantity. |

## Example

| Name | Quantity |
| --- | ---: |
| Rice | 40 |
| Milk | 12 |
| T-shirts | 25 |
| Laptops | 8 |

## Notes

- Keep item names consistent, for example `T-shirts` instead of alternating between `shirts`, `tshirts`, and `T-shirts`.
- Use a dedicated test sheet before connecting real inventory data.
- Add protected ranges if multiple people can edit the sheet.
