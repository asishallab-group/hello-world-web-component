## How to run the project

`import` statements inside `.js` files won't work due to CORS errors.
To fix these errors you can either start a web server or [adjust the code](#how-to-use-it-without-a-local-server) a little bit

## How to start a local server
You need to have node.js and npm installed on your machine. 

**Alternatively**, you can use Jetbrains IDE (phpStorm, webStorm, IntelliJ IDEA etc.)
and open the file via IDE as it starts the server automatically. You can also use
XAMPP, WAMP, OpenServer etc. if you are on Windows.

First, install dependencies by running:
```
npm install
```

To run a local server type in console:
```
npm run serve
```
_(This command is a shortcut, defined in `package.json` file)_


You can also use full command to start the server
```
./node_modules/.bin/http-server -a localhost -p 8080 -c-
```

## How to use it without a local server
Changes, that need to be made:

#### In the `index.html` file 
1. Remove the `<script type="module" src="js/scatter-plot.js"></script>` line
2. Uncomment the 3 lines, that import all used scripts.

#### In the `js/scatter-plot.js` file
1. Remove the lines that contain `import`

#### In the `js/data-vis.js` file
1. Remove the `export` keyword before the class