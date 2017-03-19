$(document).ready(function(){
    $("#add").click(function(){
		
		var content = $("#forum").html();
		var pseudos = localStorage.getItem("pseudos");
		var questions = localStorage.getItem("questions");
		var reponses = localStorage.getItem("reponses");

		if (pseudos == null) {
			var pseudos = [];
			var questions = [];
			var reponses = [];
			pseudos.push($("#pseudo").val());
			questions.push($("#question").val());
			reponses.push(null);
		}
		else {
			pseudos = JSON.parse(pseudos);
			pseudos.push($("#pseudo").val());
			questions = JSON.parse(questions);
			questions.push($("#question").val());
			reponses = JSON.parse(reponses);
			reponses.push(null);
		}

		localStorage.setItem("pseudos", JSON.stringify(pseudos));	
		localStorage.setItem("questions", JSON.stringify(questions));
		localStorage.setItem("reponses", JSON.stringify(reponses));

    });
    

});


function disp_pages(numPage){
    document.getElementById("forum").innerHTML = "";
		switch(numPage) {
		case 1:
            display(0,10);
			break;
		case 2:
            display(10,20);
			break;
		case 3:
			display(20,30);
			break;
		case 4:
			display(30,40);
			break;
		case 5:
			display(40,50);
			break;
		case 6:
			display(50,60);
			break;
		default:
            display(0,10);
			break
        }
}

function display(bornInf, bornSup) {
    var pseudos = localStorage.getItem("pseudos");
    var questions = localStorage.getItem("questions");
    var reponses = localStorage.getItem("reponses");
    var array_pseudo = JSON.parse(pseudos);
    var array_question = JSON.parse(questions);
    var array_reponse = JSON.parse(reponses);

    var reelBornsup;

    if(bornSup < array_question.length){
        reelBornsup = bornSup ;
    }else{
        reelBornsup = array_question.length;
	}

    for(var i = bornInf; i < reelBornsup; i++){

        var pseudo = array_pseudo[i];
        var question = array_question[i];
        var reponse = array_reponse[i];

        if (reponse == null) {
            var texte = "<div id='posts'><span id= '" + i + "'> Question de : " + pseudo + "<br/> "
                + question + " <br/> Repondre :<br/> <textarea id='reponse_"+ i + "' " +
                "placeholder='Réponse'></textarea> <br/> <button onclick='reponse("+ i +")'>Envoyer</button>" +
                "</span> </div><br/><br/>";

        } else {
            var texte = "<div id='posts'><span id= '" + i + "'> Question de : " + pseudo + "<br/>" +
                " " + question + " <br/> Reponse : " + reponse + "</span> </div><br/><br/>";
        }
        document.getElementById("forum").innerHTML += texte;
    }
}

function reponse(id) {
	
	var texte = document.getElementById("reponse_"+id).value;
	var reponses = localStorage.getItem("reponses");
	var array_reponse = JSON.parse(reponses);
	array_reponse[id] = texte;
	localStorage.setItem("reponses", JSON.stringify(array_reponse));
	location.reload();
}
