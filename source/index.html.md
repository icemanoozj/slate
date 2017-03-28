---
title: UMF REST API Reference

language_tabs:
  - shell: cURL
  - java: Java
  - php: php
  - c#: C#

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - payments
  - customs
  - banks
  - errors

search: true
---

# 1. Introduction

## Overview

Welcome qq to the Kittn API! You can use our API to access Kittn API endpoints, which can get information on various cats, kittens, and breeds in our database.

We have language bindings in Shell, Ruby, and Python! You can view code examples in the dark area to the right, and you can switch the programming language of the examples with the tabs in the top right.

This exam API documentation page was created with [Slate](https://github.com/tripit/slate). Feel free to edit it and use it as a base for your own API's documentation.

# 2. Authentication

> To authorize, use this code:

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
```

```shell
# With shell, you can just pass the correct header with each request
curl "api_endpoint_here"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
```

> Make sure to replace `meowmeowmeow` with your API key.

Kittn uses API keys to allow access to the API. You can register a new Kittn API key at our [developer portal](http://example.com/developers).

Kittn expects for the API key to be included in all API requests to the server in a header that looks like the following:

`Authorization: meowmeowmeow`

<aside class="notice">
You must replace <code>meowmeowmeow</code> with your personal API key.
</aside>

# 3. Kittens

## Get All Kittens

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get()
```

```shell
curl "http://example.com/api/kittens"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let kittens = api.kittens.get();
```

> The above command returns JSON structured like this:

```json
[
  {
    "id": 1,
    "name": "Fluffums",
    "breed": "calico",
    "fluffiness": 6,
    "cuteness": 7
  },
  {
    "id": 2,
    "name": "Max",
    "breed": "unknown",
    "fluffiness": 5,
    "cuteness": 10
  }
]
```

This endpoint retrieves all kittens.

### HTTP Request

`GET http://example.com/api/kittens`

### Query Parameters

Parameter | Default | Description
--------- | ------- | -----------
include_cats | false | If set to true, the result will also include cats.
available | true | If set to false, the result will include kittens that have already been adopted.

<aside class="success">
Remember — a happy kitten is an authenticated kitten!
</aside>

## Get a Specific Kitten

```ruby
require 'kittn'

api = Kittn::APIClient.authorize!('meowmeowmeow')
api.kittens.get(2)
```

```python
import kittn

api = kittn.authorize('meowmeowmeow')
api.kittens.get(2)
```

```shell
curl "http://example.com/api/kittens/2"
  -H "Authorization: meowmeowmeow"
```

```javascript
const kittn = require('kittn');

let api = kittn.authorize('meowmeowmeow');
let max = api.kittens.get(2);
```

> The above command returns JSON structured like this:

```json
{
  "id": 2,
  "name": "Max",
  "breed": "unknown",
  "fluffiness": 5,
  "cuteness": 10
}
```

This endpoint retrieves a specific kitten.

<aside class="warning">Inside HTML code blocks like this one, you can't use Markdown, so use <code>&lt;code&gt;</code> blocks to denote code.</aside>

### HTTP Request

`GET http://example.com/kittens/<ID>`

### URL Parameters

Parameter | Description
--------- | -----------
ID | The ID of the kitten to retrieve


序号 | 产品归属 | 需求来源 | 任务 | 预计完成时间 | 完成状态
---|------|------|----|--------|-----
1 | 资金结算类-跨境收款-B2C还原 | 生产问题 | 跟踪每次收结汇交易 | 2/24/2017 | 已完成
2 | 资金结算类-跨境收款-B2C还原 | 新项目 | 保理融资项目 | 3/31/2017 | 未完成
3 | 资金结算类-跨境付款-B2C还原 | 新项目 | 跨境付款API需求 | 3/31/2017 | 未完成
4 | 资金结算类-跨境付款-B2C还原 | 功能优化 | 跨境付款B2C优化 | 3/17/2017 | 已完成
5 | 资金结算类-跨境付款-B2B还原 | 新项目 | B2B付款跟踪，上线，验收 | 3/6/2017 | 未完成
6 | 资金结算类-跨境付款-B2B还原 | 项目文件整理 | 编写跨境B2B付款运营手册 | 3/10/2017 | 已完成
7 | 支付结算类 | 新项目 | B2B收银台需求文档整改评审 | 3/10/2017 | 未完成
8 | 支付结算类 | 新项目 | 融合支付二期产品文档 | 1/25/2017 | 已完成
9 | 支付结算类 | 功能优化 | 收银台实时购汇可行性评估 | 2/17/2017 | 未完成
10 | 支付结算类 | 新项目 | H5收银台上线验收 | 1/15/2017 | 已完成
11 | 支付结算类 | 新项目 | 收银台分账产品文档 | 3/31/2017 | 未完成
12 | 支付结算类 | 项目文件整理 | 收银台运营手册的修正及完善 | 2/9/2017 | 未完成
13 | 支付结算类 | 项目文件整理 | 融合支付产品白皮书中英文版 | 2/7/2017 | 已完成
14 | 支付结算类 | 生产问题 | 收银台生产问题排查及处理 | 随时 | 已完成
15 | 支付结算类 | 功能优化 | 收银台人民币定额购汇产品设计 | 2/27/2017 | 未完成
16 | 其他 | 底层能力 | 深圳海关对接 |  | 未完成
17 | 其他 | 售前支持 | 大连锦城物流网跟踪 |  | 未完成
18 | 其他 | 功能优化 | 客户基础信息上线验收 | 2/11/2017 | 已完成
19 | 其他 | 底层能力 | 组织开“跨境系统问题收集”会议 | 3/31/2017 | 已完成

