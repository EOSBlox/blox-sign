# \<blox-sign\>

Signs and verify any data given a private key

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Install blox-sign

```
$ npm install blox-sign
```

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

## Import

```
$ import 'blox-sign';
```

## Basic Use sign

```html
<blox-sign
    message="I signed this on Sunday 1st of July, EOS Block height 234902934"
    private-key="5JKs3MzB9KDsy8oiSjECmxBvMZ4T7FAuhFKvcmrP8VtNp2xoMD9"
    signature="{{signature}}">
</blox-sign>
```

## Basic Use verify

```html
<blox-sign
    signature="5JKs3MzB9KDsy8oiSjECmxBvMZ4T7FAuhFKvcmrP8VtNp2xoMD9"
    message="I signed this on Sunday 1st of July, EOS Block height 234902934"
    public-key="EOS79TWs1PCwBQWLrM9chT9Qr1MGYY3VJ3J3KTeVDDcB7sZyjzR6W"
    verification="{{verification}}">
</blox-sign>
```

## Javascript Sign Data

```html
<blox-sign id="sign"></blox-sign>
<script>
    this.$.sign.generate('I signed this on Sunday 1st of July, EOS Block height 234902934','5JKs3MzB9KDsy8oiSjECmxBvMZ4T7FAuhFKvcmrP8VtNp2xoMD9')
    .then((signature) => {
        // Do Something
    })
    .catch((err) => {
        // Do Something
    })
</script>
```

## Javascript Verify Signature

```html
<blox-sign id="sign"></blox-sign>
<script>
    this.$.sign.verify('5JKs3MzB9KDsy8oiSjECmxBvMZ4T7FAuhFKvcmrP8VtNp2xoMD9','I signed this on Sunday 1st of July, EOS Block height 234902934', 'EOS79TWs1PCwBQWLrM9chT9Qr1MGYY3VJ3J3KTeVDDcB7sZyjzR6W')
    .then((confirmation) => {
        // Do Something
    })
    .catch((err) => {
        // Do Something
    })
</script>
```