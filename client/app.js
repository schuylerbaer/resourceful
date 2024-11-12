console.log("connected")

const apiUrl = window.location.protocol === 'file:'
	? 'http://localhost:8080' // Local API server during development
	: ''; // Production API
let showReviewWrapper = document.querySelector("#shows");
let inputReviewDate = document.querySelector("#date");
let inputReviewLocation = document.querySelector("#location");
let inputReviewNotes = document.querySelector("#notes");
let inputReviewJams = document.querySelector("#jams");
let inputReviewRating = document.querySelector("#rating");
let addShowButton = document.querySelector("#add-button");
let saveButton = document.querySelector("#save-button");
let editId = null;
let deleteId = null;

function saveReviewOnServer(){
	console.log("save button clicked");
	console.log(inputReviewDate);
	let data = "date=" + encodeURIComponent(inputReviewDate.value);
	data += "&location=" + encodeURIComponent(inputReviewLocation.value);
	data += "&notes=" + encodeURIComponent(inputReviewNotes.value);
	data += "&rating=" + encodeURIComponent(inputReviewRating.value);
	data += "&jams=" + encodeURIComponent(inputReviewJams.value);
	console.log("data", data);
	let method = "POST";
	let URL = "http:///localhost:8080/reviews";
	if(editId){
		method = "PUT";
		URL = apiUrl+"/reviews/"+editId;
	}
	if(deleteId){
		method = "DELETE";
		URL = apiUrl+"/reviews/"+deleteId;
	}
        fetch(URL,{
            method: method,
            body: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response){
            console.log("Review saved!", response)
	    editId = null;
	    deleteId = null;
	    closeForm()
	    showReviewWrapper.textContent = "";
            loadShowsFromServer()
	})
}

function addShowReview(show) {
	let showDate = document.createElement("button");
	showDate.textContent = show.date;
	showDate.className = "collapsible";
	let collapsibleContent = document.createElement("div");
	collapsibleContent.className = "content";
	let showLocation = document.createElement("h3");
	showLocation.textContent = "Location: ";
	showLocation.textContent += show.location;
	let showRating = document.createElement("h3");
	showRating.textContent = "Rating: ";
	showRating.textContent += show.rating;
	let showNotes = document.createElement("h3");
	showNotes.textContent = "Notes: ";
	showNotes.textContent += show.notes;
	let showJams = document.createElement("h3");
	showJams.textContent = "Standout jams: ";
	showJams.textContent += show.jams;
    	let editButton = document.createElement("button");
    	editButton.textContent = "Edit";
    	let deleteButton = document.createElement("button");
    	deleteButton.textContent = "Delete";
	let showSeparater = document.createElement("br");

	showReviewWrapper.appendChild(showDate);
	showReviewWrapper.appendChild(collapsibleContent);
	collapsibleContent.appendChild(showLocation);
	collapsibleContent.appendChild(showRating);
	collapsibleContent.appendChild(showNotes);
	collapsibleContent.appendChild(showJams);
	collapsibleContent.appendChild(editButton);
	collapsibleContent.appendChild(deleteButton);
	showReviewWrapper.appendChild(showSeparater);


	showDate.addEventListener("click", function() {
		this.classList.toggle("active");
		let content = this.nextElementSibling;
		if (content.style.display === "block") {
			content.style.display = "none";
		} else {
			content.style.display = "block"
		}
	});

    	editButton.onclick = function () {
        	console.log("edit id: ", show.id)
		openForm();
		inputReviewDate.value = show.date;
		inputReviewLocation.value = show.location;
		inputReviewNotes.value = show.notes;
		inputReviewJams.value = show.jams;
		inputReviewRating.value = show.rating;
		editId = show.id;
    	}

    	deleteButton.onclick = function () {
		if(confirm("Are you sure you want to delete this show?")) {
        		console.log("delete id: ", show.id)
			inputReviewDate.value = ""; 
			inputReviewLocation.value = "";
			inputReviewNotes.value = "";
			inputReviewJams.value = "";
			inputReviewRating.value = "";
			deleteId = show.id;
			saveReviewOnServer()
		}
    	}
}

function loadShowsFromServer() {
	fetch(apiUrl+"/reviews")
		.then(function(response){
			response.json()
				.then(function(data){
					console.log(data);
					let reviews = data;
					reviews.forEach(addShowReview)
				})
		})
}

function openForm() {
	console.log("form opened");
	document.getElementById("form-container").style.display = "block";
}

function closeForm() {
	document.getElementById("form-container").style.display = "none";
}

function addNewReview() {
	openForm();
	inputReviewDate.value = ""; 
	inputReviewLocation.value = "";
	inputReviewNotes.value = "";
	inputReviewJams.value = "";
	inputReviewRating.value = "";
	console.log("add button clicked");
}

addShowButton.onclick = addNewReview;
saveButton.onclick = saveReviewOnServer;

loadShowsFromServer()
