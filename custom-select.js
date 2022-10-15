const ANIMATION_TIME = 250;

$("cselect cselect-options").hide();

$("cselect cselect-head").click(function (e) {
	let parentId = $(this).closest("cselect")[0].id;

	// change styles
	$(` #${parentId} section,
        #${parentId} section i,
        #${parentId} label,
        #${parentId} cselect-options
    `).toggleClass("active");

	// toggle hide/show
	$(`#${parentId} cselect-options`).slideToggle(ANIMATION_TIME);

	// get the selectid to search through
	searchItems(parentId);
	optionClickHandler(parentId);
});

function searchItems(parentId) {
	let options = $(`#${parentId} cselect-options coption`);

	$("cselect cselect-options #Searchfield").keyup(function (e) {
		let parentId = $(this).closest("cselect")[0].id;

		let query = $(this).val();
		let filtered = [];

		$.each(options, function (indexInArray, valueOfElement) {
			if (valueOfElement.textContent.toLowerCase().includes(query.toLowerCase())) {
				let temp = {
					Value: valueOfElement.getAttribute("value"),
					TextContent: valueOfElement.textContent,
				};

				filtered.push(temp);
			}
		});

		// repopulate options
		$(`#${parentId} cselect-options coption`).remove();

		$.each(filtered, function (indexInArray, valueOfElement) {
			let option = document.createElement("coption");
			option.setAttribute("value", valueOfElement["Value"]);
			option.innerHTML = valueOfElement["TextContent"];

			$(`#${parentId} cselect-options`).append(option);
		});

		optionClickHandler(parentId);
	});
}

function optionClickHandler(parentId) {
	let options = $(`#${parentId} cselect-options coption`);
	$.each(options, function (indexInArray, valueOfElement) {
		$(this).click(function (e) {
			setTimeout(() => {
				// trigger the searchfield to reset
				$(`#${parentId} #Searchfield`).val("");
				$(`#${parentId} #Searchfield`).keyup();
			}, 200);

			// set value to cselect
			$(`#${parentId}`).attr("value", this.getAttribute("value"));
			$(`#${parentId} section input`).val(this.textContent);

			// close the option dropdown
			$(`#${parentId} cselect-options`).slideUp(ANIMATION_TIME);

			// remove active state
			$(` #${parentId} section,
                #${parentId} section i,
                #${parentId} label,
                #${parentId} cselect-options
            `).removeClass("active");
		});
	});
}

$(`#SingleExample1, #SingleExample2`).change(function () {
	setTimeout(() => {
		console.log($(this).attr("value"));
	}, 100);
});

$(".floating-cform-input .cform-input").keyup(function (e) {
	if (this.value.length > 0) {
		$(this).siblings(0).addClass("float");
	} else {
		$(this).siblings(0).removeClass("float");
	}
});
