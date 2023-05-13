const regex = /Get c.ai\+/;
let observer = null;

window.addEventListener('load', function() {
	removeButton(document.querySelectorAll(".shine-btn"));
	setupObserver();
})

window.addEventListener('beforeunload', function() {
	observer.disconnect();
})

function setupObserver() {
	if(observer !== null) return;
	observer = new MutationObserver(function (mutations) {
		for (let i = 0; i < mutations.length; i++) {
			const mutation = mutations[i];
			if (mutation.type === "childList" && mutation.addedNodes.length > 0) removeButton(mutation.target.querySelectorAll(".shine-btn"));
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });
}

function removeButton(foundDivs) {
	if(foundDivs.length === 0) return;
	for (let j = 0; j < foundDivs.length; j++) {
		foundDivs[j].remove();
	}
}