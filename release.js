function el(ele) {
	return document.getElementById(ele);
}

// el("contributorTitle").onchange = function() {
// 	indexToUse = el("contributorTitle").value.split(":");
// 	el("contributorName").value = indexToUse[1];
// }

// el("contributorName").onchange = function() {
// 	indexToUse = el("contributorTitle").value.split(":");
// 	indexToUse[1] = el("contributorName").value;
// 	var IDofContributorToEdit = "contributor" + indexToUse[0];
// 	el(IDofContributorToEdit).value = indexToUse.join(":");
// }


// document.getElementById("releasedBeforeYes").onclick = function() {
// 	document.getElementById("releasedBeforeDateDiv").style.display = "inline";
// }

// document.getElementById("releasedBeforeNo").onclick = function() {
// 	document.getElementById("releasedBeforeDateDiv").style.display = "none";
// }

// document.getElementById("releaseDateASAP").onclick = function() {
// 	document.getElementById("specificReleaseDateDiv").style.display = "none";
// }

// document.getElementById("releaseDateSpecific").onclick = function() {
// 	document.getElementById("specificReleaseDateDiv").style.display = "inline";
// }

var tracks = [];

class Track {
	constructor(trackID) {
		this.trackID = trackID;		//done
		this.songName = "New Track";			//done
		this.producers = "";		//done
		this.contributors = {		//done
			Actor: "",
			Arranger: "",
			Choir: "",
			Composer: "",
			Conductor: "",
			Engineer: "",
			Ensemble: "",
			Lyricist: "",
			Mixer: "",
			Orchestra: "",
			Remixer: "",
			Soloist: ""
		};							//done
		this.genre = "";			//done
		this.subgenre = "";			//done
		this.primaryArtists = "";	//done
		this.featuredArtists = "";	//done
		this.songWriterName = "";	//done
		this.previewStartTime = "";	//done
		this.explicitContent = null;//done
		this.language = "select";	//done
		this.isrc = "";				//done
		this.file = null;			//done
		this.fileName = "";			//done
		this.beatLicence = null;	//done
		this.beatLicenceName = "";	//done
		this.beatProof = null;		//done
		this.beatProofName = "";	//done
		this.prevRelease = "";		//done
	}

	pushInfo() {
		document.getElementById("songName").value = this.songName;
		document.getElementById("genre").value = this.genre;
		document.getElementById("subgenre").value = this.subgenre;
		document.getElementById("primaryArtists").value = this.primaryArtists;
		document.getElementById("featuredArtists").value = this.featuredArtists;
		document.getElementById("producers").value = this.producers;
		document.getElementById("isrc").value = this.isrc;
		if(this.explicitContent) {
			document.getElementById("expTrue").checked = true;
			document.getElementById("expFalse").checked = false;
		} else if(this.explicitContent == false) {
			document.getElementById("expTrue").checked = false;
			document.getElementById("expFalse").checked = true;
		}
		document.getElementById("startTime").value = this.previewStartTime;
		if(this.language != "nolyrics" && this.language != "english" && this.language != "spanish" && 
			this.language != "french" && this.language != "mandarin" && this.language != "select") {
			document.getElementById("otherLang").value = this.language;
			document.getElementById("language").value = "other";
		} else {
			document.getElementById("language").value = this.language;
		}
		if(this.fileName == "") {
			document.getElementById("file-upload-name").innerHTML = "No File";
		} else {
			document.getElementById("file-upload-name").innerHTML = this.fileName;
		}
		if(this.beatLicenceName == "") {
			document.getElementById("beat-licence-upload-name").innerHTML = "No File";
		} else {
			document.getElementById("beat-licence-upload-name").innerHTML = this.beatLicenceName;
		}
		if(this.beatProofName == "") {
			document.getElementById("beat-proof-upload-name").innerHTML = "No File";
		} else {
			document.getElementById("beat-proof-upload-name").innerHTML = this.beatProofName;
		}
		document.getElementById("songwriter").value = this.songWriterName;
		document.getElementById("prevRelease").value = this.prevRelease;
	}

	pullInfo() {
		this.songName = document.getElementById("songName").value;
		this.genre = document.getElementById("genre").value;
		this.subgenre = document.getElementById("subgenre").value;
		this.primaryArtists = document.getElementById("primaryArtists").value;
		this.featuredArtists = document.getElementById("featuredArtists").value;
		this.producers = document.getElementById("producers").value;
		this.isrc = document.getElementById("isrc").value;
		if(document.getElementById("expFalse").checked) {
			this.explicitContent = false;
		} else if(document.getElementById("expTrue").checked) {
			this.explicitContent = true;
		}
		this.previewStartTime = document.getElementById("startTime").value;
		if(document.getElementById("language").value == "other") {
			this.language = document.getElementById("otherLang").value;
		} else {
			this.language = document.getElementById("language").value;
		}
		this.file = document.getElementById("file").files[0];
		if(document.getElementById("file").files[0] != null) {
			this.fileName = document.getElementById("file").files[0].name;
		}
		this.songWriterName = document.getElementById("songwriter").value;
		this.beatLicence = document.getElementById("beat-licence").files[0];
		if(document.getElementById("beat-licence").files[0] != null) {
			this.beatLicenceName = document.getElementById("beat-licence").files[0].name;
		}
		this.beatProof = document.getElementById("beat-proof").files[0];
		if(document.getElementById("beat-proof").files[0] != null) {
			this.beatProofName = document.getElementById("beat-proof").files[0].name;
		}
		this.prevRelease = document.getElementById("prevRelease").value;
	}

	checkRequired() {
		if(this.songName == "New Track" || this.genre == "" || this.primaryArtists == "" || this.explicitContent == null || this.previewStartTime == "" 
			|| this.language == "select" || this.file.length == 0 || this.songWriterName == "") {
			return false;
		} else {
			return true;
		}
	}
}

el("language").onchange = function() {
	if(el("language").value == "other") {
		el("otherLangDiv").style.display = "inline";
		el("language").style.marginBottom = "5px";
	} else {
		el("otherLangDiv").style.display = "none";
		el("language").style.marginBottom = "0px";
	}
}

document.getElementById("contributorTitle").onchange = function() {
	var contIndex = document.getElementById("contributorTitle").value;
	document.getElementById("contributorName").value = tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].contributors[contIndex];
}

document.getElementById("contributorName").onchange = function() {
	var contIndex = document.getElementById("contributorTitle").value;
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].contributors[contIndex] = document.getElementById("contributorName").value; 
}

function trackClicked(event) {
	document.getElementById("add-song-text").style.display = "none";
	document.getElementById("first-form").style.display = "inline-grid";
	document.getElementById("album-info-form").style.display = "none";
	document.getElementById("album-info").setAttribute("class", "album-info");
	var arr = document.getElementsByClassName("track");
	var i = 0;
	for(i = 0;i<arr.length;i++) {
		arr[i].setAttribute("class", "track");
	}
	event.target.setAttribute("class", "track selected");

	onTrackSwitch(event);
}

function addNewSongToRelease() {
	var trackDiv = document.createElement("div");
	trackDiv.setAttribute("class", "track");
	trackDiv.setAttribute("onclick", "trackClicked(event)");
	trackDiv.setAttribute("id", "track-"+tracks.length);
	var trackNameText = document.createTextNode((tracks.length+1) + " - New Track");
	trackDiv.appendChild(trackNameText);
	document.getElementById("track-list").appendChild(trackDiv);
	let newTrack = new Track(tracks.length);
	tracks.push(newTrack);
}

document.getElementById("add-track").onclick = function() {
	addNewSongToRelease();
	document.getElementById("track-list").scrollTop = document.getElementById("track-list").scrollHeight;
}

function onTrackSwitch(event) {
	var trackID = event.target.getAttribute("id")[6];
	tracks[trackID].pushInfo();	
}

document.getElementById("album-info").onclick = function() {
	if(document.getElementsByClassName("selected")[0] != null) {
		document.getElementsByClassName("selected")[0].setAttribute("class", "track");
	}
	document.getElementById("album-info").setAttribute("class", "album-info selected");
	document.getElementById("first-form").style.display = "none";
	document.getElementById("add-song-text").style.display = "none";
	document.getElementById("album-info-form").style.display = "inline-grid";
}

document.getElementById("first-form").onchange = function() {
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pullInfo();
}

document.getElementById("file").onchange = function() {
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pullInfo();
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pushInfo();
}

document.getElementById("beat-licence").onchange = function() {
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pullInfo();
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pushInfo();
}

document.getElementById("beat-proof").onchange = function() {
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pullInfo();
	tracks[document.getElementsByClassName("selected")[0].getAttribute("id")[6]].pushInfo();
}

document.getElementById("songName").onchange = function() {
	var id = document.getElementsByClassName("selected")[0].getAttribute("id").split("-")[1];
	tracks[id].pullInfo();
	document.getElementsByClassName("selected")[0].innerHTML = parseInt(id) + 1 + " - " + tracks[id].songName;
}

document.getElementById("file-upload-button").onclick = function() {
	document.getElementById("file").click();
}

document.getElementById("beat-licence-upload-button").onclick = function() {
	document.getElementById("beat-licence").click();
}

document.getElementById("beat-proof-upload-button").onclick = function() {
	document.getElementById("beat-proof").click();
}

var fileUp = document.getElementById("file");

var form = document.getElementById("release-form");
var trackName = document.getElementById("songName").value;

document.getElementById("submit-redirect").onclick = function() {
	document.getElementById("release-submit").click();
}

form.onsubmit = function(event) {
	event.preventDefault();
	var files = fileUp.files;


	//the for loop iterates through the array of Track instances (track is a class) in the tracks array
	//for each track it makes a "formData" variable, uploading the song file
	//then it appends all of the song information stored in instance variables to the form data
	//it finally sends the formData as a POST http request, this acts the same as an HTML form submit

	var i = 0;
	for(i = 0;i<tracks.length;i++) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'agh.php', true);
		var formData = new FormData();
		formData.append("albumName", "album");
		formData.append("artistName", firebase.auth().currentUser.artistName);
		formData.append("fileToUpload", tracks[i].file, tracks[i].fileName);
		formData.append("trackName", tracks[i].songName);									//
		formData.append("genre", tracks[i].genre);											//
		formData.append("subgenre", tracks[i].subgenre);									//
		formData.append("primary", tracks[i].primaryArtists);								//
		formData.append("feat", tracks[i].featuredArtists);									//
		formData.append("isrcCode", tracks[i].isrc);										//
		formData.append("explicit", tracks[i].explicitContent);								//
		formData.append("producers", tracks[i].producers);									//
		formData.append("previewStart", tracks[i].previewStartTime);						//
		formData.append("language", tracks[i].language);									//
		formData.append("songwriter", tracks[i].songWriterName)								//
		formData.append("prevRelease", tracks[i].prevRelease)								//

		formData.append("beatLicence", tracks[i].beatLicence, tracks[i].beatLicenceName)	//
		formData.append("beatProof", tracks[i].beatProof, tracks[i].beatProofName)			//
		for(var key in tracks[i].contributors) {
			formData.append(key, tracks[i].contributors[key]);								//
		}
		xhr.send(formData);
	}
}