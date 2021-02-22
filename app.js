
const plant = {}
const proxy = 'http://proxy.hackeryou.com';
plant.apiUrl = 'https://trefle.io/api/v1/plants';
plant.apiKey = '8Wqyv65CkcZFWu8BYoOZfiYhnd9MmCLE3d6t-loWYd0';



plant.getPlantImages = () => {

     const randomNum = Math.floor((Math.random() * 1000) + 1);
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
     // console.log(jsonResponse)
     plant.displayImage(jsonResponse);

    });
};


plant.displayImage = (apiData) =>{

     const apiPlantArray = apiData.data; 
     console.log(apiPlantArray)
     let newArray = [];


     apiPlantArray.forEach((plantObjs =>{
          if(plantObjs.image_url && plantObjs.common_name !== null && plantObjs.image_url.includes('cloudfront')){
               newArray.push(plantObjs)
          }
     }))
     
     let chosenPlantApi = newArray[Math.floor((Math.random() * newArray.length ))];
     console.log(chosenPlantApi)

     //appending the image
     const divElement = document.querySelector('#imageContainer');
     const image = document.createElement('img');
     image.src = chosenPlantApi.image_url
     image.alt = chosenPlantApi.scientific_name; 
     divElement.appendChild(image)

     //appending the title/description
     const ulElement = document.querySelector('.plantDescription');
     const liElement=document.createElement('li')

     const scientificName = document.createTextNode(`Scientific Name: ${chosenPlantApi.scientific_name}`);
     const familyCommonName = document.createTextNode(`Common Family Name: ${chosenPlantApi.family_common_name}`);

     // liElement.appendChild(scientificName);
     // liElement.appendChild(familyCommonName)


     ulElement.appendChild(scientificName);
     ulElement.appendChild(familyCommonName);




     

};

// plant API - scientific_name, family_common_name, year, author , bibliography 


// species API - common_name, , family_common_name, year, author , bibliography, scientific_name 




// plant.displayData = (apiData) => {

//     const apiPlantArray = apiData.data;

//     let newArray = [];

//     apiPlantArray.forEach((plantObjs) => {
//         if (plantObjs.image_url && plantObjs.common_name !== null) { 
//             newArray.push(plantObjs)
//         }
//     })

//     console.log(newArray)

//     let randomPlant = newArray[Math.floor((Math.random() * newArray.length))];
//     const divElement = document.querySelector('#imageContainer');
//     const image = document.createElement('img');

//     image.src = randomPlant.image_url
//     image.alt = randomPlant.common_name

//     divElement.appendChild(image)


//     console.log('Image: ', image.src)
//     console.log('Name: ', image.alt)


// }



plant.init = () => {
     plant.getPlantImages();

};

plant.init(); 
