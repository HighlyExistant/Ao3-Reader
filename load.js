// global
let SELECTED_VOICE = 0;
let SELECTED_RATE = 1.0;
// end global
function get_speech() {
    return new Promise(
        function (resolve, reject) {
            let synth = window.speechSynthesis;
            let id;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    )
}

function list_voices() {
    const voices = speechSynthesis.getVoices();
    let voices_element = document.getElementById("voices");
    console.log("voices.length " + voices.length);
    voices_element.innerHTML = "";
    for (let i = 0; i < voices.length; i++) {
        const element = voices[i];
        console.log(element);
        let append = "<span><button class=\"voice\">" + element.name + "</button></span>";
        console.log("appending: " + append);
        voices_element.innerHTML = voices_element.innerHTML.concat(append)
    }
}
let s = get_speech();
s.then((voices) => {
    list_voices();
    SELECTED_VOICE = 0; // default voice
    let voices_dom = document.getElementsByClassName("voice");
    for (let i = 0; i < voices_dom.length; i++) {
        const element = voices_dom[i];
        element.addEventListener("click", (inner) => {
            const idx = i;
            SELECTED_VOICE = idx;
            console.log(idx);
        })
    }
}); 