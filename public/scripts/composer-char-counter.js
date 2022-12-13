$(document).ready(function() {
  // --- our code goes here ---
  console.log("Say Hello to my Little Friend");
  $("#tweeter-text").on("input", function() {
    const maxLimit = 140;
    let characterCount = $(this).val().length;
    let remaining = maxLimit - characterCount;
    console.log(remaining);

    let $counterButton = $(this).parent().find(".counter");
    $counterButton.val(remaining);

    if (remaining < 0) {
      $counterButton.addClass("redText");
    } else if (remaining > 0) {
      $counterButton.removeClass("redText");
    }
  });
});
