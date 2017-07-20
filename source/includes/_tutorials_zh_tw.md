# 2. Tutorials


## 2.1 First Call

請先閱讀接口指導說明，我們在本節將給出UMF接口整體調用關系圖，可以根據需要查看具體接口。

<div class="mermaid">
sequenceDiagram
　　　participant 商戶
　　　participant UMF
　　　商戶\-\->>UMF:向UMF發起業務開通申請（提交公司材料供UMF審核）
　　　Note right of UMF:UMF審核通過後，爲商戶開通聯調環境，分配：client_id、client_secret
　　　UMF\-\->>商戶:告知client_id、client_secret
     商戶\-\->>UMF: 獲取Access Token
　　　UMF\-\->>商戶: 返回access_token
      Note right of 商戶:商戶使用token調用後續接口
</div>

調用UMF REST請求說明:

* Get an access token
* Make an API call

### [Get an access token](#1-5-get-an-access-token)

Make a /oauth/authorize call with your app's OAuth client_id and secret keys for the basic authentication values. In the request body, set grant_type to client_credentials. When you run the command, UMF generates and returns an access token.

For information about the request headers, see REST API authentication and headers.

<aside class="notice">
Note: The access token is valid for the number of seconds specified in the expires_in response field. You must have a valid access token to make API requests—request a new token when the current one expires.
</aside>

### Make an API call

With a valid access token in hand, you're ready to make a request to a REST interface.

The access token is an OAuth bearer token and is included in the header of your requests with the following syntax:

>Authorization: Bearer Access-Token

For details on authentication, see [Authentication](#1-2-authentication).



## 2.2 Pay by bank card of Union pay

UMF only support credit card and debit card issued by banks in China. The currency of custom payment only support CNY(Chinese Yun). UMF may exchange the CNY to [fifteen foreign currencies](#currency-codes).

<div class="mermaid">
sequenceDiagram
　　　participant 用戶
　　　participant 商戶
　　　participant UMF
　　　participant 銀行
　　　用戶\-\->>商戶:1.選購商品
　　　商戶\-\->>用戶:2.生成訂單 
　　　用戶\-\->>商戶:3.確認購買
　　　商戶\-\->>UMF: 3.1.獲取Access Token
　　　UMF\-\->>商戶: 3.2.返回access_token
　　　Note right of UMF:商戶使用token調用後續接口
　　　商戶\-\->>UMF: 4.請求下單
　　　UMF\-\->>商戶:5.返回下單結果，並返回可以使用的支付方式
　　　Note right of UMF:對于銀行卡支付，商戶如果需要爲用戶展示可以使用的銀行卡，調用，獲取銀行卡列表接口  
　　　商戶\-\->>UMF:5.1獲取銀行列表
　　　UMF\-\->>商戶:5.2支持的銀行卡列表
　　　Note right of UMF:可查詢的卡種爲：CREDIT_CARD, DEBIT_CARD
　　　商戶\-\->>用戶:6.展示支持的銀行卡列表，展示支付頁面
　　　用戶\-\->>商戶:7.選擇用于支付的銀行卡，填寫支付信息，獲取短信驗證碼
　　　商戶\-\->>UMF: 8.請求下發短信
　　　UMF\-\->>用戶:9.下發短信
　　　用戶\-\->>商戶:10.填寫驗證碼，確認支付
　　　商戶\-\->>UMF: 11.請求支付   
　　　UMF\-\->>銀行:12.請求扣款     
　　　銀行\-\->>UMF:13.扣款結果
　　　UMF\-\->>商戶:14.支付結果
　　　商戶\-\->>用戶:15.支付結果 
</div>

流程說明：

1.用戶在商戶平台選購商品

2.商戶爲用戶生成訂單

3.用戶確認購買訂單商品

3.1.商戶請求UMF獲取Access Token,詳見 [Get an access token](#1-5-get-an-access-token)

3.1.UMF返回access_token

4.商戶平台提交訂單數據到聯動優勢平台 **請求下單**，調用 [Create a payment](#3-3-create-a-payment)

5.聯動平台響應商戶下單結果

5.1.商戶請求UMF獲取銀行卡列表 [Query available banks](#3-2-query-available-banks)

5.2.UMF返回支持的銀行卡列表

6.商戶向用戶展現支付頁面

7.用戶填寫手機號碼，獲取短信驗證碼

8.商戶調用聯動平台接口，**請求下發短信驗證碼**，調用 [SMS verification](#3-4-sms-verification)

9.聯動平台向用戶下發短信

10.用戶在商戶端填寫支付要素信息，提交信息進行支付

11.商戶向平台**請求支付**，調用 [Execute a payment](#3-5-execute-a-payment)      

12.平台向銀行發起扣款請求

13.聯動平台接收銀行的扣款結果

14.聯動平台響應商戶支付結果

15.商戶向用戶展現支付結果


## 2.3 Pay by Wechat pay


## 2.4 Pay by Wechat pay in Apps

Merchants push product messages to their followers via Official Account. With WeChat Pay enabled, their followers can purchase products on the shopping page.

**It will be released in June 2017.**

<div class="mermaid">
sequenceDiagram
    participant Customer WeChat Browser
    participant Merchant
    participant UMF
    participant WeChat
    Customer WeChat Browser\-\->>Merchant: 1. Order goods
    Note right of Merchant: If the merchant have an unexpired access token. It can be used to make an API call
    Merchant\-\->>UMF: 2. Optional. Acquire an access token
    UMF\-\->>Merchant: 3. Return access_token
    Note right of WeChat Browser:  Call API get WeChat open_id with access token
    Merchant\-\->>UMF: 4. Request authorization page(html and javascript)
    UMF\-\->>WeChat Browser: 5. Return autorization page.
    Merchant\-\->>Customer: 4. Generate order
    Customer WeChat Browser\-\->>WeChat Browser: 4. Confirm order with access token
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
4. Call the authorization page from UMF.Call [Get WeChat open_id](#3-15-get-wechat-open_id).
5. UMF returns the authorization page.
6. The authorization page requests WeChat open_id. 
7. The WeChat returns the open_id of current WeChat user.
8. The authorization page redirect to notify_url(step 4).
9. **Optional**. The Merchat returns a pending page to wait.
10. **Optional**. The pending page request a payment.
11. Merchant send payment request to UMF.Call [Create a payment](#3-2-create-a-payment).
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

## 2.5 Refund


## 2.6 Query




