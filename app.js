
var state = {
	items: []
};
var liTemplate = '<li>' +
	'<span class="shopping-item"></span>' +
	'<div class="shopping-item-controls">' +
				 '<button class="shopping-item-toggle">' +
            '<span class="button-label">  check  </span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete </span>' +
          '</button>' +
        '</div>' +
		'</li>';
function addItem (state, item) {
	state.items.push({
		name:item,
		checkedOff: false
	});
}
 
function deleteItem (state,itemIndex){
	state.items.splice(itemIndex,1);
}

function getItem(state, itemIndex) {
  return state.items[itemIndex];
}

function updateItem(state, itemIndex, newItemState) {
  state.items[itemIndex] = newItemState;
}

function renderItem(item, liTemplate) {
  var liElement = $(liTemplate);
  liElement.find('.shopping-item').text(item.name);
  if (item.checkedOff) {
    liElement.find('.shopping-item').addClass('shopping-item__checked');
  }
  liElement.find('.shopping-item-toggle')
  return liElement;
}


function renderList (state,element){
	var itemsHTML = state.items.map(function(item){
		return renderItem(item,liTemplate);
});
	element.html(itemsHTML);
}


function handleItemAdd(formElement,state,shoppingList){
	formElement.submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state,shoppingList);
		this.reset()
	});
}

function handleItemDelete(state,shoppingList,deleteButton){
	 shoppingList.on('click', deleteButton , function(event) {
	  var itemIndex = parseInt($(this).closest('li'));
		deleteItem(state,itemIndex);
		renderList(state,shoppingList);
  });
}

function handleChecks(state,checkButton){
	$('.shopping-item-toggle').click(function(event){
		var itemId = $(event.currentTarget.closest('li'))
		var oldItem = getItem(state,itemId)
		
		updateItem(state,itemId, {
			name:oldItem.name,
			checkedOff: !oldItem.checkedOff
		});
		renderList(state,shoppingList);
	});
}



$(document).ready(function(){
var formElement = $('#js-shopping-list-form');
var shoppingList = $('.shopping-list');
var deleteButton = $('.shopping-item-delete');
var checkButton = $('.shopping-item-toggle')

handleItemAdd(formElement,state,shoppingList);
//handleItemDelete(state,shoppingList,deleteButton);
handleChecks(state,checkButton);

});

