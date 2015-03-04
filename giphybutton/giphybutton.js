//TODO: In modul kapseln: http://molily.de/js/organisation-module.html

$(document).ready(function(){

    $("#gipyhButton").click(function(){
        $("#myModal").modal('show');
        loadGifs();

    });

    function loadGifs() {
      var jqxhr = $.get( "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC")
        .done(function(result) {
          appendGifUrls("#giphyUrls", result.data)
        })
        .fail(function() {
          $( "#giphyUrls" ).append( "<p>Couldn't load gifs. Sorry...</p>" );
        });
    }

    function appendGifUrls(id, data) {
      var entry = data[0];

      $(id).append("<ul>");
      //
        $(id).append("<li>");
        appendGif(id, entry.images.fixed_height.url)
        $(id).append("</li>");
      //});
      $(id).append("</ul>");
    }

    function appendGif(id, gifUrl)
    {
      var loader_img = '<img src="' + gifUrl + '" alt="Loading" />';
       $(id).append(loader_img);
    }
});