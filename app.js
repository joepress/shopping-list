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
		
		
addItem = (state, item) => {
	state.items.push(item);
};
 
 
function deleteItem (state,element){
	var itemIndex = state.items.indexOf(element.text());
	state.items.splice(itemIndex,1);

}

function renderItem(item, liTemplate) {
  var liElement = $(liTemplate);
  liElement.find('.shopping-item').text(item);		
  return liElement;
}


function renderList (state,element){
	var itemsHTML = state.items.map(function(item){
		return renderItem(item,liTemplate);
});
	element.html(itemsHTML);
}
 
 
 
 
$(document).ready(function(){

$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state,$('.shopping-list'));
		this.reset()
	});

$('ul').on('click','.shopping-item-delete', function(event) {
	  event.preventDefault();
		deleteItem(state,$(this).closest('li').find('.shopping-item'));
		renderList(state,$('.shopping-list'));
  });	
	
$('ul').on('click','.shopping-item-toggle',function(event){
	event.preventDefault();
	$(this).closest('li').find('.shopping-item').toggleClass('shopping-item__checked');
	
 });
	
});
