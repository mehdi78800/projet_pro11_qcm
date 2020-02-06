import app from '../../app/app.js';
import Question from '../models/Question.js';


export default class Form {

    show(){
        app.mvc.loadView('form').then(() => {
            this.executeJS();
        })
    }

    executeJS() {
        
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        var recognition = new SpeechRecognition();
        recognition.interimResults = false;
        // recognition.continuous = true;

        var question = document.getElementById('question');
        var reponse1 = document.getElementById('reponse1');
        var reponse2 = document.getElementById('reponse2');
        var reponse3 = document.getElementById('reponse3');
        var reponse4 = document.getElementById('reponse4');
        var titre = document.getElementById('titre');

        recognition.addEventListener('result', e =>{
            var transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');

                if(transcript.includes("question") && transcript.startsWith("question",0) ){
                    recognition.addEventListener('end', recognition.start);
                    var transcriptFilter = transcript.slice(9);
                    transcriptFilter = transcriptFilter.charAt(0).toUpperCase() + transcriptFilter.slice(1)
                    question.value = transcriptFilter + " ?";                    
                }

                if(transcript.includes("réponse un") && transcript.startsWith("réponse",0) ){
                    recognition.addEventListener('end', recognition.start);
                    var transcriptFilter = transcript.slice(11);
                    transcriptFilter = transcriptFilter.charAt(0).toUpperCase() + transcriptFilter.slice(1)
                    reponse1.value = transcriptFilter;                    
                }

                if(transcript.includes("réponse de") && transcript.startsWith("réponse",0) ){
                    recognition.addEventListener('end', recognition.start);
                    var transcriptFilter = transcript.slice(11);
                    transcriptFilter = transcriptFilter.charAt(0).toUpperCase() + transcriptFilter.slice(1)
                    reponse2.value = transcriptFilter;                    
                }

                if(transcript.includes("réponse 3") && transcript.startsWith("réponse",0)){
                    recognition.addEventListener('end', recognition.start);
                    var transcriptFilter = transcript.slice(10);
                    transcriptFilter = transcriptFilter.charAt(0).toUpperCase() + transcriptFilter.slice(1)
                    reponse3.value = transcriptFilter;                    
                }

                if(transcript.includes("réponse 4") && transcript.startsWith("réponse",0)){
                    recognition.addEventListener('end', recognition.start);
                    var transcriptFilter = transcript.slice(10);
                    transcriptFilter = transcriptFilter.charAt(0).toUpperCase() + transcriptFilter.slice(1)
                    reponse4.value = transcriptFilter;                    
                }

                if(transcript.includes("titre") && transcript.startsWith("titre",0)){
                    recognition.addEventListener('end', recognition.start);
                    var transcriptFilter = transcript.slice(6);
                    transcriptFilter = transcriptFilter.charAt(0).toUpperCase() + transcriptFilter.slice(1)
                    titre.value = transcriptFilter;                    
                }

                if(transcript.includes("la réponse") && transcript.includes("une bonne réponse")&& transcript.startsWith("la réponse",0)){
                    var reponse = transcript.charAt(11);    
                    switch(reponse){
                        case 'u':
                            document.getElementById("true1").selectedIndex = 1;
                            $( "#reponse1" ).removeClass( "false" ).addClass( "true" );
                        break;

                        case 'd':
                            document.getElementById("true2").selectedIndex = 1;
                            $( "#reponse2" ).removeClass( "false" ).addClass( "true" );

                        break;

                        case '3':
                            document.getElementById("true3").selectedIndex = 1;
                            $( "#reponse3" ).removeClass( "false" ).addClass( "true" );

                        break;

                        case '4':
                            document.getElementById("true4").selectedIndex = 1;
                            $( "#reponse4" ).removeClass( "false" ).addClass( "true" );

                        break;
                    }               
                }

                if(transcript.includes("la réponse") && transcript.includes("une mauvaise réponse")&& transcript.startsWith("la réponse",0)){
                    var reponse = transcript.charAt(11);   
                    switch(reponse){
                        case 'u':
                            document.getElementById("true1").selectedIndex = 0;
                            $( "#reponse1" ).removeClass( "true" ).addClass( "false" );
                        break;

                        case 'd':
                            document.getElementById("true2").selectedIndex = 0;
                            $( "#reponse2" ).removeClass( "true" ).addClass( "false" );

                        break;

                        case '3':
                            document.getElementById("true3").selectedIndex = 0;
                            $( "#reponse3" ).removeClass( "true" ).addClass( "false" );

                        break;

                        case '4':
                            document.getElementById("true4").selectedIndex = 0;
                            $( "#reponse4" ).removeClass( "true" ).addClass( "false" );

                        break;
                    }               
                }

                if(transcript.includes("envoie le formulaire") && transcript.startsWith("envoie",0)){
                    recognition.addEventListener('end', recognition.start);
                    $("#submit").trigger("click");
                    
                }
                

            console.log(transcript);
        });
        
        $("#voiceOn").click(function(){
            console.log("Enregistrement en cours...")
            // recognition.addEventListener('end', recognition.start);
            recognition.start();
            $("#voiceOff").removeClass("d-none");
            $("#voiceOn").addClass("d-none");
        })

        $("#voiceOff").click(function(){
            console.log("Enregistrement terminé.")
                recognition.abort();
            $("#voiceOff").addClass("d-none");
            $("#voiceOn").removeClass("d-none");
        })


        document.querySelector('#myForm').addEventListener('submit', function(e) {

            e.preventDefault()

            var questionnaire  = {
                Titre: titre.value,

                Question: document.getElementById('question').value,

                Reponses: {
                    Reponse1: reponse1.value,
                    statut1: document.getElementById('true1').value,
    
                    Reponse2: reponse2.value,
                    statut2: document.getElementById('true2').value,
    
                    Reponse3: reponse3.value,
                    statut3: document.getElementById('true3').value,
    
                    Reponse4: reponse4.value,
                    statut4:document.getElementById('true4').value
                }
            }

            var question = new Question();
            var key = question.keyGenerate();

            question.insertLocal(key, questionnaire);

            // question.getLocal(key);
            // console.log(question.getAllLocal());

            // question.clearLocal();


            
          })

    }
  }
