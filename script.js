if(!('webkitSpeechRecognition' in window)){
    alert("Your browser doesn't support speech recognition.please try Chrome.");
} else{
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    const startButton = document.getElementById('start-button');
    const resultDisplay = document.getElementById('result');
    const instructions = document.getElementById('instructions');

    startButton.addEventListener('click', ()=> {
        recognition.start();
        instructions.textContent = 'listening...';
    });

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    resultDisplay.textContent = `You said: ${transcript}`;
    instructions.textContent = 'Click the button and say something again!';
    executeCommand(transcript.toLowerCase()); 
};

recognition.onerror = (event) => {
    instructions.textContent = `Error occured in recognition : ${event.error}`;
};

recognition.onend = () => {
    instructions.textContent = 'Click the button and say something';
};

function executeCommand(command) {
    if(command.includes('change background to red')) {
        document.body.style.backgroundColor = 'red';
    } else if(command.includes('change background to blue')) {
        document.body.style.backgroundColor = 'blue';
    } else if(command.includes('reset background')) {
        document.body.style.backgroundColor = '#f4f4f4';
    } else {
        resultDisplay.textContent += '(No command recognized)';
    }
}
}