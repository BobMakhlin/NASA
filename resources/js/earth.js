const apiKey = 'CmciffTNeySKbWBxhbrffMhCfkWa8XneyvzIAsMK';

let getImage = document.querySelector('.get-image');
let error = document.querySelector('.error-status');
getImage.addEventListener('click', (event) => {
    let lat = document.getElementById('lat').value;
    let lon = document.getElementById('lon').value;
    let dim = document.getElementById('dim').value;
    let dateScreen = document.getElementById('date-screen').value;

    if (lat.length === 0 || lon.length === 0) {
        error.innerHTML = "Поля с широтой и долготой должны быть заполнены";
        return;
    }
    else {
        error.innerHTML = '';
    }

    let url = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}`;
    if (dim.length !== 0) {
        url += `&dim=${dim}`;
    }
    if (dateScreen.length !== 0) {
        url += `&date=${dateScreen}`;
    }
    url += `&api_key=${apiKey}`;

    let earthImage = document.querySelector('.earth-image');
    let img = earthImage.firstChild;
    img.src = url;

    earthImage.append(img);
});