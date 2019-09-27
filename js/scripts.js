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
    var $listItem = $('<li><button class="name-button">pokemon.name[0].toUpperCase()+pokemon.name.slice(1)</button></li>');
    $pokelist.append($listItem);
    $('button').on('click', function(event) {
      showDetails(pokemon);
    });
  }

  // function for fetching data from API - jQuery: ajax()
  function loadList() {
    return $.ajax(apiUrl, {dataType: 'json'}).then(function(response) {
      return response.json();
    }).then(function(json) {
      
    })
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function() {
      console.log(item);
      // show the modal - create the modal directly inside showDetails?
    });
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
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
