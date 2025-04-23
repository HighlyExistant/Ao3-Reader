let TEXT_TO_SPEAK = [];
let CURRENT_TEXT_SPOKEN = 0;
function search_text() {
    let userstuff = document.getElementsByClassName("userstuff");
    let texts = [];
    
    for (let i = 0; i < userstuff.length; i++) {
        let paragraphs = userstuff[i].getElementsByTagName("p");
        for (let j = 0; j < paragraphs.length; j++) {
            const element = paragraphs[j];
            texts.push(element.innerText);
        }
    }
    console.log(texts)
    return texts;
}
function speak_next_paragraph(voices, index, rate) {
    const element = TEXT_TO_SPEAK[CURRENT_TEXT_SPOKEN];
    let say = new SpeechSynthesisUtterance(element);
    say.voice = voices[index];
    say.rate = rate;
    say.onend = (event) => {
        speak_next_paragraph(voices, index, rate)
    };
    speechSynthesis.speak(say);
    CURRENT_TEXT_SPOKEN += 1;
}
function speak(voices, index, rate) {
    console.log("voices.length " + voices.length);
    console.log(voices);
    CURRENT_TEXT_SPOKEN = 0;
    TEXT_TO_SPEAK = search_text();

    for (let i = 0; i < TEXT_TO_SPEAK.length; i++) {
        speak_next_paragraph(voices, index, rate)
    }
}
function getSpeech() {
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
chrome.runtime.onMessage.addListener((message, sender, send_response) => {
    console.log("message.msg " + message.msg);
    console.log("message.voice " + message.voice);
    switch (message.msg) {
        case "speak":
            let s = getSpeech();
            s.then((voices) => speak(voices, message.voice, message.rate)); 
            break;
        case "pause":
            speechSynthesis.pause()
            break;
        case "resume":
            speechSynthesis.resume()
            break;
        case "cancel":
            speechSynthesis.cancel()
            break;
        default:
            break;
    }
})