function DrawShips() {
    $("div#ShipOutput").html("");
    $("dd input[type=number]").each(function () {
        var shipInputBox = $(this);
        var shipName;
        var shipClassName;
        //Validate ship names
        shipName = shipInputBox.attr("id");
        shipName = shipName.replace("ShipNumber", "");
        shipClassName = shipName;
        if (shipName == "s300") { shipName = "300 Series"; }
        var numberToDraw = shipInputBox.val();
        if (numberToDraw > 0) {
            OutputShip(shipName, numberToDraw, shipClassName);
        }
    });
}
function OutputShip(shipName, numberToDraw, shipClassName) {
    var htmlWriter = [];
    htmlWriter.push("<div class='ShipBox' id='" + shipClassName + "'>");
    htmlWriter.push("<div class='ShipName fLeft'>" + shipName + "</div>");
    for (var i = 0; i < numberToDraw; i++) {
        htmlWriter.push("<div class='Ship fLeft " + shipClassName + "'></div>");
    }
    htmlWriter.push("</div>");
    $("div#ShipOutput").append(htmlWriter.join(''));
    $("div#" + shipClassName + " .ShipName").css("height", $("div#" + shipClassName).height() + "px");
}
