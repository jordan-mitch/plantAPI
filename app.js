const plant = {}


plant.apiUrl = 'https://trefle.io/api/v1/plants'; 
plant.apiKey = '8Wqyv65CkcZFWu8BYoOZfiYhnd9MmCLE3d6t-loWYd0';

// get image from api 

plant.getImages = () =>{

     const url = new URL(plant.apiUrl);
     url.search = new URLSearchParams({
          token: plant.apiKey,
     });

     fetch(url).then((response) => {
          return response.json()
     }).then((jsonResponse)=>{
          console.log(jsonResponse)
     });


};









plant.init = () =>{
     plant.getImages();

};

plant.init(); 