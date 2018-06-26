var shopIndex = 1;
showShop(shopIndex);

function plusShop(n) {
showShop(shopIndex += n);
}

function currentShow(n) {
    showShop(shopIndex = n);
    }

function showShop(n) {

        var i;
        var shop = document.getElementsByClassName("myShop");
        var dots = document.getElementsByClassName("viewSHOP");

        if (n > shop.length) {shopIndex = 1}

        if (n < 1) {shopIndex = shop.length}
        for (i = 0; i < shop.length; i++) {
            shop[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
                dots[i].className = dots[i].className.replace(" active", "");
                }
                shop[shopIndex-1].style.display = "block";
        dots[shopIndex-1].className += " active";
    }