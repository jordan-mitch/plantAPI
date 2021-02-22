
const plant = {}

const proxy = 'http://proxy.hackeryou.com';
plant.apiUrl = 'https://trefle.io/api/v1/species';
plant.apiKey = '8Wqyv65CkcZFWu8BYoOZfiYhnd9MmCLE3d6t-loWYd0';


plant.getData = () => {

    const randomNum = Math.floor((Math.random() * 1333) + 1);
    const url = new URL(proxy);
    url.search = new URLSearchParams({
        reqUrl: plant.apiUrl,
        'params[token]': plant.apiKey,
        'params[page]': randomNum,
    });

    fetch(url).then((response) => {

        return response.json()
    }).then((jsonResponse) => {

        plant.displayData(jsonResponse);
    });
};


plant.displayData = (apiData) => {

    const apiPlantArray = apiData.data;

    let newArray = [];

    apiPlantArray.forEach((plantObjs) => {
        if (plantObjs.image_url && plantObjs.common_name !== null) { 
            newArray.push(plantObjs)
        }
    })

    console.log(newArray)

    let randomPlant = newArray[Math.floor((Math.random() * newArray.length))];
    const divElement = document.querySelector('#imageContainer');
    const image = document.createElement('img');

    image.src = randomPlant.image_url
    image.alt = randomPlant.common_name

    divElement.appendChild(image)


    console.log('Image: ', image.src)
    console.log('Name: ', image.alt)


}



plant.init = () => {
    plant.getData();

};
plant.init();
