// Run all functions on load:
$(document).ready(function(){
	scaleBoxes();
	addButtons();
	fillBoxes();
	// The below line exists specifically to prevent the error on slide [url]/#/2[/0]
	$('#biglist.source.newswish').css('height', ($(window).height() * (verSwishScale - 0.05)).toString())
});

// Short function to set the scale multiplier based on vertical resolution
const setSwishScale = () => $(window).height() <= 900 ? 0.65 : $(window).height() <= 1080 ? 0.485 : 0.4;

// Scale all of the boxes based on the scale multiplier set above
function scaleBoxes(){
	verSwishScale = setSwishScale();
    $('pre.source.newswish').css('height', ($(window).height() * verSwishScale).toString());
    $('.innerswishbox').css('overflow', 'auto');
};

// Remove examples from the previews visually
function removeExamples(box){
	let linesArray = $(box).html().split('\n');
	let examplesIndex = linesArray.indexOf("/** &lt;examples&gt;");
	linesArray.splice(examplesIndex, 0, '<span class="examplesToRemove">');
	linesArray.push('</span>');
	let newContent = linesArray.join('\n');
	$(box).html(newContent);
	$('.examplesToRemove').hide();
};

// Short function which appends run/close buttons to a box when called
const appendNewButton = (addButtonTo) => $('<div class="runswish" id="' + $(addButtonTo).attr('id') + '"><i class="fas fa-play-circle"></i></div>').insertBefore(addButtonTo);
// const appendNewButton = (addButtonTo) => $('<div class="runswish" id="' + $(addButtonTo).attr('id') + '"></div>').insertBefore(addButtonTo);

// Add the buttons to all of the boxes, add the correct class for the button to function, and create the click listener for the buttons
function addButtons(){
	$('pre.source.newswish').each(function(){
		appendNewButton($(this));
	});
	$('pre.source.newswish').each(function(){
		$(this).addClass('current' + $(this).attr('id'));
	});
	$('.runswish').click(function(){
		newSwishToggle($('.current' + $($(this)).attr('id')));
		buttonBGToggle($(this));
	});
}

// Short utility function to find the position of the nth occurence of a string within another string
const getPosition = (string, substring, index) => string.split(substring, index).join(substring).length;

// Short function which toggles the image of the run/close button when called
function buttonBGToggle(thisButton){
	if($(thisButton).html() == '<i class="fas fa-play-circle"></i>'){
		$(thisButton).html('<i class="fas fa-times-circle"></i>');
	}
	else {
		$(thisButton).html('<i class="fas fa-play-circle"></i>');
	}
}


/******************************************************************************************************************
 *   Uncomment the below function, comment out the above alternative of the same name, switch which version of    *
 * appendNewButton() is commented, and uncomment background-image in lpn.css to revert to the image-style button. *
 ******************************************************************************************************************/

/*function buttonBGToggle(thisButton){
	if($(thisButton).css('background-image').slice(getPosition($(thisButton).css('background-image'), '/', 3) + 1, -2) == "img/run.png"){
		$(thisButton).css('background-image', "url(\"img/close.png\")");
	}
	else {
		$(thisButton).css('background-image', "url(\"img/run.png\")");
	}
}*/

// Main function to toggle the static code text boxes into SWISH iframes and back. Called on button click.
function newSwishToggle(thisBox){
	if(thisBox.is('pre') && $('iframe#' + thisBox.attr('id')).length == 0){
		let qMark = '?';
		let swishBox = ['<iframe src="'];
		let srcAttribute = [];
		srcAttribute.push($('pre.source.newswish').attr('swishurl'));
		srcAttribute.push(qMark + 'code=');
		srcAttribute.push($('pre.source.newswish').attr('onlinefolder'));
		srcAttribute.push(thisBox.attr('id'));
		srcAttribute.push('.pl"');
		swishBox.push(srcAttribute.join(''));
		swishBox.push(' class="swishiframe"');
		swishBox.push(' id="' + thisBox.attr('id') + '"></iframe>');
		joinedSwishBox = swishBox.join('');
		$(joinedSwishBox).insertAfter(thisBox);
		$('iframe#' + thisBox.attr('id')).css('height', ($(window).height() * verSwishScale).toString());
		$('iframe#' + thisBox.attr('id')).css('width', '90%');
		$('iframe#' + thisBox.attr('id')).hide();
		$('.load.IFRAME.' + $(this).attr('id')).hide();
	};

	if(thisBox.is('iframe')){
		thisBox.removeClass('current' + thisBox.attr('id'));
		$('pre#' + thisBox.attr('id')).addClass('current' + thisBox.attr('id'));
		thisBox.hide(400);
		$('pre#' + thisBox.attr('id')).show(400);
	} else if(thisBox.is('pre')){
		thisBox.removeClass('current' + thisBox.attr('id'));
		$('iframe#' + thisBox.attr('id')).addClass('current' + thisBox.attr('id'));
		thisBox.hide(400);
		$('iframe#' + thisBox.attr('id')).show(400);
		$('.load.IFRAME.' + thisBox.attr('id')).show();
	}
};

// Filling in preview boxes also from the external file
function fillBoxes(){
	$('pre.source.newswish').each(function(){
		retrieveData($($(this)).attr('onlinefolder'), $($(this)).attr('id'), '.pl', '#' + $(this).attr('id')+ '.innerswishbox');
	});
};

function retrieveData(externalURL, fileID, fileExtension, elementToModify){
	$.ajax({
		type: 'GET',
		url: externalURL + fileID + fileExtension,
		datatype: 'text',
		success : function(data){
			$(elementToModify).html(data);
			removeExamples(elementToModify);
		}
	});
};
