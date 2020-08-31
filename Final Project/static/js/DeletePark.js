// use JS to grab every button on my page by their designated class_name "remove_from_parks_button"
// these buttons by their clase name are stored in an array, into a single variable
let del_button = document.getElementsByClassName("remove_from_parks_buttons");

// loop through every button on the page by its collected "element", detect when the [i]th "Add to My Parks" button looped through is clicked & store it inside "button_id"
for (let i = 0; i < del_button.length; i++) {
  del_button[i].onclick = function(){
    button_id = del_button[i].id;

    /* perform ajax call to flask with Jquery, to transmit my extracted "park_id" from one of the buttons
    * since JS is asynchronous, our function will complete before the request completes, hence why we need the $.when function down below
    * https://api.jquery.com/jquery.ajax/?fbclid=IwAR1pyVNbZvL-wjHamaczGlDexOjj6ePV8LAVhrg_0Bvy-sJsTYbXGcLC1YE
    * https://stackoverflow.com/questions/44644114/whats-a-non-deprecated-way-of-doing-a-synchronous-ajax-call-using-jquery
    * https://stackoverflow.com/questions/22372597/jquery-not-sending-json-on-ajax-post-request */
    $.when($.ajax({
      method: 'POST',
      url: "/parkdelete",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({ clicked_button : button_id })

    // the response our flask web server will pass back to AJAX
    })).done(function(response) {
      console.log(response);
      console.log('ajax call has been succ');
      var extracted_response = response.success_notification;
      console.log(extracted_response);
    })
  }
}
