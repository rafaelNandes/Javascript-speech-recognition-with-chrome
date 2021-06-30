const button = document.querySelector('button')
const text = document.querySelector('.text')

const recognition = createRecognition()

//Control variable
let listening = false

button.addEventListener('click', () =>{
    if(!recognition) return

    //If the app is listening, stop by clicking the button. Else start listening
    listening ? recognition.stop() : recognition.start()

    //Alternate text and css on the button
    button.innerHTML = listening ? 'Aperte para falar' : 'Parar de escutar'
    
    button.classList.toggle('button')
    button.classList.toggle('button-stop')
})


function createRecognition(){
    
    //Creating a constant with the API instance depending on the browser and if available
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = SpeechRecognition !== undefined ? new SpeechRecognition() : null
    
    //If not available show message
    if(!recognition){
        text.innerHTML = "Speech Recognition not found!"
        return null
    }

    //Define language to be listen
    recognition.lang = "pt_BR"

    //Adding SpeechRecognition functions 
    recognition.onstart = () => listening = true
    recognition.onend = () => listening = false
    recognition.onerror = e => console.log('error', e)
    recognition.onresult = e => text.innerHTML = e.results[0][0].transcript

    return recognition
}