import { apiKey } from './constants.js';
import loadJson from './loadingHelper.js'

class AstronomyPicture {
    constructor(title, explanation, imageUrl, copyrightString) {
        this.title = title;
        this.explanation = explanation;
        this.imageUrl = imageUrl;
        this.copyrightString = copyrightString;
    }

    toHtml() {
        let pictureBlock = document.createElement('div');
        pictureBlock.className = 'astro-picture-block offset-by-four four columns';

        let image = document.createElement('img');
        image.className = 'astro-picture-block__img';
        image.src = this.imageUrl;
        pictureBlock.append(image);

        let title = document.createElement('h2');
        title.className = 'title';
        title.innerText = this.title;
        pictureBlock.append(title);

        let explanation = document.createElement('p');
        explanation.className = 'astro-picture-block__explanation';
        explanation.innerText = this.explanation;
        pictureBlock.append(explanation);

        let copyright = document.createElement('p');
        copyright.className = 'astro-picture-block__copyright';
        copyright.innerText = '' + this.copyrightString;
        pictureBlock.append(copyright);

        return pictureBlock;
    }
}


let mainRow = document.querySelector('#main .row');


let url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

loadJson(url)
    .then(data => {
        let picture = new AstronomyPicture(data.title, data.explanation, data.url, data.copyright);
        let pictureDiv = picture.toHtml();
        mainRow.append(pictureDiv);
    });
