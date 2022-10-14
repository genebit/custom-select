$(".select .wrapper").hide();

$(".select[single] .wrapper li").click(function () {
	let selectParentId = $(this).closest(".select").attr("id");

	$(`#${selectParentId} input`).val(this.textContent);
	$(`#${selectParentId} input`).attr("value", $(this).attr("value"));

	$(`#${selectParentId} .select-head label,
	   #${selectParentId} .select-head .container, 
	   #${selectParentId} .wrapper, 
	   #${selectParentId} .select-head i`).toggleClass("active");

	$(`#${selectParentId} .wrapper`).slideToggle(200);
});

$(".select-head").click(function () {
	let selectParentId = $(this).closest(".select").attr("id");
	$(`#${selectParentId} .select-head label,
	   #${selectParentId} .select-head .container, 
	   #${selectParentId} .wrapper,
	   #${selectParentId} .select-head i`).toggleClass("active");

	this.classList.toggle("active");

	$(this).next().slideToggle(200);
});

// region: multiple

let selectedOptions = [];
function optionSelect() {
	$(".select[multiple] li").click(function () {
		let selectParentId = $(this).closest(".select").attr("id");

		this.classList.toggle("selected");
		let temp = {};
		temp["value"] = this.getAttribute("value");

		selectedOptions.push(temp);

		let span = document.createElement("span");
		span.textContent = this.textContent;
		$(`#${selectParentId} selected-container`).append(span);
	});
}
optionSelect();

let options = [];
$(".select[multiple] .select-head").click(function () {
	let selectParentId = $(this).closest(".select").attr("id");
	$(`#${selectParentId} .wrapper li`).each((i, el) => {
		let temp = {};
		temp["value"] = el.getAttribute("value");
		temp["textContent"] = el.textContent;

		options.push(temp);
	});
});

$(".select[multiple] .wrapper #Searchbox").keyup(function () {
	let query = $(this).val();
	let filtered = [];
	options.forEach((element) => {
		if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
			filtered.push(element);
		}
	});

	$(this).closest(".wrapper").find("li").remove();

	if (filtered.length === 0) {
		let li = document.createElement("li");

		li.setAttribute("value", "none");
		li.textContent = "Keyword not found.";

		$(this).closest(".wrapper").append(li);
	} else {
		$(this).closest(".wrapper").find("li").remove();

		filtered.forEach((val) => {
			let li = document.createElement("li");
			li.setAttribute("value", val.value);
			li.textContent = val.textContent;
			$(this).closest(".wrapper").append(li);
		});
	}

	optionSelect();
});
