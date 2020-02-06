import app from '../../app/app.js';
import Question from '../models/Question.js';


export default class Home {

    show(){
        app.mvc.loadView('home').then(() => {
            this.executeJS();
        });
    }

    executeJS(){
        $('.selectpicker').selectpicker({
            container: 'body',   
        });

        
        $("#newQuizz").click(function(){
           $('#modalStart').modal('toggle');
        })

        $('#modalStart').on('show.bs.modal', function() {

            var question = new Question();
            $("#modalStart .modal-body").html(
                "<div class='card text-white bg-success mb-3' id='newQuizz' data-toggle='modal' data-target='#modalQuizz'>"+
                    "<div class='card-header'>Nouveau Thème</div>"+
                    "<div class='card-body'>"+
                        "<h5 class='card-title'>+</h5>"+
                       "<p class='card-text'></p>"+
                   "</div>"+
                "</div>"
            )


            question.getAllQuizz().forEach(element => {

                // question.removeLocal(element["clé"])

                $("#modalStart .modal-body").append(
                    "<div class='card text-white bg-warning mb-3' id='"+element["clé"]+"' data-toggle='modal' data-target='#modalGame'>"+
                        "<div class='card-header'>"+JSON.parse(element["valeur"]).Quizz+"</div>"+
                        "<div class='card-body'>"+
                           "<h5 class='card-title'>"+JSON.parse(element["valeur"]).Temps+"secondes<br>sur le thème: "+JSON.parse(element["valeur"]).Quizz+"</h5>"+
                           "<p class='card-text'></p>"+
                       "</div>"+
                    "</div>"
                    );
                console.log(element);

                $('#'+element["clé"]).click(function() {

                    $("#modalStart").modal("toggle")
                    $("#gameModalLabel").html(
                        "<p>"+JSON.parse(element["valeur"]).Quizz+"</p>"+
                        "<div class='container'>"+
                            "<div class='row'>"+
                                "<div class='col-6'>Temps: "+
                                    "<span class='card bg-warning timer'>"+JSON.parse(element["valeur"]).Temps+"</span>"+
                                "</div>"+
                                "<div class='col-6'>Score: "+
                                    "<span class='card bg-warning score'>0</span>"+
                                "</div>"+
                            "</div>"+
                        "</div>"
                        )

                    var nbBonneReponse = 0;
                    var scoreFinal = 0;

                    JSON.parse(element["valeur"]).Questions.forEach(idQuestionQuizz => {

                        question.getAllLocal().forEach(question => {
                            if(question["clé"] === idQuestionQuizz){

                                if(JSON.parse(question["valeur"]).Reponses.statut1 == 1){
                                    nbBonneReponse++
                                }
                                if(JSON.parse(question["valeur"]).Reponses.statut2 == 1){
                                    nbBonneReponse++
                                }
                                if(JSON.parse(question["valeur"]).Reponses.statut3 == 1){
                                    nbBonneReponse++
                                }
                                if(JSON.parse(question["valeur"]).Reponses.statut4 == 1){
                                    nbBonneReponse++
                                }

                                $("#modalGame .modal-body").append(
                                    "<div class='mb-3'><h6>"+JSON.parse(question["valeur"]).Question+"<h6></div><br>"
                                    )

                                $("#modalGame .modal-body").append(
                                    "<div class='row'>"+
                                        "<button id='"+question["clé"]+"_rep1' class='card bg-light mb-3 col-5'>"+
                                            JSON.parse(question["valeur"]).Reponses.Reponse1+
                                        "</button>"+
                                        "<button id='"+question["clé"]+"_rep2' class='card bg-light mb-3 col-5'>"+
                                            JSON.parse(question["valeur"]).Reponses.Reponse2+
                                        "</button>"+
                                        "<button id='"+question["clé"]+"_rep3' class='card bg-light mb-3 col-5'>"+
                                            JSON.parse(question["valeur"]).Reponses.Reponse3+
                                        "</button>"+
                                        "<button id='"+question["clé"]+"_rep4' class='card bg-light mb-3 col-5'>"+
                                            JSON.parse(question["valeur"]).Reponses.Reponse4+
                                        "</button>"+
                                    "</div><hr>"
                                    )
                                    
                                $("#"+question["clé"]+"_rep1").click(function(){
                                    if(JSON.parse(question["valeur"]).Reponses.statut1 == 1){
                                        $("#"+question["clé"]+"_rep1").removeClass('bg-light').addClass("bg-success").prop( "disabled", true );
                                        $(".score").html(parseInt($(".score").text())+1)
                                        scoreFinal++
                                        console.log(scoreFinal)

                                    }else{
                                        $("#"+question["clé"]+"_rep1").removeClass('bg-light').addClass("bg-danger").prop( "disabled", true );
                                        $(".score").html(parseInt($(".score").text())-1)
                                    }
                                })

                                $("#"+question["clé"]+"_rep2").click(function(){
                                    if(JSON.parse(question["valeur"]).Reponses.statut2 == 1){
                                        $("#"+question["clé"]+"_rep2").removeClass('bg-light').addClass("bg-success").prop( "disabled", true );
                                        $(".score").html(parseInt($(".score").text())+1)
                                        scoreFinal++
                                    }else{
                                        $("#"+question["clé"]+"_rep2").removeClass('bg-light').addClass("bg-danger").prop( "disabled", true );
                                        $(".score").html(parseInt($(".score").text())-1)
                                    }
                                })

                                $("#"+question["clé"]+"_rep3").click(function(){
                                    if(JSON.parse(question["valeur"]).Reponses.statut3 == 1){
                                        $("#"+question["clé"]+"_rep3").removeClass('bg-light').addClass("bg-success").prop( "disabled", true );
                                        $(".score").html(parseInt($(".score").text())+1)
                                        scoreFinal++
                                    }else{
                                        $("#"+question["clé"]+"_rep3").removeClass('bg-light').addClass("bg-danger").prop( "disabled", true );
                                        $(".score").html(parseInt($(".score").text())-1)
                                    }
                                })

                                $("#"+question["clé"]+"_rep4").click(function(){
                                    if(JSON.parse(question["valeur"]).Reponses.statut4 == 1){
                                        $("#"+question["clé"]+"_rep4").removeClass('bg-light').addClass("bg-success").prop( "disabled", true );
                                        $(".score").html(parseInt($(".score").text())+1)
                                        scoreFinal++
                                    }else{
                                        $("#"+question["clé"]+"_rep4").removeClass('bg-light').addClass("bg-danger").prop( "disabled", true );
                                        $(".score").html(parseInt($(".score").text())-1)
                                    }
                                })
                                
                            }
                        });
                        
                    })



                    var baseTime = parseInt($(".timer").text())
                    console.log(baseTime)

                    var interval = setInterval(oneSecondFunction, 1000);
                    
                    function oneSecondFunction() {
                        let timer = $(".timer").text()
                            timer = timer -1
                        
                        let quizzDuration = baseTime - timer

                            $(".timer").html(timer)

                            jQuery('#validReponseQuizz').click(function(){
                                $(this).data('clicked', true);
                              });

                            if($(".timer").text() == 0 || jQuery('#validReponseQuizz').data('clicked') ){
                                clearInterval(interval)
                                $(".timer").removeClass('bg-warning').addClass("bg-danger")
                                $("#modalFin").modal("show");
                                // $("#validReponseQuizz").trigger("click");
                                $('#modalGame').modal('toggle');

                                $("#modalFin .modal-body").html("<p class='text-center'>Vous avez obtenu un score de <br>"+parseInt($(".score").text())+" sur "+nbBonneReponse+"<br>en "+quizzDuration+" secondes</p>")
                            }
                    }

                    $('#modalStart').on('hide.bs.modal', function() {
                        $("#modalGame .modal-body").html("")
                    })

                })
                
            })
        })

        $('#modalFin').on('hide.bs.modal', function() {
            location.reload();
        })


        $('#modalQuizz').on('show.bs.modal', function() {

        var question = new Question();
        var questionArray = []

        $("#datalist").html("");

        question.getAllLocal().forEach(element => {

            
            let titre = JSON.parse(element["valeur"]).Titre
            let titreClass = '.'+JSON.parse(element["valeur"]).Titre
            console.log(titreClass)

            if($('#datalist').find('optgroup'+titreClass).length !== 0){
                $(titreClass).append(
                    "<option data-tokens='"+titre+"' value='"+element["clé"]+"'>"+JSON.parse(element["valeur"]).Question+"</option>"
                );
            }else{
                $("#datalist").append(
                    "<optgroup class="+JSON.parse(element["valeur"]).Titre+" label='"+JSON.parse(element["valeur"]).Titre+"'><option data-tokens='"+titre+"' value='"+element["clé"]+"'>"+JSON.parse(element["valeur"]).Question+"</option></optgroup>"
                );
            }
           
        })

            $('.selectpicker').selectpicker('refresh');

            $('#addQuestion').click(function(){
                questionArray.push(document.getElementById('datalist').value)
                console.log(questionArray)

               var questionLocal = question.getLocal(document.getElementById('datalist').value)
               var questionLocalSimple = JSON.parse(questionLocal).Question

                $("#questionsCards").append(
                    "<div class='card text-white bg-primary mb-3 col-md-5'>"+questionLocalSimple+"</div>")
                $('#datalist').val('')

            })

            $('#validQuizz').click(function(){
                var quizz  = {
                    Quizz: document.getElementById('quizzNom').value,
    
                    Temps: document.getElementById('tempsQuizz').value,
    
                    Questions: questionArray
                }

                var question = new Question();

                var key = "quizz_"+question.keyGenerate();

                question.insertLocal(key, quizz);

                $('#modalQuizz').modal('toggle');

            })

        })
    }
  }