class AstronomyPicture {
    constructor(title, explanation, imageUrl, copyrightString) {
        this.title = title;
        this.explanation = explanation;
        this.imageUrl = imageUrl;
        this.copyrightString = copyrightString;
    }

    toHtmlElement() {
        let pictureBlock = document.createElement('div');
        pictureBlock.className = 'astro-picture-block offset-by-four four columns';

        pictureBlock.innerHTML = `
            <img class="astro-picture-block__img" src=${this.imageUrl}>
            <h2 class="title">${this.title}</h2>
            <p class="astro-picture-block__explanation">${this.explanation}</p>
            <p class="astro-picture-block__copyright">${this.copyrightString}</p>
        `;


        return pictureBlock;
    }
}


let mainRow = document.querySelector('#main .row');
let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

loadAstronomyPicture();


async function loadAstronomyPicture() {
    let data = await loadJson(url);
    let picture = new AstronomyPicture(data.title, data.explanation, data.url, data.copyright);
    let pictureDiv = picture.toHtmlElement();
    mainRow.append(pictureDiv);
}
