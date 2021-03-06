# 8. 附录


## 交易代码及交易附言描述

业务编码  | 业务类型  | 交易编码  | 交易附言 
---------------|-----------------|-------------------|------------------------
01121990 | 货物贸易  | 121990 | 网络购物（报关） 
01122030 | 货物贸易   | 122030 | 未纳入海关统计的网络购物 
02223022 | 留学  | 223022 | 留学及教育相关旅行（一年以上）学费 
02223023 | 留学   | 223023 | 留学及教育相关旅行（一年及一年以下）学费 
03222024 | 机票  | 222024 | 跨境机票款 
03223010 | 机票   | 223010 | 公务及商务旅行机票 
03223021 | 机票   | 223021 | 就医及健康相关旅行机票 
03223022 | 机票   | 223022 | 留学及教育相关旅行（一年以上）机票 
03223023 | 机票   | 223023 | 留学及教育相关旅行（一年以下）机票
03223029 | 机票   | 223029 | 其他私人旅行机票 
04223010 | 酒店 | 223010 | 留学及教育相关旅行（一年以下）酒店
04223021 | 酒店  | 223021 | 其他私人旅行酒店
04223022 | 酒店  | 223022 | 公务及商务旅行酒店
04223023 | 酒店  | 223023 | 就医及健康相关旅行酒店
04223029 | 酒店  | 223029 | 留学及教育相关旅行（一年以上）酒店
05227010 | 话费充值服务 | 227010 | 移动电讯服务
06223010 | 旅游  | 223010 | 公务及商务旅行
06223021 | 旅游   | 223021 | 就医及健康相关旅行 
06223022 | 旅游   | 223022 | 留学及教育相关旅行（一年以上） 
06223023 | 旅游   | 223023 | 留学及教育相关旅行（一年及一年以下） 
06223029 | 旅游   | 223029 | 其他私人旅行
07222012 | 运输  | 222012 | 涉及我国进口的海洋货运服务 
07222022 | 运输   | 222022 | 涉及我国进口的空中货运服务
07222032 | 运输   | 222032 | 涉及我国进口的其他运输方式货运服务
08227020 | 软件服务  | 227020 | 软件服务 
08231030 | 软件服务   | 231030 | 复制或分销计算机软件许可费
09228025 | 国际展览  | 228025 | 展会服务 


## 返回码描述

编号  | 返回码  | 描述 
-----|--------------|-------------
1 | 0000 | 成功
2 | 00060999 | 系统失败 

## 错误交易码描述

编号 | 错误码  | 描述 
----|-------------|-------------
1 | 00060700 | 数据校验未通过 
2 | 00060710 | 商户签名验签失败 
3 | 00060711 | 商户未开通 
4 | 00060720 | 用户手机号错误 
5 | 00060721 | 用户未开通该银行 
6 | 00060722 | 请重新选择支付银行
7 | 00060723 | 支付密码错误请重新输入 
8 | 00060724 | 支付密码错误次数超过3次,支付失败. 
9 | 00060730 | 用户余额不足请充值 
10 | 00060740 | 生成支付订单失败 
11 | 00060750 | 支付失败
12 | 00060751 | 支付超时被冲正 
13 | 00060760 | 支付不存在
14 | 00060761 | 订单正在支付中请稍后 
15 | 00060762 | 订单已过期请重新下单
16 | 00060763 | 订单已关闭 
17 | 00060764 | 订单未支付，请继续支付 
18 | 00060765 | 支付失败请重新选择支付方式
19 | 00060766 | 退款不允许
20 | 00060767 | 退款请求失败 
21 | 00060768 | 退还金额与支付金额不一致 
22 | 00060769 | 不允许撤销 
23 | 00060770 | 撤回金额与付款金额不一致 
24 | 00060022 | 证件号不合法 
25 | 00060076 | 不支持的银行卡账户
26 | 00060101 | 银行卡帐户已经注册
27 | 00060100 | 用户的电话号码已经注册 
28 | 00060105 | 实名认证失败
29 | 00060114 | 商户权限受限 
30 | 00060310 | 用户未开通该商户协议 
31 | 00060314 | 用户未注册
32 | 00060315 | 用户处于非激活状态 
33 | 00281017 | 商户不接受的货币 
34 | 00200005 | 没有找到相关短信验证码
35 | 00281017 | 商户未开通该币种
36 | 00202012 | 不支持的海关 
37 | 00202013 | 海关信息已更新,不可再次更新 
38 | 00202014 | 是否报关为N,但却要求更新海关信息
39 | 00202015 | 无相应子订单信息 
40 | 00202016 | 无相应商品信息表信息
41 | 00202000 | 汇率查询响应参数有误
42 | 00202001 | 订单外币金额不能为空
43 | 00202002 | 身份证号不存在，请核实后再输入
44 | 00202003 | 订单外币金额必须大于0
45 | 00202005 | 银行卡号输入有误 
46 | 00202006 | 更新订单扩展表失败 - 转换ID类型 
47 | 00202007 | 更新跨境扩展表失败 
48 | 00202008 | 跨境订单数据不存在 
49 | 00202009 | 身份证号输入不正确 
50 | 00202010 | 商户传入订单金额与原订单金额不一致,退费失败
51 | 00202011 | 商户传入订单币种[USD]与原订单币种[CNY]不一致,不允许退费
52 | 00200086 | 验证码一分钟内只可获取一次
53 | 00290502 | 身份认证 信息不一致

## 交易状态说明

编号 | 枚举名称  | 说明  | 备注 
----|-------------------|--------------|------
1 | WAIT_BUYER_PAY | 交易创建,等待买家付款.  | 
2 | TRADE_SUCCESS | 交易成功,不能再次进行交易.  | 
3 | TRADE_CLOSED | 交易关闭,在指定时间段内未支付时关闭的交易. | 
4 | TRADE_CANCEL | 交易撤销  | 
5 | TRADE_FAIL | 交易失败  | 


## 退费状态说明

编号 | 枚举名称  | 说明  | 备注 
----|-------------------|--------------|------
1 | REFUND_SUCCESS | 退费成功  | 
2 | REFUND_CLOSE | 退费关闭 | 退款失败返回状态
3 | REFUND_PROCESS | 退费处理中  | 
4 | REFUND_FAIL | 退费失败  |  


## 货币代码

编号| 币种编码  | 币种描述 
------|----------------|----------------------
1 | CNY | 人民币 
2 | HKD | 港币
3 | USD | 美元 
4 | EUR | 欧元 
5 | JPY | 日元 
6 | GBP | 英镑
7 | AUD | 澳元
8 | CAD | 加拿大元
9 | NZD | 纽元
10 | SGD | 新加坡元
12 | CHF | 瑞士法郎 
13 | SEK | 瑞典克朗
14 | DKK | 丹麦克朗
15 | NOK | 挪威克朗

