import {changeAlert, fillList, handleForm} from './ohters' 
const formIn = document.getElementById('form')
const searchBtn = document.getElementById('searchBtn')
const cityIn = document.getElementById('search_input_txt')
const dataList = document.getElementById('locationContainer')
const alert = document.getElementById('alert')
const key = process.env.API_KEY;

formIn.addEventListener('submit', handleForm);
searchBtn.addEventListener('click', function() {
    if(alert.textContent != "Powered by AICQN 😷" && cityIn.value != "") 
    {
        alert.classList.add("bounceOut")
            setTimeout(() => {
                alert.classList.remove("bounceOut")
                alert.textContent = "Powered by AICQN 😷"
            }, 500);
    }
    if(cityIn.value != "")
    {
    console.log('sended')
    const http = new XMLHttpRequest();
    const url = `https://api.waqi.info/feed/${cityIn.value}/?token=${key}`
    http.open('GET', url)
    http.send()
    http.onloadend = (e) => {
        const response = JSON.parse(http.responseText)
        fillList(response)
        }
    }
    else
    {
        changeAlert('missingValue')
    }
    cityIn.value = ""
})
    document.addEventListener('DOMContentLoaded', (e) => {
        console.log('loaded')
            if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(function(position){
            const http = new XMLHttpRequest();
            const url = `https://api.waqi.info/feed/geo:${position.coords.latitude};${position.coords.longitude}/?token=${key}`
            http.open('GET', url)
            http.send()
            http.onloadend = (e) => {
            const response = JSON.parse(http.responseText)
            fillList(response)
            }
        })
        else{
            console.log('Geolocation is not active!')
        }
        cityIn.value = ""
})


