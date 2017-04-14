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

4.2.	OAuth获取Token接口
POST: /oauth/authorize
此接口用于获取Access Token。除了本接口外，所有其它请求必须在http head中带有access token. 格式如下：
Authorization: Bearer <Access-Token> 
例如：
	Authorization: Bearer WE34dsrwefEerwDSF 
4.2.1.	Request
Request 的类型为POST, 参数为grant_type, client_id, client_secret。接口参数中的client_id, client_secret必须通过OAuth 系统得到，一般跟https证书一起发给客户。
 HTTP Head：
Content-Type: application/json  
HTTP Body（JSON）：
{
	"client_secret": "2dbfedf52da5036bde758189b1d27ebc1858655e",
	"grant_type": "client_credentials",
	"client_id": "6bf3b12b9159f55e3863204ac06f19b7a076cfc9"
}
4.2.2.	Response
返回信息为Token的相关信息（token及有效期）。
{
 "expires_in": 3600,
"access_token": "46bc277fc209a1cf129ba020b26b6d33a11de962645423faf9c71b8b1799ce72"
}



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

## create a payment


## execute a payment


## query a payment



## refund



## query refund


## Create cumtoms clearance



## Query customs clearance status




