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