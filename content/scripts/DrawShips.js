function DrawShips() {
    $("div#ShipOutput").html("");
    $("dl#ships dd input[type=number]").each(function () {
        var shipInputBox = $(this);
        var shipName;
        var shipClassName;
        //Validate ship names
        shipName = shipInputBox.attr("id");
        shipName = shipName.replace("ShipNumber", "");
        shipClassName = shipName;
        if (shipName == "s300Series") { shipName = "300 Series"; }
        var numberToDraw = shipInputBox.val();
        if (numberToDraw > 0) {
            OutputShip(shipName, numberToDraw, shipClassName);
        }
    });

    //This will fix the width of the tool for users with small monitors
    $(".ShipContainer").css("width", $(window).width() - 235 + "px");
    $("div#ShipOutput div.ShipBox").each(function () {
        $(this).find(".ShipName").css("height", $(this).height() + "px");
    });
    HandleOptionalParams();
}
function OutputShip(shipName, numberToDraw, shipClassName) {
    var htmlWriter = [];
    htmlWriter.push("<div class='ShipBox clear' id='" + shipClassName + "'>");
    htmlWriter.push("<div class='ShipName fLeft'>" + shipName + "</div>");
    htmlWriter.push("<div class='ShipContainer'>");
    for (var i = 0; i < numberToDraw; i++) {
        htmlWriter.push("<div class='Ship fLeft " + shipClassName + "'></div>");
    }
    htmlWriter.push("</div>");
    htmlWriter.push('<div class="clear"></div>');
    htmlWriter.push("</div>");
    $("div#ShipOutput").append(htmlWriter.join(''));
}
function HandleOptionalParams() {
    var logoPos = $("select#LogoPosition").val();
    var logoWidth = $("input#LogoWidth").val();
    var logoHeight = $("input#LogoHeight").val();
    if (logoWidth && logoHeight) {
        $("#holder").css("width", logoWidth + "px");
        $("#holder").css("height", logoHeight + "px");
    }
    switch (logoPos) {
        case "Left":
            $("#holder").css("float", "left");
            $("#holder").css("margin", "0 0 0 155px");
            break;
        case "Right":
            $("#holder").css("float", "right");
            $("#holder").css("margin", "0 155px 0 0");
            break;
        case "Middle":
            $("#holder").css("float", "none");
            $("#holder").css("margin", "0");
            break;
    }
}
$(document).ready(function () {
    var holder = document.getElementById('holder'),
    state = document.getElementById('status');


    holder.ondragover = function () { this.className = 'hover'; return false; };
    holder.ondragend = function () { this.className = ''; return false; };
    holder.ondrop = function (e) {
        this.className = '';
        e.preventDefault();

        var file = e.dataTransfer.files[0],
      reader = new FileReader();
        reader.onload = function (event) {
            console.log(event.target);
            holder.style.background = 'url(' + event.target.result + ') no-repeat center';
            holder.style.border = 'none';
        };
        reader.readAsDataURL(file);

        return false;
    };
});