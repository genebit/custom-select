const ANIMATION_TIME = 250;
let selectedValues = [];

$(document).ready(function () {
	$("cselect cselect-options").hide();
	selectHeadClickHandler();
	cformInputHandler();
});

function selectHeadClickHandler() {
	$("cselect cselect-head").click(function (e) {
		let parentId = $(this).closest("cselect")[0].id;
		selectedValues = [];

		// change styles
		$(` #${parentId} section,
			#${parentId} section i,
			#${parentId} label,
			#${parentId} cselect-options
		`).toggleClass("active");

		// toggle hide/show
		resetSearchfield(parentId);
		$(`#${parentId} cselect-options`).slideToggle(ANIMATION_TIME);

		// get the selectid to search through
		cselectSearchHandler(parentId);
		coptionClickHandler(parentId);
		cformInputHandler();
	});
}

function cselectSearchHandler(parentId) {
	let options = $(`#${parentId} cselect-options coption`);

	$(`#${parentId} [searchfield]`).keyup(function (e) {
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
	});
}

function coptionClickHandler(parentId) {
	let options = $(`#${parentId} cselect-options coption`);

	$.each(options, function (indexInArray, valueOfElement) {
		$(this).click(function (e) {
			// set value to cselect head
			$(`#${parentId}`).attr("value", this.getAttribute("value"));
			$(`#${parentId} section input`).val(this.textContent);

			setTimeout(function () {
				// wait a few ms to trigger the searchfield to reset
				resetSearchfield(parentId);

				// close the option dropdown
				$(`#${parentId} cselect-options`).slideUp(ANIMATION_TIME);
			}, 200);

			// remove active state
			$(`	#${parentId} section,
				#${parentId} section i,
				#${parentId} label,
				#${parentId} cselect-options
			`).removeClass("active");

			$(`#${parentId}`).trigger("change");
		});
	});
}

function resetSearchfield(parentId) {
	$(`#${parentId} [searchfield]`).val("");
	$(`#${parentId} [searchfield]`).keyup();
}

function cformInputHandler() {
	let cformInputs = $(".cform-input");
	$.each(cformInputs, function (indexInArray, valueOfElement) {
		let placeholder = $(`#${this.id}`).attr("placeholder");

		if (placeholder != undefined && placeholder.length > 0) {
			let label = $(this).siblings(1);
			$(label).addClass("float");
		}
	});

	$(".cform-input").keyup(function (e) {
		// check first if placeholder is undefined before adding float class
		let placeholderLength = $(this).attr("placeholder") == undefined ? 0 : $(this).attr("placeholder").length;

		if (this.value.length > 0 || placeholderLength > 0) {
			$(this).siblings(0).addClass("float");
		} else {
			$(this).siblings(0).removeClass("float");
		}
	});
}
