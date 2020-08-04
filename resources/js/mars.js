import loadJson from "./loadingHelper.js"
import {apiKey} from "./constants.js"

let arrayImg = [];
let count = 0;

let getImage = document.querySelector('.get-image');
let error = document.querySelector('.error-status');
let buttons = document.querySelectorAll('.mars-image--button');
let marsImage = document.querySelector('.mars-image--img');

getImage.addEventListener('click', (event) => {
    let dateLocal = document.getElementById('date-screen').value;
    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dateLocal}&api_key=${apiKey}`;

    loadJson(url).then(data => {
        error.innerHTML = "";
        if (data['photos'].length === 0) {
            error.innerHTML = "На данную дату нет фотографий";
            return;
        }

        for (let item of data['photos']) {
            arrayImg.push(item['img_src']);
        }

        count = 0;
        marsImage.src = arrayImg[count];

        buttons[1].classList.remove('hidden');
    });
});

buttons.forEach((item, index, arrays) => {
    arrays[index].addEventListener('click', () => {
        if (item.textContent === "<") {
            count--;
        }
        else {
            count++;
        }
        
        if (arrayImg.length - 1 <= count) {
            buttons[1].classList.add('hidden');
        }
        else if (count <= 0) {
            buttons[0].classList.add('hidden');
        }
        else if (count > 0) {
            buttons[0].classList.remove('hidden');
        }

        marsImage.src = arrayImg[count];
    });
});