const pictureDateInput = document.getElementById('picture-date');
const confirmButton = document.querySelector('.confirm-button');
const sliderContent = document.querySelector('.slider__content');
const errorParagraph = document.querySelector('.error');

const photosInfoUrl = 'https://epic.gsfc.nasa.gov/api/natural/date';
const photosUrl = 'https://epic.gsfc.nasa.gov/archive/natural';


confirmButton.addEventListener('click', async () => {
    try {
        let dateString = pictureDateInput.value;
        let date = new Date(dateString);

        errorParagraph.innerText = '';

        let photosInfo = await getEarthPhotosInfo(date);
        let photosUrls = await getEarthPhotosUrls(date, photosInfo);
        showEarthPhotos(photosUrls);
    }
    catch (err) {
        if (err instanceof NotFoundError) {
            errorParagraph.innerText = err.message;
            errorParagraph.style.display = 'block';
        }
        else {
            throw err;
        }
    }
});

async function getEarthPhotosInfo(date) {
    let dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let [{ value: month }, , { value: day }, , { value: year }] = dateFormat.formatToParts(date);

    let targetUrl = `${photosInfoUrl}/${year}-${month}-${day}`;

    let photosInfo = await loadJson(targetUrl);

    if (photosInfo.length == 0) {
        throw new NotFoundError(`Can't find the images by the given date`)
    }

    return photosInfo;
}
async function getEarthPhotosUrls(date, photosInfo) {
    let dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
    let [{ value: month }, , { value: day }, , { value: year }] = dateFormat.formatToParts(date);

    let urls = [];

    for (let info of photosInfo) {
        let url = `${photosUrl}/${year}/${month}/${day}/png/${info.image}.png`;
        urls.push(url);
    }

    return urls;
}
function showEarthPhotos(urls) {
    sliderContent.innerHTML = '';

    for (let i = 0; i < urls.length; i++) {
        let sliderPictureItem = document.createElement('img');
        sliderPictureItem.src = urls[i];
        sliderPictureItem.classList.add('slider__item');

        if (i == 0) {
            sliderPictureItem.classList.add('slider__item_active');
        }

        sliderContent.append(sliderPictureItem);
    }
}
