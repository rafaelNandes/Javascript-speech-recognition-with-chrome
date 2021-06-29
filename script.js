const button = document.querySelector('button')
const text = document.querySelector('.text')

const recognition = createRecognition()

button.addEventListener('click', e =>{
    if(!recognition) return

    recognition.start()

})


function createRecognition(){
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null
    
    if(!recognition){
        text.innerHTML = "Speech Recognition not found!"
        return null
    }

    recognition.lang = "pt_BR"
    recognition.onstart = () => console.log('started')
    recognition.onend = () => console.log('finished')
    recognition.onerror = e => console.log('error', e)
    recognition.onresult = e => text.innerHTML = e.results[0][0].transcript

    return recognition
}