$(document).ready(function() {
    $.ajax({
        url: 'data/cards.json',
        dataType: 'json',
        success: function(data) {
          $.each(data, function(index, item) {
                $.ajax({
                    url: 'card.html',
                    success: function (data) { 
                        var newParsedHtml = $.parseHTML(data);
                
                        // var videoRemove = $(newParsedHtml).find('#parsed-video-rem');
                        // if(videoRemove)
                        //     $(newParsedHtml).find('#parsed-video-rem').remove();

                        //front-card
                        var youtubeFrame = $('<iframe id="parsed-video-rem" class="w-100 h-100 m-0 p-0" src="https://www.youtube.com/embed/' +
                            item.youtube_id + '?autoplay=0&mute=1&controls=0"></iframe>');


                        $(newParsedHtml).find('#card-video').append(youtubeFrame);
                        $(newParsedHtml).find('#card-title').text(item.title);
                        
                        $(newParsedHtml).find('#card-price').append('<b>Price $<br />' + item.price +'</b>');
                        $(newParsedHtml).find('#card-pool').append('<b>Pool $<br />' + item.pool +'</b>');
                        
                        //card_back
                        $(newParsedHtml).find('#card-back-title').text(item.title);
                        // var imgRemove = $(newParsedHtml).find('#parsed-img-rem');
                        // if(imgRemove)
                        //     $(newParsedHtml).find('#parsed-img-rem').remove();
                        if (item.image) {
                            var cardImg = $('<img id="parsed-img-rem" src="' + item.image + '" class="w-100 h-100" alt="Card image"></div>');
                            $(newParsedHtml).find('#card-back-img').append(cardImg);
                        }
                        
                        // Example: Append parsed content to a container
                        $('#game_cards').append(newParsedHtml);
                    }
                });
                
            });
        }
    });
    
    
    
  });
  