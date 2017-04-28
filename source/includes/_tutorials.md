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
　　　Customer\-\->>Merchant: 1. Order goods
　　　Merchant\-\->>Customer: 2. Generate order
　　　Customer\-\->>Merchant: 3. Confirm order
      Note right of Merchant: If the merchant have an unexpired access token. It can be used to make an API call.
　　　Merchant\-\->>UMF: 4. **Optional**. Acquire an access token
　　　UMF\-\->>Merchant: 5. Return access_token
　　　Note right of UMF:  Using access token to make API call
　　　Merchant\-\->>UMF: 6. Create a payment
　　　UMF\-\->>Merchant: 7. Return the payment object
　　　Merchant\-\->>UMF: 8. **Optional**. Get available banks
　　　UMF\-\->>Merchant: 9. Return banks
　　　Merchant\-\->>Customer: 10. Show the banks to customer.
　　　Customer\-\->>Merchant: 11. Fill the payment info, acquire verification SMS.
　　　Merchant\-\->>UMF: 12. Call verification API
      UMF\-\->>Merchant: 13. UMF return a response.
　　　UMF\-\->>Customer: 14. Send SMS to customer
　　　Customer\-\->>Merchant:15. Fill the SMS on the checkout page and submit
　　　Merchant\-\->>UMF: 16. Call payment execution API
　　　UMF\-\->>Bank: 17. Request deductions
　　　Bank\-\->>UMF: 18. Deduction result
　　　UMF\-\->>Merchant: 19. Payment result
　　　Merchant\-\->>Customer: 20. Payment result
</div>

Explanation of flow chart：

1. The user orders goods at the merchant platform.

2. Merchant generate an order.

3. Customer confirm the order.

4. Optional. Merchant [acquire an access token](#3-1-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please step 4 and setp 5.

5. UMF returns an access token.

6. Merchant submit order data to UMF. Call [Create a payment](#3-3-Create-a-payment).

7. UMF return the created payment.

8. Optional. Merchant [query the availabled banks](#3-2-query-available-banks). The bank list is barely changed. Merchant may cache the result and use the cache to speed up the  loading.

9. UMF returns the available banks.

10. Merchant show the payment page to customer

11. Customer select the bank, filling the card info and phone number, acquire a SMS for verification. The phone number must be the same with user regirested in the bank user selected. UMF will check it.

12. Merchant call the UMF to send a SMS to customer's phone number. Call [SMS verification](#3-4-SMS-verification).

13. UMF returns a response to UMF to confirm that the SMS was sent.

14. UMF(or Bank) will send a SMS to customer's phone.

15. Customer fill the received SMS and submit.

16. Merchant issues a payment request to the UMF. Call [Execute a payment](#3-5-Execute-a-payment).

17. UMF initiates deduction request to the bank.

18. UMF receives the result of deduction.

19. UMF send the result to merchant.

20. Merchant show the result to the customer.

[comment]: # (This actually is the most platform independent comment)

[comment]: # (## 2.3 Pay by Wechat QR Code Payment)

[comment]: # (Merchants creates different QR codes for different goods. After users scan these codes, they can see related product information and transaction guides on their phone.)

[comment]: # (## 2.4 Pay by Wechat In-App Web-based Payment)

[comment]: # (Merchants push product messages to their followers via Official Account. With WeChat Pay enabled, their followers can purchase products on the shopping page.)

[comment]: # (## 2.5 Pay by Wechat In-App Payment)

[comment]: # (Merchants can integrate WeChat Pay SDK into their apps. When users make payment in other apps, WeChat will be authorized to process the payment. Once the transaction is done, the page will redirect to the merchant's app.)

[comment]: # ( ## 2.6 Refund)

[comment]: # (UMF support full refund or partial refund of a payment.)

