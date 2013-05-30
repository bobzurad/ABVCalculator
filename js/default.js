// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    var $original = null;
    var $final = null;
    var $temperature = null;
    var $calibration = null;
    var $result = null;

    var onCalcClick = function (e) {
        $result.val(131 * (parseFloat($original.val(), 10) - parseFloat($final.val(), 10)));
    };

    var setupDropDowns = function () {
        for (var i = 59; i <= 90; i++) {
            $temperature.append($("<option></option>")
                .attr("value", i)
                .text(i));

            $calibration.append($("<option></option>")
                .attr("value", i)
                .text(i));
        }
    };

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.

                $original = $("#original");
                $final = $("#final");
                $temperature = $("#temperature");
                $calibration = $("#calibration");
                $result = $("#result");

                $("#calc").on("click", onCalcClick);

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
