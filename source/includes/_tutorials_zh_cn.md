# 2. 指南

## 2.1 请求入门

发起rest api请求的条件：

- 申请商户账号.
- 获取access token.
- 调用API.

所有流程步骤如下.

<div class="mermaid">
sequenceDiagram
    participant 商户
    participant UMF
    商户\-\->>UMF: 申请商户账号
    UMF\-\->>商户: 账号信息
    商户\-\->>UMF: 请求access token
    UMF\-\->>商户: 返回access token
    Note right of 商户: 使用access token请求REST API.
    商户\-\->>UMF: 发起API请求
    UMF\-\->>商户: 返回结果
</div>

### 申请商户账号

商人需要与UMF签订合同,确定服务费率和其他细节.

当商户账号生效后, UMF将向商户发送邮件. 邮件内容包含如下信息:

- UMF RSA公钥
- 商户 RSA 私钥
- OAuth2认证用到的client_id and client_secret 

### 获取access token

带着您应用的OAuth client_id和秘钥请求/oauth/authorize获取access_token. 在请求body里面设置grant_type为"client_credentials". 当您请求 [Get an access token](#1-5-access-token)UMF生成并返回给您access token.

关于请求头的相关信息, 请参见 [REST API authentication](#1-2), [headers](#1-3-http)和 [Get an access token](#1-5-access-token).

<aside class="notice">
切记: access token在响应字段expires_in中定义的有效时间内是可用的. 当前的access token失效时，您必须请求API获取新的access token.
</aside>

### 发起API请求

拥有有效的access token, 您就可以请求API接口.

access token是OAuth的认证并且包含在如下格式的请求头:

Authorization: Bearer Access-Token

对于认证的更多细节, 请参见 [Authentication](#1-2).


## 2.2 信用卡/借记卡支付

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


UMF只支持国内银行发行的信用卡和借记卡. 用户支付只支持人民币. UMF可以将人民币转换为 [15种外币](#currency-codes).

<div class="mermaid">
sequenceDiagram
    participant 用户
    participant 商户
    participant UMF
    participant 银行
    用户\-\->>商户: 1. 下单
    商户\-\->>用户: 2. 生成订单
    用户\-\->>商户: 3. 确认订单
    Note right of 商户: 使用有效的access token发起API请求. 
    商户\-\->>UMF: 4. 可选. 获取access token
    UMF\-\->>商户: 5. 返回access_token
    Note right of 商户:  使用access token请求API
    商户\-\->>UMF: 6. 下单
    UMF\-\->>商户: 7. 返回付款对象
    商户\-\->>UMF: 8. **可选**. 获取可用的银行
    UMF\-\->>商户: 9. 返回银行列表
    商户\-\->>用户: 10. 向用户展示银行.
    用户\-\->>商户: 11. 填写支付要素, 获取短信验证码.
    商户\-\->>UMF: 12. 调用发送短信验证码接口
    UMF\-\->>商户: 13. UMF返回响应结果.
    UMF\-\->>用户: 14. 向用户发送短信
    用户\-\->>商户:15. 填写验证码并提交
    商户\-\->>UMF: 16. 调用确认支付接口
    UMF\-\->>银行: 17. 请求扣款
    银行\-\->>UMF: 18. 推送结果
    UMF\-\->>商户: 19. 推送支付结果
    商户\-\->>用户: 20. 返回支付结果
    
</div>

时序图描述：

1. 用户在商户平台下单.
2. 商户生成订单.
3. 用户确认订单.
4. 可选. 商户 [获取access token](#1-5-access-token). 该步骤是可选的. 如果商户已经拥有可以正常调用API的access token, 请忽略步骤4和5.
5. UMF返回access token.
6. 商户向UMF提交订单数据. 调用 [下单](#3-2),请参见右边示例.
7. UMF返回一个付款对象.
8. 可选. 商户 [查询银行列表](#3-2-query-available-banks). 银行列表基本不变 . 商户可以缓存结果并使用缓存提高加载效率.
9. UMF返回可用的银行列表.
10. Merchant向用户展示付款页
11. 用户选择银行, 填写卡号信息和手机号码, 获取短信验证码. 手机号必须和银行预留号码一致. UMF会校验.
12. 商户请求UMF向用户手机号发送短信验证码. 请求 [短信验证码](#3-4).
13. 短信发送完成后UMF返回响应数据.
14. UMF(或银行)向用户手机号发送短信.
15. 用户填写接收到的短信验证码并提交.
16. 商户向UMF发起付款请求. 请求 [确认付款](#3-5).
17. UMF向银行发起扣款请求.
18. UMF接收扣款结果通知.
19. UMF向商户推送结果.
20. Merchant向用户展示结果.

## 2.3 微信/支付宝主扫支付

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

UMF返回二维码字符串. 用户使用微信扫描二维码完成付款. 

**该接口于2017年6月发布.**


<div class="mermaid">
sequenceDiagram
    participant 用户
    participant 商户
    participant UMF
    participant 微信/支付宝
    用户\-\->>商户: 1. 下单
    商户\-\->>用户: 2. 生成订单
    用户\-\->>商户: 3. 确认订单
    Note right of 商户: 使用有效的access token发起API请求
    商户\-\->>UMF: 4. 可选. 获取access token
    UMF\-\->>商户: 5. 返回access_token
    Note right of 商户:  使用access token调用API
    商户\-\->>UMF: 6. 下单
    UMF\-\->>微信/支付宝: 7. 发起下单请求
    微信/支付宝\-\->>UMF: 8. 返回二维码字符串
    UMF\-\->>商户: 9. 返回扫码对象
    商户\-\->>用户: 10. 将字符串转换为二维码展示给用户
    用户\-\->>微信/支付宝: 11. 扫码支付完成
    微信/支付宝\-\->>UMF: 12. 返回扣款通知
    UMF\-\->>商户: 13. 返回支付结果
    商户\-\->>用户: 14. 返回支付结果
    
</div>

Explanation of the sequence chart：

1. 用户在商户平台下单.
2. 商户生成订单.
3. 用户确认订单.
4. 可选. 商户 [获取access token](#1-5-access-token). 该步骤是可选的. 如果商户已经拥有可以正常调用API的access token, 请忽略步骤4和5.
5. UMF返回access token.
6. 商户向UMF提交订单数据. 调用 [下单](#3-2),请参见右边示例.
7. UMF向微信/支付宝发送支付请求.
8. 微信/支付宝向UMF返回二维码字符串.
9. UMF返回扫码对象.
10. 商户将字符串转换为二维码展示给用户.
11. 用户扫码支付完成.
12. UMF接收扣款通知.
13. UMF向商户返回支付结果.
14. 商户向用户展示支付结果.


## 2.4 微信公众号支付

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

商户可以在微信公众账号向用户推送商品. 商户的购物页面加入微信支付后, 用户便可以在购物页面购买商品.

**It will be released in June 2017.**

<div class="mermaid">
sequenceDiagram
    participant 用户
    participant 微信浏览器
    participant 商户
    participant UMF
    participant 微信
    用户\-\->>商户: 1. 下单
    商户\-\->>用户: 2. 生成订单
    用户\-\->>微信浏览器: 3. 确认订单
    微信浏览器\-\->>UMF: 4. 请求认证页面(html和javascript)
    UMF\-\->>微信浏览器: 5. 返回认证页面.
    微信浏览器\-\->>微信: 6. 请求获取open_id
    微信\-\->>微信浏览器: 7. 返回open_id
    微信浏览器\-\->>商户: 8. 跳转到通知地址
    商户\-\->>微信浏览器: 9. 返回正在处理页面.
    微信浏览器\-\->>商户: 10. 发起微信支付.
    Note right of 商户:  带着access token请求API
    商户\-\->>UMF: 11. 付款请求
    UMF\-\->>微信: 12. 付款请求
    微信\-\->>UMF: 13. 返回支付信息
    UMF\-\->>商户: 14. 返回WeChat_in_app_web对象
    商户\-\->>微信浏览器: 15. 唤醒支付插件
    微信浏览器\-\->>微信浏览器: 16. 请求微信JS-API
    用户\-\->>微信: 17. 输入密码, 完成支付
    微信\-\->>微信浏览器: 18. 返回等待信息.
    微信浏览器\-\->>微信浏览器: 19. 跳转到ret_url.
    微信\-\->>UMF: 20. 扣款结果通知.
    UMF\-\->>商户: 21. 返回支付结果.
</div>

时序图描述：

1. 用户在商户平台下单.
2. 商户生成订单.
3. 用户确认订单.
4. 可选. 商户 [获取access token](#1-5-access-token). 该步骤是可选的. 如果商户已经拥有可以正常调用API的access token, 请忽略步骤4和5.
5. UMF返回认证页面.
6. 认证页面请求获取open_id. 
7. 微信返回当前微信用户的open_id.
8. 认证页面跳转到通知地址(步骤4).
9. **可选**. 商户返回正在处理页面.
10. **可选**. 正在处理页面请求付款.
11. 商户向UMF发送支付请求.调用 [下单](#3-2).
12. UMF向微信发起支付请求.
13. 微信向UMF返回支付信息.
14. UMF返回WeChat_in_app_web对象.
15. 商户向浏览器返回WeChat_in_app_web对象.
16. 返回页唤醒微信支付插件(微信JS-API).
17. 用户在微信浏览器输入密码完成支付.
18. 微信返回正在处理页面.
19. 正在处理页面ret_url(步骤11).
20. WeChat向UMF返回支付结果.
21. UMF向商户发送支付结果.

## 2.5 微信App支付

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

Merchants可以整合微信支付SDK到自己的APP里.当用户在其他的app里发起付款时, 微信可以处理此次付款. 一旦交易完成, 当前页面将跳转到用户的app.

**该功能将于2017年6月发布.**

<div class="mermaid">
sequenceDiagram
    participant 用户
    participant 商户APP客户端
    participant 商户APP服务端
    participant UMF
    participant 微信
    用户\-\->> 商户APP客户端: 1. 下单
    商户APP客户端\-\->>用户: 2. 生成订单
    用户\-\->>商户APP客户端: 3. 确认订单
    商户APP客户端\-\->>商户APP服务端: 4. 发起付款请求
    Note right of 商户APP服务端: 使用有效的access token发起API请求
    商户APP服务端\-\->>UMF: 5. 可选. 获取access token
    UMF\-\->>商户APP服务端: 6. 返回access_token
    Note right of 商户APP服务端:  使用access token请求API
    商户APP服务端\-\->>UMF: 7. 下单
    UMF\-\->>微信: 8. 发起微信APP支付
    微信\-\->>UMF: 9. 返回JSON字符串, 支付信息
    UMF\-\->>商户APP服务端: 10. 返回WeChat_in_app对象
    商户APP服务端\-\->>微信: 11. 唤醒支付插件
    微信\-\->>用户: 12. 支付插件唤起
    用户\-\->>微信: 13. 输入密码, 完成支付
    微信\-\->>UMF: 14. 扣款结果通知
    UMF\-\->>商户APP服务端: 15. 返回支付结果
    商户APP服务端\-\->>商户APP客户端: 16. 返回支付结果
    商户APP客户端\-\->>用户: 17. 返回支付结果
</div>

时序图描述：

1. 用户在商户平台下单.
2. 商户APP客户端生成订单.
3. 用户在APP里确认订单.
4. 商户APP客户端向商户APP服务端发起付款.
5. 可选. 商户 [获取access token](#1-5-access-token). 该步骤是可选的. 如果商户已经拥有可以正常调用API的access token, 请忽略步骤4和5.
6. UMF返回access token.
7. 商户向UMF提交订单数据. 调用 [下单](#3-3),请参见右边示例.
8. UMF向微信发送支付请求.
9. 微信向UMF返回支付信息.
10. UMF向商户app服务端返回WeChat_in_app对象.
11. 商户app服务端唤醒微信支付插件.
12. 微信支付插件唤起.
13. 用户在微信浏览器里输入密码并完成支付.
14. UMF接收到扣款通知.
15. UMF向商户app服务端返回支付结果.
16. 商户app服务端发送结果给商户app客户端.
17. 商户app客户端向用户展示支付结果.

## 2.6 退款

UMF支持全额或部分退款.

<div class="mermaid">
sequenceDiagram
    participant 用户
    participant 商户
    participant UMF
    participant 银行
    用户\-\->>商户: 1. 选择要退款商品,发起退款
    商户\-\->>用户: 2. 生成退款单
    用户\-\->>商户: 3. 确认退款单
    Note right of 商户: 使用有效的access token发起API请求
    商户\-\->>UMF: 4. 可选. 获取access token
    UMF\-\->>商户: 5. 返回access_token
    Note right of 商户:  使用access token调用API
    商户\-\->>UMF: 6. 发起退款请求
    UMF\-\->>银行: 7. 请求退款
    银行\-\->>UMF: 8. 返回退款结果
    UMF\-\->>商户: 9. 返回退款对象
    商户\-\->>用户: 10. 退款结果通知
</div>

时序图描述：

1. 用户在商户平台选择需要退款的商品并发起退款. 
2. 商户平台生成退款单.
3. 用户确认退款单.
4. 可选. 商户 [获取 access token](#1-5-access-token). 该步骤是可选的. 如果商户已经拥有可以正常调用API的access token, 请忽略步骤4和5.
5. UMF返回access token.
6. 商户向UMF提交退款单数据. 调用 [退款](#3-7).
7. UMF向银行发起退款请求.
8. 银行向UMF返回退款结果.
9. UMF向商户返回退款对象.
10. 商户向用户返回退款结果.

## 2.7 网银直连

### 付款的时序图.

<div class="mermaid">
sequenceDiagram
    participant 企业
    participant 商户
    participant UMF
    participant 银行
    企业\-\->>商户: 1. 下单.
    商户\-\->>UMF: 2.下单.
    UMF\-\->>商户: 3. 返回付款对象.
    商户\-\->>银行: 4. 跳转到网银付款页面.
    银行\-\->>企业: 5. 展示付款页面.
    企业\-\->>银行: 6. 在线付款.
    银行\-\->>UMF: 7. 付款结果通知.
    UMF\-\->>商户: 8. 付款结果通知.
    商户\-\->>UMF: 9. 上传所有必须的文件.

</div>

时序图描述：

1. 企业选择商品并发起付款.
2. 商户平台请求UMF下单. 请参见 []
3. UMF返回已创建的付款对象. 付款对象包含UMF支付的地址. 商户应该打开一个新的页面展示UMF付款.
4. 商户为支付地址打开一个新的页面. 最终页面属于银行. 
5. 银行向企业返回网银支付页面.
6. 企业填写所有信息并补全. 必须使用企业银行账号付款.
7. 银行向UMF发送支付结果通知.
8. UMF向商户返回支付结果.
9. 支付成功后, 商户需要向UMF的FTP服务器上传所有的必要文件(如合同, 账单, 发票等等). UMF会离线校验文件. 一切ok的话, 人民币将兑换成需要的币种.


## 2.8 收银台


### 付款的时序图.

<div class="mermaid">
sequenceDiagram
    participant 企业
    participant 商户
    participant UMF
    participant 银行
    企业\-\->>商户: 1. 下单.
    商户\-\->>UMF: 2.下单.
    UMF\-\->>商户: 3. 返回付款对象.
    商户\-\->>银行: 4. 跳转到网银支付页面.
    银行\-\->>企业: 5. 展示网银支付页面.
    企业\-\->>银行: 6. 在线支付.
    银行\-\->>UMF: 7. 支付结果通知.
    UMF\-\->>商户: 8. 支付结果通知.
    商户\-\->>UMF: 9. 上传所有必要的文件.

</div>

时序图描述：

1. 企业选择商品并发起付款.
2. 商户平台请求UMF下单. 请参见 []
3. UMF返回已创建的付款对象. 付款对象包含UMF支付的地址. 商户应该打开一个新的页面展示UMF付款.
4. 商户为支付地址打开一个新的页面. 最终页面属于银行. 
5. 银行向企业返回网银支付页面.
6. 企业填写所有信息并补全. 必须使用企业银行账号付款.
7. 银行向UMF发送支付结果通知.
8. UMF向商户返回支付结果.
9. 支付成功后, 商户需要向UMF的FTP服务器上传所有的必要文件(如合同, 账单, 发票等等). UMF会离线校验文件. 一切ok的话, 人民币将兑换成需要的币种.


## 2.9 企业资质审查


- 注册企业为当前商户的客户.
- 使用网银支付.

### 注册企业的时序图.

<div class="mermaid">
sequenceDiagram
    participant 企业
    participant 商户
    participant UMF
    participant 银行
    企业\-\->>商户: 1. 提交文件.
    商户\-\->>UMF: 2.提交文件.
    UMF\-\->>银行: 3. 提交文件.
    银行\-\->>UMF: 4. 返回校验结果.
    UMF\-\->>商户: 5. 返回校验结果.
    商户\-\->>UMF: 6. 注册企业.
    UMF\-\->>商户: 7. 返回注册企业信息.
</div>

时序图描述 (**离线**)：

1. 企业向商户提交所需文件. 
2. 商户向UMF提交文件.
3. UMF校验文件并把文件发送给银行.
4. 银行校验企业资质, 向UMF发送结果.
5. UMF向商户返回结果.
6. **在线**. 如果企业资质符合条件, 商户会创建一个企业资质.
7. **在线**. UMF返回创建企业资质的信息. 企业id非常重要.