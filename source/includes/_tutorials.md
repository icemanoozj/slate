# 2. Tutorials


## 2.1 First Call

请先阅读接口指导说明，我们在本节将给出UMF接口整理调用关系图，可以根据需要查看具体接口。

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


## 2.3 Pay by Wechat pay


## 2.4 Pay by Wechat pay in Apps


## 2.5 Refund


## 2.6 Query




