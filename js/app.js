function handleResponse(data) {
    const wind = data.currently.windGust;
    const humidity = data.currently.humidity;
    const uvIndex = data.currently.uvIndex;
    const pressure = data.currently.pressure; 
    const arrayDays = data.daily.data;
    console.log(arrayDays);        
    /*se llama la función paintData*/    
    paintData(wind, humidity, uvIndex, pressure);
    weekClime(arrayDays);
}

/*geolocalización
$.ajax ({
    url: `https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDKth8Ka7mbqoelHGaXopExD8ejWQRhVpY`
})

function showError() {
    alert("Location can't be found");
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition( );
}
else {
    alert("El navegador no soporta Geolocalización.");
}
*/


$.ajax({
    url: `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ff278826892135a44890261f4d5298ee/19.424363,-99.163015`
}).done(handleResponse);

function paintData(wind, humidity, uvIndex, pressure) {
   /*se crean los elementos del html y se guradan dentro de un let*/
    let template = `<div id="day-weather" class="card col s12 m12 l12 center teal lighten-2">
        <p>Wind: <span>${wind}</span> </p>
        <p>Humidity: <span>${humidity}</span> </p>
        <span>UV Index: <span>${uvIndex}</span> </p>
        <p>Pressure: <span>${pressure}</span> </p>
    </div>`
     /*se llama al elemento que contendrá el template por medio de su ID y se le asignan los elementos
    del template*/   
    document.getElementById("container-day").innerHTML = template;
}


function weekClime(arrayDays) {
    let templateWeek = " ";
    /*console.log(arrayDays);*/  
    arrayDays.forEach(element => {
    templateWeek += templateDay(element)
    });  
    document.getElementById("container-week").innerHTML = templateWeek;

}

function templateDay(params) {
    /*se hace un template y se hace una interpolación para llamar a la función days y asignarle el parámetro 
    time, así calcula el día, después se ponen los datos de temp max y min*/
    let template = ` <div id="day-weather" class="col s12 m12 l12 teal lighten-2">
        <p> ${days(params.time)}<span>${params.apparentTemperatureMin}° ${params.apparentTemperatureMax}°</span></p>
    </div>`
    /*console.log(params.apparentTemperatureMin);*/    
    return template;
}

/* función convierte el time en el día que es*/
function days(unixNumber) {
    return new Date(unixNumber * 1000).toLocaleString('es-MX', { weekday: 'long' });
} 


