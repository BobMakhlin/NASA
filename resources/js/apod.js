class AstronomyPicture {
    constructor(title, explanation, resourceType, resourceUrl, copyrightString) {
        this.title = title;
        this.explanation = explanation;
        this.resourceType = resourceType;
        this.resourceUrl = resourceUrl;
        this.copyrightString = copyrightString;
    }

    toHtmlElement() {
        let pictureBlock = document.createElement('div');
        pictureBlock.className = 'astro-picture-block offset-by-four four columns';

        switch (this.resourceType) {
            case 'photo':
                pictureBlock.innerHTML = `<img class="astro-picture-block__resource" src=${this.resourceUrl}>`;
                break;
            case 'video':
                pictureBlock.innerHTML = `
                    <iframe class="astro-picture-block__resource" src=${this.resourceUrl} allowfullscreen>
                    </iframe>
                `;
                break;
        }

        pictureBlock.innerHTML += `
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
    console.log(data)
    let picture = new AstronomyPicture(data.title, data.explanation, data.media_type, data.url, data.copyright);
    let pictureDiv = picture.toHtmlElement();
    mainRow.append(pictureDiv);
}
