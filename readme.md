# Crediflow Interview

## Run python backend server

```
pip install -r requirements.py
python main.py
```

Verify the API's returning sample data http://localhost:8000/quickbooks/profit-and-loss

The returned data is a sample dump of quickbooks report (profit & loss), you can read about the schema in the [documentation](https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/profitandloss). Check [profit&loss](./assets/Sandbox%20Us%201%20ProfitandLoss.pdf) for the complete representation of data.


Build a simple frontend app in react to show the consumed report data in the following table format.

- Feel free to update the backend server (if required)

![profit-and-loss-sample](./assets/profit-and-loss-sample-table.png)