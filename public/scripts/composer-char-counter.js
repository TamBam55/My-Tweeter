$(document).ready(function() {
  // --- our code goes here ---
  console.log("Say Hello to my Little Friend");
  $("#tweeter-text").on("input", function() {
    const maxLimit = 140;
    let characterCount = $(this).val().length;
    let textFromUser = $(this).val();
    let remaining = maxLimit - characterCount;
    console.log(remaining);
    const safeHTML = `<p>${escape(textFromUser)}</p>`;

    let $counterButton = $(this).parent().find(".counter");
    $counterButton.val(remaining);

    if (remaining < 0) {
      $counterButton.addClass("redText");
    } else if (remaining > 0) {
      $counterButton.removeClass("redText");
    }
  });
});
