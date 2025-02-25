let speach = document.getElementById("speach");
speach.addEventListener("click", () => {
    let params = {
        active: true,
        currentWindow: true
    };
    (async () => {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        console.log(SELECTED_VOICE);
        await chrome.tabs.sendMessage(tab.id, { msg: "speak", voice: SELECTED_VOICE, rate: SELECTED_RATE });
        // do something with response here, not outside the function
    })();
}, false);

let pause = document.getElementById("pause");
pause.addEventListener("click", () => {
    let params = {
        active: true,
        currentWindow: true
    };
    (async () => {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        await chrome.tabs.sendMessage(tab.id, { msg: "pause" });
        // do something with response here, not outside the function
    })();
}, false);


let resume = document.getElementById("resume");
resume.addEventListener("click", () => {
    let params = {
        active: true,
        currentWindow: true
    };
    (async () => {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        await chrome.tabs.sendMessage(tab.id, { msg: "resume" });
        // do something with response here, not outside the function
    })();
}, false);


let cancel = document.getElementById("cancel");
cancel.addEventListener("click", () => {
    let params = {
        active: true,
        currentWindow: true
    };
    (async () => {
        const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
        await chrome.tabs.sendMessage(tab.id, { msg: "cancel" });
        // do something with response here, not outside the function
    })();
}, false);

let slider = document.getElementById("rate");
slider.oninput = function() {
    SELECTED_RATE = this.value*0.10;
}