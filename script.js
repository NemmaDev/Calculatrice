
//permet d'afficher l'heure de facon automatique
function startTime() {
    

    var date = new Date();

    var heures = date.getHours();
    var minutes = date.getMinutes();


    var heureFormat = ("0" + heures).slice(-2);
    var minutesFormats = ("0" + minutes).slice(-2);

    var heureElement = document.getElementsByClassName("heure")[0];
    heureElement.innerHTML = "  " + heureFormat + ":" + minutesFormats;
    heureElement.style.color="white";
    heureElement.style.fontSize="x-larger";
    setTimeout(startTime,500);
    
}
setTimeout(startTime,500);

// selectionner tout les bouttons qui ont l'id button
var button= document.querySelectorAll("#button");

var ecran= document.getElementById('ecran');


//Parcourir tout les buttons et si on click sur un button que sa valeur soit
//afficher a l'ecran

button.forEach((btn) => {
    btn.addEventListener ('click', () =>{
        if(ecran.innerHTML != ""){
            if(estNumerique (btn.value)){
                ecran.value="";
                ecran.innerHTML="";
            }
            else{
                
                var chaine = ecran.value;
                chaine = Remplace(chaine);
                const prhase= eval(`${chaine}`);
                ecran.value= prhase;
               
            }
        }
        ecran.value += btn.value;
    });
});

var answer = null; // Variable pour stocker l'ancienne réponse

//permet de calculer les donner saisis a l'ecran
var resultat = document.getElementById("resultat");
resultat.onclick = function() {
  var ecran = document.getElementById("ecran");
  var chaine = ecran.value;
  chaine = chaine.replace(/ln\(/g, "Math.log(");
  chaine = chaine.replace(/\u221b\(/g, "Math.cbrt(");
  chaine = chaine.replace(/e\(/g, "Math.exp(");
  chaine = chaine.replace(/sin\(/g, "Math.sin(");
  chaine = chaine.replace(/cos\(/g, "Math.cos(");
  chaine = chaine.replace(/tan\(/g, "Math.tan(");
  chaine = chaine.replace(/\u221A\(/g, "Math.sqrt(");
  chaine = chaine.replace(/π/g, Math.PI);

  //une fonction de remplacement qui vérifie si la variable answer contient une valeur 
  //(différente de null). Si answer a une valeur, elle est renvoyée pour remplacer "answer" dans la chaîne
  
  chaine = chaine.replace(/answer/g, function() {
    return answer !== null ? answer : "";
  });
  
 

  var resultatCalcul = eval(chaine);
  ecran.value = resultatCalcul;
  answer = resultatCalcul;
};

//fonction de verification si la touche pressée est une operation

function isOperation(valeur){
    return (
        valeur==="+"||
        valeur==="-"||
        valeur==="*"||
        valeur==="/"||
        valeur==="("||
        valeur===")"||
        valeur==="."
    );
}
//permet d'utiliser les touches du claviers pour entrés les nombres

document.addEventListener('keydown' ,function(event){
        var key= event.key;

        //verification si la touche est un chiffre
        if(!isNaN(parseInt(key))||isOperation(key)){
            ecran.value+=key;

        }
        //calcul si la touche entrer est  presser
        else if(key==='Enter'){
             var expression= ecran.value;
             ecran.value= eval(expression);
            

        }
        // reinitialisation de l'entrer
        else if (key==='Backspace'){
            var expression= ecran.value;
            ecran.value=expression.slice(0, -1);
        }
         
    });

// permet de reinstialiser notre ecran
var clear=document.getElementById("clear");
clear.onclick=function(){
    ecran.value ="";
}

//permet de supprimer un a un chaque chiffre saisis a l'ecran
var back=document.getElementById("back");
back.onclick= function(){
    ecran.value = ecran.value.toString().slice(0,-1)
}

// permet de recuperer un ancien resultat
function afficherAncienneReponse() {
  var ecran = document.getElementById("ecran");
  if (answer !== null) {
    ecran.value +=  answer;
  } else {
    ecran.value = 0;
  }
}


// permet le calcul de l'inverse d'un nombre
function inverse (){
    var a= 1/ecran.value;
    ecran.value= a;
}





  

