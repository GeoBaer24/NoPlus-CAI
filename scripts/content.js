let isWaiting = this.document.title.includes("Waiting");
let observer = null;
let runningVersion = chrome.runtime.getManifest().version
let newestVersion = runningVersion;

window.addEventListener('load', function() {
	removeButton(document.querySelectorAll(".shine-btn"));
	if(isWaiting) {
		// Change the Webpage to be more suitable for Impatient Users.
		removeButton(document.querySelectorAll('a'));
		let waitingTime = getWaitingTime();
		this.document.querySelector('div').remove();

		let title = this.document.createElement("h1");
		title.innerHTML = "Please wait...<br>You are currently in Queue for " + waitingTime + " minutes." + ((waitingTime < 5) ? "" : "<br>Yikes... is the site down?");
		title.style.color = "white";
		title.style.textAlign = "center";
		title.style.marginTop = "2%";

		let subtitle = this.document.createElement("h2")
		subtitle.innerHTML = "In the meantime, please enjoy this random GIF provided by \"<a href='https://cataas.com/'>Cat as a Service</a>\". :)";
		subtitle.style.color = "white";
		subtitle.style.textAlign = "center";
		subtitle.style.marginTop = "2%";
		
		let gifElement = document.createElement("img");
		gifElement.src = "https://cataas.com/cat/gif";
		gifElement.style.height = "45%";
		centerObject(gifElement);
		
		let button = this.document.createElement("button");
		button.innerText = "Another GIF!";
		button.onclick = function() {
			let randomNumber = Math.floor(Math.random() * 10000);
			// Prevents Browser caching
			gifElement.src = "https://cataas.com/cat/gif?$=" + randomNumber;
		}
		button.classList.add("npButton")
		centerObject(button);

		let footer = this.document.createElement("h2");
		footer.innerHTML = "Thank you for using NoPlus! Check for Updates <a href='https://github.com/GeoBaer24/NoPlus-CAI'>here</a> or <a href='https://reddit.com/u/JustACruiser'>on my Reddit</a>.";
		footer.style.color = "white";
		footer.style.textAlign = "center";
		footer.style.marginTop = "3%";
		centerObject(footer);

		let versionChecker = this.document.createElement("h3");
		versionChecker.innerHTML = "Good News! You're running the latest version." //: )  + runningVersion + " " + newestVersion;
		versionChecker.style.color = "white";
		versionChecker.style.textAlign = "center";
		versionChecker.style.marginTop = "2%";
		centerObject(versionChecker);
		checkUpdate(versionChecker);

		this.document.body.appendChild(title);
		this.document.body.appendChild(subtitle);
		this.document.body.appendChild(gifElement);
		this.document.body.appendChild(button);
		this.document.body.appendChild(footer);
		this.document.body.appendChild(versionChecker);
	}
	else setupObserver();
})

window.addEventListener('beforeunload', function() {
	if(observer !== null) observer.disconnect();
})

function checkUpdate(versionChecker) {
	const Http = new XMLHttpRequest();
	Http.open("GET", "https://raw.githubusercontent.com/GeoBaer24/NoPlus-CAI/untested/version.txt")
	Http.onreadystatechange = function() {
		if(Http.readyState === 4 && Http.status === 200) {
			newestVersion = Http.responseText.replace("\n", "");
			if(newestVersion !== runningVersion) 
				versionChecker.innerHTML = "Heads up, an <a href='https://github.com/GeoBaer24/NoPlus-CAI'>update</a> is available.<br>Newest Version: " + newestVersion + "<br>You're running: " + runningVersion;
		}
	}
	Http.send();
}

function centerObject(object) {
	object.style.display = "block";
	object.style.marginLeft = "auto";
	object.style.marginRight = "auto";
}

function setupObserver() {
	if(observer !== null) return;
	observer = new MutationObserver(function (mutations) {
		for (let i = 0; i < mutations.length; i++) {
			const mutation = mutations[i];
			if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
				removeButton(mutation.target.querySelectorAll(".shine-btn"));
			}
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
}

function getWaitingTime() {
	let words = document.querySelector('h2').innerText.split(" ");
	return parseInt(words[5]);
}

function removeButton(found) {
	if(found.length === 0) return;
	for (let i = 0; i < found.length; i++) {
		found[i].remove();
	}
}