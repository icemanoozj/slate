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

## alipay

**To do**

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


## credit_card

## customs_declaration

## debit_card

## exchange_rate

## item

## link

## order

## payer

## payer_agreement

## payer_info

## payment

## refund

## risk_info

## statement

## sub_order

## wechatpay


