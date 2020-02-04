"use strict";
let value;
let myPic;
let myQuote;
let myRandomUser;


const PIXABAY = {
    NAME: 'pixabay',
    BASE_URL: 'https://pixabay.com/api/',
    pixaKEY: '15051462-3781e16563a7eb55d7caa79d8'
};

const QUOTEGARDEN = {
  NAME: 'quotegarden',
  BASE_URL: 'https://quote-garden.herokuapp.com/quotes/search/:query',
};


const RANDOMUSER = {
    NAME: 'randomuser',
    BASE_URL: 'https://randomuser.me/api/'
};

const searchTermsByGenre = {
  Classic: 'ancient',
  Comedy: 'funny',
  "Crime/Detective": 'criminal',
  Fantasy: 'fantasy',
  "Historical Fiction": 'history',
  Horror: 'scary',
  Romance: 'romantic',
  "Romantic Comedy": 'happiness',
  "Suspense/Thriller": 'disturbing'
};

const numToQuote = {
 Art: 'art',
 Courage:'courage',
 Dreams:'dreams',
 Fear:'fear',
 Future:'future',
 Goodness:'goodness',
 Happiness:'happiness',
 Imagination:'imagination',
 Love:'love',
 Money:'money',
 Philosophy:'philosophy',
 Power:'power',
 Science:'science',
 Strength:'strength',
 Talent:'talent',
 Time:'time',
 Truth:'truth',
 War:'war',
 Waste:'waste'
  };

//user clicks start  > shows genre options and different header and hides old header and start button
   $('.start').on('click',function() {
        $('.js-welcomeWriter').hide();
        $('.genreChoice').show();
    });
     
//user selects genre, chooseGenre section hides and pixabay section with image appears, along with header including template literal of genre //option value


    $('.chooseGenre').change(function() {
      $('.genreChoice').hide();
      $('.pixabayImgsection').show();
      var $option = $(this).find('option:selected');
       value = $option.val();
      var text = $option.text();
      $('.plot').text(`Excellent choice! Let this image act as an inspiration for your ${value} plot!`)

      const searchTerm = searchTermsByGenre[value];
      console.log(value, searchTerm)
      const randomNum = (Math.floor(Math.random() * 50))
       fetch(`https://pixabay.com/api/?key=${PIXABAY.pixaKEY}&q=${encodeURIComponent(searchTerm)}&per_page=50&image_type=photo`)
        .then(response => response.json())
        .then(responseJson => { 
        
          myPic = `<img src="${responseJson.hits[randomNum].largeImageURL}" class="pixabayPlaceholderImg">`;
          console.log(responseJson);
          $('.pixabayPlaceholderImg').replaceWith(`${myPic}`)
      
    });
      
 

//user clicks Next, pixabayImgsection hides and numberChoice section appears
  $('.nextBtn1').on('click',function() {
    $('.pixabayImgsection').hide();
    $('.themeChoice').show();
  });

 //user chooses a theme which corresponds to a quote. Upon choosing theme, themeChoice section disappears and quote section appears 
 $(document).on('change', '.chooseTheme', function() {
   debugger
  $('.themeChoice').hide();
  $('.quote').show();
  var $option = $(this).find('option:selected');
  var value = $option.val();
  var text = $option.text();

  
  const quoteTopic = numToQuote[value];
  console.log(value, quoteTopic) 
  const randomQuote = (Math.floor(Math.random() * 10))
  fetch (`https://quote-garden.herokuapp.com/quotes/search/${quoteTopic}`)
    .then(response => response.json())
    .then(responseJson => { 
      
         myQuote = `<p>${responseJson.results[randomQuote].quoteText}</p>
        <p>${responseJson.results[randomQuote].quoteAuthor}</p>`;
          console.log(responseJson);
          $('.quotePlaceholder').append(`<p>${myQuote}</p>`)
        });
    });
    

 //user clicks next button, which hides quote section, and shows protagonistGenerator section
 $('.nextBtn2').on('click', function() {
  $('.quote').hide();
  $('.protagonistGenerator').show();
 });

 //user clicks Meet my protagonist, which hides protagonistGenerator section and shows protagResults section
 $('.protagBtn').on('click', function() {
   $('.protagonistGenerator').hide();
   $('.protagResults').show();

   fetch (`https://randomuser.me/api/`)
   .then (response => response.json())
   .then(responseJson => {
     myRandomUser = 
       `<p>${responseJson.results[0].name.title} 
       ${responseJson.results[0].name.first} 
       ${responseJson.results[0].name.last}</p>
       <p>${responseJson.results[0].location.country}</p>`
       $('.face').append(`<p>${myRandomUser}</p>`);
   });
 });

 //user clicks give me my full prompt, which hides protagResults section and shows fullPromptPage section
 $('.fullPrompt').on('click', function() {
   $('.protagResults').hide();
   $('.fullPromptPage').show();
    $('.fullPromptResults').append(
      `<h3>Genre Choice and Inspirational Plot Image</h3>
      <p>${value}</p>
      <p>${myPic}</p>
      <h3>Thematic Quote and Author</h3>
      <p>${myQuote}</p>
      <h3>Character and Location</h3>
      <p>${myRandomUser}</p>`)
  });
});