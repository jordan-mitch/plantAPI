
const plant = {}
const proxy = 'http://proxy.hackeryou.com';
plant.apiUrl = 'https://trefle.io/api/v1/plants';
plant.apiKey = '8Wqyv65CkcZFWu8BYoOZfiYhnd9MmCLE3d6t-loWYd0';



plant.getPlantImages = () => {

     const randomNum = Math.floor((Math.random() * 10000) + 1);
    console.log('fsafs')
     const url = new URL(proxy);
    url.search = new URLSearchParams({
        reqUrl: plant.apiUrl,
        'params[token]': plant.apiKey,
        'params[page]': randomNum // <------ check that out. I dont think its the "right" way to do this but its working!
    });

    fetch(url).then((response) => {
        return response.json()

     }).then((jsonResponse) => {
     console.log(jsonResponse)
     plant.displayImage(jsonResponse);

    });
};


plant.displayImage = (apiData) =>{

     const apiImages = apiData.data; 
     let randomImage = apiImages[Math.floor((Math.random() * apiImages.length ))];
     console.log(randomImage)
     const divElement = document.querySelector('#imageContainer');
     const image = document.createElement('img');

     image.src = randomImage.image_url
     image.alt = randomImage.scientific_name; 

     

     divElement.appendChild(image)
};

// plant API - scientific_name, family_common_name, year, author , bibliography 


// species API - common_name, , family_common_name, year, author , bibliography, scientific_name 



plant.init = () => {
     plant.getPlantImages();

};
plant.init();
