
const textHolder = document.getElementById('textHolder')
function saymsg(){
    let randoman = Math.floor(Math.random()*outputtxt.length);
    textHolder.innerText=outputtxt[randoman]}


    const outputtxt = ['send','DONT MAKE WAIT.','FAST YOUUU NERD','I WILL SEND YOUR PICS IN THE INTERNET!!!!!!','!#!@KJ#H!HG@#','I WANT TO STUDY','NO TIME','GIVEME THE NOTES FAST']


let intervals;

intervals = setInterval(saymsg,1050)