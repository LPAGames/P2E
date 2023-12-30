
const firebaseConfig = {
  apiKey: "AIzaSyDVevm68YOQAd01bMTyaswAb9j8-TJOvvM",
  authDomain: "p2earn-f36ae.firebaseapp.com",
  projectId: "p2earn-f36ae",
  storageBucket: "p2earn-f36ae.appspot.com",
  messagingSenderId: "596533943453",
  appId: "1:596533943453:web:425590cc182078b1754874",
  measurementId: "G-2S1Q79MMN5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function() {
  const auth = firebase.auth();
  // Initialize Cloud Firestore and get a reference to the service
  const db = firebase.firestore();

  db.collection('games').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var card = CreateCard(doc);
        $('#game_cards').append(card);

        $('#card-btn-'+doc.id).click(async function() {
            InitializeModal(db, doc);
      });
    });
  });

  InitializeCards();
});

function CreateCard(doc) {
  var data = doc.data();
  var youtubeFrame = $('<iframe class="w-100 h-100 m-0 p-0" src="https://www.youtube.com/embed/' +
    data.youtube_id + '?autoplay=0&mute=1&controls=0"></iframe>');

  var cardHtml = '<div class="card-container border-2 shadow-lg mx-1 mb-2">' +
    '<div class="card card-flip">' + 
    '<div class="front card-block">' +
    '<div class="card-body p-0">' + 
    '<div class="card-img" style="height:60%;">';

  if(data.youtube_id) {
      cardHtml +=  '<iframe class="card-video" src="https://www.youtube.com/embed/' +
      data.youtube_id + '?autoplay=1&mute=1&controls=0"></iframe>';
  }
  else {
    cardHtml += '<img src="' + data.image_link + 
      '" class="w-100 h-100" alt="Card image">';
  }

  cardHtml += '</div><h5 class="mx-2 my-3 card-title text-primary"><b>' + data.title +
    '</b></h5> <div class="row" style="height: 5rem;">' + 
    '<div class="col">' +
    '<p class="card-subtitle text-center text-warning rounded bg-dark border border-warning shadow py-1 px-2">' +
    '<b>Price $<br />' + data.price +'</b></p></div><div class="col"><p ' +
    'class="card-subtitle text-center text-warning rounded bg-dark border border-warning shadow py-1 px-1">' +
    '<b>Pool $<br />' + data.pool +'</b></p></div></div></div></div><div class="back card-block">' + 
    '<div class="card-body">' + 
    '<h5 class="mb-3 card-title text-primary"><b>' + data.title + '</b></h5>' + 
    '<div class="card-img m-0 p-1" style="height: 60%;">' + 
    '<img src="' + data.image_link + 
    '" class="w-100 h-100" alt="Card image">';

  cardHtml += '<button id="card-btn-'+ doc.id +'" type="button" class="btn btn-primary stretched-link" ' + 
    'data-bs-toggle="modal" data-bs-target="#GameModalStatic">' +
    'Buy Now</button></div></div></div></div></div>';
  
  
  return cardHtml;
}

async function InitializeModal(db, doc) {
  var data= doc.data();
  $('#game-modal-title').text(data.title);
  $('#game-modal-description').html('<b>Description:</b></br>' + data.description);
  $('#game-modal-img').attr('src', data.image_link);
  const docRef = db.collection('games').doc(doc.id);
  docRef.collection("reviews").get().then((reviewSnapshot) => {
    reviewSnapshot.forEach((reviewDoc) => {
      var reviewData = reviewDoc.data();
      console.log(reviewDoc.id, ' > ',reviewData.user_nick);
      var reviewHtml = '<i class="bi d-inline-flex ';
      if(reviewData.like)
        reviewHtml +=  'bi-hand-thumbs-up-fill"></i>';
      else
        reviewHtml +=  'bi-hand-thumbs-down-fill"></i>';

      reviewHtml += '<h5 id="review" class="d-inline-flex">' + 
        reviewData.user_nick + '</h5>';
      reviewHtml += '<div class="container d-flex bg-body-secondary rounded-3 align-content-center">';
      reviewHtml += '<p class="p-1">' + reviewData.comment + '</p></div>';
      $('#game-modal-reviews').append();
    })
  })
}

function InitializeCards() {
  var front = document.getElementsByClassName("front");
  var back = document.getElementsByClassName("back");

  var highest = 0;
  var absoluteSide = "";
  
  for (var i = 0; i < front.length; i++) {
    if (front[i].offsetHeight > back[i].offsetHeight) {
      if (front[i].offsetHeight > highest) {
        highest = front[i].offsetHeight;
        absoluteSide = ".front";
      }
    } else if (back[i].offsetHeight > highest) {
      highest = back[i].offsetHeight;
      absoluteSide = ".back";
    }
  }
  $(".front").css("height", highest);
  $(".back").css("height", highest);
  $(absoluteSide).css("position", "absolute");
}


// const querySnapshot = await db.getDocs(collection(db, "users"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });