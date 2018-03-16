//This looks like the video to me. 
;$(document).ready(function() {
  
  textDrop = $("p.textDrop");
  dustPuffs = $("#dustPuffs");
  
  textDrop.css({
    transform: "scale(30.50)",
    opacity: .2
  }).animate({
    transform: "scale(1)", 
    opacity: .8}, {duration: 'slow', easing: 'easeInQuad'}, 1000).promise().done(
      function() {showDustPuffs()});

  function shift() {

    textDrop.animate({left: "-200px"}, {duration: 'slow', easing: 'easeOutBounce'});
  }

  function showDustPuffs() {

    dustPuffs.css({
      opacity: 1,
      display: "block"
    });

    dustPuffs.children().each(function() {
      $(this).animate({transform: "scale(3,2)", opacity: .8}, 1800)
    }).promise().done(function() {dustPuffs.animate({opacity: 0}, 800).promise().done(function() {shift()})});
    
    bounce();
  };

  function bounce() {
    textDrop.animate({transform: "scale(1.5)"}, 80).animate({transform: "scale(1)"})
  };
});



