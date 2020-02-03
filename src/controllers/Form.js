import app from '../../app/app.js';


export default class Form {

    show(){
        app.mvc.loadView('form').then(() => {
            this.executeJS();
        })
    }

    executeJS() {
        
        var i = 0;

        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        var recognition = new SpeechRecognition();
        recognition.interimResults = true;

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

                if(transcript.includes("envoie le formulaire") && transcript.startsWith("envoie",0)){
                    recognition.addEventListener('end', recognition.start);
                    console.log("coucou");
                    $("#submit").trigger("click");
                }
                

            console.log(transcript);
        });

        recognition.addEventListener('end', recognition.start);

        recognition.start();

        document.querySelector('form').addEventListener('submit', function(e) {

            e.preventDefault()

            i++;
            
            var questionnaire  = {
                Titre:     document.getElementById('titre').value,

                Question1: document.getElementById('question').value,

                A:         document.getElementById('reponse1').value,
                statutA:   document.getElementById('true1').value,

                B:         document.getElementById('reponse2').value,
                statutB:   document.getElementById('true2').value,

                C:         document.getElementById('reponse3').value,
                statutC:   document.getElementById('true3').value,

                D:         document.getElementById('reponse4').value,
                statutD:   document.getElementById('true4').value,
            }

            localStorage.setItem('Question'+i , JSON.stringify(questionnaire));

            console.log(localStorage.getItem('Question'+i));

            
          })

    }
  }
