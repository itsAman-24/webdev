const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const searchButton = document.querySelector("#searchBtn");
const sound = document.querySelector("#sound");  

searchButton.addEventListener("click" , async() => {
    const inputedValue = document.querySelector("#textArea").value;
    try{
        const response = await fetch(`${url}${inputedValue}`);
        const JSON_value_Data = await response.json(); 
        console.log(JSON_value_Data);
        displayResult(JSON_value_Data , inputedValue);
    } catch(err) {
        console.log(err);
    }

});

function displayResult(JSON_value_Data , inputedValue) {

    document.querySelector(".resultParent").innerHTML = `
    <div class="wordSection">
        <h1>${inputedValue}</h1>
        <button id ="sound">
            <i class="fas  fa-volume-up"></i>
        </button>
    </div>

    <!-- <i class="fa-regular fa-volume-high"></i> -->
    <div class="details">
        <p>${JSON_value_Data[0].meanings[0].partOfSpeech}</p>
        <p>/${JSON_value_Data[0].phonetic}</p>
    </div>

    <p class="definition"> Meanings:-
    1:  ${JSON_value_Data[0].meanings[0].definitions[0].definition} 
   
    
    
    </p>

    <p class="example"> Examples:-
    1:  ${JSON_value_Data[0].meanings[0].definitions[0].example} 
   
    </p>
    `;

    sound.setAttribute("src", `https:${JSON_value_Data[0].phonetic[0].audio}`);
    console.log(sound);
}
