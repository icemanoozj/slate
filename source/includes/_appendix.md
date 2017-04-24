# 7. Appendix


## Transaction encoding and transaction postscript description

Trading Codes  | Types of trade  | Transaction code  | Transaction postscript 
---------------|-----------------|-------------------|------------------------
01121990 | Goods trade  | 121990 | Online Shopping (customs clearance) 
01122030 | Goods trade   | 122030 | Online Shopping (no customs clearance) 
02223022 | Study Abroad  | 223022 | Tuition travel for study abroad and education (above one year) 
02223023 | Study Abroad   | 223023 | Tuition travel for study abroad and education (one year or less) 
03222024 | Air ticket  | 222024 | Air ticket for going abroad 
03223010 | Air ticket   | 223010 | Business trip air ticket 
03223021 | Air ticket   | 223021 | Air ticket for receiving medical treatment and health examination 
03223022 | Air ticket   | 223022 | Air ticket for study abroad and education (above one year) 
03223023 | Air ticket   | 223023 | Air ticket for study abroad and education (one year or less) 
03223029 | Air ticket   | 223029 | Other private travel air ticket 
04223010 | Hotel Booking | 223010 | Hotel for study abroad and education (one year or less)
04223021 | Hotel Booking  | 223021 | Other private travel hotel
04223022 | Hotel Booking  | 223022 | Business trip hotel 
04223023 | Hotel Booking  | 223023 | Hotel for receiving medical treatment and health examination
04223029 | Hotel Booking  | 223029 | Hotel for study abroad and education (above one year)
05227010 | Phone Bill | 227010 | Mobile telecommunications service 
06223010 | Travelling  | 223010 | Business trip 
06223021 | Travelling   | 223021 | Trip for receiving medical treatment and health 
06223022 | Travelling   | 223022 | Study abroad and education (above one year) 
06223023 | Travelling   | 223023 | Study abroad and education (one year or less) 
06223029 | Travelling   | 223029 | Other private travelling
07222012 | Transportation  | 222012 | Ocean freight service (import to China) 
07222022 | Transportation   | 222022 | Air freight service (import to China)
07222032 | Transportation   | 222032 | Other Freight service (import to China)
08227020 | Software service  | 227020 | Software service 
08231030 | Software service   | 231030 | License fee for copying or distributing computer software
09228025 | International exhibition  | 228025 | Exhibition services 


## Description of return code

No.  | Return code  | Description 
-----|--------------|-------------
1 | 0000 | Successful
2 | 00060999 | System error 

## Description of transaction error code

No. | Error code  | Description 
----|-------------|-------------
1 | 00060700 | Data validation failure. 
2 | 00060710 | Merchant signature validation failure. 
3 | 00060711 | Merchant has not registered. 
4 | 00060720 | Phone number is incorrect. 
5 | 00060721 | The user chose the online bank he or she does not have. 
6 | 00060722 | Please reselect the paying bank. 
7 | 00060723 | Wrong password, please re-enter. 
8 | 00060724 | Payment password was incorrect more than three times. 
9 | 00060730 | User account balance is insufficient, please deposit. 
10 | 00060740 | Failed to generate payment order. 
11 | 00060750 | Failed to pay. 
12 | 00060751 | Payment expired. 
13 | 00060760 | Payment not exist. 
14 | 00060761 | Payment in process. 
15 | 00060762 | Payment expired, please order again. 
16 | 00060763 | Orders have been closed. 
17 | 00060764 | Orders have not been paid. 
18 | 00060765 | Payment failed. 
19 | 00060766 | No refund allowed. 
20 | 00060767 | Refund request failure. 
21 | 00060768 | Refund amount is inconsistent with the payment amount. 
22 | 00060769 | No withdrawal allowed. 
23 | 00060770 | Withdrawn amount is inconsistent with the payment amount. 
24 | 00060022 | ID number is not legitimate. 
25 | 00060076 | Unsupported bank card account. 
26 | 00060101 | Bank card account has already been registered. 
27 | 00060100 | User's phone number has already been registered. 
28 | 00060105 | Real-name authentication failure. 
29 | 00060114 | Merchant permissions restricted. 
30 | 00060310 | The user does not subscribe to the merchant protocol. 
31 | 00060314 | Unregistered user. 
32 | 00060315 | Inactive user. 
33 | 00281017 | Currency not accepted by the merchant. 
34 | 00200005 | SMS verification code not found. 
35 | 00281017 | Merchant cannot use this currency.
36 | 00202012 | Customs unavailable. 
37 | 00202013 | The customs information has been updated and shall not be updated again. 
38 | 00202014 | The customs declaration is not required for the order.
39 | 00202015 | The cross-border sub-order is absent. 
40 | 00202016 | The cross-border cargo information sheet is absent. 
41 | 00202000 | The exchange rate query response parameter error. 
42 | 00202001 | The foreign currency amount of order must not be blank. 
43 | 00202002 | The foreign currency amount of order must be integer value. 
44 | 00202003 | The foreign currency amount of order must be larger than 0. 
45 | 00202005 | Failed to update the order extension sheet. 
46 | 00202006 | Failed to update the order extension sheet - conversion ID type. 
47 | 00202007 | Failed to update the cross-border order extension sheet. 
48 | 00202008 | The cross-border order extension data is absent. 
49 | 00202009 | The refund amount in the refund application is incorrect. 
50 | 00202010 | The refund amount in the refund application is inconsistent with the original order amount. 
51 | 00202011 | The currency in the refund application is inconsistent with the original order currency. 

## Transaction status description

No. | Enumeration name  | Description  | Note 
----|-------------------|--------------|------
1 | WAIT_BUYER_PAY | Was accepted, waiting for the buyer to pay.  | 
2 | TRADE_SUCCESS | The transaction was successful.  | 
3 | TRADE_CLOSED | Transaction was closed since transaction expired. | 
4 | TRADE_CANCEL | Cancelled.  | 
5 | TRADE_FAIL | Failed.  | 


## Refund status description

No. | Enumeration name  | Description  | Note 
----|-------------------|--------------|------
1 | REFUND_SUCCESS | Refund successful.  | 
2 | REFUND_CLOSE | Refund is closed. | Refund request is rejected.
3 | REFUND_PROCESS | Refund in process.  | 
4 | REFUND_FAIL | Refund failed.  |  


## Currency codes

No| Currency code  | Currency description 
------|----------------|----------------------
1 | CNY | Chinese yuan 
2 | HKD | Hong Kong dollar 
3 | USD | United States dollar 
4 | EUR | EURO 
5 | JPY | Japanese Yen 
6 | GBP | Pound
7 | AUD | Australian dollar
8 | CAD | Canadian dollar
9 | NZD | New Zealand dollar
10 | SGD | Singapore dollar
12 | CHF | Swiss Franc
13 | SEK | Swedish Krona
14 | DKK | Danish Kroner
15 | NOK | Norwegian Krona

