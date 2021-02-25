const dataList = document.getElementById('locationContainer')
const alert = document.getElementById('alert')



export function handleForm(event) { event.preventDefault(); } //avoiding page refreshing when form submitted 

export function changeAlert(state) //function that changes the little text under the searchbar
{
    switch(state){
        case "missingCity":{
            alert.classList.add("bounceOut")
            setTimeout(() => { //timeout for graphical purpuose 
                alert.classList.remove("bounceOut")
                alert.textContent = "Sorry, this location does not yet have a station! try with a major city close to it, be sure to insert the right name!"
            }, 400);
            break;
        } 
        case "missingValue":{
            alert.classList.add("bounceOut")
            setTimeout(() => {
                alert.classList.remove("bounceOut")
                alert.textContent = "Be sure to insert a city!"
            }, 400);
            break
        }
    }
}
export function fillList(responseObj)
{
    if(responseObj.status != 'error') //avoiding filling the list with an "error" response 
    {
    dataList.innerHTML = `
    <li class="informationPollution">
       <img class="infoIMG"src="img/pollution.png" alt="fabrique image">
        <span class="infoTxt">  Current station:<strong> ${responseObj.data.city.name}</strong><br>AQI levels and next days forecasted data:</span>
    </li>
    <li class = "informationPollution">
    <p><span class="infoTxt"> AQI air levels : <span id="aqiLevels">${responseObj.data.aqi}</span></span><p>
    </li>
    <li class="informationPollution">
    <p><span class="pollutionLogo"><i class="fa fa-smog"></i></span><span class="infoTxt"> : ${responseObj.data.forecast.daily.pm25[0].day}(Yesterday) </strong>, PM 2.5: <strong>${responseObj.data.forecast.daily.pm25[0].avg}, </strong> </strong> PM 10: <strong>${responseObj.data.forecast.daily.pm10[0].avg}, </strong>O3: <strong>${responseObj.data.forecast.daily.o3[0].avg} </strong></span></p> 
    </li>
    <li class="informationPollution">
    <p><span class="pollutionLogo"><i class="fa fa-smog"></i></span><span class="infoTxt"> : ${responseObj.data.forecast.daily.pm25[1].day}(Today) </strong>, PM 2.5: <strong>${responseObj.data.forecast.daily.pm25[1].avg}, PM 10: <strong>${responseObj.data.forecast.daily.pm10[1].avg}, </strong>O3: <strong>${responseObj.data.forecast.daily.o3[1].avg} </strong></span></strong></span></p> 
    </li>
    <li class="informationPollution">
    <p><span class="pollutionLogo"><i class="fa fa-smog"></i></span><span class="infoTxt"> : ${responseObj.data.forecast.daily.pm25[2].day}(Tomorrow) </strong>, PM 2.5: <strong>${responseObj.data.forecast.daily.pm25[2].avg}, PM 10: <strong>${responseObj.data.forecast.daily.pm10[2].avg}, </strong>O3: <strong>${responseObj.data.forecast.daily.o3[2].avg} </strong></span></strong></span></p> 
    </li>
    <li class="informationPollution">
    <p><span class="pollutionLogo"><i class="fa fa-smog"></i></span><span class="infoTxt"> : ${responseObj.data.forecast.daily.pm25[3].day} </strong>, PM 2.5: <strong>${responseObj.data.forecast.daily.pm25[3].avg}, PM 10: <strong>${responseObj.data.forecast.daily.pm10[3].avg}, </strong>O3: <strong>${responseObj.data.forecast.daily.o3[3].avg} </strong></span></strong></span></p> 
    </li>
    <li class="informationPollution">
    <p><span class="pollutionLogo"><i class="fa fa-smog"></i></span><span class="infoTxt"> : ${responseObj.data.forecast.daily.pm25[4].day} </strong>, PM 2.5: <strong>${responseObj.data.forecast.daily.pm25[4].avg}, PM 10: <strong>${responseObj.data.forecast.daily.pm10[4].avg}, </strong>O3: <strong>${responseObj.data.forecast.daily.o3[4].avg} </strong></span></strong></span></p> 
    </li>
    `;
    aqiControl(); //this function controls the AQI levels and gives information based on those levels 
    }
    else
    {
        changeAlert('missingCity')
    }
 }

 function aqiControl(){
     const aqiLevels = document.getElementById('aqiLevels').textContent
        //here a chosed to do many else if, i tried with the switch, it was looking cleaner but it wasnt working quite well
        if(aqiLevels < 50){
            const healthLi = document.createElement('li');
            healthLi.classList.add('informationPollution')
            healthLi.innerHTML = `<p><span class="infoTxt">Air-health situation: This area is secure and safe!</span><p>`
            dataList.appendChild(healthLi)
           
        }
        else if (aqiLevels > 50 && aqiLevels < 101){
            const healthLi = document.createElement('li');
            healthLi.classList.add('informationPollution')
            healthLi.innerHTML = ` <p><span class="infoTxt">Air-health situation: This area is moderately polluted, sensitive individuals should consider limiting outdoor activities!</span><p>`
            dataList.appendChild(healthLi)
          
        }
        else if (aqiLevels > 101 && aqiLevels < 150){
            const healthLi = document.createElement('li');
            healthLi.classList.add('informationPollution')
            healthLi.innerHTML = ` <p><span class="infoTxt">Air-health situation: This area is risky and unhealty for sensitive individuals!</span><p>`
            healthLi.classList.add('riskyArea')
            dataList.appendChild(healthLi)
          
        }
        else if (aqiLevels > 151 && aqiLevels < 200){
            const healthLi = document.createElement('li');
            healthLi.classList.add('informationPollution')
            healthLi.innerHTML = `<p><span class="infoTxt">Air-health situation: This area is unhealty and risky for sensitive individuals, everyone else should limit outdoor activites!</span><p>`
            dataList.appendChild(healthLi)
            
        }
        else if (aqiLevels > 201 && aqiLevels < 300){
            const healthLi = document.createElement('li');
            healthLi.classList.add('informationPollution')
            healthLi.innerHTML = `<p><span class="infoTxt">Air-health situation: This are is very unhealty and risky for sensitive individuals, everyone else should try to avoid outdoor activites!</span><p>`
            dataList.appendChild(healthLi)
            
        }
        else if (aqiLevels > 301 && aqiLevels < 500){
            const healthLi = document.createElement('li');
            healthLi.classList.add('informationPollution')
            healthLi.innerHTML = `<p><span class="infoTxt">Air-health situation: This area is Hazardeous everyone should avoid outdoor physical activity!</span><p>`
            dataList.appendChild(healthLi)    
        }
     
 }