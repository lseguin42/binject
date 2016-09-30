# binject
Simple Bower Injection

## Installation

```shell
npm install -g binject
```

## How to use it ?

Your index.html :

```html
<html>
    <head>
        <!-- bower:css -->
        <!-- endbower -->
    </head>
    <body>
        Your App
        <!-- bower:js -->
        <!-- endbower -->
    </body>
</html>
```

```shell
binject index.html
```

## Options

/public
    /index.html
    /bower_components
/bower.json

```shell
binject web/index.html --ignorePath /public
```

```shell
binject web/index.html --relative
```