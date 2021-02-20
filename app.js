const plant = {}
const proxy = 'http://proxy.hackeryou.com';
plant.apiUrl = 'https://trefle.io/api/v1/plants';
plant.apiKey = '8Wqyv65CkcZFWu8BYoOZfiYhnd9MmCLE3d6t-loWYd0';

// get image from api 

plant.getImages = () => {

     const randomNum = Math.floor((Math.random() * 18879) + 1);
    const url = new URL(proxy);
    url.search = new URLSearchParams({
        reqUrl: plant.apiUrl,
        'params[token]': plant.apiKey,
        'params[page]': randomNum
    });

    fetch(url).then((response) => {
        return response.json()
    }).then((jsonResponse) => {
     //    console.log(jsonResponse)
     plant.displayImage(jsonResponse);
    });
};


plant.displayImage = (apiData) =>{
     
     const apiImages = apiData.data; 
     let randomImage = apiImages[Math.floor((Math.random() * apiImages.length ))];
     
     const divElement = document.querySelector('#imageContainer');
     const image = document.createElement('img');

     image.src = randomImage.image_url
     image.alt = randomImage.scientific_name; 

     divElement.appendChild(image)
}




plant.init = () => {
     plant.getImages();

};
plant.init();