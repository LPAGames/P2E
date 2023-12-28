$(document).ready(function() {
    $.ajax({
        url: 'card.html',
        success: function (data) { 
            var parsedHTML = $.parseHTML(data);

            $.ajax({
                url: 'data/cards.json',
                dataType: 'json',
                success: function(data) {
                  $.each(data, function(index, item) {
          
                        var newParsedHtml = parsedHTML;

                        //front-card
                        var youtubeFrame = $('<iframe class="w-100 h-100 m-0 p-0" src="https://www.youtube.com/embed/' +
                            item.youtube_id + '?autoplay=0&mute=1&controls=0"></iframe>');
                        $(newParsedHtml).find('#card-video').append(youtubeFrame);
                        $(newParsedHtml).find('#card-title').text(item.title);
                        
                        $(newParsedHtml).find('#card-price').append('<b>Price $<br />' + item.price +'</b>');
                        $(newParsedHtml).find('#card-pool').append('<b>Pool $<br />' + item.pool +'</b>');
                        
                        //card_back
                        $(newParsedHtml).find('#card-back-title').text(item.title);
                        if (item.image) {
                            var cardImg = $('<img src="' + item.image + '" class="w-100 h-100" alt="Card image"></div>');
                            cardBodyBack.append(cardImg);
                        }
                        
                        // Example: Append parsed content to a container
                        $('#game_cards').append(newParsedHtml);
                    });
                  
                }
            });

            
        }
    });
    
    
  });
  