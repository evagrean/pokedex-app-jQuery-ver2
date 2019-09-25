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
