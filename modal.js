var memo=""
function ouvrirModal(nom){

    memo="#"+nom;
    $('#modale').css('display', 'block');
    $(memo).css('display', 'block');
    
}
function fermerModal(){
    $('#modale').css('display', 'none');
    $(memo).css('display', 'none');
    
}
