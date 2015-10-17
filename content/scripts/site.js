ko.bindingHandlers.jqColorPicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {

        // set default value
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).val(value);

        //initialize datepicker with some optional options
        var options = allBindingsAccessor().colorPickerOptions || {};
        $(element).colorPicker(options);

        //handle the field changing
        ko.utils.registerEventHandler(element, "change", function () {
            var observable = valueAccessor();
            observable($(element).val());
        });

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            $(element).colorPicker("destroy");
        });

    },
    update: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).val(value);
        $(element).change();
    }
};