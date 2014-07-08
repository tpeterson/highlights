// Twitter-provided script to add a Tweet button to a page
!function(d,s,id){
	var js,fjs=d.getElementsByTagName(s)[0];
	if(!d.getElementById(id)){
		js=d.createElement(s);
		js.id=id;
		js.src="https://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js,fjs);
	}
}
(document,"script","twitter-wjs");

// empty variable that will eventually store the selected text
var savedText = null;

// function triggered when user selects text that stores selected text to savedText
function saveSelection() {
	if (window.getSelection) {
		var sel = window.getSelection();
		if (sel.getRangeAt && sel.rangeCount) {
			return sel.getRangeAt(0);
		}
	} 
	else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
    return null;
}

// event handler that triggers saveSelection() and refreshes tweet button
$(document).mouseup (function() {
    savedText = saveSelection();
    // deletes Twitter-created tweet button
    $('#tweetbutton iframe').remove();
    // generates new tweet button with customized properties
	var tweetbutton = $('<a></a>')
        .addClass('twitter-share-button')
        .attr('href', 'http://twitter.com/share')
        .attr('data-url', $('document.url').text())
        .attr('data-text', savedText);
    $('#tweetbutton').append(tweetbutton);
    // tells Twitter to refresh tweet button settings with customized properties
    twttr.widgets.load();
});
