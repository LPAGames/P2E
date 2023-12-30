
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
const storage = firebase.storage();

$(document).ready(function() {
  const auth = firebase.auth();
  // Initialize Cloud Firestore and get a reference to the service
  const db = firebase.firestore();
  var provider = new firebase.auth.GoogleAuthProvider();

  $('.google-login').click(function() {
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result.credential) {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
        // IdP data available in result.additionalUserInfo.profile.
        console.log(user);
          // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log(error.code,' > ',errorMessage);
        // ...
      });
  });

  $('#btn-signup').click(function() {

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  });

  $('#btn-signin').click(function() {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  });

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
    'data-bs-toggle="modal" data-bs-target="#game-modal-static">' +
    'Buy Now</button></div></div></div></div></div>';
  
  
  return cardHtml;
}

async function InitializeModal(db, doc) {
  var data= doc.data();
  $('#game-modal-title').text(data.title);
  $('#game-modal-description').html('<b>Description:</b></br>' + data.description);
  $('#game-modal-img').attr('src', data.image_link);

  if(data.download_token) {
    $('#game-modal-download-btn').
      click( async function(data) {

        var myUrl = fetch(data.download_token);
        const blob = await myUrl.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'ShogunBuild.zip';
        link.click();

        // var storageRef = storage.ref(data.download_filename);
        // storageRef.getDownloadURL()
        //   .then((url) => {
        //     // `url` is the download URL for 'images/stars.jpg'
        //     const blob = await url.blob();
        //     const link = document.createElement('a');
        //     link.href = URL.createObjectURL(blob);
        //     link.download = data.download_filename;
        //     link.click();
        //   })
        //   .catch((error) => {
        //     console.log(error);
        // });
    });

    $('#game-modal-download-btn').show(1500);
  }
  else $('#game-modal-download-btn').hide();

  $('#game-modal-reviews').empty();
  var countReviews = 0;
  const docRef = db.collection('games').doc(doc.id);
  docRef.collection("reviews").get().then((reviewSnapshot) => {
    reviewSnapshot.forEach((reviewDoc) => {
      var reviewData = reviewDoc.data();

      console.log(reviewDoc.id, ' > ',reviewData.user_nick);
      var reviewHtml = '<i class="bi d-inline-flex px-2 ';
      if(reviewData.like)
      reviewHtml +=  'bi-hand-thumbs-up-fill"></i>';
      else
      reviewHtml +=  'bi-hand-thumbs-down-fill"></i>';
      
      reviewHtml += '<h5 id="review" class="d-inline-flex px-2">' + 
      reviewData.user_nick + ':</h5>';
      reviewHtml += '<div class="container d-flex bg-body-secondary rounded-3 align-content-center">';
      reviewHtml += '<p class="p-2">' + reviewData.comment + '</p></div>';

      // var r = $('#game-modal-reviews');
      // r.getElementsById('review').array.forEach(element => {
      //   element.data('review_id') == countReviews;
      //   element.getElementsById('comment').text(reviewData.comment);
      // });
      countReviews += 1;
      $('#game-modal-reviews').append(reviewHtml);
    });
    if(countReviews === 0)
      $('#game-modal-reviews').fadeOut(50);
    else
      $('#game-modal-reviews').fadeIn(1000);
  });
  

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