
const plant = {}
const proxy = 'http://proxy.hackeryou.com';
plant.apiUrl = 'https://trefle.io/api/v1/plants';
plant.apiKey = '8Wqyv65CkcZFWu8BYoOZfiYhnd9MmCLE3d6t-loWYd0';



plant.getImages = () => {

     const randomNum = Math.floor((Math.random() * 18879) + 1);
    
     const url = new URL(proxy);
    url.search = new URLSearchParams({
        reqUrl: plant.apiUrl,
        'params[token]': plant.apiKey,
        'params[page]': randomNum // <------ check that out. I dont think its the "right" way to do this but its working!
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

// for the display image function, i decided to display one photo at a time but we can fix that if we change our minds. Unfortunately, not every single plant comes with an image_url so we might need to change some of our ideas? but i am able to display the image onto the screen. 



plant.init = () => {
     plant.getImages();

};
plant.init();
