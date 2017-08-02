# 4. B2B

## 4.1 企业资质录入

```shell
## request data:
$ curl -v -X POST https://uatfx.soopay.net/cberest/v1/enterprise_qualification \
-H "Content-Type:application/json" \
-H "Authorization=Bearer ea3b83b316d97bd78166475fe36a3f7219d79e8d04bfc784dec424fba0e9462f" \
-H "Signature=p+owOiuS9eVrDQIHaP9CwwR89k996MdALuetVW9SKpBJvbvQdO8Sx8P1wlgIN9naa9YQeha/oiVhTFh57dtEpE92HU4jsYXZ2aj8puIP6IXbyDG18vr7Qs1sCfdtT7ziXrv31BIIahn6HKZLtVf/fus2NIyO7f2zl+b34In4dM=" \
-d '{ 
  "enterprise_qualification": {
    "external_enterprise_id": "10000125",
    "enterprise_name": "华西电子商务有限公司",
    "enterprise_phone": "13241359611",
    "enterprise_email": "fengjian@umpay.com",
    "enterprise_contacts": "FengJian1",
    "busi_type": "GFHG",
    "enterprise_code": "90000331"
  }
} '

## Response data:
{
  "meta": {
    "sign": "KkIbGZXg49qqc6hHON/+dkxzqu+DYM3BvZ2iwK45SXnGLsH3fCX0lDXb2cf56/cRkI6/oZqlP8vqzRJEeKaopr1oVZTprynSRBthtvcTVZxF+mBLE53A1V3uLPO6qE6Tcg9Ex+nlDm0/ivGGka7kt5u1xpWyfXHRGeaJ8DLbr2c=",
    "ret_msg": "Success",
    "ret_code": "0000"
  },
  "enterprise_qualification":{
    "external_enterprise_id": "10000125",
    "enterprise_name": "华西电子商务有限公司",
    "enterprise_phone": "13241359611",
    "enterprise_email": "fengjian@umpay.com",
    "enterprise_contacts": "FengJian1",
    "busi_type": "GFHG",
    "enterprise_code": "90000331"
   },
   "links": [
    {
      "ref": "self",
      "method": "GET",
      "href": "https://uatfx.soopay.net/cberest/v1//enterprise_qualification/EQ_GEYDAMBQGEZDK7CHIZEEOMRQGE3TANRRGNJQ"
    }
  ]
}
```

### 请求

**POST**:/enterprise_qualification

商户应该在UMF登记用户,企业的状态在创建时为“禁用”,之后商户应离线向UMF提交所需文件,UMF将向企业开户的银行提交文件,如果验证成功，状态将更改为“启用”。.

<aside class="notice">
重点: 企业资质状态为"启用"之前不能进行在线付款.
</aside>

参数:

参数 | 描述
------- | -------
[enterprise_qualification](#enterprise_qualification) | 对象. 企业资质信息. 

### 响应

响应结果包含meta信息和enterprise_qualification对象. 请参见示例. 

## 4.2 企业资质查询

```shell
## Request data:
curl -v -X GET \
https://uatfx.soopay.net/cberest/v1/enterprise_qualification/EQ_GEYDAMBQGEZDK7CHIZEEOMRQGE3TANRRGNJQ

## Response data:
{
  "meta": {
    "sign": "GEy9+f2xwLcoMy5cvEsEPUima8A74fJXG9mpyy9qC/9tbvzXvmgcl3oS03ra19PxwFubw5GjpIeYk0E8G3xm0LiJ2LHUF6zLEQH/zt/ioPxcb+s15hY92ZioV8RKNvl16W7w/nonB/tYBkMQAD+1cCDPelVrIYdH4+pwSK4SJ+s=",
    "ret_msg": "Success",
    "ret_code": "0000"
  },
  "enterprise_qualification": {
    "external_enterprise_id": "10000122",
    "busi_type": "GFHG",
    "enterprise_status": "ENABLE",
    "rank": "A",
    "enterprise_name": "华西电子商务有限公司"
  }
}
```

### 请求

**GET**:/enterprise_qualification/enterprise_id

http get请求. enterprise_id应该使用enterprise_qualification对象的id替换.

### 响应

参数:

参数 | 描述
------- | -------
[enterprise_qualification](#enterprise_qualification) | 对象. 企业资质信息. 

## 4.3 下单

```json
## Request
{
  "payer": {
    "payment_method": "B2B_ONLINE_BANKING",
    "bank_code": "CCB",
    "payer_info": {
      "bank_card": {
        "number": "",
        "citizen_id_number": "",
        "citizen_id_type": "",
        "payer_name": "",
        "valid_date": "",
        "cvv2": "",
        "phone": "18234048022",
        "external_customer_id": "10006666"
      }
    },
    "interface_type": "CHECKOUT_COUNTER_WEB"
  },
  "order": {
    "mer_reference_id": "1210586144",
    "mer_date": "20170613",
    "amount": {
      "total": "200.04",
      "currency": "CNY"
    },
    "order_summary": "maimaimai",
    "expire_time": "360",
    "sub_orders": [
      {
        "mer_sub_reference_id": "12105861441",
        "trans_code": "03223010",
        "sub_trans_type": "3",
        "amount": {
          "total": "100.02",
          "currency": "CNY"
        },
        "invoice_id": "123456"
      },
      {
        "mer_sub_reference_id": "12105861442",
        "trans_code": "01121990",
        "sub_trans_type": "1",
        "amount": {
          "total": "100.02",
          "currency": "CNY"
        },
        "is_customs": "TRUE",
        "invoice_id": "123456",
        "items": [
          {
            "mer_item_id": "121058614411",
            "type": "FOOD",
            "name": "banana",
            "item_quantity": "2",
            "description": "banana",
            "amount": {
              "total": "50.02",
              "currency": "CNY"
            }
          },
          {
            "mer_item_id": "121058614412",
            "type": "ELECTRONIC",
            "name": "yifu",
            "item_quantity": "3",
            "description": "yifu",
            "amount": {
              "total": "50.00",
              "currency": "CNY"
            }
          }
        ]
      }
    ]
  },
  "notify_url": "http://10.10.38.49:2216/spay_rest/payments/test/mer",
  "ret_url": "http://10.10.38.49:2213/notify0000V4.jsp"
}

## Response
{
  "meta": {
    "sign": "JiY77j5jYaPxHeGZzDI/7crsFejx229y0M+gailYGIxiMK5mTzjYYwu06WbF5iWAMAvMCF+sY00DSovTSMIWn9RFAvc2k/a0RLLnpOzj1sFhIkYE+SrPM9E28lhif61qLBbzJrfkpcsi2ILCVIvUPsk0wNILZZGH7Tsr1AJ1IWI=",
    "ret_msg": "Success",
    "ret_code": "0000"
  },
  "payment": {
    "state": "TRADE_SUCCESS",
    "payer": {
      "payer_info": {}
    },
    "order": {
      "amount": {
        "total": "200.04",
        "exchange_rate": {
          "rate": "1.0000",
          "currency": "CNY"
        },
        "currency": "CNY",
        "total_cny": "200.04"
      },
      "mer_date": "20170613",
      "mer_reference_id": "1210586144"
    }
  },
  "links": [
    {
      "ref": "self",
      "method": "GET",
      "href": "http://10.10.38.49/V1/payments/payment/PAY_GM3TANRRGMYTEMJQGA4TGOBQGIZDAMJXGA3DCM5V"
    },
    {
      "ref": "refund",
      "method": "POST",
      "href": "http://10.10.38.49/V1/payments/payment/PAY_GM3TANRRGMYTEMJQGA4TGOBQGIZDAMJXGA3DCM5V/refund"
    },
    {
      "ref": "apply_to_customs",
      "method": "POST",
      "href": "http://10.10.38.49/V1/payments/payment/PAY_GM3TANRRGMYTEMJQGA4TGOBQGIZDAMJXGA3DCM5V/apply_to_customs"
    },
    {
      "ref": "upay",
      "method": "GET",
      "href": "http://10.10.38.49:1122/upay/cbPluginPay.do?expireTime=2017-06-13 18:10:59.786&busiId=06&isShowFrame=Y&interfaceType=02&oriAmount=20004&exchangeRate=1&rpid=PSP121059abe9b05&busiPayUrl=http%3A%2F%2F10.10.38.49%3A8888%2Fpaybusi%2FA01002&currency=CNY&amount=20004&isShowTransUse=N&retUrl=http%3A%2F%2F10.10.38.49%3A1122%2Fupay%2FcbPluginPayReturn.do&payDate=20170613&notifyUrl=http%3A%2F%2F10.10.38.49%2FV1%2Fspay%2Fpay%2FwyPayNotify.do&orderId=1210586144&instId=20000001&trace=3706131210346882&isCollectUserInf=N&merId=9994&idenCheckFlag=N&goodsInf=maimaimai&isShowCustomServiceInf=Y&cbAmount=20004&merName=联动优势CB测试&payType=1&orderDate=20170613&binBankId=B004&sign=550493a168aa76ee75aa419791a90eda9efa3b77"
    }
  ]
}

```

**POST**: /payments/payment

B2B交易的下单. 付款人必须使用企业到银行账户.

支付类型为"B2B_ONLINE_BANKING" 

参数:

参数 | 描述
------- | -------
[payer](#payer) | 对象. 付款信息. 
[order](#order) | 对象. 订单信息. 包含子订单.
notify_url | 字符串. 商户服务器地址. 用于接收支付结果.

响应:

参数 | 描述
------- | -------
[payer](#payer) | 对象. 支付信息. 
[order](#order) | 对象. 订单信息. 包含子订单.
notify_url | 字符串. 商户服务器地址. 用于接收支付结果.
[links](#link) | 对象数组. 下一步操作的链接. 取决于状态和支付类型. 这些链接是HATEOAS 链接.

支付结果通知

当处理完商户的支付请求数据后,UMF会将支付结果发送到商户的服务器.

接收到请求后商户需要响应.

和B2C的通知一致. 请参见 [3.5 支付结果通知](#3-5)

## 4.4 上传交易明细文件

支付成功后, 商户需要通过FTP协议上传交易的所有文档. 一旦商户账号创建完成,UMF需要向商户发送地址,用户名和密码.

文件上传规则:

1. 每笔付款都需要上传相关文件.
1. 文件需要包括联系人和发票.
1. 一笔交易的所有文件应该压缩成一个文件,格式是zip.
1. 商户仅有向FTP文件夹写的权限, 商户不能删除已经上传的文件.
1. 文件名应该遵循的规则：mer_reference_id + mer_date + sequence_num（4位）.zip. mer_reference_id和mer_date应该与下单是一样的. sequence_num是相同支付的序列. 如果上传的文件有错误, 商户需要上传另一个带有不同序列号的压缩文件.
1. UMF的工作人员会校验上传的文件F. 校验完成后, UMF将金额由人民币兑换成对应的货币. 如果校验没在24小时内完成，付款将取消. 金额将退回到支付人.

## 4.5 付款查询

和B2C付款查询相同. 请参见 [3.6 付款查询](#3-6)

## 4.6 退款

和B2C退款相同. 请参见 [3.7 退款](#3-7)

## 4.7 退款查询

和B2C退款查询查询相同. 请参见 [3.8 退款查询](#3-8)

## 4.8 结算列表下载

和B2C结算列表下载相同. 请参见 [3.11 结算列表下载](#3-11)

## 4.9 对账文件下载

和B2C对账文件下载相同. 请参见 [3.12 对账文件下载](#3-12)

## 4.10 汇率查询

和B2C汇率查询相同. 返回信息是人民币的对账金额.

请参见 [3.13 汇率查询](#3-13)