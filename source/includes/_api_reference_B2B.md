# 4. B2B Reference

## 4.1 Regiest a company

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
  "external_enterprise":{
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

### Request

**POST**:/enterprise_qualification

The merchant should register their customers in UMF. The status of company is "DISABLE" when it is created. Then the merchant should commit required documents to UMF offline. UMF will commit those documents to the bank where company open their business bank account. If the verication is success, the status will be changed to "ENABLE".

<aside class="notice">
Important: The company can not make a payment online, until the company's status is "ENABLE".
</aside>

Parameters:

Parameters | Description
------- | -------
[enterprise_qualification](#enterprise_qualification) | Object. The enterprise qualification information. 

### Response

The Response includes meta information and a enterprise_qualification object. See the example. 

## 4.2 Query regiest status

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
  "EnterpriseQualification": {
    "external_enterprise_id": "10000122",
    "busi_type": "GFHG",
    "enterprise_status": "ENABLE",
    "rank": "A",
    "enterprise_name": "华西电子商务有限公司"
  }
}
```

### Request

**GET**:/enterprise_qualification/enterprise_id

This is a http get request. The parameter should be replaced by the real id of enterprise_qualification object.

### Response

Parameters:

Parameters | Description
------- | -------
[enterprise_qualification](#enterprise_qualification) | Object. The enterprise qualification information. 

## 4.3 Create a payment

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

Creates a payment for B2B business. The payer must use a business bank account.

The payment type should be "B2B_ONLINE_BANKING" and the 

Parameters:

Parameters | Description
------- | -------
[payer](#payer) | Object. The payment information. 
[order](#order) | Object. The order information. Includes sub orders.
notify_url | String. Url of the merchant server. To receive the payment result.

Response:

Parameters | Description
------- | -------
[payer](#payer) | Object. The payment information. 
[order](#order) | Object. The order information. Includes sub orders.
notify_url | String. Url of the merchant server. To receive the payment result.
[links](#link) | Object Array. The next step links. Depends on the status and payment type. Those links are HATEOAS links.

Payment result notification

After processing the payment request data of the merchant, UMF will call merchant's service with the payment result.

Merchant should give a response after receiving the call.

It is the same with B2C notification. See [3.5 Payment result notification](#3-5-payment-result-notification)

## 4.4 Upload transaction files

After the success of payment, The merchant should upload all the document of the transaction via FTP protocol. The address, username, password should be given by UMF once the merchant account was created.

The rules of file upload:

1. Every payment need to upload related files.
1. The files should include the contact and the invoice.
1. All the files of one transaction should be compressed into one file. The format is ZIP.
1. Merchant only have the write privillage of FTP folder, The uploaded file can not be deleted by merchant.
1. The file name should follow the rule: mer_reference_id + mer_date + sequence_num(4 digitals).zip. The mer_reference_id and mer_date should be the same with the created payment. The sequence_num is the sequence of the same payment. If the uploaded file have some error, the merchant needs to upload another zipped file with different sequence number.
1. The uploaded files will be verified by the staffs of UMF. Once the verification is done, UMF exchange the money from CNY to other currency. If the verification does not pass within 24 hours, the payment will be canceled. The money will be returned to payer.

## 4.5 Query a payment

It is the same with B2C query a payment. See [3.6 Query a payment](#3-6-query-a-payment)

## 4.6 Create a refund

It is the same with B2C create a refund. See [3.7 Create a refund](#3-7-create-a-refund)

## 4.7 Query a refund

It is the same with B2C query a refund. See [3.8 Query a refund](#3-8-query-a-refund)

## 4.8 Download transaction list

It is the same with B2C download transaction list. See [3.11 Download transaction list](#3-11-download-transaction-list)

## 4.9 Download reconciliation statement

It is the same with B2C download reconciliation list. See [3.12 Download reconciliation statement](#3-12-download-reconciliation-statement)

## 4.10 Query exchange rate

Get the real-time exchange rate. The returned information is the corresponding amount of CNY.

See [3.13 Query exchange rate](#3-13-query-exchange-rate)