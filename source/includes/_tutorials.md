# 2. Tutorials


## 2.1 First Call

To make a REST api call：

- Apply a merchant account.
- Get an access token.
- Make an API call.

The following is the flow char of all the steps.

<div class="mermaid">
sequenceDiagram
　　　participant Merchant
　　　participant UMF
　　　Merchant\-\->>UMF: Apply a merchant account
　　　UMF\-\->>Merchant: Account info
　　　Merchant\-\->>UMF: Require an access token
　　　UMF\-\->>Merchant: Return an access token
　　　Note right of Merchant: Using access token to call REST API.
　　　Merchant\-\->>UMF: Make an API call
　　　UMF\-\->>Merchant: Return the result
</div>

### Apply a merchant account

Merchant need to sign a contract with UMF for the rate of service fee and other details.

When the merchant account was approved, UMF will send a email to the merchant. The email will includes the following information:

- UMF RSA public key
- Merchant RSA key pair
- client_id and client_secret of OAuth2

### Get an access token

Make a /oauth/authorize call with your app's OAuth client_id and secret key for the basic authentication values. In the request body, set grant_type to "client_credentials". When you call [Get an access token](#3-1-get-an-access-token) , UMF generates and returns an access token.

For information about the request headers, see [REST API authentication](#1-2-authentication) and [headers](#1-3-http-request). See the API [Get an access token](#3-1-get-an-access-token).

<aside class="notice">
Note: The access token is valid for the number of seconds specified in the expires_in response field. You must have a valid access token to make API requests—request a new token when the current one expires.
</aside>

### Make an API call

With a valid access token in hand, you're ready to make a request to a REST interface.

The access token is an OAuth bearer token and is included in the header of your requests with the following syntax:

Authorization: Bearer Access-Token

For details on authentication, see [Authentication](#1-2-authentication).


## 2.2 Pay by credit card or debit card

UMF only support credit card and debit card issued by banks in China. The currency of custom payment only support CNY(Chinese Yun). UMF may exchange the CNY to [fifteen foreign currencies](#currency-codes).

<div class="mermaid">
sequenceDiagram
　　　participant Customer
　　　participant Merchant
　　　participant UMF
　　　participant Bank
　　　Customer\-\->>Merchant: Order goods
　　　Merchant\-\->>Customer: Generate order
　　　Customer\-\->>Merchant: Confirm order
　　　Merchant\-\->>UMF: Acquire an access token
　　　UMF\-\->>Merchant: Return access_token
　　　Note right of UMF: Using access token to make api call
　　　Merchant\-\->>UMF: Create a payment
　　　UMF\-\->>Merchant: Return the payment object
　　　Merchant\-\->>UMF: Optional. Get available banks
　　　UMF\-\->>Merchant: Return banks
　　　Merchant\-\->>Customer: Show the banks to customer.
　　　Customer\-\->>Merchant: Select a bank, fill the payment info, acquire SMS to verify.
　　　Merchant\-\->>UMF: Call verification API
　　　UMF\-\->>Customer: Send SMS to customer
　　　Customer\-\->>Merchant: Fill the SMS on the checkout page and submit
　　　Merchant\-\->>UMF: Call payment execution API
　　　UMF\-\->>Bank: Request deductions
　　　Bank\-\->>UMF: Deduction result
　　　UMF\-\->>Merchant: Payment result
　　　Merchant\-\->>Customer: Payment result
</div>

Explanation of flow chart：

1. The user orders goods at the merchant platform.

2. Merchant generate an order.

3. Customer confirm the order.

4. Merchant submit order data to UMF. Call [Create a payment](#3-3-Create-a-payment).

5. UMF return the created payment.

6. Merchant show the payment page to customer

7. Customer select the bank, filling the card info and phone number, acquire a SMS for verification. The phone number must be the same with user regirested in the bank user selected. UMF will check it.

8. Merchant call the UMF to send a SMS to customer's phone number. Call [SMS verification](#3-4-SMS-verification).

9. UMF(or Bank) will send a SMS to customer's phone.

10. Customer fill the received SMS and submit.

11. Merchant issues a payment request to the UMF. Call [Execute a payment](#3-5-Execute-a-payment).

12. UMF initiates deduction request to the bank.

13. UMF receives the result of deduction.

14. UMF send the result to merchant.

15. Merchant show the result to the customer.

[todo] ## 2.3 Pay by Wechat QR Code Payment

[todo] Merchants creates different QR codes for different goods. After users scan these codes, they can see related product information and transaction guides on their phone.

[todo] ## 2.4 Pay by Wechat In-App Web-based Payment

[todo] Merchants push product messages to their followers via Official Account. With WeChat Pay enabled, their followers can purchase products on the shopping page.

[todo] ## 2.5 Pay by Wechat In-App Payment

[todo] Merchants can integrate WeChat Pay SDK into their apps. When users make payment in other apps, WeChat will be authorized to process the payment. Once the transaction is done, the page will redirect to the merchant's app.

[todo] ## 2.6 Refund

[todo] UMF support full refund or partial refund of a payment.

