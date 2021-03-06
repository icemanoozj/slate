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

Make a /oauth/authorize call with your app's OAuth client_id and secret key for the basic authentication values. In the request body, set grant_type to "client_credentials". When you call [Get an access token](#1-5-get-an-access-token) , UMF generates and returns an access token.

For information about the request headers, see [REST API authentication](#1-2-authentication) and [headers](#1-3-http-request). See the API [Get an access token](#1-5-get-an-access-token).

<aside class="notice">
Note: The access token is valid for the number of seconds specified in the expires_in response field. You must have a valid access token to make API requests—request a new token when the current one expires.
</aside>

### Make an API call

With a valid access token in hand, you're ready to make a request to a REST interface.

The access token is an OAuth bearer token and is included in the header of your requests with the following syntax:

Authorization: Bearer Access-Token

For details on authentication, see [Authentication](#1-2-authentication).


## 2.2 Pay by credit card or debit card

Merchant can request payment in [15 type of currency](#currency-codes). The consumer can use chinese credit card and debit card to make payment in RMB. The interaction process between merchant and UMF is as follows :

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
    Merchant\-\->>UMF: 4. Optional. Acquire an access token
    UMF\-\->>Merchant: 5. Return access_token
    Note right of Merchant:  Using access token to make API call
    Merchant\-\->>UMF: 6. Create a payment
    UMF\-\->>Merchant: 7. Return a payment object
    Merchant\-\->>UMF: 8. Optional. Get available banks
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
    Note right of Merchant: If the merchant submit the ret_url and notify_url when call Create a payment. UMF will notify the payment result after payment succeed.
    UMF\-\->>Merchant: 19. Payment result notification.
    Merchant\-\->>Customer: 20. Payment result
</div>

Explanation of the sequence chart：

1. Customer orders goods at merchant platform.
1. Merchant generate an order.
1. Customer confirm the order.
1. Optional. Merchant [acquire an access token](#1-5-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
1. UMF returns an access token.
1. Merchant submit order data to UMF. Call [Create a payment](#3-2-create-a-payment).
1. UMF return a payment object.
1. Optional. Merchant [query the availabled banks](#3-1-query-available-banks). The bank list is barely changed. Merchant may cache the result and use the cache to speed up the  loading.
1. UMF returns the available banks.
1. Merchant show the payment page to customer
1. Customer select the bank, filling the card info and phone number, acquire a SMS for verification. The phone number must be the same with user regirested in the bank user selected. UMF will check it.
1. Merchant call the UMF to send a SMS to customer's phone number. Call [SMS verification](#3-3-SMS-verification).
1. UMF returns a response to UMF to confirm that the SMS was sent.
1. UMF(or Bank) will send a SMS to customer's phone.
1. Customer fill the received SMS and submit.
1. Merchant issues a payment request to the UMF. Call [Execute a payment](#3-4-Execute-a-payment).
1. UMF initiates deduction request to the bank.
1. UMF receives the result of deduction.
1. UMF [sends the payment result notification](#3-5-payment-result-notification) to merchant.
1. Merchant shows the result to customer.

## 2.3 Pay by WeChat/Alipay QR Code Payment

Merchant can request payment in [15 type of currency](#currency-codes). The consumer can scan the QR-Code by WeChat or Alipay to make payment in RMB. The interaction process between merchant and UMF is as follows :

**It will be released in June 2017.**

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
    Merchant\-\->>UMF: 4. Optional. Acquire an access token
    UMF\-\->>Merchant: 5. Return access_token
    Note right of Merchant:  Using access token to make API call
    Merchant\-\->>UMF: 6. Create a payment
    UMF\-\->>WeChat/Alipay: 7. Payment request
    WeChat/Alipay\-\->>UMF: 8. Return an URL of QR code
    UMF\-\->>Merchant: 9. Return an ali_qr_scan object
    Merchant\-\->>Customer: 10. Show the page of QR code which generated by the URL
    Customer\-\->>WeChat/Alipay: 11. Finish the payment by scanning QR code
    WeChat/Alipay\-\->>UMF: 12. Deduction result
    UMF\-\->>Merchant: 13. Payment result notification
    Merchant\-\->>Customer: 14. Payment result
    
</div>

Explanation of the sequence chart：

1. Customer orders goods at merchant platform.
1. Merchant generate an order.
1. Customer confirm the order.
1. Optional. Merchant [acquire an access token](#1-5-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
1. UMF returns an access token.
1. Merchant submit order data to UMF. Call [Create a payment](#3-2-create-a-payment).
1. UMF sends a payment request to WeChat/Alipay.
1. WeChat/Alipay returns an URL of QR code to UMF.
1. UMF returns an ali_qr_scan object.
1. Merchant show the page of QR code to customer.
1. Customer finish the payment by scaning QR code.
1. UMF receives the result of deduction.
1. UMF [sends the payment result notification](#3-5-payment-result-notification) to merchant.
1. Merchant shows the result to customer.

## 2.4 Pay by Wechat In-App Web-based Payment

Merchants push product messages to their followers via Official Account. With WeChat Pay enabled, their followers can purchase products on the shopping page.

**It will be released in June 2017.**

<div class="mermaid">
sequenceDiagram
    participant Consumer
    participant WeChat Browser
    participant Merchant
    participant UMF
    participant WeChat
    Consumer\-\->>Merchant: 1. Order goods
    Merchant\-\->>Consumer: 2. Generate order
    Consumer\-\->>WeChat Browser: 3. Confirm order
    WeChat Browser\-\->>UMF: 4. Request authorization page(html and javascript)
    UMF\-\->>WeChat Browser: 5. Return autorization page.
    WeChat Browser\-\->>WeChat: 6. Request open_id
    WeChat\-\->>WeChat Browser: 7. Return open_id
    WeChat Browser\-\->>Merchant: 8. Redirect page to notify_url
    Merchant\-\->>WeChat Browser: 9. Return a pending page.
    WeChat Browser\-\->>Merchant: 10. Request wechat pay.
    Note right of Merchant:  Call API with access token
    Merchant\-\->>UMF: 11. Payment request
    UMF\-\->>WeChat: 12. Payment request
    WeChat\-\->>UMF: 13. Return payment info
    UMF\-\->>Merchant: 14. Return a WeChat_in_app_web object
    Merchant\-\->>WeChat Browser: 15. Activate payment widget
    WeChat Browser\-\->>WeChat Browser: 16. Call WeChat JS-API
    Consumer\-\->>WeChat: 17. Enter password, finish payment
    WeChat\-\->>WeChat Browser: 18. Return pending info.
    WeChat Browser\-\->>WeChat Browser: 19. Redirect to ret_url.
    WeChat\-\->>UMF: 20. Deduction result.
    UMF\-\->>Merchant: 21. Payment result.
</div>

Explanation of the sequence chart：

1. Consumer orders goods at merchant platform.
1. Merchant generates an order.
1. Consumer confirms the order.
1. Consumer authorize merchant to have open_id by request UMF [authorization url](#3-15-get-wechat-open_id)
1. UMF returns the authorization page.
1. The authorization page requests WeChat open_id. 
1. The WeChat returns the open_id of current WeChat user.
1. The authorization page redirect to notify_url(step 4).
1. **Optional**. The Merchat returns a pending page to wait.
1. **Optional**. The pending page request a payment.
1. Merchant send payment request to UMF.Call [Create a payment](#3-2-create-a-payment).
1. UMF sends payment request to WeChat.
1. WeChat returns payment info to UMF.
1. UMF returns a WeChat_in_app_web object.
1. Merchant returns info with WeChat_in_app_web object to browser.
1. The return page activates Wechat payment widget(WeChat JS-API).
1. Consumer enter password and finish the payment in WeChat explore.
1. WeChat return ap pending page.
1. The pending page redirect to ret_url(step 11).
1. WeChat send the payment result to UMF.
1. UMF send the payment result to Merchat.

## 2.5 Pay by Wechat In-App Payment

Merchants can integrate WeChat Pay SDK into their apps. When users make payment in other apps, WeChat will be authorized to process the payment. Once the transaction is done, the page will redirect to the merchant's app.

**It will be released in June 2017.**

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
    Merchant App Server\-\->>UMF: 5. Optional. Acquire an access token
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

Explanation of the sequence chart：

1. Customer orders goods at merchant platform.
1. Merchant App Client generate an order.
1. Customer App Client confirm the order.
1. Request for initial a payment.
1. Optional. Merchant [acquire an access token](#1-5-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
1. UMF returns an access token.
1. Merchant app server submit order data to UMF. Call [Create a payment](#3-2-create-a-payment).
1. UMF sends payment request to WeChat.
1. WeChat returns payment info to UMF.
1. UMF returns a WeChat_in_app object to merchant app server.
1. Merchant app server activate Wechat payment widget.
1. WeChat payment widget activated.
1. Customer enter password and finish the payment in WeChat explore.
1. UMF receives the result of deduction.
1. UMF sends the result to merchant app server.
1. Merchant app server sends the result to merchant app client.
1. Merchant app client shows the result to customer.

## 2.7 B2C Payment

## 2.8 B2B Payment

B2B Payment scenario: A Chinese company buys from a non-Chinese merchant.

The company can pay in CNY. The Merchant will get local currency, such as USD or CAD. See the [currencys](#currency-codes) we support. 

There are two steps to make a payment.

- Register a company as a client of current Merchant.
- Use online payment to pay.

### The diagram of register a company.

<div class="mermaid">
sequenceDiagram
    participant Company
    participant Merchant
    participant UMF
    participant Bank
    Company\-\->>Merchant: 1. Commit documents.
    Merchant\-\->>UMF: 2.Send documents(offline).
    UMF\-\->>Bank: 3. Send documents(offline).
    Bank\-\->>UMF: 4. Notify verify result(offline).
    UMF\-\->>Merchant: 5. Return verify result(offline).
    Merchant\-\->>UMF: 6. Regiter a company.
    UMF\-\->>Merchant: 7. Return the information of registered company.
</div>

Explanation of the sequence chart：

1. The company commit all the required documents to the Merchant. 
2. The Merchant commit documents to UMF.
3. UMF check the document and sent it to the bank.
4. The bank verify if the company is qualifed to do the business, Then send the result to UMF.
5. UMF returns the result to Merchant.
6. **online**. If the company is ok, The merchant [register the company](#4-1-regiest-a-company) with UMF end.
7. **online**. UMF return the information of created company. The most important thing is the company id.


### The diagram of make a payment.

<div class="mermaid">
sequenceDiagram
    participant Company
    participant Merchant
    participant UMF
    participant Bank
    Company\-\->>Merchant: 1. Make a payment.
    Note right of Merchant: If the merchant have an unexpired access token. It can be used to make an API call.
    Merchant\-\->>UMF: 2. Optional. Acquire an access token
    UMF\-\->>Merchant: 3. Return access_token
    Note right of Merchant:  Using access token to make API call
    Merchant\-\->>UMF: 4.Create a payment.
    UMF\-\->>Merchant: 5. Return the payment object.
    Merchant\-\->>Bank: 6. Redirect payment page to online bank.
    Bank\-\->>Company: 7. Show online payment page.
    Company\-\->>Bank: 8. Pay it online.
    Bank\-\->>UMF: 9. Payment result notification.
    Note right of Merchant: If the merchant submit the ret_url and notify_url when call Create a payment. UMF will notify the payment result after payment succeed.
    UMF\-\->>Merchant: 10. Payment result notification.
    Merchant\-\->>UMF: 11. Upload all the required documents.

</div>

Explanation of the sequence chart：

1. The Company select the goods and request a payment.
1. Optional. Merchant [acquire an access token](#1-5-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 2 and setp 3.
1. UMF returns an access token.
1. Merchant submit order data to UMF. Call [Create a payment](#4-3-create-a-payment).
1. UMF returns the created payment object. The payment object includes the URL to UMF payment service. Merchant should open a new window to UMF payment Service.
1. The merchant open a new window to the payment URL. The final page belongs to the bank.
1. The bank returns the online payment page to the company.
1. The company fills all the information and commit. The payment must use business bank account.
1. Bank send notification of the payment result to UMF.
1. UMF send [notification of the payment result](#3-5-payment-result-notification) to Merchant.
1. If the payment is succeed, the merchant should upload all the required documents(contract, bills, invoices ...) to UMF via FTP protocol. UMF will check the documents offline. If everything is ok, the CNY will be exchanged to wanted currency.See how to [upload the reuired documents](#4-4-upload-transaction-files).

## 2.9 Refund

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
    Merchant\-\->>UMF: 4. Optional. Acquire an access token
    UMF\-\->>Merchant: 5. Return access_token
    Note right of Merchant:  Using access token to make API call
    Merchant\-\->>UMF: 6. Request a refund
    UMF\-\->>Bank: 7. Refund request
    Bank\-\->>UMF: 8. Return refund result
    UMF\-\->>Merchant: 9. Return a refund object
    Merchant\-\->>Customer: 10. Refund result
</div>

Explanation of the sequence chart：

1. Customer select the goods to be returned and refunded at merchant platform. 
2. Merchant platform generates a refund order.
3. Customer confirm the refund order.
4. Optional. Merchant [acquire an access token](#1-5-get-an-access-token). This step is optional. If the merchant have an unexpired access_token already, This token can be used to make a API call. Please ignore step 4 and setp 5.
5. UMF returns an access token.
6. Merchant request a refund with all order data to UMF. Call [Create a refund](#3-8-create-a-refund).
7. UMF sends a refund request to Bank.
8. Bank returns refund result to UMF.
9. UMF returns a refund object to merchant.
10. Merchant shows the result to customer.
