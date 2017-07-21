# 3. B2C

## 3.1 获取access token

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

## 3.2 查询银行列表

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

### 请求

**GET**: /bank?type=CREDIT_CARD

每个商户只能查看合同中包含的银行卡.

该API将返回商家可用的银行列表.

### 参数

参数 | 描述
----------|------------
type | 枚举类型. 银行卡的类型. 可选值: **CREDIT_CARD**, **DEBIT_CARD**

### 响应

响应结果是 [bank](#bank) 对象的列表. 请参见右边的示例.

参数 | 描述
------- | -------
name | 银行的全称.
code | 在中国境内的银行代码.
type | 支持的银行卡类型. **CREDIT_CARD**, **DEBIT_CARD**


## 3.3 下单

```json
## request data:

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

## Response data:
{
  "meta": {
    "sign": "RLavJJz3d91oURkEs+YcWL4qLtjgU1zvFdVa2RXm40AmHi9tLX7Fvn7x3IL5qr23nOXopQOihl9Pfi+k6R/ojaq2im/+wJrsBG4d8gV7PboDWkNd7glfca0e7+b4TzjmuV5Qd5qprjnJmslrzsdS9EPofcpaLPE9yMVPbJiBNxs=",
    "ret_msg": "Success",
    "ret_code": "0000"
  },
  "payment": {
    "state": "WAIT_BUYER_PAY",
    "payer": {
      "payer_info": {
        "bankCard": {
          "number": "",
          "cvv2": "",
          "valid_date": "",
          "citizen_id_number": "",
          "phone": "",
          "citizen_id_type": "",
          "payer_name": ""
        },
        "payerAgreement": {
          "usr_busi_agreement_id": "",
          "usr_pay_agreement_id": ""
        }
      }
    },
    "order": {
      "amount": {
        "total": "100.02",
        "exchange_rate": {
          "rate": "6.9193",
          "currency": "USD"
        },
        "currency": "USD",
        "total_cny": "692.07"
      },
      "mer_date": "20170410",
      "mer_reference_id": "20170411543977"
    }
  },
  "links": [
    {
      "ref": "self",
      "method": "POST",
      "href": "http://10.10.77.79:8081/V1/spay_rest/payments/payment/PAY_AAGSRXVMGCDZOAJTY2VD2/query?mer_reference_id=20170411543977&mer_date=20170410"
    },
    {
      "ref": "sms_verify",
      "method": "POST",
      "href": "http://10.10.77.79:8081/V1/spay_rest/payments/payment/PAY_AAGSRXVMGCDZOAJTY2VD2/verify"
    }
  ]
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

创建一个稍后或立即执行的支付单, 取决于付款类型.

下面的表格展示了UMF支持的支付类型, 所有的付款必须使用人民币支付:

支付方式 | 描述
------- | -------
CREDIT_CARD | 信用卡支付
DEBIT_CARD | 借记卡支付
WECHAT_SCAN | 微信扫码支付.UMF返回一个二维码字符串. 用户使用他们的微信扫描二维码支付.
WECHAT_WEB | 用户在微信浏览器里支付订单.
WECHAT_IN_APP  | 用户在App应用里支付订单.
ALIPAY_SCAN | 支付宝扫码支付.UMF返回一个二维码字符串. 用户使用他们的支付宝扫描二维码支付.

参数:

参数 | 描述
------- | -------
[payer](#payer) | 对象. 支付信息. 
[order](#order) | 对象. 订单信息. 包含子订单.
notify_url | String. 商户服务器的url 接收支付结果.

响应:

响应结果包含meta信息和一个支付对象. 请参见右边的示例. 已创建的支付对象包含如下信息：

参数 | 描述
------- | -------
[payer](#payer) | 对象. 支付信息. 
[order](#order) | 对象. 订单信息. 包含子订单.
notify_url | 字符串. 商户服务器的url 接收支付结果.
[links](#link) | 对象数组. 下一步操作的链接. 取决于支付类型的状态. 链接是HATEOAS链接.

## 3.4 短信验证码

``` json
//Request:

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

//Response:

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

只有银行卡支付才会下发短信验证码. 

在这个过程中, 商户发送银行卡信息, UMF(或者银行) 将向用户手机发送短信验证码. 短信验证码是完成支付过程参数的一部分.

### 请求

**POST**:/payments/payment/payment_id/verify

请求url中的payment_id是在上一步创建的真实payment_id([创建支付单](#3-3)).

### 参数

可用的支付对象

参数 | 描述
----------|------------
[payer](#payer) | 对象. 支付信息.某些参数应该使用 UMF公钥加密. 看支付对象的描述信息.

### 响应

响应结果仅仅包含下一步操作的链接. 看右边的示例.
如果请求合法, 短信将发送到用户手机. 

参数 | 描述
------- | -------
[meta](#meta) | 对象. 响应的公共信息.
[links](#link) | 对象数组. 下一步操作的链接.

错误码:

返回码  | 返回码描述 
-------------|----------------------------
00060700 | 参数错误
00200025 | 银行卡信息不正确. 
00200026 | 银行卡过期. 
00060999 | 系统忙. 
00080706 | 请求获取验证码频繁. 
00060875 | 验证卡bin失败 (卡号不正确). 
00080707 | 订单的验证码请求数量超过最大值.
00200027 | 商户没有配置通道.
00060869 | 在UMF平台上没有注册商品.

## 3.5 确认支付

```json
//Request

{
    "payer":{
        "payer_info":{
            "bankCard":{
                "number":"Wr8Vt44OCPPQCD+CEzIOf6QbBTSe1QRgQ1i1wSdepRrvICcRINjkyh2Uy6u+mTht3Z+0kpi9uXJDlGM2YVsDKxl71FYCnwv8HhQXKkuFapAeIj1XkdX/xxI1oFTM3NGHo8dDvaFnDTnlEutMxheOOVRdxKXFfeQlPQWJxNU/SFc=",
                "citizen_id_number":"YUYrvncYAAo4p3VgaWjI3QT1aki+DoKjA1/iW+ZvF4gITSaApdSnZ9VigUPBC2B7FbrRxAM8iobeYVQeSUVoHX93i0relY7wZDWe1AfY5BtiaiOyTbyASIpVtuuvJHM7JIEvmNtPf3imxk+t3H3PUIX9Ji2gc5YT45LgoDgvuRM=",
                "citizen_id_type":"1",
                "payer_name":"Zar1j61YD5uPDX3IAwHw5oWPYU6oSoOTanIp24lL9/7Rvk+SGc/sgtGc42qCoI7y6X42+n9DsFN6Agvj1hp5LP2mqygnjLAvl59XR8z5Jzh5yCrmhUlpR7zCSN/lXIPSUhdGtAjEckVyP8NKAXFVwQHCuWGAr+IM4APpCcviW+U=",
                "phone":"18710129807",
                "external_customer_id":"",
                "verify_code": "505976"
            },
            "payerAgreement":{
                "usr_busi_agreement_id":"",
                "usr_pay_agreement_id":""
            }
        }
    }
}

//Response for card payment.

{
    "meta":{
        "sign":"i8SgMrD/7dwhxrU8nMNgzbW+Zbj4nH/C8ptWUX6IW85fcqDWkFzwx3MNDIqd+gBBOL6UWXrR05t/9DrYkrVnGbVu5bVx3/eIsyZtEQ2UnKd310kTBxvWFqUih2tUzIJyYyv8JEfyMDAr4NlugvMQC+NrWnl4iPLvv8M/uohH/KE=",
        "ret_msg":"Success",
        "ret_code":"0000"
    },
    "payment":{
        "settle_date":"20170418",
        "state":"TRADE_SUCCESS",
        "execute_success_time":"20170418",
        "payer":{
            "bank_code":"B001",
            "payer_info":{
                "payerAgreement":{
                    "usr_busi_agreement_id":"",
                    "last_four_cardId":"2419",
                    "gate_id":"B001",
                    "usr_pay_agreement_id":""
                }
            }
        },
        "order":{
            "amount":{
                "total":"690.46",
                "currency":"USD",
                "total_cny":"100.02"
            },
            "mer_date":"20170417",
            "mer_reference_id":"201704185439700"
        }
    },
    "links":[
        {
            "ref":"self",
            "method":"POST",
            "href":"http://10.10.179.74:8071/spay_rest/payments/payment/PAY_AAEZW4CHTR5YOAJTY2YZE?mer_date=20170417"
        },
        {
            "ref":"refund",
            "method":"POST",
            "href":"http://10.10.179.74:8071/spay_rest/payments/payment/PAY_AAEZW4CHTR5YOAJTY2YZE/refund"
        }
    ]
}

//Response for card payment enable payer agreement.

{
    "meta":{
        "sign":"nsHpWPtwJGuviB4yf8Ar9JtyOiTPPHRdYFwS+py2XL3A66/ppQALdm3dZHWOpqBhX0jFw3/rk6kJS61h0VS/aLAhon+SLG2ITXJ3xwfrkk2bJsz//SSA4B/Og1bKQy5ge83aQ/N+z2EQrepi04c/9svAbFIZ41aGKZxvhNOGrC4=",
        "ret_msg":"Success",
        "ret_code":"0000"
    },
    "payment":{
        "settle_date":"20170424",
        "state":"TRADE_SUCCESS",
        "execute_success_time":"20170424",
        "payer":{
            "bank_code":"B001",
            "payer_info":{
                "payerAgreement":{
                    "usr_busi_agreement_id":"UB201704201445250000000000533377",
                    "last_four_cardId":"9442",
                    "gate_id":"B001",
                    "usr_pay_agreement_id":"P2017011114291400000000000532236"
                }
            }
        },
        "order":{
            "amount":{
                "total":"100.02",
                "currency":"USD",
                "total_cny":"690.37"
            },
            "mer_date":"20170424",
            "mer_reference_id":"201704245435022"
        }
    },
    "links":[
        {
            "ref":"self",
            "method":"GET",
            "href":"http://10.10.179.74:8071/spay_rest/payments/payment/PAY_AAEZW7SW6VQJ6AJTY24KG"
        },
        {
            "ref":"refund",
            "method":"POST",
            "href":"http://10.10.179.74:8071/spay_rest/payments/payment/PAY_AAEZW7SW6VQJ6AJTY24KG/refund"
        }
    ]
}
```

处理完支付单,并且交易完成后. 资金从用户账户转移到UMF商户.

要执行支付单, 请在请求url中添加payment ID参数, 在请求的JSON body中包含一个payer对象. 

处理结果不会立即返回. 商户想要获取结果有两种方式，方式如下:

-- 查询付款结果. 支付成功的状态为"TRADE_SUCCESS".
-- 等待UMF通知. 商户需要开发http(s)服务. 支付产生结果时,UMF请求到这个服务.

### 请求

**POST**:/payments/payment/payment_id/execute

请求url中的payment_id是在上一步创建的真实payment_id([创建支付单](#3-3)).

### 参数

参数 | 描述
----------|------------
[payer](#payer) | 对象. 支付信息. 一些参数应该用UMF公钥加密. 参见payer对象的描述. 若支付类型是银行卡或者信用卡, payer对象应该包含手机验证码.

### 响应

响应结果包含payment对象. 银行卡信息不将返回, 例如card number, cvv2, citizen_id, 等等.

参数 | 描述
------- | -------
[meta](#meta) | 对象. 响应的公共信息.
[payment](#payment) | 对象. 支付对象.

## 3.6 支付结果通知

处理完商户的付款请求数据后, UMF将支付结果回调商户服务.

接收回调后商户将作出响应.

### 请求

UMF调用商户提供的服务. 服务的url即为商户配置的服务url.

参数 | 描述
------- | -------
[payment](#payment) | 对象. 支付对象.

### 响应

商户发送到UMF的响应结果.

参数 | 描述
------- | -------
order_id | 商户唯一的订单号 
mer_date | 商户订单日期 
ret_code | 返回码 
ret_msg | 返回消息 
mer_check_date | 商户对账日期 
mer_trace | 商户流水号 


## 3.7 订单查询

```json
//Request: /payments/payment/PAY_AAEZW7SW6VQJ6AJTY24KG

//Response
{
    "meta":{
        "sign":"JPTGaIJlB1gEQL8yKqcjh15y799IN4XwvhzuDqmxFNkPl0W4NovFhht0iUjo6csw8edo7gYIc5yL2S6Q9nfG8vh9Rfks6BtBUTjUCoLQs7vx/XTTygDCA3kHlrl/elrHzDlbL6nPL6ktJwgUlP6mUa0DVQpCCS8t1V+tS7BTg30=",
        "error_code":"",
        "ret_msg":"Success",
        "ret_code":"0000"
    },
    "payment":{
        "settle_date":"20170424",
        "state":"TRADE_SUCCESS",
        "execute_success_time":"20170424",
        "payer":{
            "payment_method":"CREDIT_CARD"
        },
        "order":{
            "user_ip":"",
            "amount":{
                "total":"100.02",
                "exchange_rate":{
                    "rate":"6.9023",
                    "currency":"USD"
                },
                "currency":"USD",
                "total_cny":"690.37"
            },
            "mer_date":"20170424",
            "expire_time":"",
            "mer_reference_id":"201704245435022"
        }
    }
}
```

**GET**: payments/payment/payment_id

请求url中的payment_id是在上一步创建的真实payment_id([创建支付单](#3-3)).

商户可以随时请求该url. UMF将返回一个支付对象.

## 3.8 退款

```json
//request
{
    "org_amount":{
        "total":"100.02",
        "currency":"USD"
    },
    "orders":[
        {
            "mer_reference_id":"9010040125",
            "mer_date":"20170425",
            "amount":{
                "total":"100.02",
                "currency":"USD"
            },
            "sub_orders":[
                {
                    "mer_sub_reference_id":"04245435028",
                    "amount":{
                        "total":"50.02",
                        "currency":"USD"
                    },
                    "trans_code":"01121990",
                    "sub_trans_type":"1",
                    "is_customs":"FALSE",
                    "items":[
                        {
                            "mer_item_id":"042454350281",
                            "type":"CLOTHING",
                            "name":"服装",
                            "description":"服装",
                            "item_quantity":"2",
                            "amount":{
                                "total":"30.02",
                                "currency":"USD"
                            }
                        },
                        {
                            "mer_item_id":"042454350282",
                            "type":"ELECTRONIC",
                            "name":"电子产品",
                            "description":"电子产品",
                            "item_quantity":"3",
                            "amount":{
                                "total":"20.00",
                                "currency":"USD"
                            }
                        }
                    ]
                },
                {
                    "mer_sub_reference_id":"04245435029",
                    "amount":{
                        "total":"50.00",
                        "currency":"USD"
                    },
                    "trans_code":"03223010",
                    "sub_trans_type":"3"
                }
            ]
        }
    ]
}


// Response
{
    "meta":{
        "sign":"Kg6T4Jy90ucPoZBEcRNG1kdRVn/vZJQCQBp1ULV680PA677t5WWyw7RBlqFSjNOPr3dJUv3tadohzE7C0alxuvZa7+oukW3ijBHBvBWGcVXDJPBYkTycRk+ACHNy05SjtbDS9C8NLEDgT/ru3mBLdXGFIfTEYx3U05kJefsEYFQ=",
        "ret_msg":"Success",
        "ret_code":"0000"
    },
    "links":[
        {
            "ref":"parent_payment",
            "method":"GET",
            "href":"http://10.10.179.74:8071/spay_rest/payments/payment/PAY_AAEZW7TKBAZNSAJTY24BA"
        },
        {
            "ref":"self",
            "method":"GET",
            "href":"http://10.10.179.74:8071/spay_rest/payments/refund/REFUND_AAAAAAQZBJGT2AJTY24KS"
        }
    ],
    "refund":{
        "orders":[
            {
                "amount":{
                    "total":"69037",
                    "currency":"USD",
                    "total_cny":""
                },
                "mer_date":"20170424",
                "mer_reference_id":"201704245435028"
            }
        ],
        "state":"REFUND_SUCCESS"
    }
}
```

**POST**:/payments/payment/payment_id/refund

请求url中的payment_id是在上一步创建的真实payment_id([创建支付单](#3-3)).

该请求创建并发送一个退款对象. 响应结果是UMF创建的退款对象.

UMF支持全额或部分退款. 部分退款可以多次执行.

退款和付款的货币必须一致, 退款金额一定不能大于付款总金额.

### 参数

参数 | 描述
----------|------------
[refund](#refund) | 对象. 退款对象. 应该输入订单、金额和nofify_url.

### 响应

响应结果包含支付对象. 退款对象包含refund_id和state.

若state是"REFUND_SUCCESS", 表示交易完成，退款成功. 若state是"REFUND_PROCESS", 表示交易正在处理, 交易完成后, UMF 将通知商户. 商户也可以查询退款状态 [查询退款](#3-9)

参数 | 描述
------- | -------
[meta](#meta) | 对象. 响应的公共信息.
[refund](#refund) | 对象. 退款对象.

## 3.9 退款查询

```json
//request: /payments/refund/REFUND_AAAAAAQZBJMOYAJTY2ZP6

//response
{
    "meta":{
        "sign":"k6tkaUOc/FpWnIs9zl/YAlrg8HKMT4opZq4eqbRfVoZw0kcH6CKSZFju5Sc3DVKj/rKHyWk75Ck0c1URvtGPq1OXCw5w934hgFNwUGCEkf2R/0J7JYk3x5m88EG5l14n+6wVapkd1GSsSPmPqBi5q0hlU+s7ySEuMeEXZHxuurg=",
        "ret_msg":"Success",
        "ret_code":"0000"
    },
    "refunds":[
        {
            "state":"REFUND_PROCESS"
        }
    ]
}
```

**GET**: /payments/refund/refund_id

请求url中的payment_id是在上一步创建的真实payment_id([退款](#3-8)).

商户随时可以请求该url. UMF将返回退款对象. 若state是"REFUND_SUCCESS", 则退款成功.

## 3.10 报关

```json
//Request: /payments/payment/PAY_AAEZW4UOJZ6GKAJTY2Z2I/apply_to_customs
{
    "customs_id": "NB",
    "mer_customs_code": "2342362435435",
    "freight_amount": {
        "total": 344.91,
        "total_cny": 344.91,
        "currency": "CNY"
    },
    "tax_amount": {
        "total": 0,
        "total_cny": 0,
        "currency": "CNY"
    },
    "sub_order_amount": {
        "total": 344.91,
        "total_cny": 344.91,
        "currency": "CNY"
    },
    "ec_plat_id": "2342362435435",
    "notify_url": "https://www.abcd.com/api/ump-notify",
    "sub_order": {
        "mer_sub_reference_id": "04185439116",
        "items": [
            {
                "mer_item_id": "041854391161"
            },
            {
                "mer_item_id": "041854391162"
            }
        ]
    }
}

//Response
{
    "meta":{
        "sign":"mIOSW4BHECZvK+d77VdmuutVMcbIpcN0fwZ4nAIItW8Y6tcqeampky5f+rdO+/NSYco+HnPM+XEwQYuHLisZiitps9FhOxNlmQdrKL/POR8PEZbnHN9jUbUE+7J4yXPlLTI89WJdCbuByVs1WxK7msGLBhWYmdfd54DUl6FMtCc=",
        "ret_msg":"Success",
        "ret_code":"0000"
    },
    "links":[
        {
            "ref":"parent_payment",
            "method":"GET",
            "href":"http://10.10.179.74:8071/spay_rest/payments/payment/PAY_AAEZW4UOJZ6GKAJTY2Z2I"
        },
        {
            "ref":"self",
            "method":"GET",
            "href":"http://10.10.179.74:8071/spay_rest/payments/customs_ declarations/CUST_AAAAAAHZPC5YYAJTY2ZXC"
        }
    ],
    "customs_declarations":[
        {
            "tax_amount":{
                "total":"0",
                "currency":"CNY",
                "total_cny":"0"
            },
            "freight_amount":{
                "total":"344.91",
                "currency":"CNY",
                "total_cny":"344.91"
            },
            "customs_clearance_date":"20170419",
            "mer_customs_code":"2342362435435",
            "sub_order":{
                "mer_sub_reference_id":"04185439116",
                "items":[
                    {
                        "mer_item_id":"041854391161"
                    },
                    {
                        "mer_item_id":"041854391162"
                    }
                ]
            },
            "ec_plat_id":"2342362435435",
            "sub_order_amount":{
                "total":"344.91",
                "currency":"CNY",
                "total_cny":"344.91"
            },
            "notify_url":"https://www.abcd.com/api/ump-notify",
            "customs_id":"NB"
        }
    ]
}
```

**POST**: /payments/payment/payment_id/apply_to_customs

该接口是可选的. 当商户需要UMF将支付信息提交到海关时, 该接口被调用. 一旦商户请求该url, 支付信息将发送给海关.

在订购后一个月内,商户向UMF提供子订单数据,在收到订单后,UMF将子订单数据更新到海关系统. 

### 请求

请求信息包含一个[报关对象](#customs_declaration) . 

### 响应

响应结果包含一个报关对象和meta信息.

## 3.11 报关状态查询

**GET**: payments/customs_ declarations/customs_declaration_id

url中的customs_ declaration_id是在上一步([报关](#3-10))中创建的报关对象的id.

## 3.12 结算列表下载

**GET**: /payments/transactions_download?mer_date=20170213

UMF会为每位商户创建每日交易列表. 该列表包含一天(mer_date)内所有成功的交易. 商户可以随时下载该列表.

交易列表日期即为商户的订单日期(mer_date).

### 请求

http get请求.mer_date必须在请求URL中.

### 响应

该接口是一个http下载接口, 交易列表被下载为一个文件.

除了第一行和最后一行，每一行都代表着一次交易.

交易信息以逗号分隔并遵循以下的顺序列表:

TRANSDETAIL-START, Merchant number, reconciliation date

Trade number, phone number, order_id, order date, payment date, successful transaction time, transaction foreign currency, price of transaction foreign currency, transaction amount in CNY, exchange rate, reconciliation date, transaction status, transaction type, product ID, refund No. 

TRANSDETAIL-End, merchant number, reconciliation date, total transaction amount[Enter]

交易列表的属性介绍如下. 

编号. | 属性 | 名称 | 描述
----|-------|------|------------
1 | tradeNo | 交易编号  | UMF生成的交易编号 
2 | mobileId | 手机号 | 用户的手机号
3 | orderId | 订单id  |商户生成的订单id
4 | orderDate | 订单日期  | 订单日期
5 | platDate | 付款日期 | 用户确认付款日期
6 | platTime | 付款成功时间 | 付款或退款成功时间
7 | currency | 币种 | 币种
8 | cb_amount | 外币金额 |格式:小数点保留两位 
9 | amount | 人民币金额 | 格式: 小数点保留两位
10 | exchangeRate | 下单时的汇率 | 汇率 
11 | transState | 交易状态  | -99: 生成付款, 0: 成功, 1: 失败, 3: 正在处理, 4: 授权, -1: 撤销.
12 | transType | 交易类型. | **P**: 付款. <br /> **T**: 退款
13 | productId | 购买商品id | UMF定义的已支付商品 
14 | refundNo | 退款编号  | 该字段对退款交易有用. 退款时商户生成退款编号

## 3.13 对账文件下载

**GET**: /payments/reconciliation_statement_download?mer_date=20170213

对账文件是一个以商户在UMF中帐户余额的记录开始，增加或减少对账明细,调整第三方持有同一账户的账单的文件.

和交易列表下载是同一个业务逻辑. 对账文件日期以订单日期为准.

### 请求

http get请求. mer_date必须在请求的url中.

### 响应

该接口是一个http下载接口, 对账信息被下载为一个文件.

## 3.14 汇率查询

```json
///exchange_rate?currency=USD
{
    "meta":{
        "sign":"Alc9iDPd4P2z3LzeaZj73aC2fmeHZmlh59d7+MvZoDRYUsOF3lLGe92VhqWhRERvXCBBOK+SarPSI72pj1rHCqTcVd6/hagHKJa/j4k0CodwsrYXhoayLhu6Y/XG7JllyY2pa84J+xLCv/D81KvwWukOpK3MRNf5yq9zrVaVD5E=",
        "ret_msg":"Success",
        "ret_code":"0000"
    },
    "exchangeRates":[
        {
            "rate":"6.9023",
            "currency":"USD"
        }
    ]
}
```

**GET**: /exchange_rate?currency=USD

获取实时汇率. 返回币种相应数量的人民币.

### 请求

参数是currency[币种代码](#currency-codes).

### 响应

响应结果包含一个[汇率](#exchange_rate) 对象和[meta](#meta).

## 3.15 通知
该接口是一个公共接口. 付款,退款和报关不会实时返回响应结果. 操作完成时UMF将结果通知给商户, 因此商户应该提供一个接收通知的服务并响应正确的结果. 商户也可以查询相应的接口获取结果. 参见[3.6 支付结果通知](#3-6). 

### 请求

UMF请求到merchant服务器. 请求url是每个对象中的notify_url.

请求内容为JSON对象. 对象可能为一个付款对象, 退款对象, 或者报关对象.

### 响应

响应结果包含 [meta](#meta) 和商户接收的对象. 该对象不需要设置所有的值. UMF仅仅需要对象的id.

## 3.16 获取微信open_id

**该接口将于2017年6月发布.**


## 3.17 结算信息查询


```json
{
    "meta":{
        "sign":"Alc9iDPd4P2z3LzeaZj73aC2fmeHZmlh59d7+MvZoDRYUsOF3lLGe92VhqWhRERvXCBBOK+SarPSI72pj1rHCqTcVd6/hagHKJa/j4k0CodwsrYXhoayLhu6Y/XG7JllyY2pa84J+xLCv/D81KvwWukOpK3MRNf5yq9zrVaVD5E=",
        "ret_msg":"Success",
        "ret_code":"0000"
    },
    "transactions":{
        "payment_summaries":[
            {
                "payment_id":"SDSWEWSD23123143DSDFSDF234234",
                "phone_number":"18710129807",
                "order_date":"20170316",
                "mer_reference_id":"20170316114145",
                "amount":{
                    "total": 49.41,
                    "total_cny": 344.91,
                    "currency": "USD",
                    "exchange_rate":6.9800
                },
                "settle_date":"20170317",
                "execute_success_time":"2017-03-17T19:20:30+08:00",
                "state":"TRADE_SUCCESS",
                "product_id":"Payment Gateway - Alipay QR code"
            },
            {
                "payment_id":"768HIOUKJHTJHLKHYOIT",
                "phone_number":"18710129807",
                "order_date":"20170316",
                "mer_reference_id":"20170316114145",
                "amount":{
                    "total": 49.41,
                    "total_cny": 344.91,
                    "currency": "USD",
                    "exchange_rate":6.9800
                },
                "settle_date":"20170317",
                "execute_success_time":"2017-03-17T19:20:30+08:00",
                "state":"TRADE_SUCCESS",
                "product_id":"Payment Gateway - Alipay QR code"
            } 
        ],
        "refund_summaries":[
            {
                "refund_id":"IUIUYTHJY58765874KJHKUUTIUI",
                "payment_id":"SDSWEWSD23123143DSDFSDF234234",
                "phone_number":"18710129807",
                "amount":{
                    "total": 49.41,
                    "total_cny": 344.91,
                    "currency": "USD",
                    "exchange_rate":6.9800
                },
                "settle_date":"20170317",
                "execute_success_time":"2017-03-17T19:20:30+08:00",
                "state":"REFUND_SUCCESS",
                "mer_sub_reference_id":"Payment Gateway - Alipay QR code"
            }
        ],
        "pagination":{
            "total_count":3,
            "page_number":1,
            "page_size":50
        }
    }
}
```

**GET**: /payments/transactions?mer_date=20170213

**GET**: /payments/transactions?mer_date=20170213?page_number=2


### 请求

http get请求. 在url中mer_date参数.当一次响应多个交易时，需要在url中添加page_number参数. 

参数 | 描述
------- | -------
mer_date | 字符串. 商户付款日期.
page_number | 数字. **可选**. 请求的页码 (从1开始). 默认值: 1
page_size | 数字. **可选**. 返回对象的最大值. 默认值: 500


### 响应

响应结果包含一个[结算](#transactions) 对象. 请参见右边示例.



## 3.18 对账信息查询

```json
{
    "meta":{
        "sign":"Alc9iDPd4P2z3LzeaZj73aC2fmeHZmlh59d7+MvZoDRYUsOF3lLGe92VhqWhRERvXCBBOK+SarPSI72pj1rHCqTcVd6/hagHKJa/j4k0CodwsrYXhoayLhu6Y/XG7JllyY2pa84J+xLCv/D81KvwWukOpK3MRNf5yq9zrVaVD5E=",
        "ret_msg":"Success",
        "ret_code":"0000"
    },
    "reconciliations":{
        "settle_date":"20170320",
        "amount":{
            "total": 78.40,
            "total_cny": 544.91,
            "currency": "USD",
            "exchange_rate":6.9500
        };
        "payment_summaries":[
            {
                "payment_id":"SDSWEWSD23123143DSDFSDF234234",
                "order_date":"20170316",
                "mer_reference_id":"20170316114145",
                "amount":{
                    "total": 49.41,
                    "total_cny": 344.91,
                    "currency": "USD",
                    "exchange_rate":6.9800
                },
                "settle_date":"20170317",
                "execute_success_time":"2017-03-17T19:20:30+08:00",
                "state":"TRADE_SUCCESS",
                "product_id":"Payment Gateway - Alipay QR code",
                "service_fee":"10.00",
                "exchange_amount":{
                    "total": 48.19,
                    "total_cny": 334.91,
                    "currency": "USD",
                    "exchange_rate":6.9500
                },
                "exchange_date":"20170318",
            },
            {
                "payment_id":"768HIOUKJHTJHLKHYOIT",
                "order_date":"20170316",
                "mer_reference_id":"20170316114145",
                "amount":{
                    "total": 49.41,
                    "total_cny": 344.91,
                    "currency": "USD",
                    "exchange_rate":6.9800
                },
                "settle_date":"20170317",
                "execute_success_time":"2017-03-17T19:20:30+08:00",
                "state":"TRADE_SUCCESS",
                "product_id":"Payment Gateway - Alipay QR code",
                "service_fee":"10.00",
                "exchange_amount":{
                    "total": 48.19,
                    "total_cny": 334.91,
                    "currency": "USD",
                    "exchange_rate":6.9500
                },
                "exchange_date":"20170318",
            }
        ],
        "refund_summaries":[
            {
                "refund_id":"IUIUYTHJY58765874KJHKUUTIUI",
                "payment_id":"SDSWEWSD23123143DSDFSDF234234",
                "phone_number":"18710129807",
                "amount":{
                    "total": 49.41,
                    "total_cny": 344.91,
                    "currency": "USD",
                    "exchange_rate":6.9800
                },
                "settle_date":"20170317",
                "execute_success_time":"2017-03-17T19:20:30+08:00",
                "state":"REFUND_SUCCESS",
                "product_id":"Payment Gateway - Alipay QR code",
                "mer_sub_reference_id": "20170316114145001"
            }
        ],
        "pagination":{
            "total_count":3,
            "page_number":1,
            "page_size":50
        }
    }
}
```

**GET**: /payments/reconciliation_statement?settle_date=20170213

**GET**: /payments/reconciliation_statement?settle_date=20170213&page_number=2

UMF将资金转移到商户的银行账户时会产生对账文件. 包含每一笔交易详情, 服务费和交易行为. 展示了资金转移的详情.

对账信息的日期以settle_date为准. **仅仅当UMF将资金转移到商户的银行账户时对账信息才会生成.**

### 请求

http get请求. 请求URL中必须带有settle_date参数.

参数 | 描述
------- | -------
settle_date | 字符串. 将资金转移到商户的银行账户的日期.
page_number | 数字. **可选**. 请求的页码 (从1开始). 默认值: 1
page_size | 数字. **可选**. 返回对象的最大值. 默认值: 500


### 响应

响应结果包含[对账](#reconciliations)对象. 请参见右边示例.





