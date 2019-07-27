// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    console.log(msg);
    // If the received message has the expected format...
    if (msg.text === 'returnHtml') {
        sendResponse(document.all[0].outerHTML);
        console.log(document.body);
        chrome.runtime.sendMessage({
            data: document.body.outerHTML
        });
    } else if (msg.text === "changeColor") {
        document.body.style.backgroundColor = "orange";
    }
});
