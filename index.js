const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();


// set the view engine to ejs
app.set('view engine', 'ejs');

const defaultPort = 8081;
app.set("port", process.env.PORT || 8081);

//TODO with Package module
const packageName = `/user-project/`
const routePrefix = packageName;
const exts = /\.js$/;
const routedir = path.join(__dirname, "routes");

// Initialize default route
/* istanbul ignore if */
app.all(routePrefix, (req, res) => {
    const serviceInfo = packageName;
    res.setHeader("Content-Type", "application/json");
    res.send(serviceInfo);
});

fs.readdirSync(routedir).forEach(function (f) {
    if (f[0] !== "." && exts.test(f)) { 
        const routePath = path.join(routedir, f);
        const routeModule = require(routePath);
        const usepath = routePrefix + f.replace(exts, "");
        console.log('usepath: ', usepath);
        /* istanbul ignore if */ // this breaks the build process, no need to cover it
        if (!routeModule.route) {
            console.error(`Route module ${f} does not export itself properly`);
            throw new Error(`Unable to set up route ${f}. Check the route module for unexported route variables`);
        }
        app.use(usepath, routeModule.route);
    }
});

app.listen(defaultPort, function () {
    //const host = server.address().address;
    //const port = server.address().port;    
    console.log("Express server listening on port " + app.get("port"));
});
