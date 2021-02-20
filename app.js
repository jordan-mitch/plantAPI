const plant = {}
const proxy = 'http://proxy.hackeryou.com';
plant.apiUrl = 'https://trefle.io/api/v1/plants';
plant.apiKey = '8Wqyv65CkcZFWu8BYoOZfiYhnd9MmCLE3d6t-loWYd0';
// get image from api 


plant.getImages = () => {
    const url = new URL(proxy);
    url.search = new URLSearchParams({
        reqUrl: plant.apiUrl,
        'params[token]': plant.apiKey
    });
    fetch(url).then((response) => {
        return response.json()
    }).then((jsonResponse) => {
        console.log(jsonResponse)
     //plant.displayImages(jsonResponse);
    });
};


plant.displayImages = (apiData) =>{


}





plant.init = () => {
    plant.getImages();
};
plant.init();