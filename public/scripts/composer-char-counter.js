$(document).ready(function() {
  // --- our code goes here ---
  console.log("Say Hello to my Little Friend");
  $("textarea").on("input", function() {
    const maxLimit = 140;
    let characterCount = $(this).val().length;
    let remaining = maxLimit - characterCount;
    console.log(remaining);

    let $counterButton = $(this).parent().find(".counter");
    $counterButton.val(remaining);

    if (remaining < 0) {
      $counterButton.addClass("invalid");
    } else {
      $counterButton.removeClass("invalid");
    }
  });
});
