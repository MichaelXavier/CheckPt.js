$(document).ready(function() {
  $('#progress_bar').
  progressbar({
    value: 10,
    complete: function(event, ui) {
      $(this).children('.ui-progressbar-value').
              removeClass('collection_progress_incomplete').
              addClass('collection_progress_complete');
    },
  }).
  children('.ui-progressbar-value').
  addClass('collection_progress_incomplete');
});
