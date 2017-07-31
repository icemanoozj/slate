# 5. Object Definitions

## address

Parameter | Description
----------|------------
recipient_name  | The name of recipient.
line1  | The first line of the address. For example, number, street, and so on. Maximum length is 100 characters.
line2 | The second line of the address. For example, suite, apartment number, and so on. Maximum length is 100 characters.
city  | The city name. Maximum length is 50 characters.
state  | The two-letter code for US states or the equivalent for other countries. Maximum length is 100 characters.
country_code  | [The two-character country code ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
postal_code  | The zip code or equivalent. Maximum length is 20 characters. Required in certain countries.
phone | The phone number's maximum length is 50 characters.

## amount

Parameter | Description
----------|------------
total | The total amount charged or refunded. Maximum length is 10 characters. Supports two decimal places.
currency | [The three-character currency code ISO-4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes).
total_cny | The amount in CNY(Chinese Yuan). **Optional**.
exchange_rate | The exchange_rate. **Optional**.

## bank

Parameter | Description
----------|------------
name | The full name of bank.English.
name_zh | The full name of bank. 
code | The abbreviation of bank. Available in China.
logo_url | The url of the logo of bank.
types | The bank types are supported by the bank. Allowed values: **CREDIT_CARD**, **DEBIT_CARD**

### Banks supported by credit card payment

No.  | Bank code  | Bank 
-----|------------|------
1 | ICBC | Industrial and Commercial Bank of China 
2 | CCB | China Construction Bank 
3 | ABC | Agricultural Bank of China 
4 | BOC | Bank of China 
5 | PSBC | Postal Savings Bank of China
6 | COMM  | Bank of Communications 
7 | CITIC | China Citic Bank 
8 | CEB | China Everbright Bank 
9 | HXB | Hua Xia Bank 
10 | CMBC | China Minsheng Bank 
11 | CMB | China Merchants Bank 
12 | SHB  | Bank of Shanghai 
13 | BJB | Bank of Beijing 
14 | BEA | Bank of East Asia 
15 | CIB | China Industrial Bank 
16 | NBB | Bank of Ningbo 
17 | SPDB | Shanghai Pudong Development Bank 
18 | GDB | Guangdong Development Bank 
19 | SPAB | Ping An Bank 
20 | BSB | Baoshang Bank 
21 | CSCB | Bank of Changsha 
22 | CDB | Bank of Chengde 
23 | CDRCB | Chengdu Rural Commercial Bank 
24 | CRCB | Chongqing Rural Commercial Bank 
25 | CQB | Bank of Chongqing 
26 | DLB | Bank of Dalian 
27 | DYCCB | Dongying Commercial Bank 
28 | ORBANK | Erdos Bank 
29 | FJNXB | Rural Credit Cooperative of Fujian 
30 | GYB | Bank of Guiyang 
31 | GCB | Bank of Guangzhou 
32 | GRCB | Guangzhou Rural Commercial Bank 
33 | HEBB | Harbin Bank 
34 | HNNXB | Rural Credit Cooperative of Hunan 
35 | HSB | Huishang Bank 
36 | BHB | Bank of Hebei 
37 | HZCB | Bank of Hangzhou 
38 | BOJZ | Bank of Jinzhou 
39 | CSRCB | Jiangsu Changshu Rural Commercial Bank 
40 | JSB | Bank of Jiangsu 
41 | JRCB | Jiangyin Rural Commercial Bank 
42 | JJCCB | Bank of Jiujiang 
43 | LZB | Bank of Lanzhou 
44 | DAQINGB | Bank of Longjiang 
45 | QHB | Bank of Qinghai 
46 | SHRCB | Shanghai Rural Commercial Bank 
47 | SRB | Bank of Shangrao 
48 | SDEB | Shunde Rural Commercial Bank 
49 | TZCB | Bank of Taizhou 
50 | WHSHB | Weihai City Commercial Bank 
51 | WFCCB | Bank of Weifang 
52 | WZCB | Bank of Wenzhou 
53 | URMQCCB | Urumqi City Commercial Bank 
54 | WRCB | Wuxi Rural Commercial Bank 
55 | YCCB | Yichang City Commercial Banks 
56 | YZB | Bank of Yinzhou 
57 | CZCB | Zhejiang Chouzhou Commercial Bank 
58 | ZJTLCB | Zhejiang Tailong Commercial Bank 
59 | MTBANK | Zhejiang Mintai Commercial Bank 
60 | NJCB | Bank of Nanjing 
61 | NCB | Bank of Nanchang 
62 | QLBANK | Qilu Bank 
63 | YDRCB | Yaodu Rural Commercial Bank 
64 | WJRCB | Wujiang Rural Commercial Bank 

### Banks supported by debit card payment 

NO. | Bank code  | Bank
----|------------|-----
1 | SPDB | Shanghai Pudong Development Bank 
2 | CCB | China Construction Bank 
3 | ABC | Agricultural Bank of China 
4 | BOC | Bank of China 
5 | CITIC | China Citic Bank 
6 | CEB | China Everbright Bank 
6 | CMB | China Merchants Bank
7 | ICBC | Industrial and Commercial Bank of China
8 | CMBC | China Minsheng Bank
9 | GDB | Guangdong Development Bank
10 | COMM | Bank of Communications
11 | SPAB | Ping An Bank
12 | HXB | Hua Xia Bank
13 | PSBC | Postal Savings Bank of China
14 | CIB | China Industrial Bank

## bank_card

Parameter | Description
------- | -------
number | String. **Must be encrypted**. The card number. 
valid_date | String. **Must be encrypted**. The valid date of bank card.
cvv2 | String. **Must be encrypted**. CVV2 of bank card.
card_holder | String. **Must be encrypted**. The name of card holder
external_customer_id | String. The customer id in merchant system.
state | ENUM. The state of bank card.
phone | String. The phone number registered in the bank card issuer.
citizen_id_type | ENUM. The type of citizen id. Currently, it must be **IDENTITY_CARD**.
citizen_id_number | String. **Must be encrypted**. Citizen id number.

## customs_declaration

Parameter | Description
------- | -------
id | String. ID of object.
sub_order | Object. The sub_order object.
customs_id | The customs channel number during customs declaration (such as HZ, NB and GZ respectively represents for Hangzhou, Ningbo and Guangzhou).
mer_customs_code | The merchant ID in customs.
freight_amount | Object. Amount object. Freight payment.
tax_amount | Object. Amount object. Customs tax.
ec_plat_id | Account number of E-commerce platform in Customs's system.
notify_url | The url of merchant service. To receive the notification from UMF.
state | ACCEPTED <br /> SUBMITTED <br /> SUCCESS <br /> FAIL.
customs_clearance_date | request customs date format is yyyymmdd.

## exchange_rate

Parameter | Description
------- | -------
currency | ENUM. The code of currency.
rate | String. The exchange rate.

## enterprise_qualification

The qualification of enterprise. It is used in B2B business.

Parameter | Description
------- | -------
external_enterprise_id | String. The id of enterprise in Merchant's system.
enterprise_name | String. The name of enterprise.
enterprise_phone | String. the phone number of contact.
enterprise_email | String. The email of contact.
enterprise_contacts | String. The name of contact .
enterprise_status | ENUM. <br/>**ENABLE**: Enterprises passed the qualification audit<br/>**UNKNOWN**:Enterprise qualification audit processing
busi_type | ENUM. The business type of the company. <br />**-SJHG**: For the company which exchange money to CNY. <br /> **-GFHG**: For the company which exchange money from CNY.
enterprise_code | String. The unified social credit code system for legal entities and other organizations. See [Uniform Social Credit Code](http://english.gov.cn/policies/latest_releases/2015/06/17/content_281475129090642.htm) ([中文版: 统一社会信用代码](http://baike.baidu.com/item/%E7%BB%9F%E4%B8%80%E7%A4%BE%E4%BC%9A%E4%BF%A1%E7%94%A8%E4%BB%A3%E7%A0%81))


## item

Item is the information of same goods in a sub_order object.

Parameter | Description
------- | -------
mer_item_id | String. The ID in merchant system.
type | ENUM. The type of goods. <br/> **CLOTHING** <br/> **FOOD** <br/> **ELECTRONICS** <br/> **OTHER**
name | String. The goods name.
description | String. The description of goods.
[amount](#amount) | Object. The amount object. The price of goods.
quantity | Number. The quantity of goods.


## link

The link object is a part of payment object, refund object. It is the next available step of those objects. The link depends on the state of object.

Parameter | Description
------- | -------
href | String. The url of object. It may be the object or the available actions of the object.
rel | String. The relation of url and the object.
method | ENUM. The http method. POST, GET


## meta

The meta object is one part of each response. It includes the common information of response.

Parameter | Description
------- | -------
ret_code | The return code of current response.
ret_msg | The message of current response.
sign | The signature of current response. The receiver should verify the signature by UMF public key.


## order

The order information. The detail information of order items must be in the sub_order object.

Parameter | Description
------- | -------
[amount](#amount) | Object. The total amount of an order.
order_summary | String. The summary of an order.
mer_reference_id | String. The ID of order. The same order ID of a merchant will pay only once.
mer_date | String. The order date. This time will show as-is in the statement. 
expire_time | String. The payment deadline. If the time expires, UMF will not execute the payment.
sub_orders | Object Array. The array of [sub_order](#sub_order) objects. Each sub_order can only have same type goods.
state | ENUM. The state of order.
user_ip | String. This is the IP address when a customer makes a payment request.


## pagination

Some API endpoints which return large amount of objects will return paginated responses; as well as the list of objects there will also be a pagination key in the response:

Parameter | Description
------- | -------
total_count | Number. The total number of transaction list.
page_number | Number. The current page number (starts at 1).
page_size | Number. The number of objects on each page.

## payer

The payer information.

Parameter | Description
------- | -------
payment_method | ENUM. The payment method. The value should be one of the following:<br />- **CREDIT_CARD** : Pay by credit card. <br /> [See the workflow chart of bank card payment](#2-2-pay-by-credit-card-or-debit-card).<br /> - **DEBIT_CARD**: Pay by debit card. <br /> [See the workflow chart of bank card payment](#2-2-pay-by-credit-card-or-debit-card).<br /> - **WECHAT_SCAN**: UMF return a QR-Code String. The customer may use their WeChat scan the QR-Code to pay. <br />  [See the workflow chart of QR Code scan payment](#2-3-pay-by-wechat-alipay-qr-code-payment).<br /> - **WECHAT_IN_APP**: The customer may pay for the order inside a native app. <br /> [See the workflow chart of Wechat In-App payment](#2-5-pay-by-wechat-in-app-payment).<br /> - **WECHAT_WEB**: The customer may pay for the order inside the WeChat browser. <br /> [See the workflow chart of In-App Web-based payment](#2-4-pay-by-wechat-in-app-web-based-payment).<br /> - **ALIPAY_SCAN**: UMF returns a QR-Code String. The customer may use their Alipay to scan the QR-Code to pay. <br /> [See the workflow chart of QR Code scan payment](#2-3-pay-by-wechat-alipay-qr-code-payment). <br /> - **NOT_APPLICABLE**: When interface_type is either SERVER_TO_WEB or DIRECT_TO_BANK.
[bank_code](#bank) | String. The abbreviation of bank. Available in China. See [Banks](#banks-supported-by-credit-card-payment)
business elements object | Object. The name of this parts is different, depends on the business_type. It can be the following objects. <br/> [payer_info](#payer_info) for B2C. <br/> [enterprise_qualification](#enterprise_qualification) for B2B.
interface_type | ENUM. The type of payment interface. The value should be one of the following: <br /> - **SERVER_TO_SERVER** : API call <br> - **SERVER_TO_WEB** : Server to UMF website <br/> - **DIRECT_TO_BANK** : Online bank, if payment_method is NOT_APPLICABLE then bank_code must be send.
business_type | ENUM. The value should be one of the following: <br/> - **B2B** : Business to business.<br/> - **B2C** : Business to consumer.
Available payment_method for each **interface_type** and **business_type**.

interface_type | B2C | B2B
---------------|-----|----
**SERVER_TO_SERVER** | CREDIT_CARD <br /> DEBIT_CARD <br /> WECHAT_SCAN <br /> WECHAT_IN_APP <br/> WECHAT_WEB <br/> ALIPAY_SCAN |  
**SERVER_TO_WEB** | CREDIT_CARD <br /> DEBIT_CARD <br /> WECHAT_SCAN <br /> ALIPAY_SCAN <br/> NOT_APPLICABLE |
**DIRECT_TO_BANK** | WECHAT_SCAN <br /> ALIPAY_SCAN  | NOT_APPLICABLE

## payer_agreement

Payer agreement represents a card of the customer. Merchant may use this object instead of bank_card object for security.

Parameter | Description
------- | -------
usr_busi_agreement_id  | This ID is a unique ID for each user of a merchant.
usr_pay_agreement_id  | This ID is a unique ID for each card of a usr_busi_agreement_id.
gate_id  | The bank code.
last_four_cardid  | The last four card numbers.
valid_date  | The valid date of card.
cvv2  | The CVV2 of card.

## pay_info

The pay_info object includes the information of WeChat In-App Payment and WeChat In-App Web-based Payment. 

Parameter | Description
------- | -------
app_id | String. The unique identifier of the Official Account of UMF
time_stamp | String. The number of seconds that have elapsed since 00:00:00 Coordinated Universal Time (UTC), Thursday, 1 January 1970.
sign_type | String. The type of signature. It will be "MD5" in this scenario.
package | String. The ID of this WeChat payment.
nonce_str | String. A random string for the generated signature.
pay_sign | String. The signature of this request.

## payer_info

The information of payer.

Parameter | Description
------- | -------
phone | String. The payer's phone number.
name | String. **Must be encrypted**. The name of payer.
pay elements object | Object. The name of this parts is different, depends on the payment_method. It can be the following objects.<br /> [bank_card](#bank_card). For pay_type: CREDIT_CARD, DEBIT_CARD <br /> [qr_code_scan](#qr_code_scan). For pay_type: WECHAT_SCAN, ALIPAY_SCAN <br /> [wechat_in_app](#wechat_in_app) For pay_type: WECHAT_IN_APP <br /> [wechat_in_app_web](#wechat_in_app_web) For pay_type: WECHAT_WEB <br /> [payer_agreement](#payer_agreement) For pay_type: CREDIT_CARD, DEBIT_CARD 
verify_code | String. Only available in bank_card payment. The bank should send a verification code to customer. This verification code will be submitted to bank to prevent fraud.

## payment

Payment object is the core concept of this API. It has the following information:

parameters | Description
------- | -------
id | String. The ID of payment object.
[payer](#payer) | Object. The payment information.
[order](#order) | Object. The order information. Includes sub orders.
state | ENUM. <br />**-WAIT_BUYER_PAY**: The payment need to be paid. <br /> **-TRADE_SUCCESS**: The payment was succcessufl.<br /> **-TRADE_CLOSED**:The payment was closed because the order was expired.<br /> **-TRADE_CANCEL**: The payment was cancelled.<br /> **-TRADE_FAIL**: The payment was failed.
notify_url | String. Url of the merchant server. To receive the payment result.
ret_url | String. The return url after the payment was done. Only availabled when the merchant uses the checkout web page of UMF.
execute_success_time | String. The time of transfer money from customer to UMF.
mer_check_date | String. The date of this transaction. This date is from merchant system. It does not have timezone information. The transaction will be marked as this date in the transaction list and the reconciliation statement.
settle_date | String. The date of this transaction in UMF.
[risk_info](#risk_info) | Object. The information for anti fraud. Its content depends on the contract between the merchant and UMF.
[links](#link) | Object Array. The next step links. Depends on the status and payment type. Those links are HATEOAS links.

## payment_summary

The summary of a payment object. It is contained in a transactions object or a reconciliations object.

Parameter | Description
------- | -------
payment_id | The id of payment.
phone_number | User's phone number. **Only available in transactions object.**
order_date | String. The date of order placed.
mer_reference_id | String. The reference id of the order.
amount | [Object](#amount). Includes the following parameters: cb_amount, cny_amount, currency, exchange_rate.
settle_date | String. The date of charge request submitted.
execute_success_time | The timestamp of charge. The timestamp of  transaction done.
state | See the define of [payment](#payment).
product_id | String. The product id of UMF.
service_fee | The service fee in CNY. **Only available in reconciliations object.**
exchange_amount | The amount of make exchange, it is an amount object. Includes the following parameters: cb_amount, cny_amount, currency, exchange_rate. **Only available in reconciliations object.**
exchange_date | The date of making exchange. **Only available in reconciliations object.**

## qr_code_scan

Merchant creates QR code for each order. After users scan these codes by WeChat or AliPay, they can see related product information and transaction guides on their phone. This object can be used for WeChat or AliPay.

If the merchant want to show a QR-Code to customer for scanning, a wechat_qr_code object needs to include in the payer_info object.

Parameter | Description
------- | -------
citizen_id_type | ENUM. The type of citizen id. Currently, it must be **IDENTITY_CARD**.
citizen_id_number | String. **Must be encrypted**. Citizen id number.
qr_code_url | String. The url of wechat QR-Code pay. Thiis information is returned by UMF.

The qr_code_url is the content of QR-Code. The merchant use standard tools transfer the url to a QR-Code. When user scan this QR-Code by WeChat or AliPay, they can pay with WeChat or AliPay.

## reconciliations

The information of reconciliations.

Parameter | Description
------- | -------
payment_summaries | Object Array of [payment_summary](#payment_summary).
refund_summaries | Object Array of [refund_summary](#refund_summary).
settle_date | String. The settlement date.
amount | Object. The total amount of this reconciliations.
pagination | Object. The pagination Object which gives you information about the number of pages in the result, and how many objects are returned.

## refund

Refund object depends on a payment object. One payment may connect many refund objects, which means one payment can be refunded multiple times. The total amount of refund objects must be no more than the amount of payment object. It has the following information:

Parameters | Description
------- | -------
id | String. The ID of refund object.
[order](#order) | Object. It is an order object which includes the goods information to be returned.
notify_url | String. The merchant service url. To receive the refund result.
state | ENUM. The state of refund object. **REFUND_PROCESS**, **REFUND_SUCCESS**, **REFUND_FAIL**, **REFUND_CLOSE**.
parent_payment | String. The ID of parent payment object.

## refund_summary

The summary of a payment object. It is contained in a transactions object or a reconciliations object.

Parameter | Description
------- | -------
refund_id | The id of refund.
payment_id | The id of parent payment.
phone_number | User's phone number. **Only available in transactions object.**
amount | [Object](#amount). Includes the following parameters: cb_amount, cny_amount, currency, exchange_rate.
settle_date | String. The date of refund request submitted.
execute_success_time | The timestamp of transaction done.
state | See the define of [refund](#refund).
mer_sub_reference_id | The reference id of sub-order. **Only available in reconciliations object.**


## risk_info

This object is the information of transaction. UMF uses this info to approve or deny the transaction. If the risk of fraud is too high, this transaction will be denied. The anti fraud algorithm will be periodically adjusted.The following parameter values are string types.

Field name | desc | Field description | Send or not 
-------|--------------|--------------------|-------------
goods_type | Category of commodities | ENUM. <br/> `0` virtual goods <br/> `1` physical goods <br/> `2` air ticket <br/> `3` electronics | Y
real_name | Real name purchase | ENUM. <br/> `0` not real name system <br/> `1` real name system | Y
business_type | Category of business  | ENUM `3` Cross-border Payment | Y
trans_type | Transaction type  | ENUM. <br/> `01` Deposit <br/> `02` Purchase | Y
receiver_name | Name of the recipient  | When **goods_type** is either `1` or `3`, it is required to send this field. | C
receiver_moblie_id | Phone number of the recipient | When **goods_type** is either `1` or `3`, it is required to send this field. <br /> Such as: 13800011111 | C
receiver_address | Delivery address  |  When **goods_type** is either `1` or `3`, it is required to send this field. | C
registration_identify_code | identity card number | Registrant identity card number,  When **real_name** is `1`, it is required to send this field. | C
registration_email | Registered email  | Email of the customer used for registration, must be verified by the merchant | N
registration_moblie_id | mobile phone number | Registrant mobile phone number | N
device_id | Device identification  | For example, the MAC code of mobile phone or the terminal identification ID defined internally.  | N
device_type | Type of Device  | If from the Web terminal, the user shall not be blank. APP can be blank.  | N
user_id | User ID  | UserID at the merchant platform | N
registration_time | User Registration time | The time that the user registers for the product, which shall be read exactly on the second. <br />Such as:20150311120000 | N
user_agent | Production form  | ENUM. <br/> `1` android app <br/> `2` IOS app <br/> `3` PC (web page) <br/> `4` Mobile phone(wap, or html5 page);  | N
success_transactions_number | The number of successful transactions | The number of successful transactions on the merchant platform | N



[comment]: # (statement)

## sub_order

The same trans_code of goods should in the same sub_order object.

Parameter | Description
------- | -------
mer_sub_reference_id | String. The ID of sub_order object.
[amount](#amount) | Object. The amount of sub_order.
order_summary | String. The summary of sub_order.
trans_code | ENUM. The transaction code of goods. See [Transaction encoding and transaction postscript description](#transaction-encoding-and-transaction-postscript-description)
is_customs | bool. If the merchant needs UMF to submit the payment information to customs.
invoice_id | String. This receipt of sub_order.
items | Object Array. The array of [item](#item) objects.

## transactions

The information of transactions.

Parameter | Description
------- | -------
payment_summaries | Object Array of [payment_summary](#payment_summary).
refund_summaries | Object Array of [refund_summary](#refund_summary).
pagination | Object. The pagination Object which gives you information about the number of pages in the result, and how many objects are returned.


## wechat_in_app

The UMF will return all the information that WeChat SDK required to activate WeChat and make a payment.

Parameter | Description
------- | -------
citizen_id_type | ENUM. The type of citizen id. Currently, it must be **IDENTITY_CARD**.
citizen_id_number | String. **Must be encrypted**. Citizen id number.
[pay_info](#pay_info) | Object. The information for calling WeChat native SDK to activate WeChat APP.

## wechat_in_app_web

The UMF will return all the information that WeChat SDK required to activate WeChat and make a payment. Merchant does not need to modify all the information that WeChat need.

Parameter | Description
------- | -------
open_id | String. The OpenID is a unique encrypted WeChat ID for each user of an official account, and users can have separate OpenIDs corresponding to different official accounts. 
citizen_id_type | ENUM. The type of citizen id. Currently, it must be **IDENTITY_CARD**.
citizen_id_number | String. **Must be encrypted**. Citizen id number.
[pay_info](#pay_info) | Object. The information for calling WeChat JS-API to activate WeChat payment in WeChat browser.


