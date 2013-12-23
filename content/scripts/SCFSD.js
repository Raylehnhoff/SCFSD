var SCFSD = function () {
    "use strict";
    this.cssOverrides = [];
};

SCFSD.prototype.init = function () {
    "use strict";
    this.BindEvents();
    if (Modernizr.localstorage) {
        this.GetShipsFromLocalStorage();
    }
};

SCFSD.prototype.OutputShip = function (shipName, numberToDraw, shipClassName) {
    "use strict";
    setTimeout(function () {
        var $shipOutput = $("table#ShipOutput tbody");
        $shipOutput.append("<tr class='ShipBox' id='" + shipClassName + "'>");
        var $shipOutputInner = $("#" + shipClassName);
        if ($("#ShowShipCount").prop("checked")) {
            $shipOutputInner.append("<td class='ShipName'>" + shipName + "<br/>("+numberToDraw+")</td>");
        }
        else {
            $shipOutputInner.append("<td class='ShipName'>" + shipName + "</td>");
        }
        $shipOutputInner.append("<td class='ShipContainer'>");
        for (var i = 0; i < numberToDraw; i++) {
            $shipOutputInner.find(".ShipContainer").append("<div class='Ship " + shipClassName + "'></div>");
        }
    }, 5);
};

SCFSD.prototype.DrawShips = function () {
    "use strict";
    var _self = this;
    //Clear the current output
    $("table#ShipOutput tbody").html("");
    //We need to set the colors for the ships and text
    _self.cssOverrides.push(".Ship{background-image:url('content/images/ship-" + $("#ShipColors").val() + ".png');}");
    var shipMarginRight = parseInt($("#ShipMarginRight").val(), 10);
    if (shipMarginRight % 1 === 0) {
        _self.cssOverrides.push(".Ship{margin-right:" + shipMarginRight + "px;}");
    }
    var shipMarginBottom = parseInt($("#ShipMarginBottom").val(), 10);
    if (shipMarginBottom % 1 === 0) {
        _self.cssOverrides.push(".Ship{margin-bottom:" + shipMarginBottom + "px;}");
    }

    _self.cssOverrides.push("#ShipOutput{background-color:" + $("#BackgroundColor").val() + ";}");
    _self.cssOverrides.push("#ShipOutput{color:" + $("#FontColor").val() + ";}");
    $("#overrideStyles").html('');
    $("#overrideStyles").html(_self.cssOverrides.join(''));

    //Iterate over all of the ships, and output them
    $("dl#ships dd input[type=number]").each(function () {
        var $shipInputBox = $(this);
        var shipName = $shipInputBox.attr("data-shipName");
        var shipClassName = $shipInputBox.attr("data-shipClassName");
        var numberToDraw = parseInt($shipInputBox.val(), 10);
        
        if (numberToDraw > 0) {
            if (Modernizr.localstorage) {
                localStorage.setItem($shipInputBox[0].id, numberToDraw);
            }
            _self.OutputShip(shipName, numberToDraw, shipClassName);
        }
    });
    this.HandleOptionalParams();
};

SCFSD.prototype.ResetValues = function () {
    "use strict";
    for (var i in localStorage) {

        localStorage[i] = 0;
    }
    location.reload();
};

SCFSD.prototype.CreateImage = function () {
    "use strict";
    setTimeout(function () {
        html2canvas([$('#ShipOutput').get(0)], {
            background: $("#BackgroundColor").val(),
            onrendered: function (canvas) {
                var strData = "#";
                if (!(canvas.height === 0 || canvas.width === 0)) {
                    strData = canvas.toDataURL("image/png");
                    strData.replace("image/png", "image/octet-stream");
                    $("#DownloadImageLink").attr('href', strData);
                    $("#DownloadImageLink").show();
                }
            }
        });
    }, 800);
};

SCFSD.prototype.HandleOptionalParams = function () {
    "use strict";
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
        this.CreateImage();
    }
    else {
        $("#DownloadImageLink").hide();
    }
};

SCFSD.prototype.BindEvents = function () {
    "use strict";
    var _self = this;
    //Bind the button to draw the ships
    $('#btnDrawFaction').on('click', function () { _self.DrawShips(); });
    $('#btnResetValues').on('click', function () { _self.ResetValues(); });
    //Bind the HTML Image Dropper (for the logo)
    var holder = document.getElementById('holder');
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
    //Hide the download Image Link
    $("#DownloadImageLink").hide();
};

//This will let us 'remember' the last input that someone stored. It's not a cookie, so it's slightly more sticky.
SCFSD.prototype.GetShipsFromLocalStorage = function () {
    "use strict";
    for (var i in localStorage) {
        var value = localStorage[i];
        if (value % 1 === 0 && $('#' + i).length > 0) {
            $('#' + i).val(value);
        }
    }
};

SCFSD.prototype.ClearShips = function () {
    "use strict";
    for (var i in localStorage) {
        localStorage[i] = null;
    }
    $("input[type=number]").val('0');
    $("#ShipOutput").html("");
    $("#DownloadImageLink").hide();
};

var shipDrawer;
$(document).ready(function () {
    "use strict";
    shipDrawer = new SCFSD();
    shipDrawer.init();
});