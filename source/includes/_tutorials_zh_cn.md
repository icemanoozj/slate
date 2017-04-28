# 2. Tutorials


## 2.1 First Call

请先阅读接口指导说明，我们在本节将给出UMF接口整体调用关系图，可以根据需要查看具体接口。

<div class="mermaid">
sequenceDiagram
　　　participant 商户
　　　participant UMF
　　　商户\-\->>UMF:向UMF发起业务开通申请（提交公司材料供UMF审核）
　　　Note right of UMF:UMF审核通过后，为商户开通联调环境，分配：client_id、client_secret
　　　UMF\-\->>商户:告知client_id、client_secret
     商户\-\->>UMF: 获取Access Token
　　　UMF\-\->>商户: 返回access_token
      Note right of 商户:商户使用token调用后续接口
</div>

调用UMF REST请求说明:

* Get an access token
* Make an API call

### [Get an access token](#3-1-get-an-access-token)

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
　　　participant 用户
　　　participant 商户
　　　participant UMF
　　　participant 银行
　　　用户\-\->>商户:1.选购商品
　　　商户\-\->>用户:2.生成订单 
　　　用户\-\->>商户:3.确认购买
　　　商户\-\->>UMF: 3.1.获取Access Token
　　　UMF\-\->>商户: 3.2.返回access_token
　　　Note right of UMF:商户使用token调用后续接口
　　　商户\-\->>UMF: 4.请求下单
　　　UMF\-\->>商户:5.返回下单结果，并返回可以使用的支付方式
　　　Note right of UMF:对于银行卡支付，商户如果需要为用户展示可以使用的银行卡，调用，获取银行卡列表接口  
　　　商户\-\->>UMF:5.1获取银行列表
　　　UMF\-\->>商户:5.2支持的银行卡列表
　　　Note right of UMF:可查询的卡种为：CREDIT_CARD, DEBIT_CARD
　　　商户\-\->>用户:6.展示支持的银行卡列表，展示支付页面
　　　用户\-\->>商户:7.选择用于支付的银行卡，填写支付信息，获取短信验证码
　　　商户\-\->>UMF: 8.请求下发短信
　　　UMF\-\->>用户:9.下发短信
　　　用户\-\->>商户:10.填写验证码，确认支付
　　　商户\-\->>UMF: 11.请求支付   
　　　UMF\-\->>银行:12.请求扣款     
　　　银行\-\->>UMF:13.扣款结果
　　　UMF\-\->>商户:14.支付结果
　　　商户\-\->>用户:15.支付结果 
</div>

流程说明：

1.用户在商户平台选购商品

2.商户为用户生成订单

3.用户确认购买订单商品

3.1.商户请求UMF获取Access Token,详见 [Get an access token](#3-1-get-an-access-token)

3.1.UMF返回access_token

4.商户平台提交订单数据到联动优势平台 **请求下单**，调用 [Create a payment](#3-3-create-a-payment)

5.联动平台响应商户下单结果

5.1.商户请求UMF获取银行卡列表 [Query available banks](#3-2-query-available-banks)

5.2.UMF返回支持的银行卡列表

6.商户向用户展现支付页面

7.用户填写手机号码，获取短信验证码

8.商户调用联动平台接口，**请求下发短信验证码**，调用 [SMS verification](#3-4-sms-verification)

9.联动平台向用户下发短信

10.用户在商户端填写支付要素信息，提交信息进行支付

11.商户向平台**请求支付**，调用 [Execute a payment](#3-5-execute-a-payment)      

12.平台向银行发起扣款请求

13.联动平台接收银行的扣款结果

14.联动平台响应商户支付结果

15.商户向用户展现支付结果


## 2.3 Pay by Wechat pay


## 2.4 Pay by Wechat pay in Apps


## 2.5 Refund


## 2.6 Query




