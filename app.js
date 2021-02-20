
const plant = {}


plant.apiUrl = `https://trefle.io/api/v1/plants?page=1`; 
plant.apiKey = '8Wqyv65CkcZFWu8BYoOZfiYhnd9MmCLE3d6t-loWYd0';



plant.getImages = () =>{


     const url = new URL(`https://cors-anywhere.herokuapp.com/${plant.apiUrl}`);
     url.search = new URLSearchParams({
          token: plant.apiKey,
     });

     fetch(url)
     .then((response) => {
          return response.json();
     })
     .then((jsonResponse)=>{
          console.log(jsonResponse)
     });

};

plant.init = () =>{
     plant.getImages();

};

plant.init(); 
