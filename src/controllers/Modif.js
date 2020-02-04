import app from '../../app/app.js';
import Question from '../models/Question.js';


export default class Modif {

    show(){
        app.mvc.loadView('modif').then(() => {
            this.executeJS();
        })
    }

    executeJS(){
        
        
        var question = new Question();
        // question.clearLocal();
        
        question.getAllLocal().forEach(element => {
            console.log(element);
            console.log(JSON.parse(element["valeur"]).Titre);
            console.log(JSON.parse(element["valeur"]).Reponses.Reponse1);
       
            $("#listeQuestions").append(
                "<tr><td>"+ element["clé"] +
                "</td><td>"+ JSON.parse(element["valeur"]).Titre +
                "</td><td>"+ JSON.parse(element["valeur"]).Question +
                "</td><td id=rep1_"+element["clé"]+">"+ JSON.parse(element["valeur"]).Reponses.Reponse1 +
                "</td><td id=rep2_"+element["clé"]+">"+ JSON.parse(element["valeur"]).Reponses.Reponse2 +
                "</td><td id=rep3_"+element["clé"]+">"+ JSON.parse(element["valeur"]).Reponses.Reponse3 +
                "</td><td id=rep4_"+element["clé"]+">"+ JSON.parse(element["valeur"]).Reponses.Reponse4 +
                "</td><td><i class='fa fa-edit' data-toggle='modal' data-target='#modalModif'></i> / <i class='fa fa-trash' id=delete_"+element["clé"]+"></i></td></tr>"
                );
                
            if(JSON.parse(element["valeur"]).Reponses.statut1 == 1){
                var id= "#rep1_"+element["clé"];
                $( id ).addClass( "trueModif" )
            }else{
                var id= "#rep1_"+element["clé"];
                $( id ).addClass( "falseModif" )
            }

            if(JSON.parse(element["valeur"]).Reponses.statut2 == 1){
                var id= "#rep2_"+element["clé"];
                $( id ).addClass( "trueModif" )
            }else{
                var id= "#rep2_"+element["clé"];
                $( id ).addClass( "falseModif" )
            }

            if(JSON.parse(element["valeur"]).Reponses.statut3 == 1){
                var id= "#rep3_"+element["clé"];
                $( id ).addClass( "trueModif" )
            }else{
                var id= "#rep3_"+element["clé"];
                $( id ).addClass( "falseModif" )
            }

            if(JSON.parse(element["valeur"]).Reponses.statut4 == 1){
                var id= "#rep4_"+element["clé"];
                $( id ).addClass( "trueModif" )
            }else{
                var id= "#rep4_"+element["clé"];
                $( id ).addClass( "falseModif" )
            }

            var id_del= "#delete_"+element["clé"];
            $( id_del ).click(function() {
                question.removeLocal(element["clé"]);
                location.reload();
            });
        });

    }
  }