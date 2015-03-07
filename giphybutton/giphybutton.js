//TODO: In modul kapseln: http://molily.de/js/organisation-module.html
var jqxhr;
number_of_entries = 5;

$(document).ready(function(){

    $("#giphySearch").keyup(function() {
      loadGifs(this.value);
    });

    $("#gipyhButton").click(function(){
      $("#myModal").modal('show');
    });
    
});

  function loadGifs(searchString) {
    
    $( "#giphyUrls" ).empty();

    if(typeof jqxhr !== 'undefined'){
       jqxhr.abort();
    };
   
    var search = getSearchQuery(searchString);

    if(search) {
      jqxhr = $.get( "http://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC")
      .done(function(result) {
        appendGifUrls("#giphyUrls", result.data)
      })
      .fail(function(xhr, text_status, error_thrown) {
        if (text_status != "abort") {
          $( "#giphyUrls" ).append( "<p>Couldn't load gifs. Sorry...</p>" );
        }
      });  
    }
    
  }

  function getSearchQuery(searchString) {
    var values = searchString.split(" ");
    return values.join('+');
  }

  function appendGifUrls(id, data) {
    
    var images = new Array();
    data.forEach(function(entry) {

      var url = entry.images.fixed_width.url;
      
      if(typeof url !== 'undefined'){
        images.push(url);
      };
      
    });
    var list = addList(id, images);
  }

  function addList(id, listData){
          
    var listContainer = $(id);
    var listDiv = $("<div>").appendTo(listContainer);
    var list = $("<ul>").appendTo(listDiv);

    for (i = 0; i < number_of_entries; i++) { 
      var listItem = $("<li>").appendTo(list);
      var imageTag = '<img src="' + listData[i] + '" alt="gif" data-dismiss="modal"/>';
      var image = $(imageTag).appendTo(listItem);
      image.click(function(event) {
        postImageLink(event);
      });
    }
  }

  function postImageLink(event) {
    if(typeof event.target.src !== 'undefined'){
      $("#gifUrlPost").val(event.target.src);
    };
  }





