# Customs

Customs API

* aaa
* bbb

1. aaa
2. aaa

## Create cumtoms clearance

### Create cumtoms clearance


## Query customs clearance status

<aside class="notice">
This is a notice.
</aside>

<aside class="warning">
This is a warning.
</aside>

<aside class="success">
This is a success information.
</aside>

```php
$reader = new XMLReader();

$reader->open('zip://' . dirname(__FILE__) . '/test.odt#meta.xml');
$odt_meta = array();
while ($reader->read()) {
    if ($reader->nodeType == XMLREADER::ELEMENT) {
        $elm = $reader->name;
    } else {
        if ($reader->nodeType == XMLREADER::END_ELEMENT && $reader->name == 'office:meta') {
            break;
        }
        if (!trim($reader->value)) {
            continue;
        }
        $odt_meta[$elm] = $reader->value;
    }
}
print_r($odt_meta);
```

```java
		System.out.println(header.getContentType());
		System.out.println(header.getFirst("Authorization"));
		System.out.println(header.getFirst("Signature"));
		System.out.println(body);
		
		Gson gson = new Gson();
		Payment payment = gson.fromJson(body, Payment.class);
		payment.setState(PaymentState.WAIT_BUYER_PAY);

		return payment.toJson();

```

```shell
curl https://api.stripe.com/v1/charges/ch_19udYs2eZvKYlo2CqhL3VEJp \
   -u sk_test_BQokikJOvBiI2HlWgH4olfQ2: \
   -d expand[]=customer

```

```c#

```
