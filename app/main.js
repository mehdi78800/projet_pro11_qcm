import app from './app.js';

import config from './config.js';

import Home from '../src/controllers/Home.js';
import Form from '../src/controllers/Form.js';
import Modif from '../src/controllers/Modif.js';
import About from '../src/controllers/About.js';
import Login from '../src/controllers/Login.js';


// --------------------------------------------------------------------------------------------------------------------
// INITIALISATION DE L'APPLICATION
// --------------------------------------------------------------------------------------------------------------------

function initializeRouter() {
    // Instancier ici le Vanilla Router dans l'objet "app.mvc.router"
    app.mvc.router = new Router({
        mode: 'hash',
        root: '/index.html'
    });

    app.mvc.router.add('/', function() {
        let HomeController = new Home();
        HomeController.show();
    })

    app.mvc.router.add('/form', function() {
        let FormController = new Form();
        FormController.show();
    })

    app.mvc.router.add('/modif', function() {
        let FormController = new Modif();
        FormController.show();
    })

    app.mvc.router.add('/about', function() {
        let AboutController = new About();
        AboutController.show();
    })
    




    // Synchronisation puis activation du routeur (c.f. https://www.npmjs.com/package/vanilla-router#addurilistener)
    app.mvc.router.check().addUriListener();
}


// --------------------------------------------------------------------------------------------------------------------
// CODE PRINCIPAL
// --------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
    // Initialisation du routeur.
    initializeRouter();
});