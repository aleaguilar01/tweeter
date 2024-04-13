const MAX_CHARS = 140;

$(() => {
  $(".tweet-text").on("input" , function() {
    let remainingChars = MAX_CHARS - this.value.length;
    const counterElement = $(this).next().children(".counter")[0];
    counterElement.innerHTML = remainingChars;
    if (remainingChars < 0) {
      $(counterElement).addClass("error");
    } else {
      $(counterElement).removeClass("error");
    }
  });
});
