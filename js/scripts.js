// IIFE Immediately Invoked Function Expression
var pokemonRepository = (function(){
  var repository = [];

  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';  // link for loading pokeapi

  function getAll() {
    return repository;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      repository.push(pokemon);
    }
    else {
      console.log('only objects with predetermined keys can be added!');
    }
  }

  // addListItem function written by exchanging querySelector with jQuery
  //created list with buttons that have pokemons' names on it
  function addListItem(pokemon) {
    var $pokelist = $('.pokemon-list');
    var $listItem = $('<li></li>');
    var $button = $('<button class="name-button"></button>').text(pokemon.name[0].toUpperCase()+pokemon.name.slice(1));
    $listItem.append($button);
    $pokelist.append($listItem);
    $button.on('click', function(event) {
      showDetails(pokemon);
    });
  }

  // function for fetching data from API - jQuery: ajax()
  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function(item) {
      $.each(item.results, function(i, item){
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    })
    .catch(function(e) {
      console.error(e);
    });
  }

  function loadDetails(item) {
    var $url = item.detailsUrl;
    return $.ajax($url).then(function(details) {
      // details are added to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function(e) {
      console.error(e);
    });
  }

  //showDetails function shows pokemon's details after clicking on pokemons name
  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
      showModal(item);
    });
  }

  function showModal(item) {
    var $modalContainer = $('#modal-container');

    //Clear all existing content in modal
    $modalContainer.empty();

    // Create elements that hold name and detailed information about pokemon
    var $modal = $('<div class="modal"></div>');
    var $nameElement = $('<h1></h1>').text(item.name[0].toUpperCase()+item.name.slice(1));
    var $imageElement = $('<img class="pokemon-img" alt="a picture of current pokemon">').attr('src', item.imageUrl);
    var $heightElement = $('<p class="pokemon-height"></p>').text('Height: ' + item.height);
    var $typesElement = $('<p class="pokemon-types"></p>').text('Types: ' + item.types);

    // Add closing button for modal with event listener
    var $closeButtonElement = $('<button class="modal-close"></button>').text('X');
    $closeButtonElement.on('click', hideModal);

    // Appending modal and its content to page
    $modal.append($nameElement);
    $modal.append($imageElement);
    $modal.append($heightElement);
    $modal.append($typesElement);
    $modalContainer.append($modal);

    $modalContainer.addClass('is-visible');
  }

  function hideModal() {
    var $modalContainer = $('#modal-container');
    $modalContainer.removeClass('is-visible');
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal
  };

})();

pokemonRepository.loadList().then(function() {
  $.each(pokemonRepository.getAll(), function(index, pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Example for using jQuery $.each() --- REMOVE WHEN PAGE WORKS AS EXPECTED!!!!!!
//************************************************
// var arr = ['a', 'b', 'c'];
// $.each(arr , function (index, value){
//   console.log(arr);
// });
