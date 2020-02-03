import app from '../../app/app.js';


export default class About {

    show(){
        app.mvc.loadView('about');
    }
  }