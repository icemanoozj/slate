# 4. Object Definitions

## address

Parameter | Description
----------|------------
recipient_name  | The name of recipient.
line1  | The first line of the address. For example, number, street, and so on. Maximum length is 100 characters.
line2 | The second line of the address. For example, suite, apartment number, and so on. Maximum length is 100 characters.
city  | The city name. Maximum length is 50 characters.
 state  | The two-letter code for US states or the equivalent for other countries. Maximum length is 100 characters.
 country_code  | [The two-character country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
postal_code  | The zip code or equivalent. Typically required for countries that have them. Maximum length is 20 characters. Required in certain countries.
phone | The phone number's maximum length is 50 characters.

## amount

Parameter | Description
----------|------------
total | The total amount charged or refunded. Maximum length is 10 characters. Supports two decimal places.
currency | The three-character ISO-4217 https://en.wikipedia.org/wiki/ISO_4217#Active_codes currency code. 
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
citizen_id_type | String. The type of citizen id. Currently, it must be IDENTITY_CARD
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

## item

Item is the information of same goods in a sub_order object.

Parameter | Description
------- | -------
mer_item_id | String. The ID in merchant system.
type | ENUM. The type of goods. **CLOTHING**,  **FOOD**, **ELECTRONICS**, **OTHER**. 
name | String. The goods name.
description | String. The description of goods.
amount | Object. The amount object. The price of goods.
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
sub_orders | Object Array. The array of sub_order objects. Each sub_order can only have same type goods.
state | ENUM. The state of order.
user_ip | String. This is the IP address when a customer makes a payment request.

## payer

The payer information.

Parameter | Description
------- | -------
payment_method | ENUM. The payment method. Value is:<br />- CREDIT_CARD <br /> - DEBIT_CARD <br /> - WECHAT_SCAN <br /> - WECHAT_APP <br /> - WECHAT_WEB <br /> - ALIPAY_SCAN
[bank_code](#bank) | String. The abbreviation of bank. Available in China. See [bank]
[payer_info](#payer_info) | Object. The information of payer.

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

## payer_info

Parameter | Description
------- | -------
phone | String. The payer's phone number.
name | String. The abbreviation of bank. Available in China. See [bank]
pay elements object | Object. The name of this parts is different, depends on the payment_method. It can be the following objects.<br /> [bank_card](#bank_card) <br /> [WeChat_scan](#WeChat_scan) <br /> [WeChat_app](#WeChat_app) <br /> [WeChat_browser](#WeChat_browser) <br />  [alipay_scan](#alipay_scan) <br /> [payer_agreement](#payer_agreement)
verify_code | String. Only available in bank_card payment. The bank should send a verification code to customer. This verification code will be submitted to bank to prevent fraud.

## payment

Payment object is the core concept of this API. It has the following information:

parameters | Description
------- | -------
payment_id | String. The ID of payment object.
[payer](#paymer) | Object. The payment information.
[order](#order) | Object. The order information. Includes sub orders.
state | ENUM. **-WAIT_BUYER_PAY**: The payment need to be paid. <br /> **-TRADE_SUCCESS**: The payment was succcessufl.<br /> **-TRADE_CLOSED**:The payment was closed because the order was expired.<br /> **-TRADE_CANCEL**: The payment was cancelled.<br /> **-TRADE_FAIL**: The payment was failed.
notify_url | String. Url of the merchant server. To receive the payment result.
ret_url | String. The return url after the payment was done. Only availabled when the merchant uses the checkout web page of UMF.
execute_success_time | String. The time of transfer money from customer to UMF.
mer_check_date | String. The date of this transaction. This date is from merchant system. It does not have timezone information. The transaction will be marked as this date in the transaction list and the reconciliation statement.
settle_date | String. The date of this transaction in UMF.
[risk_info](#risk_info) | Object. The information for anti fraud. Its content depends on the contract between the merchant and UMF.
[links](#link) | Object Array. The next step links. Depends on the status and payment type. Those links are HATEOAS links.

## refund

Refund object depends on a payment object. One payment may connect many refund objects, which means one payment can be refunded multiple times. The total amount of refund objects must be no more than the amount of payment object. It has the following information:

Parameters | Description
------- | -------
id | String. The ID of refund object.
[order](#order) | Object. It is an order object which includes the goods information to be returned.
notify_url | String. The merchant service url. To receive the refund result.
state | ENUM. The state of refund object. **REFUND_PROCESS**, **REFUND_SUCCESS**, **REFUND_FAIL**, **REFUND_CLOSE**.
parent_payment | String. The ID of parent payment object.

## risk_info

This object is the information of transaction. UMF uses this info to approve or deny the transaction. If the risk of fraud is too high, this transaction will be denied. The anti fraud algorithm will be periodically adjusted.

Codes  | Fields name  | Data type | Field description  | Send or not 
-------|--------------|-----------|--------------------|-------------
B0002 | Transaction type  | String | 01 Deposit, 02 Purchase | Y
B0003 | Name of the recipient  | String  | When D0008 is either 1 or 3, it is required to send this Field. | C
B0004 | Phone number of the recipient | String | When D0008 is either 1 or 3, it is required to send this Field. <br /> Such as: 13800011111 | C
B0005 | Delivery address  | String | When D0008 is either 1 or 3, it is required to send this Field. | C
B0006 | Registered email  | String | Email of the customer used for registration, must be verified by the merchant | N
B0007 | mobile phone number | String | Registrant mobile phone number | N
B0008 | identity card number | String | Registrant identity card number, | When D0009 is 1, it is required to send this Field. | C
D0001 | Device identification  | String | For example, the MAC code of mobile phone or the terminal identification ID defined internally.  | N
D0002 | Type of Device  | String | If from the Web terminal, the user shall not be blank. APP can be blank.  | N
D0003 | User ID  | String  | UserID at the merchant platform | N
D0004 | User Registration time |  | String | The time that the user registers for the product, which shall be read exactly on the second. <br />Such as:20150311120000 | N
D0005 | Production form  | String | 1 - android app ; 2 - IOS app; 3- PC | (web page); 4 - Mobile phone | (wap, or html5 page);  | N
D0007 | The number of successful transactions | String | The number of successful transactions on the merchant platform | N
D0008 | Category of commodities | String | 0: virtual goods, 1:physical goods, 2: air ticket, 3: electronics | Y
D0009 | Real name purchase | String | 0: not real name system, 1: real name system | Y
D0010 | Category of business  | String | 3: Cross-border Payment | Y

[comment]: # (statement)

## sub_order

The same trans_code of goods should in the same sub_order object.

Parameter | Description
------- | -------
mer_sub_reference_id | String. The ID of sub_order object.
amount | Object. The amount of sub_order.
order_summary | String. The summary of sub_order.
trans_code | ENUM. The transaction of goods.
is_customs | bool. If the merchant needs UMF to submit the payment information to customs.
items | Object Array. The items in sub_orders.


## qr_code_scan

Merchant creates QR code for each order. After users scan these codes by WeChat or AliPay, they can see related product information and transaction guides on their phone. This object can be used for WeChat or AliPay.

If the merchant want to show a QR-Code to customer for scanning, a wechat_qr_code object needs to include in the payer_info object.

Parameter | Description
------- | -------
payer_name | String. **Must be encrypted**. The name of payer.  
citizen_id_type | String. The type of citizen id. Currently, it must be IDENTITY_CARD
citizen_id_number | String. **Must be encrypted**. Citizen id number.
phone_number | String. The phone number of payer.
qr_code_url | String. The url of wechat QR-Code pay. Thiis information is returned by UMF.

The qr_code_url is the content of QR-Code. The merchant use standard tools transfer the url to a QR-Code. When user scan this QR-Code by WeChat or AliPay, they can pay with WeChat or AliPay.

## WeChat_in_app

The UMF will return all the information that WeChat SDK required to activate WeChat and make a payment.

Parameter | Description
------- | -------
payer_name | String. **Must be encrypted**. The name of payer.
citizen_id_type | String. The type of citizen id. Currently, it must be IDENTITY_CARD
citizen_id_number | String. **Must be encrypted**. Citizen id number.
phone_number | String. The phone number of payer.
[pay_info](#pay_info) | Object. The information for calling WeChat native SDK to activate WeChat APP.

## WeChat_in_app_web

The UMF will return all the information that WeChat SDK required to activate WeChat and make a payment. Merchant does not need to modify all the information that WeChat need.

Parameter | Description
------- | -------
open_id | String. The OpenID is a unique encrypted WeChat ID for each user of an official account, and users can have separate OpenIDs corresponding to different official accounts. 
payer_name | String. **Must be encrypted**. The name of payer.
citizen_id_type | String. The type of citizen id. Currently, it must be IDENTITY_CARD
citizen_id_number | String. **Must be encrypted**. Citizen id number.
phone_number | String. The phone number of payer.
[pay_info](#pay_info) | Object. The information for calling WeChat JS-API to activate WeChat payment in WeChat browser.


## pay_info

The pay_info object includes the information of WeChat In-App Payment and WeChat In-App Web-based Payment. 

Parameter | Description
------- | -------
appId | String. The unique identifier of the Official Account of UMF
timeStamp | String. The number of seconds that have elapsed since 00:00:00 Coordinated Universal Time (UTC), Thursday, 1 January 1970.
signType | String. The type of signature. It will be "MD5" in this scenario.
package | String. The ID of this WeChat payment.
nonceStr | String. A random string for the generated signature.
paySign | String. The signature of this request.


## transactions

The information of transactions.

Parameter | Description
------- | -------
payments | Object Array of payment.
refunds | Object Array of refund.
pagination | Object. The pagination Object which gives you information about the number of pages in the result, and how many objects are returned.

<br />


The payment object includes the following information:

Parameter | Description
------- | -------
payment_id | The id of payment.
phone_number | User's phone number
order | [Object](#order). Includes the following parameters: mer_reference_id, order_date
amount | [Object](#amount). Includes the following parameters: cb_amount, cny_amount, currency, exchange_rate.
pay_date | String. The date of charge request submitted.
pay_time | The timestamp of charge. The timestamp of  transaction done.
state | See the define of [payment](#payment).

<br />


The refund object includes the following information:

Parameter | Description
------- | -------
payment_id | The id of parent payment.
phone_number | User's phone number
amount | [Object](#amount). Includes the following parameters: cb_amount, cny_amount, currency, exchange_rate.
pay_date | String. The date of refund request submitted.
pay_time | The timestamp of transaction done.
state | See the define of [refund](#refund).

## reconciliations

The information of reconciliations.

Parameter | Description
------- | -------
payments | Object Array of payment.
refunds | Object Array of refund.
pagination | Object. The pagination Object which gives you information about the number of pages in the result, and how many objects are returned.

<br />


The payment object includes the following information:

Parameter | Description
------- | -------
payment_id | The id of payment.
phone_number | User's phone number
order | [Object](#order). Includes the following parameters: mer_reference_id, order_date
amount | [Object](#amount). Includes the following parameters: cb_amount, cny_amount, currency, exchange_rate.
pay_date | String. The date of charge request submitted.
pay_time | The timestamp of charge. The timestamp of  transaction done.
state | See the define of [payment](#payment).
service_fee | The service fee in CNY.
exchange_amount | The amount of make exchange. cb_amount, cny_amount, currency, exchange_rate.

<br />


The refund object includes the following information:

Parameter | Description
------- | -------
payment_id | The id of parent payment.
sub_order | [Object](#sub_order). Includes the following parameters: sub_order_id
phone_number | User’s phone number
amount | [Object](#amount). cb_amount, cny_amount, currency, exchange_rate.
pay_time | The timestamp of charge.
state | See the define of [refund](#refund).


## pagination

Some API endpoints which return large amount of objects will return paginated responses; as well as the list of objects there will also be a pagination key in the response:

Parameter | Description
------- | -------
total_count | Number. The total number of transaction list.
page_number | Number. The current page number (starts at 1).
page_size | Number. The number of objects on each page.


