# 3. Reference

## 3.1 Get an access token

```json
//request
{
    "client_id": "6bf3b12b9159f55e3863204ac06f19b7a076cfc9",
    "client_secret": "2dbfedf52da5036bde758189b1d27ebc1858655e",
    "grant_type": "client_credentials",
}

//response
{
 "expires_in": 3600,
 "access_token": "46bc277fc209a1cf129ba020b26b6d33a11de962645423faf9c71b8b1799ce72"
}

```

```shell
$ curl -v -X POST https://uatfx.soopay.net/v1/oauth/authorize \
-H "Content-Type:application/json" \
-d '{
    "client_id": "6bf3b12b9159f55e3863204ac06f19b7a076cfc9",
    "client_secret": "2dbfedf52da5036bde758189b1d27ebc1858655e",
    "grant_type": "client_credentials",
}'

//response
{
 "expires_in": 3600,
 "access_token": "46bc277fc209a1cf129ba020b26b6d33a11de962645423faf9c71b8b1799ce72"
}

```

Make a /oauth/authorize call with your app's OAuth client_id and secret keys for an access token. Set content-type in the request to **application/json**. In the request body, set grant_type to client_credentials. 

### Request

**POST**: /oauth/authorize

Every request must have access_token in the the http request head. This interface returns a access_token of current_user. Each token have an expires_in parameter which means this token only avaliable during this period. But if user apply a new access_token, the old one will be disabled immediately.

Parameters:

Paramter | Description
------- | -------
client_id | The client identifier issued to the merchant. 
client_secret | The secret of client issued to the merchant. 
grant_type | The type of OAuth authentication request. For this scenario, it must be **"client_credentials"** .

### Response

The response is a json format string. It include the access_token and expires_in. 

Response:

Paramter | Description
------- | -------
expires_in | The remaining lifetime of the access token.
access_token | The access_token.

## 3.2 Query available banks

```shell
# Request
curl -v -X GET \
https://uatfx.paysoo.com/rest/v1/bank?type=CREDIT_CARD
```

```json
//Response
{
  "meta": {
    "ret_code": "0000",
    "ret_msg": "SUCCESS",
    "sign": "Megf8eerjlskdjfalkkuiUUIH"
  },
  "banks": [
    {
      "name": "Industrial and Commercial Bank of China",
      "code": "ICBC",
      "type": [
        "CREDIT_CARD",
        "DEBIT_CARD"
      ]
    },
    {
      "name": "China Merchants Bank",
      "code": "CMB",
      "type": [
        "CREDIT_CARD"
      ]
    }
  ]
}
```

### Request

**GET**: /bank?type=CREDIT_CARD

Each merchant can only accept bank cards that was included in the contract.

This API will return the banks list that are avaliable for current merchant of the indicate type.

### Parameters

Parameter | Description
----------|------------
type | The type of bank cards. Allowed values: **CREDIT_CARD**, **DEBIT_CARD**

### Response

The response is a list of [bank](#bank) object. See the example on the right.

Parameter | Description
------- | -------
name | The full name of the bank.
code | The bank code inside China.
type | The supported card type of the bank.


## 3.3 Create a payment

**POST**: /payments/payment

Creates a payment to be captured later.

To create a sale, authorization, or order, include the payment details in the JSON request body. Set the intent to sale, authorize, or order. Include payer, transaction details, and, for PayPal payments only, redirect URLs. The combination of the payment_method and funding_instrument determines the type of payment that is created.


## execute a payment


## query a payment



## refund



## query refund


## Create cumtoms clearance



## Query customs clearance status




