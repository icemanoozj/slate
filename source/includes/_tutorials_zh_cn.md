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

带着您应用的OAuth client_id和秘钥请求/oauth/authorize获取access_token. 在请求body里面设置grant_type为"client_credentials". 当您请求 [Get an access token](#3-1-access-token)UMF生成并返回给您access token.

关于请求头的相关信息, 请参见 [REST API authentication](#1-2), [headers](#1-3-http)和 [Get an access token](#3-1-access-token).

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
4. 可选. 商户 [获取access token](#3-1access-token). 该步骤是可选的. 如果商户已经拥有可以正常调用API的access token, 请忽略步骤4和5.
5. UMF返回access token.
6. 商户向UMF提交订单数据. 调用 [下单](#3-3),请参见右边示例.
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
    participant 微信/支付
    用户\-\->>商户: 1. 下单
    商户\-\->>用户: 2. 生成订单
    用户\-\->>商户: 3. 确认订单
    Note right of 商户: 使用有效的access token发起API请求
    商户\-\->>UMF: 4. Optional. Acquire an access token
    UMF\-\->>商户: 5. Return access_token
    Note right of 商户:  Using access token to make API call
    商户\-\->>UMF: 6. Create a payment
    UMF\-\->>WeChat/Alipay: 7. Payment request
    WeChat/Alipay\-\->>UMF: 8. Return an URL of QR code
    UMF\-\->>商户: 9. Return an ali_qr_scan object
    商户\-\->>用户: 10. Show the page of QR code which generated by the URL
    用户\-\->>WeChat/Alipay: 11. Finish the payment by scanning QR code
    WeChat/Alipay\-\->>UMF: 12. Deduction result
    UMF\-\->>商户: 13. Payment result
    商户\-\->>用户: 14. Payment result
    
</div>

Explanation of the sequence chart：

1. Customer orders goods at merchant platform.
2. Merchant generate an order.
3. Customer confirm the order.
4. Optional. Merchant [acquire an access token](#3-1-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
5. UMF returns an access token.
6. Merchant submit order data to UMF. Call [Create a payment](#3-3-create-a-payment).
7. UMF sends a payment request to WeChat/Alipay.
8. WeChat/Alipay returns an URL of QR code to UMF.
9. UMF returns an ali_qr_scan object.
10. Merchant show the page of QR code to customer.
11. Customer finish the payment by scaning QR code.
12. UMF receives the result of deduction.
13. UMF sends the result to merchant.
14. Merchant shows the result to customer.


## 2.4 微信公众号支付

Merchants push product messages to their followers via Official Account. With WeChat Pay enabled, their followers can purchase products on the shopping page.

**It will be released in June 2017.**

<div class="mermaid">
sequenceDiagram
    participant Customer
    participant WeChat Browser
    participant Merchant
    participant UMF
    participant WeChat
    Customer\-\->>Merchant: 1. Order goods
    Merchant\-\->>Customer: 2. Generate order
    Customer\-\->>WeChat Browser: 3. Confirm order with access token
    Note right of WeChat Browser:  Call API with access token
    WeChat Browser\-\->>UMF: 4. Request authorization page(html and javascript)
    UMF\-\->>WeChat Browser: 5. Return autorization page.
    WeChat Browser\-\->>WeChat: 6. Request open_id
    WeChat\-\->>WeChat Browser: 7. Return open_id
    WeChat Browser\-\->>Merchant: 8. Redirect page to notify_url
    Merchant\-\->>WeChat Browser: 9. Return a pending page.
    WeChat Browser\-\->>Merchant: 10. Request wechat pay.
    Merchant\-\->>UMF: 11. Payment request
    UMF\-\->>WeChat: 12. Payment request
    WeChat\-\->>UMF: 13. Return payment info
    UMF\-\->>Merchant: 14. Return a WeChat_in_app_web object
    Merchant\-\->>WeChat Browser: 15. Activate payment widget
    WeChat Browser\-\->>WeChat Browser: 16. Call WeChat JS-API
    Customer\-\->>WeChat: 17. Enter password, finish payment
    WeChat\-\->>WeChat Browser: 18. Return pending info.
    WeChat Browser\-\->>WeChat Browser: 19. Redirect to ret_url.
    WeChat\-\->>UMF: 20. Deduction result.
    UMF\-\->>Merchant: 21. Payment result.
</div>

Explanation of the sequence chart：

1. Customer orders goods at merchant platform.
2. Merchant generates an order.
3. Customer confirms the order.
4. Call the authorization page from UMF.Call [Get WeChat open_id](#3-16-get-wechat-open_id).
5. UMF returns the authorization page.
6. The authorization page requests WeChat open_id. 
7. The WeChat returns the open_id of current WeChat user.
8. The authorization page redirect to notify_url(step 4).
9. **Optional**. The Merchat returns a pending page to wait.
10. **Optional**. The pending page request a payment.
11. Merchant send payment request to UMF.Call [Create a payment](#3-3-create-a-payment).
12. UMF sends payment request to WeChat.
13. WeChat returns payment info to UMF.
14. UMF returns a WeChat_in_app_web object.
15. Merchant returns info with WeChat_in_app_web object to browser.
16. The return page activates Wechat payment widget(WeChat JS-API).
17. Customer enter password and finish the payment in WeChat explore.
18. WeChat return ap pending page.
19. The pending page redirect to ret_url(step 11).
20. WeChat send the payment result to UMF.
21. UMF send the payment result to Merchat.

## 2.5 微信App支付

Merchants can integrate WeChat Pay SDK into their apps. When users make payment in other apps, WeChat will be authorized to process the payment. Once the transaction is done, the page will redirect to the merchant's app.

**It will be released in June 2017.**

<div class="mermaid">
sequenceDiagram
    participant Customer
    participant Merchant App Client
    participant Merchant App Server
    participant UMF
    participant WeChat
    Customer\-\->>Merchant App Client: 1. Order goods
    Merchant App Client\-\->>Customer: 2. Generate order
    Customer\-\->>Merchant App Client: 3. Confirm order
    Merchant App Client\-\->>Merchant App Server: 4. Request for initial a payment
    Note right of Merchant App Server: If the merchant have an unexpired access token. It can be used to make an API call
    Merchant App Server\-\->>UMF: 5. Optional. Acquire an access token
    UMF\-\->>Merchant App Server: 6. Return access_token
    Note right of Merchant App Server:  Using access token to make API call
    Merchant App Server\-\->>UMF: 7. Create a payment
    UMF\-\->>WeChat: 8. Request WeChat App payment
    WeChat\-\->>UMF: 9. Return JSON string, pay_info
    UMF\-\->>Merchant App Server: 10. Return a WeChat_in_app object
    Merchant App Server\-\->>WeChat: 11. Activate payment widget
    WeChat\-\->>Customer: 12. Payment widget Activated
    Customer\-\->>WeChat: 13. Enter password, finish payment
    WeChat\-\->>UMF: 14. Deduction result
    UMF\-\->>Merchant App Server: 15. Payment result
    Merchant App Server\-\->>Merchant App Client: 16. Payment result
    Merchant App Client\-\->>Customer: 17. Payment result
</div>

Explanation of the sequence chart：

1. Customer orders goods at merchant platform.
2. Merchant App Client generate an order.
3. Customer App Client confirm the order.
4. Request for initial a payment.
5. Optional. Merchant [acquire an access token](#3-1-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
6. UMF returns an access token.
7. Merchant app server submit order data to UMF. Call [Create a payment](#3-3-create-a-payment).
8. UMF sends payment request to WeChat.
9. WeChat returns payment info to UMF.
10. UMF returns a WeChat_in_app object to merchant app server.
11. Merchant app server activate Wechat payment widget.
12. WeChat payment widget activated.
13. Customer enter password and finish the payment in WeChat explore.
14. UMF receives the result of deduction.
15. UMF sends the result to merchant app server.
16. Merchant app server sends the result to merchant app client.
17. Merchant app client shows the result to customer.

## 2.6 退款

UMF support full refund or partial refund of a payment.

<div class="mermaid">
sequenceDiagram
    participant Customer
    participant Merchant
    participant UMF
    participant Bank
    Customer\-\->>Merchant: 1. select the goods to be returned and refunded
    Merchant\-\->>Customer: 2. Generate a refund order
    Customer\-\->>Merchant: 3. Confirm the refund order
    Note right of Merchant: If the merchant have an unexpired access token. It can be used to make an API call
    Merchant\-\->>UMF: 4. Optional. Acquire an access token
    UMF\-\->>Merchant: 5. Return access_token
    Note right of Merchant:  Using access token to make API call
    Merchant\-\->>UMF: 6. Request a refund
    UMF\-\->>Bank: 7. Refund request
    Bank\-\->>UMF: 8. Return refund result
    UMF\-\->>Merchant: 9. Return a refund object
    Merchant\-\->>Customer: 10. Refund result
</div>

Explanation of the sequence chart：

1. Customer select the goods to be returned and refunded at merchant platform. 
2. Merchant platform generates a refund order.
3. Customer confirm the refund order.
4. Optional. Merchant [acquire an access token](#3-1-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
5. UMF returns an access token.
6. Merchant request a refund with all order data to UMF. Call [Create a refund](#3-8-create-a-refund).
7. UMF sends a refund request to Bank.
8. Bank returns refund result to UMF.
9. UMF returns a refund object to merchant.
10. Merchant shows the result to customer.

## 2.7 网银直连

B2B Payment scenario: A Chinese company buys from a non-Chinese merchant.

The company can pay in CNY. The Merchant will get local currency, such as USD or CAD. See the [currencys](#currency-codes) we support. 

There are two steps to make a payment.

### The diagram of make a payment.

<div class="mermaid">
sequenceDiagram
    participant Company
    participant Merchant
    participant UMF
    participant Bank
    Company\-\->>Merchant: 1. Make a payment.
    Merchant\-\->>UMF: 2.Create a payment.
    UMF\-\->>Merchant: 3. Return the payment object.
    Merchant\-\->>Bank: 4. Redirect payment page to online bank.
    Bank\-\->>Company: 5. Show online payment page.
    Company\-\->>Bank: 6. Pay it online.
    Bank\-\->>UMF: 7. Payment result notification.
    UMF\-\->>Merchant: 8. Payment result notification.
    Merchant\-\->>UMF: 9. Upload all the required documents.

</div>

Explanation of the sequence chart：

1. The Company select the goods and request a payment.
2. Merchant platform calls UMF to create a payment. See []
3. UMF returns the created payment object. The payment object includes the URL to UMF payment service. Merchant should open a new window to UMF payment Service.
4. The merchant open a new window to the payment URL. The final page belongs to the bank. 
5. The bank returns the online payment page to the company.
6. The company fills all the information and commit. The payment must use  business bank account.
7. Bank send notification of the payment result to UMF.
8. UMF send notification of the payment result to Merchant.
9. If the payment is succeed, the merchant should upload all the required documents(contract, bills, invoices ...) to UMF via FTP protocol. UMF will check the documents offline. If everything is ok, the CNY will be exchanged to wanted currency.


## 2.8 收银台

B2B Payment scenario: A Chinese company buys from a non-Chinese merchant.

The company can pay in CNY. The Merchant will get local currency, such as USD or CAD. See the [currencys](#currency-codes) we support. 

There are two steps to make a payment.


### The diagram of make a payment.

<div class="mermaid">
sequenceDiagram
    participant Company
    participant Merchant
    participant UMF
    participant Bank
    Company\-\->>Merchant: 1. Make a payment.
    Merchant\-\->>UMF: 2.Create a payment.
    UMF\-\->>Merchant: 3. Return the payment object.
    Merchant\-\->>Bank: 4. Redirect payment page to online bank.
    Bank\-\->>Company: 5. Show online payment page.
    Company\-\->>Bank: 6. Pay it online.
    Bank\-\->>UMF: 7. Payment result notification.
    UMF\-\->>Merchant: 8. Payment result notification.
    Merchant\-\->>UMF: 9. Upload all the required documents.

</div>

Explanation of the sequence chart：

1. The Company select the goods and request a payment.
2. Merchant platform calls UMF to create a payment. See []
3. UMF returns the created payment object. The payment object includes the URL to UMF payment service. Merchant should open a new window to UMF payment Service.
4. The merchant open a new window to the payment URL. The final page belongs to the bank. 
5. The bank returns the online payment page to the company.
6. The company fills all the information and commit. The payment must use  business bank account.
7. Bank send notification of the payment result to UMF.
8. UMF send notification of the payment result to Merchant.
9. If the payment is succeed, the merchant should upload all the required documents(contract, bills, invoices ...) to UMF via FTP protocol. UMF will check the documents offline. If everything is ok, the CNY will be exchanged to wanted currency.


## 2.9 企业资质审查


- Register a company as a client of current Merchant.
- Use online payment to pay.

### The diagram of register a company.

<div class="mermaid">
sequenceDiagram
    participant Company
    participant Merchant
    participant UMF
    participant Bank
    Company\-\->>Merchant: 1. Commit documents.
    Merchant\-\->>UMF: 2.Commit documents.
    UMF\-\->>Bank: 3. Commit documents.
    Bank\-\->>UMF: 4. Return verify result.
    UMF\-\->>Merchant: 5. Return verify result.
    Merchant\-\->>UMF: 6. Regiter a company.
    UMF\-\->>Merchant: 7. Return the information of registered company.
</div>

Explanation of the sequence chart (**offline**)：

1. The company commit all the required documents to the Merchant. 
2. The Merchant commit documents to UMF.
3. UMF check the document and sent it to the bank.
4. The bank verify if the company is qualifed to do the business, Then send the result to UMF.
5. UMF returns the result to Merchant.
6. **online**. If the company is ok, The merchant will create a company.
7. **online**. UMF return the information of created company. The most important thing is the company id.