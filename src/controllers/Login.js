import app from '../../app/app.js';


export default class Login {

    show(){
        app.mvc.loadView('login');
    }
}