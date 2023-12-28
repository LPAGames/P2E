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
          
                      var newParsedHtml = parsedHTML.clone();
                      var youtubeFrame = $('<iframe class="w-100 h-100 m-0 p-0" src="https://www.youtube.com/embed/' +
                          item.youtube_id + '?autoplay=0&mute=1&controls=0"></iframe>');
                      $(newParsedHtml).find('#card-video').append(youtubeFrame);
                      $(newParsedHtml).find('#card-title').text(item.title);
                      
                      cardBodyBack.append(cardTitle);
                      if (item.image) {
                          var cardImg = $('<div class="card-img align-content-center m-0 p-1" style="height: 60%;">' +
                              '<img src="' + item.image + '" class="w-100 h-100" alt="Card image"></div>');
                          cardBodyBack.append(cardImg);
                          //card_back
                      }
                      
                      // Example: Append parsed content to a container
                      $('#game_cards').append(parsedHTML);
                      });
                  
                }
            });

            
        }
    });
    
    
  });
  