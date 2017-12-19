    function displayImg(feature, year, step) {

        var folder = '';
        if (step === "1") {
            folder = 'single_year/' + feature + "_" + (year);
        } else {
            folder = 'decade/' + feature + "_" + (year) + "-" + (year + 10);
        }

        $('#per_feature_img').attr('src', '../year_analysis_plots/' + folder + ".png")
    }

    $(document).ready(function() {
        $('select').material_select();

        var currentFeat = "acousticness"
        var currentStep = "1"
        var currentYear = 1960


        $("select")
            .change(() => {
                var str = "";
                $("#select_feature option:selected").each(function() {
                    str += $(this).text() + " ";
                });

                $('#' + currentFeat + "_text").attr("style", "display:none;");
                currentFeat = str.trim().replace(" ", "_");
                $('#' + currentFeat + "_text").attr("style", "display:block;");

                displayImg(currentFeat, currentYear, currentStep);
            })

        $('#year_step').click(function() {
            if ($(this).is(':checked') && currentStep == "10") {
                currentStep = "1";
                $('#year_to_display').attr("step", "1");
                $('#year_to_display').attr("max", "2010");

                currentYear = 1960;
                $('#year_to_display').val(currentYear);

                displayImg(currentFeat, currentYear, currentStep);

            }
        });

        $('#decade_step').click(function() {
            if ($(this).is(':checked') && currentStep == "1") {
                currentStep = "10";
                $('#year_to_display').attr("step", "10");
                $('#year_to_display').attr("max", "2009");

                currentYear = 1960;
                $('#year_to_display').val(currentYear);

                displayImg(currentFeat, currentYear, currentStep);

            }
        });

        $('#year_to_display').change(function() {

            var elem = $(this);
            currentYear = parseInt(elem.val());

            if (currentYear < 1960) {
                currentYear = 1960;
            } else if (currentYear > 2010 && currentStep == "1") {
                currentYear = 2010;
            } else if (currentYear > 2009 && currentStep == "10") {
                currentYear = 2000;
            } else if (currentYear % 10 != 0 && currentStep == "10") {
                currentYear = currentYear - (currentYear % 10);
            }

            elem.val(currentYear);

            displayImg(currentFeat, currentYear, currentStep);

        });
    });
