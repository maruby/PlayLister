var express = require('express');
var router = express.Router();

var namespaces = require('./namespaces').namespaces;

const routerLoc = "./routes/";

exports.setupRoutes = function(app) {
    if(namespaces != null && namespaces.length > 0) {
        console.log('Setting up routes...');
        
        namespaces.forEach(function (namespace, index) {
            console.log('Namespace: ' + namespace.name + ', route: ' + namespace.route);
            app.use(namespace.name, require(routerLoc + namespace.route));
        });

        console.log('Successful setup of ' + namespaces.length + ' routes');
    }
}