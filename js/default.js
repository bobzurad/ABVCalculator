//TODO: add background image
//TODO: test screen configurations
//TODO: test calculations
//TODO: trim result to 4 decimal places
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var $original = null;
    var $final = null;
    var $ogTemperature = null;
    var $fgTemperature = null;
    var $calibration = null;
    var $result = null;
    var $calcButton = null;

    var onCalcClick = function (e) {
        //equation taken from http://www.brewmorebeer.com/calculate-percent-alcohol-in-beer/
        var og = parseFloat($original.val(), 10);
        var ogAdjusted = og + (($ogTemperature.val() - $calibration.val()) * .001);

        var fg = parseFloat($final.val(), 10);
        var fgAdjusted = fg + (($fgTemperature.val() - $calibration.val()) * .001);

        var abv = ((1.05 * (ogAdjusted - fgAdjusted)) / fgAdjusted) / 0.79 * 100;

        $result.val(abv);
    };

    var setupDropDowns = function () {
        for (var i = 50; i <= 99; i++) {
            $ogTemperature.append($("<option></option>")
                .attr("value", i)
                .text(i));

            $fgTemperature.append($("<option></option>")
                .attr("value", i)
                .text(i));

            $calibration.append($("<option></option>")
                .attr("value", i)
                .text(i));
        }

        $ogTemperature.val(60);
        $fgTemperature.val(60);
        $calibration.val(60);
    };

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.

                $original = $("#original");
                $final = $("#final");
                $ogTemperature = $("#ogTemperature");
                $fgTemperature = $("#fgTemperature");
                $calibration = $("#calibration");
                $result = $("#result");
                $calcButton = $("#calc");

                $calcButton.on("click", onCalcClick);

                setupDropDowns();
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
