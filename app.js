
const plant = {}
const proxy = 'http://proxy.hackeryou.com';
plant.apiUrl = `https://trefle.io/api/v1/`;
plant.apiKey = '8Wqyv65CkcZFWu8BYoOZfiYhnd9MmCLE3d6t-loWYd0';



plant.getPlantData = () => {
     // choose a random page number
     const randomNum = Math.floor((Math.random() * 5000) + 1);

     const url = new URL(proxy);
     url.search = new URLSearchParams({
          reqUrl: plant.apiUrl + 'plants',
          'params[token]': plant.apiKey,
          'params[page]': randomNum 
     });

     fetch(url).then((response) => {
          return response.json()

     }).then((jsonResponse) => {
          document.querySelector('#imageContainer').innerHTML=''; 
          document.querySelector('.plantDescription').innerHTML='';
          plant.displayPlantData(jsonResponse);

     });
};

plant.getSpeciesData = () => {

     // choose a random page number
     const randomNum = Math.floor((Math.random() * 10000) + 1);

     const url = new URL(proxy);
     url.search = new URLSearchParams({
          reqUrl: plant.apiUrl + 'species',
          'params[token]': plant.apiKey,
          'params[page]': randomNum,
     });

     fetch(url).then((response) => {
          return response.json()

     }).then((jsonResponse) => {
          document.querySelector('#speciesImageContainer').innerHTML=''; 
          document.querySelector('#speciesDescription').innerHTML='';
          
          plant.displaySpeciesData(jsonResponse);
     });
};

plant.displayPlantData = (apiData) => {

     const apiPlantArray = apiData.data;

     let newArray = [];

     apiPlantArray.forEach((plantObjs => {
          // this filters out null images, null common names (needed for alt text) and images with broken links
          if (plantObjs.image_url && plantObjs.common_name !== null && plantObjs.image_url.includes('floristic') == false) {
               newArray.push(plantObjs)
          }else{
               console.log('try again')
          }
     }))

     let chosenPlantApi = newArray[Math.floor((Math.random() * newArray.length))];

     if (chosenPlantApi == undefined) {
          plant.getPlantData();
     }

     //appending the image
     const divElement = document.querySelector('#imageContainer');
     const image = document.createElement('img');
     image.src = chosenPlantApi.image_url;

     // this ensures that our image loads before the alt text
     setTimeout(function(){
          image.alt = chosenPlantApi.common_name
     }, 1000);
     divElement.appendChild(image);

     //appending the title/description
     const ulElement = document.querySelector('#plantDescription');

     // elements to go into the UL as LI items
     const commonName = chosenPlantApi.common_name;
     const familyCommonName = chosenPlantApi.family_common_name;
     const scientificName = chosenPlantApi.scientific_name; 
     const author = chosenPlantApi.author;
     const bibliography = chosenPlantApi.bibliography; 
     const year = chosenPlantApi.year

     // create an array to loop over in order to append data related ot the image to screen
     let plantListData = [
          `<span class="title">Common Name:</span> ${commonName}`, 
          `<span class="title">Family Name:</span> ${familyCommonName}`,
          `<span class="title">Scientific Name:</span> ${scientificName}`,
          `<span class="title">Author of Discovery:</span> ${author}`,
          `<span class="title">Bibliography: </span>${bibliography}`,
          `<span class="title">Year of Discovery: </span>${year}`
     ]

     // the loop that goes over the above array, creates li items
     plantListData.forEach((plantDescription)=>{
          const liElement = document.createElement('li')
          ulElement.appendChild(liElement);
          liElement.innerHTML += plantDescription;
     });
};

plant.displaySpeciesData = (apiData) => {

     const apiSpeciesArray = apiData.data;

     let newArray = [];
    
     apiSpeciesArray.forEach((plantObjs => {
          // this filters out null images, null common names (needed for alt text) and images with broken links
          if (plantObjs.image_url && plantObjs.common_name !== null && plantObjs.image_url.includes('floristic') == false) {
               newArray.push(plantObjs)
          }
     }))


     let chosenPlantApi = newArray[Math.floor((Math.random() * newArray.length))];

     if (chosenPlantApi == undefined) {
          plant.getSpeciesData();
     }

     //appending the image
     const divElement = document.querySelector('#speciesImageContainer');
     const image = document.createElement('img');
     image.src = chosenPlantApi.image_url;

     // this ensures that our image loads before the alt text
     setTimeout(function(){
          image.alt = chosenPlantApi.common_name
     }, 1000);
     divElement.appendChild(image);

     //appending the title/description
     const ulElement = document.querySelector('#speciesDescription');

     // elements to go into the UL as LI items
     const commonName = chosenPlantApi.common_name;
     const familyCommonName = chosenPlantApi.family_common_name;
     const scientificName = chosenPlantApi.scientific_name; 
     const author = chosenPlantApi.author;
     const bibliography = chosenPlantApi.bibliography; 
     const year = chosenPlantApi.year

     // create an array to loop over in order to append data related ot the image to screen
     let plantListData = [
          `<span class="title">Common Name:</span> ${commonName}`, 
          `<span class="title">Family Name:</span> ${familyCommonName}`,
          `<span class="title">Scientific Name:</span> ${scientificName}`,
          `<span class="title">Author of Discovery:</span> ${author}`,
          `<span class="title">Bibliography: </span>${bibliography}`,
          `<span class="title">Year of Discovery: </span>${year}`
     ]

     // the loop that goes over the above array, creates li items
     plantListData.forEach((plantDescription)=>{
          const liElement = document.createElement('li')
          ulElement.appendChild(liElement);
          liElement.innerHTML += plantDescription;
     });
};


plant.listener = () =>{
     document.querySelector('#plantRandomizer').addEventListener('click', function(){
          plant.getPlantData();
     });

     document.querySelector('#speciesRandomizer').addEventListener('click', function(){
          plant.getSpeciesData();
     });
};




plant.init = () => {
     plant.getPlantData();
     plant.getSpeciesData();
     plant.listener();

};

plant.init(); 

