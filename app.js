
const plant = {}
const proxy = 'http://proxy.hackeryou.com';
plant.apiUrl = 'https://trefle.io/api/v1/plants';
plant.apiKey = '8Wqyv65CkcZFWu8BYoOZfiYhnd9MmCLE3d6t-loWYd0';



plant.getPlantImages = () => {

     const randomNum = Math.floor((Math.random() * 1000) + 1);

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


plant.displayImage = (apiData) => {

     const apiPlantArray = apiData.data;

     let newArray = [];


     apiPlantArray.forEach((plantObjs => {

          // this filters out null images, null common names (needed for alt text) and images with broken links
          if (plantObjs.image_url && plantObjs.common_name !== null && plantObjs.image_url.includes('floristic') == false) {
               newArray.push(plantObjs)
          }
     }))

     let chosenPlantApi = newArray[Math.floor((Math.random() * newArray.length))];
     
     console.log(chosenPlantApi)
     console.log(newArray)

     if (chosenPlantApi == undefined) {
          // a message for the instructors in console lol, maybe itll make em laugh
          console.log('There are many images that return null, this was our best solution to only return images. After all the filtering, we are sometimes left with nothing, so we ask the user to choose again')
          document.getElementById("imageContainer").innerHTML += "<p>Please choose another plant</p>"
     }

     //appending the image
     const divElement = document.querySelector('#imageContainer');
     const image = document.createElement('img');
     image.src = chosenPlantApi.image_url

     // this ensures that our image loads before the alt text, no jumpy text === good!
     setTimeout(function(){
          image.alt = chosenPlantApi.common_name
     }, 1000);
     divElement.appendChild(image)

     //appending the title/description
     const ulElement = document.querySelector('.plantDescription');
     const liElement = document.createElement('li')

     const scientificName = document.createTextNode(`Scientific Name: ${chosenPlantApi.common_name}`);
     const familyCommonName = document.createTextNode(`Common Family Name: ${chosenPlantApi.family_common_name}`);

     // *****************************************************************************************
     // I believe these should be appending so that they are literal LI elements not UL elements, so we probably want to use innerHTML here in order to do that, for now I've commented them out because they're throwing off the CSS fung shui lol

     // ulElement.appendChild(scientificName);
     // ulElement.appendChild(familyCommonName);


};



plant.init = () => {
     plant.getPlantImages();

};

plant.init(); 
