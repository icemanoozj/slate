# 1. Overview

The UMF REST API uses HTTP methods and a RESTful endpoint structure. The API authorization framework is OAuth 2.0. Merchant format requests in JSON and the APIs return JSON-formatted responses.

<aside class="notice">
Important: You cannot run the sample requests in this guide as-is. Replace call-specific parameters, such as tokens and IDs, with your own values.
</aside>

## 1.1. API operations

```json
{
    "payer": {
        "payment_method": "CREDIT_CARD",
        "bank_code": "ICBC",
    },
    "order": {
        "amount":{
            "total": "1000.00",
            "Currency": "USD"
        },
        "order_summary ": "Macbook pro 13’ A3245",
        "mer_reference_id ": "17tgs17g7987SD89SYDA8127GD",
        "mer_date ": "20170216",
        "expire_time ": "2017-02-17T19:20:30-08:00",
        "sub_orders": [
            {
             "amount":{
                "total": "1000.00",
                "currency": "USD"
                },
            "order_summary": " Macbook pro",
            "trans_code": "01121990",
            "is_customs": “TRUE”,
            "items": [
                {
                " mer_item_id ": "2343464535",
                "type": " ELECTRONIC",
                "name ": " Macbook Pro",
                "description ": " Macbook pro 13’ A3245",
                "amount":{
                    "total": "1000.00",
                    "currency": "USD"
                    }
                }
                ]
            }
        ]
    },
    "notify_url": "https://www.example.com/notify_url"
}
```

```shell
# With shell, you can just pass the correct header with each request
curl -v https://api.sandbox.paypal.com/v1/payments/payment \
-H "Content-Type:application/json" \
-H "Authorization: Bearer Access-Token" \
-d '{
    "payer": {
        "payment_method": "CREDIT_CARD",
        "bank_code": "ICBC",
    },
    "order": {
        "amount":{
            "total": "1000.00",
            "Currency": "USD"
        },
        "order_summary ": "Macbook pro 13’ A3245",
        "mer_reference_id ": "17tgs17g7987SD89SYDA8127GD",
        "mer_date ": "20170216",
        "expire_time ": "2017-02-17T19:20:30-08:00",
        "sub_orders": [
            {
             "amount":{
                "total": "1000.00",
                "currency": "USD"
                },
            "order_summary": " Macbook pro",
            "trans_code": "01121990",
            "is_customs": “TRUE”,
            "items": [
                {
                " mer_item_id ": "2343464535",
                "type": " ELECTRONIC",
                "name ": " Macbook Pro",
                "description ": " Macbook pro 13’ A3245",
                "amount":{
                    "total": "1000.00",
                    "currency": "USD"
                    }
                }
                ]
            }
        ]
    },
    "notify_url": "https://www.example.com/notify_url"
}'
```

```java
String abc = new String();
```

```php
<?php 
$x = "Hello world!";
$y = 'Hello world!';

echo $x;
echo "<br>";
echo $y;
?>
```

```csharp
public class Hello1
{
   public static void Main()
   {
      System.Console.WriteLine("Hello, World!");
   }
}
```

Use the UMF REST APIs in these environments:

Environment | Description | Endpoint
------------|-------------|---------
Sandbox - China | Test. For the servers in China. Use your test client_id and client_secret to generate an access token to make calls to the Sandbox URIs. | https://uat.soopay.net 
Live - China | Production. For the servers in China. Use your live client_id and client_secret to generate an access token to make calls to the Sandbox URIs. | https://pay.soopay.com
Sandbox - American | Test. For the servers in American. Use your test client_id and client_secret to generate an access token to make calls to the live URIs. | https://uatfx.soopay.net
Live - American | Production. For the servers in American. Use your live client_id and client_secret to generate an access token to make calls to the live URIs. | https://payfx.soopay.net


To construct a REST call, combine:

- The HTTP method
- The full URI to the resource
- HTTP headers, if required
- The JSON-formatted payload, if required

The Example is listed on the right.

<aside class="notice">
Note: You can use cURL commands on the command line to try code. If needed, download cURL software. Include your own access token and payment-specific IDs for calls.
</aside>

Merchant will get the following information after becaming the partener of 

------- | -------
Merchant rsa private key | For signing the request to UMFinTech
Merchant rsa public key | key pair of Merchant rsa private key
UMFinTech public key | For encrypting the sensitvie information.
Merchant client id | For OAuth2 authentication
Merchant client secret | For OAuth2 authentication


## 1.2 Authentication

The UMFinTech system support OAuth2. It use [Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4) to generate access token. Each merchant has a client_id and a client_secret. Merchant use client_id and client_secret to get the access Token. Each request must be made over HTTPS and add access token in the http header.

<aside class="notify">
 Remember: DO NOT share your merchant ID, secret key, or bearer token with unauthorized individuals or applications; they are unique to each merchant and contain private information. Please ensure only properly authorized individuals have access to this information within your organization.
</aside>

If you believe either your merchant ID, secret key, or bearer token have been compromised, please regenerate your secret key in the TMS. Once you have a new secret key, a bearer token will be automatically regenerated. Please allow 15 minutes for the new bearer token to propagate through the system.

## 1.3 HTTP Request

UMFinTech system support GET and POST request. 

- GET: Inquiry an object or a list of objects.
- POST：Create or update an object. 

### HTTP head

To make a REST API call, you must include request headers including the Authorization header with an OAuth 2.0 access token.

If the request is a post request, the request headers must include the following information:

- Content-Type: application/json
- Signature:[SignatureOfPostBody](#1-6-signature-and-verify-signature) 


## 1.4 HTTP response

All the http response always is a json string. There are two parts information.
HTTP  Response中一般包括以下几部分内容：
meta：表示响应的基本信息，包括返回码，返回信息，分页信息，签名。
result: 表示响应的相关业务实体，result并不是固定的名称，具体的名称根据返回的实体类型而定。例如：当返回的是一个payment信息时，该字段名称为payment, 类型为对象“{}”；当返回的是一组payment信息时，该字段的名称是payments，类型为数组“ []”。

### HTTP response code

Status code | Description
------------|------------
200 | Request OK
201 | Resource created
400 | Validation error
401 | Unauthorized request
402 | Failed request
403 | Forbidden
404 | Resource was not found
50n | UMPay server error


## 1.6 Signature and Verify Signature

Both private key and public key are necessary for DSA or RSA signature. Both private key and public key are generated with OPENSSL by UMFinTech. UMFinTech will send the SSL key pair to partner. Therefore, partner uses Alipay public key and partner private key.

### Sign for request
All the post request should have a http head of 'Signature'. The content of post should be a JSON string. The partner private key and the JSON string are used in the RSA signature algorithm by the RSA signature function to get the result string. (the value is given to http header "Signature").

For Example:

`Signature:AWD234SDKEBuYviyhggoopDOUEFLKDSJFI7655DFDFOIUOIulkjj`

### Signature Verification for response
After receiving the response JSON string during responding from UMFinTech system, the result  and the parameter “sign” are used in the RSA or DSA signature asymmetric algorithm by the RSA or DSA signature function to accomplish the signature verification.

Due to the Chinese
Sign when request 
When the character string to be signed at request is obtained, convert the character string to bytes in GBK encoding. 2.RSA encrypt the bytes with UMPay public key. 3.Use BASE64 encode bytes to string.

Signature verification
When the character string to be signed and notified to return is obtained, input the character string to be signed, public key provided by the platform, and the sign value in the return parameter noticed by the platform into the RSA function signature for asymmetric signature calculation, to determine whether the signature is verified. 

## 1.7 Encript of sensitive information

All the sensitive information should be encrypt in the http request. The sensitive information includes:

- bank card number
- card holder's name
- cvv2
- expire (only avaliable for credit card)
- citizen ID number (Chinese only)
- phone number

### Encrypt algorithm

String -> Bytes(UTF-8 decode) -> Bytes(RSA encrypt by UMFinTech public key) -> String(Base64 encode)

## 1.8 Date and time format

All the Date and DateTime in UMFinTech system are formated by [ISO8601](https://en.wikipedia.org/wiki/ISO_8601).

### DateTime format

**YYYY-MM-DDThh:mm:ssTZD**

For example:
`2016-07-16T19:20:30+01:00`

### Date format

**YYYYMMDD**

For example: `20160716`


