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
       
            $("#listeQuestions").append(
                "<tr><td>"+ element["clé"] +
                "</td><td>"+ JSON.parse(element["valeur"]).Titre +
                "</td><td>"+ JSON.parse(element["valeur"]).Question +
                "</td><td id=rep1_"+element["clé"]+">"+ JSON.parse(element["valeur"]).Reponses.Reponse1 +
                "</td><td id=rep2_"+element["clé"]+">"+ JSON.parse(element["valeur"]).Reponses.Reponse2 +
                "</td><td id=rep3_"+element["clé"]+">"+ JSON.parse(element["valeur"]).Reponses.Reponse3 +
                "</td><td id=rep4_"+element["clé"]+">"+ JSON.parse(element["valeur"]).Reponses.Reponse4 +
                "</td><td><i class='fa fa-edit' data-toggle='modal' data-target='#modalModif' id=edit_"+element["clé"]+"></i> / <i class='fa fa-trash' id=delete_"+element["clé"]+"></i></td></tr>"
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

            var id_edit= "#edit_"+element["clé"];

            $( id_edit ).click(function() {
                $('#idModif').attr('value', element["clé"])
                $('#titreModif').attr('value', JSON.parse(element["valeur"]).Titre)
                $('#questionModif').attr('value', JSON.parse(element["valeur"]).Question)
                $('#reponse1Modif').attr('value', JSON.parse(element["valeur"]).Reponses.Reponse1)
                $('#reponse2Modif').attr('value', JSON.parse(element["valeur"]).Reponses.Reponse2)
                $('#reponse3Modif').attr('value', JSON.parse(element["valeur"]).Reponses.Reponse3)
                $('#reponse4Modif').attr('value', JSON.parse(element["valeur"]).Reponses.Reponse4)
                $('#true1Modif option[value="'+JSON.parse(element["valeur"]).Reponses.statut1+'"]').attr("selected", "selected");
                $('#true2Modif option[value="'+JSON.parse(element["valeur"]).Reponses.statut2+'"]').attr("selected", "selected");
                $('#true3Modif option[value="'+JSON.parse(element["valeur"]).Reponses.statut3+'"]').attr("selected", "selected");
                $('#true4Modif option[value="'+JSON.parse(element["valeur"]).Reponses.statut4+'"]').attr("selected", "selected");

                if(JSON.parse(element["valeur"]).Reponses.statut1 == 1){
                    $( "#reponse1Modif" ).removeClass( "false" ).addClass( "true" );
                }
                if(JSON.parse(element["valeur"]).Reponses.statut2 == 1){
                    $( "#reponse2Modif" ).removeClass( "false" ).addClass( "true" );
                }
                if(JSON.parse(element["valeur"]).Reponses.statut3 == 1){
                    $( "#reponse3Modif" ).removeClass( "false" ).addClass( "true" );
                }
                if(JSON.parse(element["valeur"]).Reponses.statut4 == 1){
                    $( "#reponse4Modif" ).removeClass( "false" ).addClass( "true" );
                }
            });

            $('#modalModif').on('hidden.bs.modal', function () {
                location.reload();
              })

        });



        document.querySelector('#myFormModif').addEventListener('submit', function(e) {
        e.preventDefault()

        var questionnaire  = {
            Titre: $('#modalModif #titreModif').val(),

            Question: $('#modalModif #questionModif').val(),

            Reponses: {
                Reponse1: $('#modalModif #reponse1Modif').val(),
                statut1: $('#modalModif #true1Modif').val(),

                Reponse2: $('#modalModif #reponse2Modif').val(),
                statut2: $('#modalModif #true2Modif').val(),

                Reponse3: $('#modalModif #reponse3Modif').val(),
                statut3: $('#modalModif #true3Modif').val(),

                Reponse4:$('#modalModif #reponse4Modif').val(),
                statut4:$('#modalModif #true4Modif').val()
            }
        }

        var question = new Question();
        var key = $('#modalModif #idModif').val();

        question.insertLocal(key, questionnaire);

        $('#modalModif').modal('toggle');

        });

        $(document).ready(function() {
            $('#listeQuestions').DataTable();
          });
 

    }
  }