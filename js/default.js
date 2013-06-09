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
        var og = $original.val() == "" ? 1.052 : parseFloat($original.val(), 10);
        var ogAdjusted = og + (($ogTemperature.val() - $calibration.val()) * 0.001);

        var fg = $final.val() == "" ? 1.014 : parseFloat($final.val(), 10);
        var fgAdjusted = fg + (($fgTemperature.val() - $calibration.val()) * 0.001);

        var abv = ((1.05 * (ogAdjusted - fgAdjusted)) / fgAdjusted) / 0.79 * 100;

        $result.val(abv.toString().substr(0, 6));
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
                // This application has been newly launched. Initialize
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
                // This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());
        }
    };

    app.oncheckpoint = function (args) {
        // This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    app.start();
})();
