$(document).ready(function() {
    $.ajax({
      url: 'data/cards.json',
      dataType: 'json',
      success: function(data) {
        $.each(data, function(index, item) {
            var cardContainer = $('<div class="card-container border-2 shadow-lg mx-1 mb-2"></div>');
            var card = $('<div class="card card-flip w-100 h-100"></div>');
            
            var youtubeLink = $('<div class="card-img align-content-center w-100 m-0 p-0" ' +
                'style="height: 60%;"></div>');
            var youtubeFrame = $('<iframe class="w-100 h-100 m-0 p-0" src="https://www.youtube.com/embed/' +
                item.youtube_id + '?autoplay=0&mute=1&controls=0"></iframe>');
            
            youtubeLink.append(youtubeFrame);
            
            var cardTitle = $('<h5 class="my-3 card-title text-primary">' + item.title + '</h5>');

            var cardPricePool = $('<div class="container d-flex align-items-center justify-content-around mb-1 ">' + 
                '<p class="card-subtitle text-center text-warning rounded bg-dark border border-warning shadow py-1 px-2">' +
              '<b>Price $<br />' + item.price + '</b></p>' + 
              '<p class="card-subtitle text-center text-warning rounded bg-dark border border-warning shadow py-1 px-1">' +
              '<b>Pool $<br />' + item.pool +'</b></p></div>');
            //card_front
            var cardBodyFront = $('<div class="front card-body"></div>');
            cardBodyFront.append(youtubeLink);
            cardBodyFront.append(cardTitle);
            cardBodyFront.append(cardPricePool);
            card.append(cardBodyFront);
            //card_back
            var cardBodyBack = $('<div class="back card-body"></div>');
            if (item.image) {
                var cardImg = $('<div class="card-img align-content-center m-0 p-1" style="height: 60%;">' +
                    '<img src="' + item.image + '" class="w-100 h-100" alt="Card image"></div>');
                cardBodyBack.append(cardImg);
                //card_back
            }
            cardBodyBack.append(cardTitle);
            card.append(cardBodyBack);
            cardContainer.append(card);
            
            $('#game_cards').append(cardContainer);
        });
      }
    });
  });
  