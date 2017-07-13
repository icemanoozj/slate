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
curl -v https://uatfx.soopay.net/cberest/v1/payments/payment \
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
                "mer_item_id": "2343464535",
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
Sandbox - China | Test. For servers in China. Use your test client_id and client_secret to generate an access token to make calls to the Sandbox URIs. | https://uat.soopay.net/cberest/v1/
Live - China | Production. For servers in China. Use your live client_id and client_secret to generate an access token to make calls to the Sandbox URIs. | https://pay.soopay.com/cberest/v1/
Sandbox - American | Test. For servers in North America. Use your test client_id and client_secret to generate an access token to make calls to the live URIs. | https://uatfx.soopay.net/cberest/v1/
Live - American | Production. For servers in North America. Use your live client_id and client_secret to generate an access token to make calls to the live URIs. | https://fx.soopay.net/cberest/v1/


To construct a REST call, combine:

- The HTTP method
- The full URI of the resource
- HTTP headers
- The JSON-formatted payload, if required

The Example is listed on the right.

<aside class="notice">
Note: You can use cURL commands on the command line to try. If your system does not has cURL command, please download and install it. . Include your own access token and payment-specific IDs for calls.
</aside>
[Here is a link of cURL](https://curl.haxx.se/download.html)

Merchant will get the following information after becaming the partner of UMF.

Type | Description
------- | -------
Merchant rsa private key | For signing the request to UMFinTech
Merchant rsa public key | Key pair of Merchant rsa private key
UMFinTech public key | For encrypting the sensitive information
Merchant client id | For OAuth2 authentication
Merchant client secret | For OAuth2 authentication


## 1.2 Authentication

The UMFinTech system supports OAuth2. It uses [Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4) to generate access token. Each merchant has a client_id and a client_secret. Merchant use client_id and client_secret to get the access Token. Each request must be made over HTTPS  with access token in the http header.

<aside class="notify">
 Remember: DO NOT share your merchant ID, secret key, or bearer token with unauthorized individuals or applications; they are unique to each merchant and contain private information. Please ensure only properly authorized individuals have access to this information within your organization.
</aside>

If you believe either your merchant ID, secret key, or bearer token have been compromised, please regenerate your secret key in the TMS. Once you have a new secret key, a bearer token will be automatically regenerated. Please allow 15 minutes for the new bearer token to propagate through the system.

## 1.3 HTTP Request

UMF system supports GET and POST requests.

- GET: Inquiry an object or a list of objects.
- POST：Create or update an object. 

### HTTP head

To make a REST API call, you must include request headers including the Authorization header with an OAuth 2.0 access token.

http get header example:

`Content-Type:application/json`

`Authorization:Bearer ea3b83b316d97bd78166475fe36a3f7219d79e8d04bfc784dec424fba0e9462f`

If the request is a POST request, the request headers must include the following information:

- Signature:[SignatureOfPostBody](#1-6-signature-and-verify-signature)

http post header example:

`Content-Type:application/json` 

`Authorization:Bearer ea3b83b316d97bd78166475fe36a3f7219d79e8d04bfc784dec424fba0e9462f`

`Signature:p+owOiuS9eVrDQIHaP9CwwR89k99+6MdALuetVW9SKpBJvbvQdO8Sx8P1wlgIN9naa9YQeha/oiVhTFh57dtEpE92HU4jsYXZ2aj8puIP6IXbyDG18vr7Qs1sCfdtT7ziXrv31BIIahn6HKZLtVf/fus2NIyO7f2zl+b34In4dM=`

## 1.4 HTTP response

All http responses always are json format string with two parts.

- **meta**：The common information of each response. Includes response message, sign, error code, etc.

- **result**: The entity object(s). The name of "result" is not always "result", it changes by the entity type and the quantity of objects. For example: If the returned object is a payment object, then the name of result definitely is a "payment" object, and the content is a json object of payment. If the returned objects may be multiple payment objects, then the name of result is "payments", and the content is a json array of payment.

### HTTP status code summary

Status code | Description
------------|------------
200 - OK | Everything worked as expected.
400 - Bad Request | The request was unacceptable, often due to missing a required parameter.
401 - Unauthorized | No valid API key provided.
402 - Request Failed | The parameters were valid but the request failed.
404 - Not Found | The requested resource doesn't exist.
409 - Conflict | The request conflicts with another request (perhaps due to using the same idempotent key).
429 - Too Many Requests | Too many requests hit the API too quickly. We recommend an exponential backoff of your requests.
500, 502, 503, 504 - Server Errors | Something went wrong on UMF's end. (These are rare.)

## 1.6 Signature and Verify Signature

Both private key and public key are necessary for DSA or RSA signature. Both private key and public key are generated with OPENSSL by UMF. UMF will send the SSL key pair to merchant. Therefore, merchant uses UMF public key and merchant private key.

### Sign for request

All POST requests should have a http head of 'Signature'. The content of POST should be a JSON string. The merchant private key and the JSON string are used in the RSA signature algorithm by the RSA signature function to get the result string. (the value is given to http header "Signature").

For Example:

`Signature:AWD234SDKEBuYviyhggoopDOUEFLKDSJFI7655DFDFOIUOIulkjj`

Sign algorighm:

*Translate JSON String to bytes using UTF8 encoding.
*Using SHA256 algorithm to get the hashed bytes of UTF8 encoded bytes.
*Using merchant RSA private key to encryte the hash bytes.
*Translate hashed bytes to String by base64 encoding.

The last step is the signature of request.

### Signature Verification for response

The response of request was signed for security by UMF. The merchant should check the signature after receiving the response.

The response is a JSON string, it has two parts. The first one is "meta". Signature are included in the "meta" object. The another is a [result object(s)](#1-4-http-response). The signature is signed based on those objects.

Checking steps:

*Translate result JSON String to bytes using UTF8 encoding.
*Using SHA256 algorithm to get the hashed bytes of UTF8 encoded bytes.(bytes array of content hashing)
*Using base64 decoding the signature String to bytes.
*Using UMF RSA public key to decrypt the bytes.(bytes array of signature)
*Checking if the two bytes array are the same. If they are equal, then the signature is a valid one, otherwise the response maybe modified or intercepted during the transmission.

## 1.7 Encrypt all sensitive information

All sensitive information should be encrypted in the http request. The sensitive information includes:

- card number
- card holder's name
- cvv2
- expiration date (only available for credit card)
- citizen ID number (For Chinese users only)
- phone number

### Encryption algorithm

String -> Bytes(UTF-8 decode) -> Bytes(RSA encrypt by UMFinTech public key) -> String(Base64 encode)

## 1.8 Date and time format

All Date and DateTime in UMF system are formatted by [ISO8601](https://en.wikipedia.org/wiki/ISO_8601).

### DateTime format

**YYYY-MM-DDThh:mm:ssTZD**

For example:
`2016-07-16T19:20:30+01:00`

### Date format

**YYYYMMDD**

For example: `20160716`


