# Questionify 
[![NPM version](https://nodei.co/npm/questionify.png)](https://npmjs.org/package/questionify)
[![Build Status](https://travis-ci.org/teamtofu/questionify.svg?branch=master)](https://travis-ci.org/teamtofu/questionify)

> Questionify  simplifies the code for asking and answering questions.

<a class="github-button" href="https://github.com/teamtofu/questionify" data-style="mega" aria-label="Star teamtofu/questionify on GitHub">Star Questionify</a>

<script async defer src="https://buttons.github.io/buttons.js"></script>

# Table of Contents
+ [Installation](#installation)
+ [Example](#installation)
+ [Settings Object](#settings-object)
    + [Built-in Bang Prefixes](#built-in-bang-prefixes)
+ [1! Functions](#1-functions)
    + [Basics](#basics)
    + [Class](#class)
    + [Style](#style)
    + [ID](#id)
    + [Icon](#icon)
    + [Exclaim](#exclaim)
    + [Hide](#hide)
    + [Additional Questionifys](#additional-questionifys)
+ [Plugins](#plugins)
    + [What is a plugin?](#what-is-a-plugin)
    + [How do Questionify functions work?](#how-do-questionify-functions-work)
    + [Adding Plugins](#adding-plugins)
        + [questionify.addplugin](#questionifyaddplugin)
        + [questionify.addplugins](#questionifyaddplugins)
    + [Aliasing](#aliasing)
+ [Angular](#angular)
+ [Webpack](#webpack)
+ [Intervals](#intervals)
    + [questionify.interval](#questionifyinterval)
+ [Manual Interpretation](#manual-interpretation)
    + [questionify.interpret](#questionifyinterpret)
+ [Testing](#testing)
+ [License](#license)

## Installation

> Questionify is available on NPM for browser and [webpack](https://webpack.js.org/) consumption. (Recommended)

```sh
$ npm install --save questionify
$ bower install --save questionify
```

> CDNs are also available. (Not Recommended)

```html
<!-- Latest Version -->
<script src="https://unpkg.com/questionify/dist/questionify.min.js"></script>
<!-- Specific Version (e.g. 1.0.0) -->
<script src="https://unpkg.com/questionify@1.0.0/dist/questionify.min.js"></script>
```

## Example

Before
```html
<div !id:example>
    <div !id:test !c:testclass !s:color:red>
        <i !i:fa:code></i> Test
    </div>
    <a !#:test>Scroll</a>
</div>
```

After
```html
<div id="example">
    <div id="test" class="testclass" style="color:red;">
        <i class="fa fa-code"></i> Test
    </div>
    <a href="#test">Scroll</a>
</div>
```

## Usage

```html
<script src="questionify.js"></script> <!--Automatically adds window.questionify-->
```

```js
var settings = {};
questionify(/* optional settings */ settings); //This starts processing.
```

Processing happens automatically when the document's body is updated [for most browsers](http://caniuse.com/#feat=mutationobserver).

## Settings Object

```js
{
    developerMode: false, /* Enable developer mode (turn off for production) */
    debugMode: false, /* Enable debug mode */
    userBang: '!', /* Attribute prefix */
    userBangRegex: /^\!.*$/, /* Regex for identifying if an attribute should be processed */
    userConnector: ':', /* Connector for variables */
    userConnectorRegex: /\:/g, /* Regex for all connectors in a string */
    functions: {}, /* Function specific options */
    removeBangPrefixes: [] /* Remove built-in bang prefixes (only necessary if there is a compatibility issue) */
}
```

### Built-in Bang Prefixes

For convenience, some prefix options are built into the system that can be used interchangibly with the **_!_**.

```html
<div !style:color:red></div> <!-- Single bang mark -->
<div B_style:color:red></div> <!-- Letter B and underscore (Compliant with stricter syntax) -->
<div b_style:color:red></div>
<div __style:color:red></div> <!-- Double underscore -->
<div ::style:color:red></div> <!-- Double colon -->
<div 1style:color:red></div> <!-- Single number 1 -->
<!--All result in: <div style="color: red;"></div>-->
<!--Learn more about the syntax below-->
```

To remove some of these from Questionify, add an exception to the [settings object](#settings-object).

```js
{
    // ...
    removeBangPrefixes: ['__','::','!'] //Questionify will not interpret these prefixes
}
```

## 1! Functions

### Basics

```html
<div !class:one:two></div> <!-- !(name of function):(variable):(another variable) -->
```

An unlimited number of variables can be added on for functions that accept them.

#### Class

Names: 'class', 'c'

Accepts: Unlimited classes

```html
<div !class:one:two:three></div> <!-- <div class="one two three"></div> -->
<div !c:one:two:three></div> <!-- <div class="one two three"></div> -->
```

#### Style

Names: 'style', 's'

Accepts: One css attribute and one css value

```html
<div !style:color:red !style:font-size:14px></div> <!-- <div style="color:red;font-size:14px;"></div> -->
<div !s:width:20%></div> <!-- <div style="width:20%;"></div> -->
```

#### Href Hash

Names: 'hash', '#'

Accepts: No or one hash value

```html
<div !hash:test></div> <!-- <div href="#test"></div> -->
<div !#></div> <!-- <div href="#"></div> -->
```

#### ID

Names: 'id'

Accepts: One id value

```html
<div !id:cool></div> <!-- <div id="cool"></div> -->
```

#### Icon

Names: 'icon', 'i'

Accepts: One icon library and one icon ending (for extra FontAwesome options see below)

```html
<div !i:fa:code></div> <!-- FontAwesome <div class="fa fa-code"></div> -->
<div !icon:fa:code:3></div> <!-- FontAwesome <div class="fa fa-code fa-3x"></div> -->
<div !i:fa:refresh:5:s></div> <!-- FontAwesome <div class="fa fa-code fa-5x fa-spin"></div> -->
<div !i:ion:ios-eye></div> <!-- Ionic Icons <div class="ion icon ion-ios-eye"></div> -->
<div !i:gly:person></div> <!-- Glyphicon (Twitter Bootstrap) <div class="glyphicon glyphicon-person"></div> -->
<div !i:oi:person></div> <!-- Open Iconic <div class="oi oi-person"></div> -->
```

#### Exclaim

Names: 'exclaim', '!'

Accepts: Unlimited number of exclaim classes

```js
//settings
{
    ...
    functions: {
        exclaim: {
            default: 'defaultclass', // 'default' is the default class
            o: 'otherclass'
        }
    }
}
```

```html
<div !!></div> <!-- <div class="defaultclass"></div> -->
<div !!:o></div> <!-- <div class="otherclass"></div> -->
<div !!::o></div> <!-- <div class="defaultclass otherclass"></div> -->
<div !!:o:></div> <!-- <div class="defaultclass otherclass"></div> -->
```

#### Hide

Names: 'hide'

Accepts: None

```html
<div !hide></div> <!-- <div style="display:none;"></div> -->
```

### Additional Questionifys

These are the basic, most important Questionifys, but there are more included. Review the [additional Questionify documentation](/docs/addons) for extras.

## Plugins

> Plugins allow developers to adapt Questionify to their own needs.

### What is a plugin?

A plugin is a function that is executed when a specified Questionify namespace is used.
Here is a 1! for the sake of example:
```
!class:example:questionify
```
The namespace _class_ comes after the bang and before the connector.
This would run the function for _class_ which comes with Questionify.
```js
function associatedfunction (/*variables*/) {
    //classes are added here
}
```

### How do Questionify functions work?

All important variables are passed to the plugin's function when it is run.
```js
function plugin (input /*Array*/, options /*Object*/, version /*String*/, error /*Function*/, log /*Function*/ ) {
    this /*Object*/;
    //...
}
```
1. **input** is an array of all bang variables (e.g. _!class:one:two_ => _["one","two"]_)
2. **options** is the options object of the function (see [Settings Object](#settings-object), for an example see [1! Exclaim](#exclaim))
3. **version** is the Questionify version, for compatibility
4. **error** is a function for logging errors that takes a string description
5. **log** is a function for logging information that takes a string description
+ **this** is DOM node of the element with the 1!

### Adding Plugins

#### questionify.addplugin

This is a function that adds one plugin.

```js
var pluginfunction = function (input, opts, v, err, log) {
    log('Running plugin');
    if (typeof input[0] ==='string'&&input[0]) {
        this.setAttribute('onclick','alert("'+input[0]+'");');
    } else {
        err('There are no variables');
    }
};
questionify.addplugin('example', pluginfunction);
```
```html
<div !example:Hello!></div> <!-- <div onclick="alert(\"Hello!\")"></div> -->
```

#### questionify.addplugins

This is a function that adds many plugins at once.

```js
var plugins = {
    red: function () {
        this.style.color = 'red';
    },
    large: function () {
        this.style['font-size'] = '30px';
    }
};
questionify.addplugins(plugins);
```
```html
<div !red !large></div> <!-- <div style="color: red; font-size: 30px;"></div> -->
```

### Aliasing

Adding aliases is simple. Just use questionify.addplugin or questionify.addplugins and replace the function with a string value of the real function.

```js
// ex is an alias of example
questionify.addplugin('ex','example');
```

In the function options in the [settings object](#settings-object), use the original option name and not the alias.

```js
{
    // ...
    functions: {
        // This is will work for both ex and example
        example: {
            test: 'works'
        },
        // Since ex is an alias, this will not work
        ex: {
            test: 'fails'
        }
    }
}
```

## Angular

> Integration with [Angular.js](http://angularjs.org/) is simple and automatic.

```html
<script src="angular.js"></script>
<script src="questionify.js"></script>
<script src="mycode.js"></script>
```
```js
//mycode.js

var app = angular.module('test',['oneBang']);
app.run(['$oneBang', function ($oneBang) {
    $oneBang({/* options */})); //has all of the same variables as window.questionify
}]);
//... bootstrap app
```

To ensure that older browsers can use Questionify with automatic DOM updates, a singular "!" attribute can be added to the parent element(s) of the areas that should be searched for 1!s.
This is only necessary if you are using templates (HTML that is not in the body on page load), and it can be use in place of intervals.

```html
<!--Example-->
<script id="template.html" type="text/ng-template">
    <div ! !s:color:red><div !s:color:blue></div></div>
    <!--<div style="color: red;"><div style="color: blue;"></div></div>-->
</script>
```

## Webpack

[Webpack](https://webpack.js.org/) can be used to easily include code from NPM and other sources.

An example of how to use webpack is available under the [test/webpack directory](https://github.com/teamtofu/questionify/tree/master/test/webpack).

```js
var init = require('questionify');
init(/* settings */);
//window.questionify must be used for everything else
```

## Intervals

Questionify makes use of [MutationObserver](http://caniuse.com/#feat=mutationobserver) which is supported by the modern version of all modern browsers with the sole exception of Opera Mini (which doesn't support many other Javascript features).

<p class="ciu_embed" data-feature="mutationobserver" data-periods="future_1,current,past_1,past_2">
  <a href="http://caniuse.com/#feat=mutationobserver">Can I Use mutationobserver?</a>
</p>

<script async defer src="https://cdn.jsdelivr.net/caniuse-embed/1.0.1/caniuse-embed.min.js"></script>

However, intervals are available for use to ensure that websites using templates can support older browsers.

### questionify.interval

```js
questionify.interval(500); //starts an interval executing every 500 milliseconds
questionify.interval(false); //stops the interval
```

## Manual Interpretation

DOM nodes can be manually interpreted by passing them through the [questionify.interpret](#questionifyinterpret) function. If you plan on using Questionify manually or with direct DOM manipulation, it is recommended that you use the '**_B\__**' prefix rather than '**_!_**', which is not valid XML.

### questionify.interpret

This function runs Questionify manually on any DOM node.

```js
var example = document.createElement('div');
example.setAttribute('b_style:color:red','');
questionify.interpret(example);
// example -> <div style="color: red;"></div>
```

## Testing

> Questionify undergoes a lot of testing to ensure functionality.

<iframe src="test/index.html" style="width: 100%; min-height: 50vh;"></iframe>

To view all tests go [here](/test/index.html) and open the browser's console.

[![Build Status](https://travis-ci.org/teamtofu/questionify.svg?branch=master)](https://travis-ci.org/teamtofu/questionify)

Syntax checks are also available [here](https://travis-ci.org/teamtofu/questionify).

## License

[MIT](https://opensource.org/licenses/MIT) © [Russell Steadman](https://github.com/teamtofu/questionify)