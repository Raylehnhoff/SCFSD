var cssOverrides = [];
function DrawShips() {
    //Clear the current output
    $("table#ShipOutput tbody").html("");
    
    //We need to set the colors for the ships and text
    cssOverrides.push(".Ship{background-image:url('content/images/ships-" + $("#ShipColors").val() + ".png');}");
    cssOverrides.push("#ShipOutput{background-color:"+ $("#BackgroundColor").val()+";}");
    cssOverrides.push("#ShipOutput{color:" + $("#FontColor").val() + ";}");
    $("#overrideStyles").html(cssOverrides.join(''));

    //Iterate over all of the ships, and output them
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
    HandleOptionalParams();
}
function OutputShip(shipName, numberToDraw, shipClassName) {
        setTimeout(function () {
        var $shipOutput = $("table#ShipOutput tbody");
        $shipOutput.append("<tr class='ShipBox' id='" + shipClassName + "'>");
        var $shipOutputInner = $("#" + shipClassName);
        $shipOutputInner.append("<td class='ShipName'>" + shipName + "</td>");
        $shipOutputInner.append("<td class='ShipContainer'>");
        for (var i = 0; i < numberToDraw; i++) {
            $shipOutputInner.find(".ShipContainer").append("<div class='Ship fLeft " + shipClassName + "'></div>");
        }
        
    }, 5);
}

function CreateImage() {
    setTimeout(function () {
        html2canvas([$('#ShipOutput').get(0)], {
            background: $("#BackgroundColor").val(),
            onrendered: function (canvas) {
                var strData = "#";
                if (!(canvas.height == 0 || canvas.width == 0)) {
                    strData = canvas.toDataURL("image/png");
                    strData.replace("image/png", "image/octet-stream");
                    $("#DownloadImageLink").attr('href', strData);
                    $("#DownloadImageLink").show();
                }
            }
        });
    }, 800);
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
            $("#logo").show();
            $("#holder").css("float", "left");
            $("#holder").css("margin", "0 0 0 155px");
            break;
        case "Right":
            $("#logo").show();
            $("#holder").css("float", "right");
            $("#holder").css("margin", "0 155px 0 0");
            break;
        case "Middle":
            $("#logo").show();
            $("#holder").css("float", "none");
            $("#holder").css("margin", "0 auto");
            break;
        case "None":
            $("#logo").hide();
            break;
    }

    var bCreateImg = $("#OutputImg").prop('checked');
    //If they want to have an image, let's do that now.
    if (bCreateImg) {
        $("#DownloadImageLink").hide();
        $("#DownloadImageLink").attr('href', '');
        CreateImage();
    }
    else {
        $("#DownloadImageLink").hide();
    }
}

function BindEvents() {
    //Bind the button to draw the ships
    $('#btnDrawFaction').on('click', function () { DrawShips(); });
    //Spinner(false);
    //Bind the HTML Image Dropper (for the logo)
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
            holder.style.background = 'url(' + event.target.result + ') no-repeat center';
            holder.style.border = 'none';
        };
        reader.readAsDataURL(file);

        return false;
    };
}
$(document).ready(function () {
    BindEvents();
    //Hide the download Image Link
    $("#DownloadImageLink").hide();
});