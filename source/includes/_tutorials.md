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

## 2.2 Pay by bank card of Union pay


## 2.3 Pay by Wechat pay


## 2.4 Pay by Wechat pay in Apps


## 2.5 Refund


## 2.6 Query




