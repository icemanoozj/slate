# 5. 实体

## address

参数 | 描述 | 约束
----------|------------|------------
recipient_name  | 收件人姓名.  | 
line1  | 地址的第一行. 例如, 街道号, 等等.   | 100个字符以内.
line2 | 地址的第二行. 例如, 公寓号, 等等.   | 100个字符以内.
city  | 城市名称.   | 50个字符以内.
state  | 国家代码.  | 100个字符以内.
country_code  | [城市代码](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)  | 
postal_code  | 邮政编码.   | 20个字符以内. 一些国家要求.
phone | 手机号  | 50个字符以内. 

## amount

参数 | 描述 | 约束
----------|------------|------------
total | 收款或退款的总金额.   | 10个字符以内. 小数点后两位.
currency | [ISO-4217] (https://en.wikipedia.org/wiki/ISO_4217#Active_codes) 币种代码.  | 
total_cny | 人民币金额. **可选**.  | 
exchange_rate | 汇率. **可选**.  | 
  
## bank

参数 | 描述| 约束
----------|------------|------------
name | 英文的银行名称.  | 
name_zh | 中文的银行名称.  |  
code | 银行缩写. 国内银行.  | 
logo_url | 银行图标地址.  | 
types | 银行支持的卡类型.   | 可选值: **CREDIT_CARD**, **DEBIT_CARD**

### 银行列表(支持信用卡支付)

编号  | 银行代码  | 银行名称 
-----|------------|------
1 | ICBC | 中国工商银行 
2 | CCB | 中国建设银行 
3 | ABC | 中国农业银行 
4 | BOC | 中国银行 
5 | PSBC | 中国邮政储蓄银行
6 | COMM  | 交通银行 
7 | CITIC | 中信银行 
8 | CEB | 光大银行 
9 | HXB | 华夏银行 
10 | CMBC | 中国民生银行 
11 | CMB | 中国招商银行 
12 | SHB  | 上海银行 
13 | BJB | 北京银行 
14 | BEA | 东亚银行 
15 | CIB | 兴业银行 
16 | NBB | 宁波银行 
17 | SPDB | 上海浦东发展银行 
18 | GDB | 广东发展银行 
19 | SPAB | 平安银行 
20 | BSB | Baoshang Bank 
21 | CSCB | 长沙银行 
22 | CDB | 承德银行 
23 | CDRCB | 成都农村商业银行 
24 | CRCB | 重庆农村商业银行 
25 | CQB | 重庆银行 
26 | DLB | 大连银行 
27 | DYCCB | 东营商业银行 
28 | ORBANK | 鄂尔多斯银行 
29 | FJNXB | 福建农村信用社 
30 | GYB | 贵阳银行 
31 | GCB | 广州银行 
32 | GRCB | 广州农村商业银行 
33 | HEBB | 哈尔滨银行 
34 | HNNXB | 湖南农村信用社 
35 | HSB | 汇丰银行 
36 | BHB | 河北银行 
37 | HZCB | 杭州银行 
38 | BOJZ | 锦州银行 
39 | CSRCB | 江苏常熟农村商业银行 
40 | JSB | 江苏银行 
41 | JRCB | 江阴农村商业银行 
42 | JJCCB | 九江银行 
43 | LZB | 兰州银行 
44 | DAQINGB | 龙江银行 
45 | QHB | 青海银行 
46 | SHRCB | 上海农村商业银行 
47 | SRB | 上饶银行 
48 | SDEB | 顺德农村商业银行 
49 | TZCB | 台州银行 
50 | WHSHB | 威海商业银行 
51 | WFCCB | 潍坊银行 
52 | WZCB | 温州银行 
53 | URMQCCB | 乌鲁木齐商业银行 
54 | WRCB | 无锡农村商业银行 
55 | YCCB | 宜昌商业银行 
56 | YZB | 鄞州银行 
57 | CZCB | 浙江稠州商业银行 
58 | ZJTLCB | 浙江泰隆商业银行 
59 | MTBANK | 浙江民泰商业银行 
60 | NJCB | 南京银行 
61 | NCB | 南昌银行 
62 | QLBANK | 齐鲁银行 
63 | YDRCB | 尧都农村商业银行 
64 | WJRCB | 吴江农村商业银行 

### 银行列表(支持借记卡支付) 

编号. | 银行代码  | 银行名称
----|------------|-----
1 | SPDB | 上海浦东发展银行 
2 | CCB | 中国建设银行 
3 | ABC | 中国农业银行 
4 | BOC | 中国银行 
5 | CITIC | 中信银行 
6 | CEB | 光大银行 
6 | CMB | 中国招商银行
7 | ICBC | 中国工商银行
8 | CMBC | 中国民生银行
9 | GDB | 广东发展银行
10 | COMM | 交通银行
11 | SPAB | 平安银行
12 | HXB | 华夏银行
13 | PSBC | 中国邮政储蓄银行
14 | CIB | 兴业银行

## bank_card

参数 | 描述 | 约束
------- | ------- | -------
number | 卡号| 字符串. **必须加密**.  
valid_date | 银行卡有效期| 字符串. **必须加密**. 
cvv2 | 银行卡安全码| 字符串. **必须加密**.
card_holder | 持卡人姓名| 字符串. **必须加密**. 
external_customer_id | 商户系统的用户id.| 字符串
state | 卡号的状态.| 枚举类型  
phone | 银行预留号码.| 字符串. 
citizen_id_type | 公民当前身份类型. | 枚举类型, 必须是**IDENTITY_CARD**. 
citizen_id_number |  身份证号码.| 字符串. **必须加密**.

## customs_declaration

参数 | 描述 | 约束
------- | ------- | -------
id | id| 字符串 
sub_order |子订单对象| 对象
customs_id | 海关申报时的海关编号(如 HZ, NB 和 GZ 分别代表杭州, 宁波 和广州海关).| 对象
mer_customs_code | 海关商户号| 
freight_amount |  支付运费| 对象. 金额对象.
tax_amount | 海关税| 对象. 金额对象. 
ec_plat_id | 海关系统电子商务平台帐号| 
notify_url | 商户接收通知地址. 从UMF接收地址.| 
state | 状态| ACCEPTED <br /> SUBMITTED <br /> SUCCESS <br /> FAIL
customs_clearance_date | 请求海关日期格式为YYYYMMDD| 

## exchange_rate

参数 | 描述| 约束
------- | -------| -------
currency | 货币代码| 枚举
rate | 汇率| 字符串

## enterprise_qualification

企业资质. 应用于B2B业务.

参数 | 描述| 约束
------- | -------| -------
external_enterprise_id | 商户系统中的企业id| 字符串
enterprise_name | 企业名称| 字符串
enterprise_phone | 手机号| 字符串
enterprise_email | 邮箱| 字符串
enterprise_contacts | 联系人姓名| 字符串
enterprise_status | 企业状态| 枚举. <br/>**ENABLE**: 企业通过资质审核<br/>**UNKNOWN**:企业资质审核正在处理
busi_type | 企业类型. <br />**-SJHG**: For the company which exchange money to CNY. <br /> **-GFHG**: For the company which exchange money from CNY.| 枚举
enterprise_code | 法人实体和其他组织统一的社会信用法典体系.请参见 [统一社会信用准则](http://english.gov.cn/policies/latest_releases/2015/06/17/content_281475129090642.htm) ([统一社会信用代码](http://baike.baidu.com/item/%E7%BB%9F%E4%B8%80%E7%A4%BE%E4%BC%9A%E4%BF%A1%E7%94%A8%E4%BB%A3%E7%A0%81))| 字符串.


## item

子订单中相同商品的信息.

参数 | 描述| 约束
------- | -------| -------
mer_item_id | 商户系统id.| 字符串
type | 商品类型 <br/> **CLOTHING** <br/> **FOOD** <br/> **ELECTRONICS** <br/> **OTHER**| 枚举
name | 商品名称| 字符串
description | 商品描述| 字符串
[amount](#amount) | 金额. 商品的价格.| 对象
quantity | 数量. 商品的数量.


## link

付款或退款对象的一部分. 这是那些对象的下一步. 链接取决于对象的状态.

参数 | 描述| 约束
------- | -------| -------
href | 对象的url. 对象或对象的可用操作.| 字符串
rel | 对象的关联操作地址.| 字符串
method | http方法. POST或GET| 枚举.


## meta

响应信息的一部分. 包含响应的公共信息.

参数 | 描述
------- | -------
ret_code | 响应的返回码.
ret_msg | 响应信息.
sign | 响应的签名. 接收方使用用UMF的公钥验签.


## order

订单信息. 订单的详细信息,item必须在子订单对象中.

参数 | 描述| 约束
------- | -------| -------
[amount](#amount) | 订单总金额.| 对象
order_summary | 订单信息.| 字符串
mer_reference_id | 订单号. 商户唯一订单号.| 字符串
mer_date | 订单日期. 下单的日期. | 字符串
expire_time | 支付截止日期. 如果支付时间过时, UMF不会支付订单.| 字符串
sub_orders | [子订单](#sub_order) 数组对象. 每个子订单只能是相同的商品类型.| 对象数组
state | 订单状态.| 枚举
user_ip | 用户付款请求的IP地址.| 字符串


## pagination

一些返回大量对象的API接口会响应分页信息; 以及对象列表中也会有响应的分页的key:

参数 | 描述| 约束
------- | -------| -------
total_count | 交易列表总数.| 数字
page_number | 当前页的数量 (从1开始).| 数字
page_size | 每一页的记录大小.| 数字

## payer

付款信息.

参数 | 描述| 约束
------- | -------| -------
payment_method | 支付方式. 可选值如下:<br />- **CREDIT_CARD** : 信用卡支付. <br /> [请参见银行卡支付流程](#2-2).<br /> - **DEBIT_CARD**: 借记卡支付. <br /> [请参见银行卡支付流程](#2-2d).<br /> - **WECHAT_SCAN**: UMF返回二维码字符串. 客户可以用微信扫描二维码支付. <br />  [请参见二维码支付流程](#2-3).<br /> - **WECHAT_IN_APP**: 用户可以在app应用里完成支付. <br /> [请参见微信APP支付流程](#2-5).<br /> - **WECHAT_WEB**: 用户可以在微信浏览器内完成支付. <br /> [请参见微信公众号支付流程](#2-4).<br /> - **ALIPAY_SCAN**: UMF返回二维码字符串. 用户使用支付宝扫描二维码完成支付. <br /> [请参见二维码支付流程](#2-3). <br /> - **NOT_APPLICABLE**: 接口类型是收银台或网银直连.| 枚举
[bank_code](#bank) |  国内银行缩写. 请参见[Banks](#banks-supported-by-credit-card-payment)| 枚举
business elements object |该部分的名称可能是不同的, 取决于企业类型. 可选值如下: <br/> B2C付款的为[付款明细](#payer_info). <br/> B2B付款的为[企业资质](#enterprise_qualification).| 对象
interface_type |  付款接口类型. 可选值如下: <br /> - **SERVER_TO_SERVER** : API请求 <br> - **SERVER_TO_WEB** : 服务器到UMF收银台 <br/> - **DIRECT_TO_BANK** : 网银, 如果 payment_method的值为NOT_APPLICABLE, bank_code会发送.| 枚举
business_type | 可选值如下: <br/> - **B2B** : 企业到企业.<br/> - **B2C** : 企业到用户.
Available payment_method for each **interface_type** and **business_type**.| 枚举

接口类型 | B2C | B2B
---------------|-----|----
**SERVER_TO_SERVER** | 信用卡 <br /> 借记卡 <br /> 微信主扫 <br /> 微信APP <br/> 微信公众号 <br/> 支付宝主扫 |  
**SERVER_TO_WEB** | 信用卡 <br /> 借记卡 <br /> 微信主扫 <br /> 支付宝主扫 <br/> NOT_APPLICABLE |
**DIRECT_TO_BANK** | 微信主扫 <br /> 支付宝主扫  | NOT_APPLICABLE

## payer_agreement

支付协议代表了用户的一张卡. 验证时商户可以使用这个对象代替银行卡对象.

参数 | 描述
------- | -------
usr_busi_agreement_id  | 商户系统每个用户的唯一id.
usr_pay_agreement_id  | 每个usr_busi_agreement_id的每张卡的唯一id.
gate_id  | 银行代码.
last_four_cardid  | 卡号后四位.
valid_date  | 银行卡有效期.
cvv2  | 银行卡安全码.

## pay_info

支付信息对象包含微信APP支付和微信公众号支付的信息. 

参数 | 描述| 约束
------- | -------| -------
app_id | UMF的合作商户的唯一标识符| 字符串
time_stamp | 从世界时间1970年1月1日星期四至今经过的秒数.| 字符串
sign_type | 签名方式. 此情景下为MD5.| 字符串
package | 微信支付的id.| 字符串
nonce_str | 生成签名的随机字符串.| 字符串
pay_sign | 请求的签名.| 字符串

## payer_info

支付人信息.

参数 | 描述| 约束
------- | -------| -------
phone | 支付人手机号.| 字符串
name | **必须加密**. 支付人姓名.| 字符串
pay elements object | 这部分的名称是不同的, 取决于支付类型. 可选值如下.<br /> [bank_card](#bank_card). 支付类型有: 信用卡支付, 借记卡支付 <br /> [qr_code_scan](#qr_code_scan). 支付类型有: 微信主扫支付, 支付宝主扫支付 <br /> [wechat_in_app](#wechat_in_app) 支付类型有: 微信APP支付 <br /> [wechat_in_app_web](#wechat_in_app_web) 支付类型有: 微信公众号支付 <br /> [payer_agreement](#payer_agreement) 支付类型有: CREDIT_CARD, DEBIT_CARD| 对象 
verify_code | 仅存在于银行卡支付. 银行会向用户发送短信验证码. 验证码将要提交到银行验证.| 字符串

## payment

支付对象是API接口的核心. 包含如下信息:

参数 | 描述| 约束
------- | -------| -------
id |  支付id.| 字符串
[payer](#payer) | 支付信息.| 对象.
[order](#order) | 订单信息. 包含子订单.| 对象
state |<br />**-WAIT_BUYER_PAY**: 付款需要支付. <br /> **-TRADE_SUCCESS**: 支付成功.<br /> **-TRADE_CLOSED**:订单过期,支付关闭.<br /> **-TRADE_CANCEL**:付款取消.<br /> **-TRADE_FAIL**: 支付失败.| 枚举
ret_url | 支付完成返回的地址. 仅存在于商户使用UMF的收银台.| 字符串
execute_success_time | 金额从用户账户转移到UMF账户的时间.| 字符串
mer_check_date | 交易日期. 日期来自商户系统. 不具有时区信息. 交易将在交易列表和对账列表中标记此日期.| 字符串
settle_date | UMF的交易日期.| 字符串
[risk_info](#risk_info) | 反欺诈信息. 内容取决于商户和UMF之间的合同.| 对象
[links](#link) | 下一步操作的链接. 取决于支付状态和支付类型. 链接为HATEOAS链接.| 对象数组

## payment_summary

支付摘要. 包含在交易对象或对账对象.

参数 | 描述| 约束
------- | -------| -------
payment_id | 支付id.|
phone_number | 用户手机号. *仅存在于交易对象.**|
order_date |  订单日期.|字符串
mer_reference_id | 订单参考id.|字符串
amount | [Object](#amount). 包含下列参数: cb_amount, cny_amount, currency, exchange_rate.|
settle_date | 支付请求提交日期.|字符串
execute_success_time | 支付的时间戳. 交易完成时间.|
state | 请参见 [payment](#payment).|
product_id |UMF的产品id.|字符串
service_fee | 人民币的服务费. *仅存在于对账对象.**|
exchange_amount | 兑换的金额, 是一个金额的对象. 包含如下参数: cb_amount, cny_amount, currency, exchange_rate. **仅存在于对账对象.**|
exchange_date | 兑换日期. **仅存在于对账对象.**|

## qr_code_scan

商户为每个订单创建二维码. 用户使用微信或支付宝扫描二维码后, 可以在手机上看到相关的产品信息和交易指南. 这个对象可以用于微信或支付宝.

如果商户想显示一个二维码给客户进行扫描, wechat_qr_code对象需要被包含在payer_info对象中.

参数 | 描述| 约束
------- | -------| -------
citizen_id_type | 身份证类型. 目前, 必须为**IDENTITY_CARD**.| 枚举
citizen_id_number |  **必须加密**. 身份证号码.| 字符串
qr_code_url | 微信二维码支付地址. 该信息由UMF返回| 字符串

qr_code_url是二维码的内容.商户使用二维码转换工具将url字符串转换为二维码. 当用户使用微信或二维码扫描二维码时, 可以使用微信或支付宝支付.

## reconciliations

对账信息.

参数 | 描述| 约束
------- | -------| -------
payment_summaries |[payment_summary](#payment_summary)的对象数组.| 对象数组
refund_summaries | [refund_summary](#refund_summary)的对象数组.| 对象数组
settle_date | 结算日期.| 字符串
amount | 对账的总金额.| 对象
pagination | pagination对象返回当前页和当前页的记录数的信息.| 对象

## refund

退款对象取决于付款对象. 一次付款可以联系多个退款对象, 意味着一次付款可以被多次退款. 退款的总金额不会大于付款的总金额. 包含如下信息:

参数 | 描述| 约束
------- | -------| -------
id | 退款对象id.| 字符串
[order](#order) | 一个订单对象，其中包含要返回的商品信息.| 对象
notify_url | 商户通知地址. 用于接收退款通知.| 字符串
state | 退款状态. **REFUND_PROCESS**, **REFUND_SUCCESS**, **REFUND_FAIL**, **REFUND_CLOSE**.|枚举
parent_payment | 支付id.| 字符串

## refund_summary

退款摘要. 包含在交易对象或对账对象中.

参数 | 描述| 约束
------- | -------| -------
refund_id | 退款id.
payment_id | 支付id.
phone_number | 用户手机号. **仅存在于交易对象.**
amount | [Object](#amount). 包含如下参数: cb_amount, cny_amount, currency, exchange_rate.
settle_date | 退款请求提交日期.| 字符串
execute_success_time |交易完成时间戳.
state | 请参见 [refund](#refund).
mer_sub_reference_id | 子订单参考id. **仅存在于对账对象.**


## risk_info

交易信息. UMF使用信息核准或拒绝交易. 如果欺诈的风险太高交易将被取消. 反欺诈算法将周期性地进行检查.

字段名 | 描述 | 字段描述 | 发送与否 
-------|--------------|--------------------|-------------
goods_type | 商品分类 | 枚举. <br/> `0` 虚拟商品 <br/> `1` 实物商品 <br/> `2` 机票 <br/> `3` 电子产品 | 必填
real_name | 商品实名制购买 | 枚举. <br/> `0` 非实名制 <br/> `1` 实名制 | 必填
business_type | 业务类型  | 枚举 `3` 跨境支付 | 必填
trans_type | 交易类型  | 枚举. <br/> `01` 充值 <br/> `02` 消费 | 必填
receiver_name | 收货人姓名  | 当 **goods_type** 是`1`或`3`, 该字段必填. | 视情况而定
receiver_moblie_id | 收件人的电话号码 | 当 **goods_type** 是`1`或`3`, 该字段必填. <br /> 例如: 13800011111 | 视情况而定
receiver_address | 送货地址  |  当 **goods_type** 是`1` 或 `3`, 该字段必填. | 视情况而定
registration_identify_code | 身份证号码 | 注册人身份证号码,  当 **real_name** 是 `1`, 该字段必须. | 视情况而定
registration_email | 注册人邮箱  | 用户注册时所用邮箱, 商户必须加密 | 非必填
registration_moblie_id | 手机号 | 注册人手机号 | 非必填
device_id | 设备id  | 例如，手机的MAC地址或内部定义的终端标识ID.  | 非必填
device_type | 设备类型  | 如果是WEB终端, 用户不为空. APP为空.  | 非必填
user_id | User ID  | 商户平台用户id | 非必填
registration_time | 用户注册时间 | 用户注册产品的时间，在第二阶段应该准确读取. <br />例如:20150311120000 | 非必填
user_agent | 产品形态  | 枚举. <br/> `1` android app <br/> `2` IOS app <br/> `3` PC (web page) <br/> `4` Mobile phone(wap, or html5 page);  | 非必填
success_transactions_number | 用户成功交易笔数 | 商户平台的成功交易量 | 非必填



[comment]: # (statement)

## sub_order

相同交易id的商品在同一个子订单对象中.

参数 | 描述| 约束
------- | -------| -------
mer_sub_reference_id | 子订单对象的id.| 字符串
[amount](#amount) |  子订单金额.| 对象
order_summary | 子订单摘要.| 字符串
trans_code | 商品的交易码. 请参见 [Transaction encoding and transaction postscript description](#transaction-encoding-and-transaction-postscript-description)| 枚举
is_customs | 商户是否需要UMF向用户提交付款信息.| 布尔类型
invoice_id |  子订单收据.| 字符串
items |  [item](#item)对象数组.| 对象数组

## transactions

交易信息.

参数 | 描述| 约束
------- | -------| -------
payment_summaries | [payment_summary](#payment_summary)对象数组.| 对象数组
refund_summaries | [refund_summary](#refund_summary)对象数组.| 对象数组
pagination |  pagination对象返回当前页和当前页的记录数的信息.| 对象


## wechat_in_app

返回所有微信SDK要求激活和付款的所有信息.

参数 | 描述| 约束
------- | -------| -------
citizen_id_type | 身份证类型. 目前, 必须为 **IDENTITY_CARD**.| 枚举
citizen_id_number | **必须加密**. 身份证号码.| 字符串
[pay_info](#pay_info) | 调用微信本地SDK激活微信APP的信息.| 对象

## wechat_in_app_web

返回所有微信SDK要求激活和付款的所有信息. 商户不需要修改微信需要的信息.

参数 | 描述| 约束
------- | -------| -------
open_id | OpenID是为每个合作用户的唯一微信id, 不同的用户有单独的OpenID. | 字符串
citizen_id_type | 身份证类型. 目前, 必须为 **IDENTITY_CARD**.| 枚举
citizen_id_number | **必须加密**. 身份证号码.| 字符串
[pay_info](#pay_info) | 在微信浏览器调用微信JS-API唤醒微信支付插件的信息.| 对象
 

