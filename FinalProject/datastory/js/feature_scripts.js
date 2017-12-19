function displayImgDistribution(feature) {
    $('#per_feature_img_distribution').attr('src', '../split notebooks/figures/scatter_feature/scatter_' + feature + ".png")
}

$(document).ready(function() {
    $('select').material_select();


    $("select")
        .change(() => {
            var str = "";
            $("#select_feature_distribution option:selected").each(function() {
                str += $(this).text() + " ";
            });

            displayImgDistribution(str.trim());
        });

});
