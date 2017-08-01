# 1. 概述

UMF REST API使用HTTP方法和RESTful结构. 该API认证框架采用OAuth 2.0. 商户请求格式为JSON,该API同样响应JSON格式的数据.

<aside class="notice">
重点: 您不能在指南中按原样运行请求示例. 使用您自己的值替换特定值的参数, 如tokens和IDs.
</aside>

## 1.1. API操作

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

可以在如下环境使用UMF REST APIs:

环境 | 描述 | 地址
------------|-------------|---------
国内测试环境 | 测试. 中国的服务器. 使用您测试的client_id和client_secret生成access token,请求测试地址. | https://uat.soopay.net/cberest/v1/
国内生产环境 | 生产. 中国的服务器. 使用您生产的client_id和client_secret生成access token,请求生产地址. | https://pay.soopay.com/cberest/v1/
北美测试环境 | 测试. 北美的服务器. 使用您测试的client_id和client_secret生成access token,请求测试地址. | https://uatfx.soopay.net/cberest/v1/
北美生产环境 | 生产. 北美的服务器. 使用您生产的client_id和client_secret生成access token,请求生产地址. | https://fx.soopay.net/cberest/v1/


要构造REST请求, 须结合一下几点:

- HTTP方法
- 资源的完整URI
- HTTP请求头
- 若有要求,payload应为JSON格式

请参见右边示例.

<aside class="notice">
注意: 您可以在命令行上使用cURL命令. 若您的系统不支持cURL命令, 请下载安装cURL. . 请求包含您自己的access token和payment-specific IDs.
</aside>
[cURL](https://curl.haxx.se/download.html)

和UMF合作后,商户将拥有如下信息.

类型 | 描述
------- | -------
商户rsa私钥 | 签名请求
商户rsa公钥 | Merchant rsa私钥的秘钥对
UMF公钥 | 加密敏感信息
商户client id | OAuth2认证使用
商户client secret | OAuth2认证使用


## 1.2 认证

UMF系统支持OAuth2. 使用[Client Credentials Grant](https://tools.ietf.org/html/rfc6749#section-4.4)生成access token. 每个商户有一个client_id和一个client_secret. 商户使用 client_id和client_secret生成access Token. 每个请求必须是HTTPS请求,  在请求头里面加上access token.

<aside class="notify">
 切记: 请勿向未授权的个人或者应用分享您的商户ID, 秘钥, 或 bearer token; 这些信息对于每个商户是唯一的,包含了私密信息. 请确保只有经过授权的个人才能在该平台内获得这些信息.
</aside>

如果您确信您的商户 ID, 秘钥,或 bearer token 已经失效了, 请在TMS里重新生成您的秘钥. 一旦您有一个新的秘钥, bearer token会立即生成. 15分钟内新的bearer token将同步整个系统.

## 1.3 HTTP请求

UMF系统支持GET和POST请求.

- GET: 查询对象或对象列表.
- POST：创建或更新对象. 

### HTTP请求头

请求REST API, 您的请求头必须包含带有OAuth 2.0 access token的认证请求头.

http get请求头示例:

`Content-Type:application/json`

`Authorization:Bearer ea3b83b316d97bd78166475fe36a3f7219d79e8d04bfc784dec424fba0e9462f`

如果请求头是POST请求, 请求头必须包含如下信息:

- Signature:[SignatureOfPostBody](#1-6)

http post请求头示例:

`Content-Type:application/json` 

`Authorization:Bearer ea3b83b316d97bd78166475fe36a3f7219d79e8d04bfc784dec424fba0e9462f`

`Signature:p+owOiuS9eVrDQIHaP9CwwR89k99+6MdALuetVW9SKpBJvbvQdO8Sx8P1wlgIN9naa9YQeha/oiVhTFh57dtEpE92HU4jsYXZ2aj8puIP6IXbyDG18vr7Qs1sCfdtT7ziXrv31BIIahn6HKZLtVf/fus2NIyO7f2zl+b34In4dM=`

## 1.4 HTTP响应

所有的http响应都是带有两部分的json格式字符串.

- **meta**：每个响应的公共信息. 包含相应的消息, 签名, 错误码等等.

- **result**: 实体对象. "result"的字段名称也可能不是"result", 根据对象的类型和对象的数量改变. 举例: 如果返回的对象是付款对象, result的名称就会改成"payment"对象, 内容是一个付款的json对象. 如果返回的对象是多个付款对象,result的名称是"payments", 内容是一个付款的json数组.

### HTTP响应码

状态码 | 描述
------------|------------
200 | 请求成功
201 | 资源创建完成
400 | 校验错误
401 | 请求未认证
402 | 请求失败
403 | 禁止访问
404 | 资源未找到
50n | UMF服务器错误

## 1.5 获取access token

```json
//request
{
    "client_id": "6bf3b12b9159f55e3863204ac06f19b7a076cfc9",
    "client_secret": "2dbfedf52da5036bde758189b1d27ebc1858655e",
    "grant_type": "client_credentials"
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
    "grant_type": "client_credentials"
}'

//response
{
 "expires_in": 3600,
 "access_token": "46bc277fc209a1cf129ba020b26b6d33a11de962645423faf9c71b8b1799ce72"
}

```

创建一个带有您应用的OAuth client_id和client_secret keys的OAuth授权作为access token. 设置请求的content-type为**application/json**. 在请求的实体里面设置grant_type为 client_credentials.

### 请求

**POST**: /oauth/authorize

每一个请求在请求头里面必须加入access_token. 该接口返回一个当前用户的access_token. 每一个token有一个有效期的参数,意味着每一个token在有效期内有效. 如果用户申请了一个新的 access_token, 旧的access_token将立即不可用.

参数:

参数 | 描述
------- | -------
client_id | 发给商户的客户端标识符. 
client_secret | 发给商户的客户端秘钥. 
grant_type | OAuth认证请求的类型. 该场景下值必须为**"client_credentials"** .

### 响应

响应结果是一个json格式的字符串. 包含access_token和expires_in. 

响应:

参数 | 说明
------- | -------
expires_in | access token的有效期，单位为秒.
access_token | access_token.

## 1.6 签名和验签

DSA或RSA签名算法中私钥和公钥是必须的. UMF的OPENSSL生成公钥和私钥. UMF 会向商户发送SSL密钥对. 因此, 商户 可以使用UMF公钥和商户私钥.

### 请求数据的签名

所有的POST请求都需要包含'Signature'的请求头. POST请求的内容为一个JSON格式的字符串. RSA签名函数在RSA签名算法中使用了商家私钥和JSON字符串得到结果字符串. (得到的值放在"Signature"的请求头里).

示例:

`Signature:AWD234SDKEBuYviyhggoopDOUEFLKDSJFI7655DFDFOIUOIulkjj`

签名算法:

*使用UTF8编码将JSON字符串转换为字节.
*使用SHA256算法将UTF8编码的字节装换为哈希字节.
*使用商户的私钥对哈希字节加密.
*将哈希字节转换为base64编码的字符串.

最后一步得到的结果即为请求的signature.

### 对响应结果验签

请求的响应信息使用UMF的安全机制签名. 接收到响应信息后商户需要对结果验签.

响应结果是一个JSON格式的字符串,有两部分组成. 第一部分为 "meta". Signature包含在"meta" 对象. 另一部分是[结果对象](#1-4-http). signature是对那些对象签名.
 
验签步骤:

*使用UTF8编码将结果JSON字符串转换为字节.
*使用SHA256算法将UTF8编码的字节装换为哈希字节.(将内容的字节数组哈希)
*使用base64将signature字符串解码为字节.
*使用UMF的RSA公钥对字节解密.(signature的字节数组)
*检查两个字节数组是否相同。如果它们相等，则验签成功，否则响应结果可能在传输过程中被修改或拦截.

## 1.7 加密所有的敏感信息

http请求中需要对所有的敏感信息解密. 敏感信息包括:

- 卡号
- 持卡人姓名
- 信用卡安全码
- 有效期 (仅仅对于信用卡)
- 公民身份证号码 (仅仅对于中国用户)
- 手机号

### 加密算法

字符串 -> 字节(UTF-8编码) -> 字节(使用UMF的公钥进行RSA加密) -> 字符串(Base64编码)

## 1.8 日期和时间格式

UMF系统的所有日期和时间格式为[ISO8601](https://en.wikipedia.org/wiki/ISO_8601).

### 时间格式

**YYYY-MM-DDThh:mm:ssTZD**

示例:
`2016-07-16T19:20:30+01:00`

### 日期格式

**YYYYMMDD**

示例: `20160716`


