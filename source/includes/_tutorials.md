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
    Note right of Merchant:  Using access token to make API call
    Merchant\-\->>UMF: 6. Create a payment
    UMF\-\->>Merchant: 7. Return a payment object
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

1. Customer orders goods at merchant platform.
2. Merchant generate an order.
3. Customer confirm the order.
4. Optional. Merchant [acquire an access token](#3-1-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
5. UMF returns an access token.
6. Merchant submit order data to UMF. Call [Create a payment](#3-3-create-a-payment).
7. UMF return a payment object.
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
19. UMF sends the result to merchant.
20. Merchant shows the result to customer.

## 2.3 Pay by WeChat/Alipay QR Code Payment

UMF return a QR-Code String. The customer may use their WeChat scan the QR-Code to pay.

<div class="mermaid">
sequenceDiagram
    participant Customer
    participant Merchant
    participant UMF
    participant WeChat/Alipay
    Customer\-\->>Merchant: 1. Order goods
    Merchant\-\->>Customer: 2. Generate order
    Customer\-\->>Merchant: 3. Confirm order
    Note right of Merchant: If the merchant have an unexpired access token. It can be used to make an API call
    Merchant\-\->>UMF: 4. **Optional**. Acquire an access token
    UMF\-\->>Merchant: 5. Return access_token
    Note right of Merchant:  Using access token to make API call
    Merchant\-\->>UMF: 6. Create a payment
    UMF\-\->>WeChat/Alipay: 7. Payment request
    WeChat/Alipay\-\->>UMF: 8. Return an URL of QR code
    UMF\-\->>Merchant: 9. Return an ali_qr_scan object
    Merchant\-\->>Customer: 10. Show the page of QR code which generated by the URL
    Customer\-\->>WeChat/Alipay: 11. Finish the payment by scanning QR code
    WeChat/Alipay\-\->>UMF: 12. Deduction result
    UMF\-\->>Merchant: 13. Payment result
    Merchant\-\->>Customer: 14. Payment result
    
</div>

Explanation of flow chart：

1. Customer orders goods at merchant platform.
2. Merchant generate an order.
3. Customer confirm the order.
4. Optional. Merchant [acquire an access token](#3-1-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
5. UMF returns an access token.
6. Merchant submit order data to UMF. Call [Create a payment](#3-3-create-a-payment).
7. UMF sends a payment request to WeChat/Alipay.
8. WeChat/Alipay returns an URL of QR code to UMF.
9. UMF returns an ali_qr_scan object.
10. Merchant show the page of QR code to customer.
11. Customer finish the payment by scaning QR code.
12. UMF receives the result of deduction.
13. UMF sends the result to merchant.
14. Merchant shows the result to customer.


## 2.4 Pay by Wechat In-App Web-based Payment

Merchants push product messages to their followers via Official Account. With WeChat Pay enabled, their followers can purchase products on the shopping page.

<div class="mermaid">
sequenceDiagram
    participant Customer
    participant Merchant
    participant UMF
    participant WeChat
    Customer\-\->>Merchant: 1. Order goods
    Merchant\-\->>Customer: 2. Generate order
    Customer\-\->>Merchant: 3. Confirm order
    Note right of Merchant: If the merchant have an unexpired access token. It can be used to make an API call
    Merchant\-\->>UMF: 4. **Optional**. Acquire an access token
    UMF\-\->>Merchant: 5. Return access_token
    Note right of Merchant:  Using access token to make API call
    Merchant\-\->>UMF: 6. Request authorization info open_id
    UMF\-\->>WeChat: 7. Request open_id
    WeChat\-\->>UMF: 8. Return open_id
    UMF\-\->>Merchant: 9. Return open_id
    Note right of Merchant:  Using access token to make API call
    Merchant\-\->>UMF: 10. Create a payment
    UMF\-\->>WeChat: 11. Payment request
    WeChat\-\->>UMF: 12. Return payment info
    UMF\-\->>Merchant: 13. Return a WeChat_in_app_web object
    Merchant\-\->>WeChat: 14. Activate payment widget
    WeChat\-\->>Customer: 15. Payment widget Activated
    Customer\-\->>WeChat: 16. Enter password, finish payment
    WeChat\-\->>UMF: 17. Deduction result
    UMF\-\->>Merchant: 18. Payment result
    Merchant\-\->>Customer: 19. Payment result
</div>

Explanation of flow chart：

1. Customer orders goods at merchant platform.
2. Merchant generate an order.
3. Customer confirm the order.
4. Optional. Merchant [acquire an access token](#3-1-get-an-access-token). This step is optional. If the merchant have an unexpired access_token al ready, This token can be used to make a API call. Please ignore step 4 and setp 5.
5. UMF returns an access token.
6. Merchant request authorization info open_id. Call [Get WeChat open_id](#3-16-get-wechat-open_id).
7. UMF sends a request for authorization info open_id to WeChat.
8. WeChat returns authorization info open_id to UMF.
9. UMF returns the authorization info open_id to merchant.
10. Merchant submit order data to UMF. Call [Create a payment](#3-3-create-a-payment).
11. UMF sends payment request to WeChat.
12. WeChat returns payment info to UMF.
13. UMF returns a WeChat_in_app_web object.
14. Merchant activate Wechat payment widget.
15. WeChat payment widget activated.
16. Customer enter password and finish the payment in WeChat explore.
17. UMF receives the result of deduction.
18. UMF sends the result to merchant.
19. Merchant shows the result to customer.

## 2.5 Pay by Wechat In-App Payment

Merchants can integrate WeChat Pay SDK into their apps. When users make payment in other apps, WeChat will be authorized to process the payment. Once the transaction is done, the page will redirect to the merchant's app.

<div class="mermaid">
sequenceDiagram
    participant Customer
    participant Merchant App Client
    participant Merchant App Server
    participant UMF
    participant WeChat
    Customer\-\->>Merchant App Client: 1. Order goods
    Merchant App Client\-\->>Customer: 2. Generate order
    Customer\-\->>Merchant App Client: 3. Confirm order
    Merchant App Client\-\->>Merchant App Server: 4. Request for initial a payment
    Note right of Merchant App Server: If the merchant have an unexpired access token. It can be used to make an API call
    Merchant App Server\-\->>UMF: 5. **Optional**. Acquire an access token
    UMF\-\->>Merchant App Server: 6. Return access_token
    Note right of Merchant App Server:  Using access token to make API call
    Merchant App Server\-\->>UMF: 7. Create a payment
    UMF\-\->>WeChat: 8. Request WeChat App payment
    WeChat\-\->>UMF: 9. Return JSON string, pay_info
    UMF\-\->>Merchant App Server: 10. Return a WeChat_in_app object
    Merchant App Server\-\->>WeChat: 11. Activate payment widget
    WeChat\-\->>Customer: 12. Payment widget Activated
    Customer\-\->>WeChat: 13. Enter password, finish payment
    WeChat\-\->>UMF: 14. Deduction result
    UMF\-\->>Merchant App Server: 15. Payment result
    Merchant App Server\-\->>Merchant App Client: 16. Payment result
    Merchant App Client\-\->>Customer: 17. Payment result
</div>

Explanation of flow chart：

1. Customer orders goods at merchant platform.
2. Merchant App Client generate an order.
3. Customer App Client confirm the order.
4. Request for initial a payment.
5. Optional. Merchant [acquire an access token](#3-1-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
6. UMF returns an access token.
7. Merchant app server submit order data to UMF. Call [Create a payment](#3-3-create-a-payment).
8. UMF sends payment request to WeChat.
9. WeChat returns payment info to UMF.
10. UMF returns a WeChat_in_app object to merchant app server.
11. Merchant app server activate Wechat payment widget.
12. WeChat payment widget activated.
13. Customer enter password and finish the payment in WeChat explore.
14. UMF receives the result of deduction.
15. UMF sends the result to merchant app server.
16. Merchant app server sends the result to merchant app client.
17. Merchant app client shows the result to customer.

## 2.6 Refund

UMF support full refund or partial refund of a payment.

<div class="mermaid">
sequenceDiagram
    participant Customer
    participant Merchant
    participant UMF
    participant Bank
    Customer\-\->>Merchant: 1. select the goods to be returned and refunded
    Merchant\-\->>Customer: 2. Generate a refund order
    Customer\-\->>Merchant: 3. Confirm the refund order
    Note right of Merchant: If the merchant have an unexpired access token. It can be used to make an API call
    Merchant\-\->>UMF: 4. **Optional**. Acquire an access token
    UMF\-\->>Merchant: 5. Return access_token
    Note right of Merchant:  Using access token to make API call
    Merchant\-\->>UMF: 6. Request a refund
    UMF\-\->>Bank: 7. Refund request
    Bank\-\->>UMF: 8. Return refund result
    UMF\-\->>Merchant: 9. Return a refund object
    Merchant\-\->>Customer: 10. Refund result
</div>

Explanation of flow chart：

1. Customer select the goods to be returned and refunded at merchant platform. 
2. Merchant platform generates a refund order.
3. Customer confirm the refund order.
4. Optional. Merchant [acquire an access token](#3-1-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
5. UMF returns an access token.
6. Merchant request a refund with all order data to UMF. Call [Create a refund](#3-8-create-a-refund).
7. UMF sends a refund request to Bank.
8. Bank returns refund result to UMF.
9. UMF returns a refund object to merchant.
10. Merchant shows the result to customer.
