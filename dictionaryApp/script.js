const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchButton = document.querySelector("#searchBtn");


let JSON_value_Data;  // creating it outside from the function to access it inside other functions too
searchButton.addEventListener("click", async () => {
    const inputedValue = document.querySelector("#textArea").value;
    try {
        const response = await fetch(`${url}${inputedValue}`);
        JSON_value_Data = await response.json();
        console.log(JSON_value_Data);
        displayResult(JSON_value_Data, inputedValue);
    } catch (err) {
        document.querySelector(".resultParent").innerHTML = `<div id="errordiv">${JSON_value_Data.message} Please check the speeling or you can search for any other word</div>`;
        
    }
});

function displayResult(JSON_value_Data, inputedValue) {
    document.querySelector(".resultParent").innerHTML = `
        <div class="wordSection">
            <h1>${inputedValue}</h1>
            <button id="playSound">
                <i class="fas fa-volume-up"></i>
            </button>
        </div>
        <div class="details">
            <p>${JSON_value_Data[0].meanings[0].partOfSpeech}</p>
            <p>/${JSON_value_Data[0].phonetic}</p>
        </div>
        <p class="definition">Meanings:-
        1: ${JSON_value_Data[0].meanings[0].definitions[0].definition}</p>
        <p class="example">Examples:-
        1: ${JSON_value_Data[0].meanings[0].definitions[0].example}</p>
    `;

    // Add event listener to the button to play the sound
    document.querySelector("#playSound").addEventListener("click", playAudio);

}

//FUNCTION to play the sound of the word

const playAudio = () => {
    // select an existing audio element
    let sound = document.querySelector("#soundElement");
    if (!sound) {
        sound = document.createElement("audio");
        sound.id = "soundElement";
        document.body.appendChild(sound);
        sound.src = JSON_value_Data[0].phonetics[1].audio;   // Set the source of the audio element
        sound.play();
        
    } else {
        document.body.appendChild(sound);
        sound.src = JSON_value_Data[0].phonetics[1].audio;   // Set the source of the audio element
        sound.play();
    }
    
}

