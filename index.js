function adjacentElementsProduct(inputArray) {
    if (inputArray.length < 2) return 0;
    let max = inputArray[0] * inputArray[1];
    for (let i = 0; i < inputArray.length - 1; i++){
        if (max < inputArray[i] * inputArray[i+1]) max = inputArray[i] * inputArray[i+1];
    }
    return max;
}

function alternatingSums(a) {
    let res = [0, 0];
    for (let i = 0; i < a.length; i++){
        if (i % 2 == 0) res[0] += a[i]; else res[1] += a[i];
    }    
    return res;
}

async function shorten(URL){
    let request = "https://api.shrtco.de/v2/shorten?url=" + URL;
    let response = await fetch(request);
    let data = response.json();

    console.log(data);
    return data;
}

const input = document.getElementById("URL");
const button = document.getElementById("btn");
const btnArray = document.getElementsByClassName("btn");
const result = document.getElementById("result");
var source = "shrtco.de";

document.getElementById('options')
    .addEventListener('click', event => { 
        if (event.target.className === 'btn') {
            for (let i of btnArray){
                i.style.background = "rgb(16, 21, 31)";
            }
            console.log(event.target.innerText);
            source = event.target.innerText;
            event.target.style.background = "cornflowerblue";
        }
});

button.onclick = async () => {
    let URL = input.value;
    button.innerText = "";
    button.style.backgroundImage = `url("https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif")`;
    let data = await shorten(URL);
    button.style.backgroundImage = ``;
    button.innerText = "Shorten!";
    if (data["ok"]){
        let shortened = source + '/' + data["result"]["code"];
        let temp = `
            <p> Shortened Link: <a href="${"https://" + shortened}"> ${shortened} </a></p>
        `
        result.innerHTML = temp;
    } else {
        let temp = `
            <p> Invalid Link! </p>
        `
        result.innerHTML = temp;
    }
}