$(document).ready(function(){

    $('.champ').keyup(function(){
            if($(this).val().length < 3){ // si la chaîne de caractères est inférieure à 3
                    $(this).css({ // on rend le champ rouge
                            borderColor : 'red',
                            color : 'red'
                        });
                }
                else{
                    $(this).css({ // si tout est bon, on le rend vert
                            borderColor : 'green',
                            color : 'green'
                        });
                }
    });
    $('#confirmation').keyup(function()
        {
            if($(this).val() != $('#psw').val())
                { // si la confirmation est différente du mot de passe
                    $(this).css({ // on rend le champ rouge
                            borderColor : 'red',
                            color : 'red'
                        });
                    $('#psw').css({ // on rend le champ rouge
                            borderColor : 'red',
                            color : 'red'
                        });
                }
            else
                {
                    $(this).css({ // si tout est bon, on le rend vert
                            borderColor : 'green',
                            color : 'green'
                        });
                    $('#psw').css({ // on rend le champ rouge
                            borderColor : 'green',
                            color : 'green'
                        });
                }
        });

    $("#envoi").click(function(e){
        e.preventDefault();
        verif($('#name'));
        verif($('#psw'));
        verif($('#confirmation'));
        verif($('#mail'));

    });
});
function verif(nom){if(nom.val() == "")
        {

            nom.css({ // on rend le champ rouge
                borderColor : 'red',
                color : 'red'
            });
        }
    }
// Get the modal
var modal = new Array;
modal[0] = document.getElementById('Login');
modal[1] = document.getElementById('Register');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal[0]) {
        modal[0].style.display = "none";
    }if (event.target == modal[1]) {
        modal[1].style.display = "none";
    }
}
function change(){
    document.getElementById('Login').style.display = "none";
    document.getElementById('Register').style.display="block";
}

// window.onload=function() { // Au chargement de la page
//     window.open(/* ... */); // On ouvre la popup
//     var age =prompt('Quelle est votre age ?')
//     if (age<18)
//             {
//             document.location.href="https://www.imdb.com/";
//         }
//         else if (age>=18)
//             {
//                 ouvrirModal("AvisCookies");
//                 }


//   };


            // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("myBtn").style.display = "block";
        } else {
            document.getElementById("myBtn").style.display = "none";
        }
    }

    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
