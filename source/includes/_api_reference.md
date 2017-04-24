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

Make an oauth authorize call with your app's OAuth client_id and client_secret keys for an access token. Set content-type in the request to **application/json**. In the request body, set grant_type to client_credentials.

### Request

**POST**: /oauth/authorize

Every request must have access_token in the http request header. This interface returns a access_token of current_user. Each token has an expires_in parameter which means this token only available during this period. But if user applies a new access_token, the old one will be disabled immediately.

Parameters:

Parameter | Description
------- | -------
client_id | The client identifier issued to the merchant. 
client_secret | The secret of client issued to the merchant. 
grant_type | The type of OAuth authentication request. For this scenario, it must be **"client_credentials"** .

### Response

The response is a json format string. It include the access_token and expires_in. 

Response:

Parameter | Description
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

This API will return the list of banks that are available for current merchant of the indicated type.

### Parameters

Parameter | Description
----------|------------
type | ENUM. The type of bank cards. Allowed values: **CREDIT_CARD**, **DEBIT_CARD**

### Response

The response is a list of [bank](#bank) objects. See the example on the right.

Parameter | Description
------- | -------
name | The full name of the bank.
code | The bank code inside China.
type | The supported card type of the bank. **CREDIT_CARD**, **DEBIT_CARD**


## 3.3 Create a payment

```json
{
  "payer": {
    "payment_method": "CREDIT_CARD",
    "bank_code": "CCB",
    "payer_info": {
      "bankCard": {
        "phone": "15210838198"
      }
    }
  },
  "order": {
    "mer_reference_id": "20170411543977",
    "mer_date": "20170410",
    "amount": {
      "total": "100.02",
      "currency": "USD"
    },
    "order_summary": "maimaimai",
    "expire_time ": "360",
    "sub_orders": [
      {
        "mer_sub_reference_id": "04115439771",
        "amount": {
          "total": "50.02",
          "currency": "USD"
        },
        "trans_code": "01121990",
        "sub_trans_type": "1",
        "is_customs": "TRUE",
        "items": [
          {
            "mer_item_id": "041154397711",
            "type": "FOOD",
            "name": "yifu1",
            "description": "yifu1",
            "item_quantity": "2",
            "amount": {
              "total": "30.02",
              "currency": "USD"
            }
          },
          {
            "mer_item_id": "041154397712",
            "type": "ELECTRONIC",
            "name": "yifu2",
            "description": "yifu2",
            "item_quantity": "3",
            "amount": {
              "total": "20.00",
              "currency": "USD"
            }
          }
        ]
      },
      {
        "mer_sub_reference_id": "04115439772",
        "amount": {
          "total": "50.00",
          "currency": "USD"
        },
        "trans_code": "03223010",
        "sub_trans_type": "3"
      }
    ]
  },
  "notify_url": "http://10.10.81.127:8080/spay_rest/payments/test/mer",
  "risk_info": {
    "trans_type": "02",
    "goods_type": "1",
    "real_name": "0",
    "business_type": "Y"
  }
}
```

```shell
$ curl -v -X POST https://uatfx.soopay.net/v1/oauth/authorize \
-H "Content-Type:application/json" \
-H "Authorization=Bearer ea3b83b316d97bd78166475fe36a3f7219d79e8d04bfc784dec424fba0e9462f" \
-H "Signature=p+owOiuS9eVrDQIHaP9CwwR89k99+6MdALuetVW9SKpBJvbvQdO8Sx8P1wlgIN9naa9YQeha/oiVhTFh57dtEpE92HU4jsYXZ2aj8puIP6IXbyDG18vr7Qs1sCfdtT7ziXrv31BIIahn6HKZLtVf/fus2NIyO7f2zl+b34In4dM="
-d '{
  "payer": {
    "payment_method": "CREDIT_CARD",
    "bank_code": "CCB",
    "payer_info": {
      "bankCard": {
        "phone": "15210838198"
      }
    }
  },
  "order": {
    "mer_reference_id": "20170411543977",
    "mer_date": "20170410",
    "amount": {
      "total": "100.02",
      "currency": "USD"
    },
    "order_summary": "maimaimai",
    "expire_time ": "360",
    "sub_orders": [
      {
        "mer_sub_reference_id": "04115439771",
        "amount": {
          "total": "50.02",
          "currency": "USD"
        },
        "trans_code": "01121990",
        "sub_trans_type": "1",
        "is_customs": "TRUE",
        "items": [
          {
            "mer_item_id": "041154397711",
            "type": "FOOD",
            "name": "yifu1",
            "description": "yifu1",
            "item_quantity": "2",
            "amount": {
              "total": "30.02",
              "currency": "USD"
            }
          },
          {
            "mer_item_id": "041154397712",
            "type": "ELECTRONIC",
            "name": "yifu2",
            "description": "yifu2",
            "item_quantity": "3",
            "amount": {
              "total": "20.00",
              "currency": "USD"
            }
          }
        ]
      },
      {
        "mer_sub_reference_id": "04115439772",
        "amount": {
          "total": "50.00",
          "currency": "USD"
        },
        "trans_code": "03223010",
        "sub_trans_type": "3"
      }
    ]
  },
  "notify_url": "http://10.10.81.127:8080/spay_rest/payments/test/mer",
  "risk_info": {
    "trans_type": "02",
    "goods_type": "1",
    "real_name": "0",
    "business_type": "Y"
  }
}'

```


**POST**: /payments/payment

Creates a payment to execute later or execute right now, it depends on the payment type.

The following table shows the payment types that UMF supports, all payments must be paid in RMB(Chinese Yuan):

Payment Type | Description
------- | -------
Credit Card | Pay by credit card
Debit Card | Pay by debit card
WeChat QRCode | UMF return a QR-Code String. The customer may use their WeChat scan the QR-Code to pay.
WeChat Offical Account | The customer may pay for the order inside the WeChat browser.
WeChat APP | The customer may pay for the order inside a native app.
AliPay QRCode | UMF returns a QR-Code String. The customer may use their WeChat to scan the QR-Code to pay.
Protocol ID | This ID presents the payment information. The merchant can use this ID to pay for the order. Payment information includes card_no, user name, phone, cvv2, etc. Same card in different merchant has different protocol ID.

Parameters:

Parameters | Description
------- | -------
payer | Object. The payment information. 
order | Object. The order information. Includes sub orders.
notify_url | String. Url of the merchant server. To receive the payment result.

Response:

Parameters | Description
------- | -------
payer | Object. The payment information. 
order | Object. The order information. Includes sub orders.
notify_url | String. Url of the merchant server. To receive the payment result.
links | Object Array. The next step links. Depends on the status and payment type. Those links are HATEOAS links.

## 3.4 SMS verification

``` json
Request:
{
  "payer": {
    "payer_info": {
      "bankCard": {
        "number": "TRP7vS5yHoMa3V1vWIn4fJlZTPVGmuxWRyoGqQIrAyqJVfYk03sEwVwktg1IyQjHqexQt71Qv1hCszQqKR68YKShomMg9cHcTu3f3hYWebDPCE6QmW+++br6B/Dcprzz9KI+CDHSdIEP6uR7z0bTFeaC+pZS3L/DuqDG/C4Swp8=",
        "citizen_id_number": "qXhTKG5nkeEC10GHiPiV3iqkMHawRpWXQ0ln3b+RxfRQKBeea+Ex9XiPSrxF/VORuMHA2xOFI4dFDVRZnlihNkbCNlmK14RkP4GjPyLqvowLtGFc9VxHs16aDUnNf35G2GK8D8+V2xNSRqItsjpaHDU+KPfcHTp/juBxv5Zwb4Y=",
        "citizen_id_type": "1",
        "payer_name": "lb3812wHxk6tC8H3/7Un5HubqhDv76D7JGne/DwDVoJjqSe+lW+A7TrhJGzL+M87dfz0BM1gf37kLDKPyY0yVUY26z7pBB8/sruygg78mBp8rm2m5XSn2k5h8OzIzjjms7XoVeRifVy+8eR4HjOQJZ5Pyo21WAhYWVx0G4OAdTc=",
        "phone": "15012345678",
        "valid_date": "BcF2VPrCmMZoZo1ui4MRPgh1/OPFsNl7rgZCCMvG7wYbKV7vk5bNtreGlz84+0Fzs2osasev6e82CNvIuLTNGI57glEWkX4JG0rpuHh3+IOW8CgsCaPfhDWErtZW2QQKfNlWn0dE+B/Ail700Psxndzo+FIT5S+s/DDssPGY3uY=",
        "cvv2": "OoClPlildcQa0C6OVNRM/XjJ7LFJyiNBhR9bFzMxQ9VtwJyH6S+KRvYDKCScO2joNdBGGd3fcjv+uv7c56CQYTwRoiHe9NwCrZph+QB0NZtR85XHegUEebvszSJPqzuwLoGmOxCu5XEbVovMAOE0mkXDNIDQ6lT86kZhlwoWJ7A=",
        "mer_cust_id": ""
      },
      "payerAgreement": {
        "agreement_id": "",
        "busi_agreement_id": ""
      }
    }
  }
}

```

```json
Response:

{
  "meta": {
    "sign": "pyuLSLDsZJPkOTl55l6zIplOil2uRIkeWv0RGzHQQl7Sov96oGvFsolUmuMLbEYRbhp9CedIi+liuFPeFzb9ycafWE59hp792yK3E8dbrjEvmYout5denFGWEOeCKUeKj1pE96FF0MCjrdkdKf6Zlh+LmhLI9as6PV7P+e4IDL0=",
    "ret_msg": "Success",
    "ret_code": "0000"
  },
  "links": [
    {
      "ref": "self",
      "method": "POST",
      "href": "http://10.10.77.79:8081/V1/spay_rest/payments/payment/PAY_AAGSRXVMGCDZOAJTY2VD2/query?mer_reference_id=20170411543977&mer_date=20170410"
    },
    {
      "ref": "confirm",
      "method": "POST",
      "href": "http://10.10.77.79:8081/V1/spay_rest/payments/payment/PAY_AAGSRXVMGCDZOAJTY2VD2/execute"
    }
  ]
}
```

```shell
$ curl -v -X POST https://uatfx.soopay.net/v1/oauth/authorize \
-H "Content-Type:application/json" \
-H "Authorization=Bearer ea3b83b316d97bd78166475fe36a3f7219d79e8d04bfc784dec424fba0e9462f" \
-H  "Signature=qJIC9lz/1TIjEe5rw2Wj8YfvBX3RHyICWNCRmusOu4EeCBcDYNJlWgZCo2/1V1FnZg2alfwSlIAzHetqsEIdDfqy2tlxJriBr7VIIjM3/e9n7TOKGoiHDPuC2/U82xlQUFi8ua/3kv0o7eTVbKLDr1LacEFWFWWy3RpXFFa57SA=" \
-d '{
  "payer": {
    "payer_info": {
      "bankCard": {
        "number": "TRP7vS5yHoMa3V1vWIn4fJlZTPVGmuxWRyoGqQIrAyqJVfYk03sEwVwktg1IyQjHqexQt71Qv1hCszQqKR68YKShomMg9cHcTu3f3hYWebDPCE6QmW+++br6B/Dcprzz9KI+CDHSdIEP6uR7z0bTFeaC+pZS3L/DuqDG/C4Swp8=",
        "citizen_id_number": "qXhTKG5nkeEC10GHiPiV3iqkMHawRpWXQ0ln3b+RxfRQKBeea+Ex9XiPSrxF/VORuMHA2xOFI4dFDVRZnlihNkbCNlmK14RkP4GjPyLqvowLtGFc9VxHs16aDUnNf35G2GK8D8+V2xNSRqItsjpaHDU+KPfcHTp/juBxv5Zwb4Y=",
        "citizen_id_type": "1",
        "payer_name": "lb3812wHxk6tC8H3/7Un5HubqhDv76D7JGne/DwDVoJjqSe+lW+A7TrhJGzL+M87dfz0BM1gf37kLDKPyY0yVUY26z7pBB8/sruygg78mBp8rm2m5XSn2k5h8OzIzjjms7XoVeRifVy+8eR4HjOQJZ5Pyo21WAhYWVx0G4OAdTc=",
        "phone": "15012345678",
        "valid_date": "BcF2VPrCmMZoZo1ui4MRPgh1/OPFsNl7rgZCCMvG7wYbKV7vk5bNtreGlz84+0Fzs2osasev6e82CNvIuLTNGI57glEWkX4JG0rpuHh3+IOW8CgsCaPfhDWErtZW2QQKfNlWn0dE+B/Ail700Psxndzo+FIT5S+s/DDssPGY3uY=",
        "cvv2": "OoClPlildcQa0C6OVNRM/XjJ7LFJyiNBhR9bFzMxQ9VtwJyH6S+KRvYDKCScO2joNdBGGd3fcjv+uv7c56CQYTwRoiHe9NwCrZph+QB0NZtR85XHegUEebvszSJPqzuwLoGmOxCu5XEbVovMAOE0mkXDNIDQ6lT86kZhlwoWJ7A=",
        "mer_cust_id": ""
      },
      "payerAgreement": {
        "agreement_id": "",
        "busi_agreement_id": ""
      }
    }
  }
}'

```

This step is only available for card payment. Merchant sends the card information, and UMF(or the bank) will send SMS to customer's phone. This SMS is part of the parameters of executing the payment.

### Request

**POST**:/payments/payment/payment_id/verify

The payment_id in the url is the real payment id that was created in the previous step([Create a payment](#Create_a_payment)).

### Parameters

Parameter | Description
----------|------------
[payer](#payer) | Object. The payer information. Some parameters should be encrypted by UMF public key. See the description of payer object.

### Response

The response just includes the links of next steps. See the example.
If the request is vaild, the sms will be sent to customer's phone. 

Parameter | Description
------- | -------
[meta](#meta) | object. The common information of response.
[links](#link) | object array. The links of next steps.

Error Codes:

Return code  | Description of return code 
-------------|----------------------------
00060700 | Failed to verify parameter
00200025 | Information of the card is incorrect. 
00200026 | The card has expired. 
00060999 | The system is busy. 
00080706 | Acquire verification codes too many times within one minute. 
00060875 | Failed to validate the card bin (validation failure due to incorrect card number) 
00080707 | The number of verification code requests for the order exceeds the maximum.
00200027 | The bank is not linked with the merchant on UMF's platform.
00060869 | Merchant goods are not registered on UMF platform.

## 3.5 Execute a payment

When executing a payment, the transaction completes and transfers money from the customer's account into merchant account with UMF.

To execute a payment, include the payment ID in the URI and include a payer object in the JSON body. 

The result of executing will not returned immediately. The merchant has two ways to get the result.

-- Make a query of payment. If the payment state is "TRADE_SUCCESS", then the payment was successful.
-- Wait for the notification from UMF. Merchant needs to write a http(s) service. UMF will call this service when the payment has a result.

### Request

**POST**:/payments/payment/payment_id/execute

The payment_id in the url is the real payment ID that was created in the previous step([Create a payment](#Create_a_payment)).

### Parameters

Parameter | Description
----------|------------
[payer](#payer) | Object. The payer information. Some parameters should be encrypted by UMF public key. See the description of payer object. If the pay_type is credit card or debit card, the verification code should be included in the payer object.

### Response

The response includes the payment object. But the bank card info will not be returned, such as card number, cvv2, citizen_id, etc.

Parameter | Description
------- | -------
[meta](#meta) | object. The common information of response.
[payment](#payment) | object. The payment object.


## 3.6 Payment result notification

After processing the payment request data of the merchant, UMF will call merchant's service with the payment result.

Merchant should give a response after receiving the call.

### Request

UMF calls this service which is provided by merchant. The url of service is a merchant service url.

Parameter | Description
------- | -------
payment | Object. The payment object.

### Response

The response is sent from merchant to UMF.

Parameter | Description
------- | -------
order_id | Merchant unique order number 
mer_date | Merchant order date 
ret_code | Return code 
ret_msg | Return message 
mer_check_date | Merchant reconciliation date 
mer_trace | Merchant processing statement 


## 3.7 Query a payment

**GET**: payments/payment/payment_id

The payment_id in the url is the real payment id that was created in the previous step([Create a payment](#Create_a_payment)).

Merchant may call this url anytime. UMF will return the payment object.

## 3.8 Create a refund

**POST**:/payments/payment/payment_id/refund

The payment_id in the url is the real payment ID that was created in the previous step([Create a payment](#Create_a_payment)).

This request creates a refund object. The request sends a refund object, and the response is the refund object that UMF created.

UMF supports full or partial refund. Partial refund can be made multiple times.

The refund must be the same currency as the payment and the refund amount must be no more than the total payment amount.

### Parameters

Parameter | Description
----------|------------
[refund](#refund) | Object. The refund object. The order, amount and nofify_url should be entered.

### Response

The response includes the refund object. The returned refund object has refund_id and state.

Parameter | Description
------- | -------
[meta](#meta) | object. The common information of response.
[refund](#refund) | object. The refund object.

## 3.9 Query refund

**GET**: /payments/refund/refund_id

The refund_id in the url is the real payment ID that was created in the previous step([create a refund](#create_a_refund)).

Merchant may call this url anytime. UMF will return the refund object. If the state is "REFUND_SUCCESS", the refund is successful.

## 3.10 Create customs clearance

**POST**: /payments/payment/payment_id/apply_to_customs

This interface is optional. When merchant needs UMF to commit the payment information to customs, this interface will be called. As soon as the merchant calls this url, the payment information will be sent to the customs system.

The merchant provides the sub-order declaration data to the platform within one month after placing an order, and the platform updates the sub-order declaration data to customs system after receiving it. 

### Request

The request includes a [customs_declaration](#customs_declaration) object. 

### Response

The response will include a customs_declaration object and meta information.

## 3.11 Query customs clearance status

**GET**: payments/customs_ declarations/customs_declaration_id

The customs_ declaration_id in the url is the ID of customs_declaration object which was created in the previous step([Create customs clearance](#Create_customs_clearance)).

## 3.12 Download transaction list

TODO

## 3.13 Download reconciliation statement

TODO


## 3.14 Query exchange rate

**GET**: /exchange_rate?currency=USD

Get the real-time exchange rate. The returned information is the corresponding amount of RMB.

### Request

The parameter is currency which is [currency code](#Currency_codes).

### Response

The response will include a [exchange_rate](#exchange_rate) object and meta information.

## 3.15 Notification

This interface is a common interface. The response of execute payment, create refund and create customs_declaration requests will not include the results. The results will be sent by UMF when complete, so the merchant should provide a service to receive the notifications, and give the right response. Or merchant may query those objects to get the results.

### Request

The request is sent from UMF server to merchant server. The request url is the notify_url in each object.

The request content is JSON object. The object maybe a payment object, or a refund object, or a customs_declaration object.

### Response

The response will include a meta information and the object that merchant received. The object does not need to set all values. UMF only needs the object id.

