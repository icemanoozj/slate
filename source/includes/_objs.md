# 4. Common Object Definitions

## address

Parameter | Description
----------|------------
 recipient_name  | The name of recipient.
line1  | The first line of the address. For example, number, street, and so on. Maximum length is 100 characters.
line2 | The second line of the address. For example, suite, apartment number, and so on. Maximum length is 100 characters.
city  | The city name. Maximum length is 50 characters.
 state  | The two-letter code for US states or the equivalent for other countries. Maximum length is 100 characters.
 country_code  | [The two-character country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
postal_code  | The zip code or equivalent. Typically required for countries that have them. Maximum length is 20 characters.Required in certain countries.
phone | The phone number, Maximum length is 50 characters.

## amount

Parameter | Description
----------|------------
total | The total amount charged to the payee by the payer. For refunds, represents the amount that the payee refunds to the original payer. Maximum length is 10 characters. Supports two decimal places.
currency | The three-character ISO-4217 https://en.wikipedia.org/wiki/ISO_4217#Active_codes currency code. 
total_cny | The amount in CNY(Chinese Yuan). **Optional**.
exchange_rate | The exchange_rate. **Optional**.

## bank

Parameter | Description
----------|------------
name | The full name of bank.
code | The abbreviation of bank. Available in China.
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
number | String. **need to be encrypted**. The bank card number. 
valid_date | String. **need to be encrypted**. The valid date of bank card.
cvv2 | String. **need to be encrypted**. CVV2 of bank card.
card_holder | String. **need to be encrypted**. The name of card holder
external_customer_id | String. The customer id in merchant system.
state | ENUM. The state of bank card.
citizen_id_type | String. The type of citizen id. Currently, it must be IDENTITY_CARD
citizen_id_number | String. **need to be encrypted**. The number of citizen id.

## customs_declaration

Parameter | Description
------- | -------
id | String. Id of object.
sub_order | Object. The sub_order object.
customs_id | The customs channel number during customs declaration (such as HZ, NB and GZ respectively represents for Hangzhou, Ningbo and Guangzhou)
mer_customs_code | The merchant id in customs
freight_amount | Object. Amount object. Freight payment 
tax_amount | Object. Amount object. Customs tax.
ec_plat_id | File numbr of E-commerce platform
notify_url | The url of merchant service. To receive the notification from UMF.
state | ACCEPTED - 未报送 <br /> SUBMITED - 已报送待处理 <br /> SUCCESS - 成功 <br /> FAIL - 失败
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
mer_item_id | String. The id in merchant system.
type | ENUM. The type of goods. **CLOTHING**,  **FOOD**, **ELECTRONIC**, **OTHER**. 
name | String. The goods name.
description | String. The description of goods.
amount | Object. The amount object. The price of goods.
quantity | Number. The quantity of goods.


## link

The link object is a part of payment object, refund object. It is the available next step of those object. The links is different depends on the state of main object.

## meta

The meta object is one of the part of each response. It include the common informations of response.

Parameter | Description
------- | -------
ret_code | The return code of current response.
ret_msg | The message of current response.
sign | The signature of current response. The receiver should verify the signature by UMF public key.


## order

The order information. The detail information of order items must in the sub_order object. 

Parameter | Description
------- | -------
[amount](#amount) | Object. The total amount of an order.
order_summary | String. The summary of an order.
mer_reference_id | String. The id of order. The same order id of a merchant will pay only once.
mer_date | String. The date of order. This time will show as-is in the statement. 
expire_time | String. The deadline of payment. If the time expires, current order will refuse to pay by UMF.
sub_orders | Object Array. The array of sub_order objects. Each sub_order can only have same type goods.
state | ENUM. The state of order.
user_ip | String. This is the ip address when a customer make a payment request.

## payer

The information of payer.

Parameter | Description
------- | -------
payment_method | Enum. The payment method. Value is:<br />- CREDIT_CARD <br /> - DEBIT_CARD <br /> - WECHAT_PAY <br /> - ALIPAY
[bank_code](#bank) | String. The abbreviation of bank. Available in China. See [bank]
[payer_info](#payer_info) | Object. The information of payer.

## payer_agreement

Payer agreement represent a bank card of the customer. Merchant may use this object instead of bank_card object for the security reason.

Parameter | Description
------- | -------
usr_busi_agreement_id  | This id is a unique ID for each user of a merchant.
usr_pay_agreement_id  | This id is a unique ID for each bank card of a usr_busi_agreement_id.
gate_id  | The bank code.
last_four_cardid  | The last for bank card number.
valid_date  | The valid date of bank card.
cvv2  | The CVV2 of bank card.

## payer_info

The pay info of customer.

Parameter | Description
------- | -------
phone | String. The payer's phone number.
name | String. The abbreviation of bank. Available in China. See [bank]
pay elements object | Object. The name of this parts is different, depends on the payment_method. It can be the following objects.<br /> [bank_card](#bank_card) <br /> [wechat_scan](#wechat_scan) <br /> [wechat_app](#wechat_app) <br /> [wechat_browser](#wechat_browser) <br /> [wechat_scan](#wechat_scan)<br />  [alipay_scan](#alipay_scan) <br /> [payer_agreement](#payer_agreement)
verify_code | String. Only avaliable in bank_card payment. The bank should send a verification code to customer. This verification code will be commited to bank to prevent fraud.

## payment

Payment object is the core concept of this API. A payment object is a bill needs to pay. It has the following informations:

parameters | Description
------- | -------
payment_id | The id of payment object.
payer | Object. The payment information. 
order | Object. The order information. Includes sub orders.
notify_url | String. Url of the merchant server. To receive the payment result.
links | Object Array. The next step links. Depents on the status and payment type. Those links are HATEOAS links.

## refund

Refund object depends on a payment object. One payment may connect many refund object. Which means one payment can be refund multi times. The sum  of amount of refund objects must be no more that the amount of payment object. It has the following informations.

parameters | Description
------- | -------
id | String. The id of refund object.
order | Object. It is a order object which include the goods info of refund.
notify_url | String. The merchant service url. Url of the merchant server. To receive the refund result.
state | String. The state of refund object.
parent_payment | String. The id of parent payment object.

## risk_info

This object is the informations of transcation. UMF use those info to approve or deny the transaction. If the risk of fraud is high, this transaction will be deny. The fraud algorithm is changed by the rules we found.

Codes  | Fields name  | Data type | Field description  | Send or not 
-------|--------------|-----------|--------------------|-------------
B0002 | Transaction type  | String | 01 Deposit, 02 Purchase | Y
B0003 | Name of the recipient  | String  | When D0008 is either 1 or 3, it is required to send this Field. | C
B0004 | Phone number of the recipient | String | When D0008 is either 1 or 3, it is required to send this Field.
Such as: 13800011111 | C
B0005 | Delivery address  | String | When D0008 is either 1 or 3, it is required to send this Field.
 | C
B0006 | Registered email  | String | Email of the customer used for registration, must be verified by the merchant | N
B0007 | mobile phone number | String | Registrant mobile phone number | N
B0008 | identity card number | String | Registrant identity card number, | When D0009 is 1, it is required to send this Field. | C
D0001 | Device identification  | String | For example, the MAC code of mobile phone or the terminal identification ID defined internally.  | N
D0002 | Type of Device  | String | If from the Web terminal, the user shall not be blank. APP can be blank.  | N
D0003 | User ID  | String  | UserID at the merchant platform | N
D0004 | User Registration time |  | String | The time that the user registers for the product, which shall be read exactly on the second. 
Such as:20150311120000 | N
D0005 | Production form  | String | 1 - android app ; 2 - IOS app; 3- PC | (web page); 4 - Mobile phone | (wap, or html5 page);  | N
D0007 | The number of successful transactions | String | The number of successful transactions on the merchant platform | N
D0008 | Category of commodities | String | 0: virtual goods, 1:physical goods, 2: air ticket, 3: electronics | Y
D0009 | Real name purchase | String | 0: not real name system, 1: real name system | Y
D0010 | Category of business  | String | 3: Cross-border Payment | Y

## statement

TODO.

## sub_order

The same trans_code of goods should in the same sub_order object.

Parameter | Description
------- | -------
mer_sub_reference_id | String. The id of sub_order object.
amount | Object. The amount of sub_order.
order_summary | String. The summary of sub_order.
trans_code | ENUM. The transaction of goods.
is_customs | bool. If the merchant needs UMF submit the payment information to cumtoms.
items | Object Array. The items in sub_orders.


## wechat scan

**To be Done if phrase 2.**

The UMF will return a url. The merchant use standard tool to make t QR-Code. When user scan this QR-Code by wechat, they can pay it by wechat.

## wechat app

**To be Done if phrase 2.**

The UMF will return all the information that wechat SDK required to active wechat and make a payment.

## wechat browser

**To be Done if phrase 2.**

The UMF will return all the information that wechat html5 SDK required to active wechat payment in wechat browser.

## alipay scan

**To be Done if phrase 2.**

The UMF will return a url. The merchant use standard tool to make t QR-Code. When user scan this QR-Code by Alipay, they can pay it by Alipay.



