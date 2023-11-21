// public/js/custom.js

$(document).ready(function () {
    $(".hide-optional").hide();

    $("#individual").click(function () {
        $(".show-optional").show();
        $(".hide-optional").hide();
    });

    $("#company").click(function () {
        $(".show-optional").hide();
        $(".hide-optional").show();
    });
});

$(".step").not(":first").hide();

// Add click event listeners to the next and previous buttons
$(".next").click(function () {
    var step = $(this).closest(".step").attr("data-id");
    console.log(step);

    // Validate required fields of current step
    var $currentStep = $(this).closest(".step");
    var $requiredFields = $currentStep.find(":required");
    var valid = true;
    $requiredFields.each(function () {
        if (!this.checkValidity()) {
            valid = false;
            this.reportValidity();
            $(this).focus();
            return false; // break out of loop
        }
    });
    if (!valid) {
        return false;
    }

    $("#stepList li").removeClass("active");
    $("#stepList li").eq(step).addClass("active");

    // Show next step
    $currentStep.hide().next().show();
});

$(".prev").click(function () {
    // Get the current step index
    var step = $(this).closest(".step").attr("data-id");
    console.log(step);
    $("#stepList li").removeClass("active");
    $("#stepList li")
        .eq(step - 2)
        .addClass("active");

    // Show previous step
    $(this).closest(".step").hide().prev().show();
});

$("#myForm").on("submit", function (event) {
    event.preventDefault();

    // Validate required fields of last step
    var $lastStep = $(".step:last");
    var $requiredFields = $lastStep.find(":required");
    var valid = true;
    $requiredFields.each(function () {
        if (!this.checkValidity()) {
            valid = false;
            this.reportValidity();
            $(this).focus();
            return false; // break out of loop
        }
    });
    if (!valid) {
        return false;
    }

    if ($(".selectedPlan > .primaryPlan").children(".optionPlan").length > 0) {
        $(this)[0].submit();
    }
});

$("#country, .dropdownmenu").dropdown();
$("#empolsize").dropdown();
$("#client_list, #social_list").dropdown();

$("#clientvalue").change(function () {
    if ($(this).val().length === 0) {
        $(".profileSection").css("display", "none");
    } else {
        $(".profileSection").css("display", "block");
    }
});

tinymce.init({
    selector: "#editor",
});
