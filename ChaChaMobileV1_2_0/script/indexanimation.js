//メニュー画面のスクリプト

const btn = document.querySelector('.btn-menu');
const nav = document.querySelector('#Slidemenu');

if(nav !=null){
btn.addEventListener('click', () => {
  nav.classList.toggle('open-menu');
  var check =  document.getElementsByClassName('open-recievemenu');
  var check1 = document.getElementsByClassName('open-sendmenu');
  if(check.length == 1){
      recievenav.classList.toggle('open-recievemenu');
    }
    if(check1.length == 1){
      sendnav.classList.toggle('open-sendmenu');
    }
});
}
//recieveメニュー画面のスクリプト
const recievebtn = document.querySelector('.recievebutton');
const recievenav = document.querySelector('#navrecieve');

if(recievenav !=null){
  recievebtn.addEventListener('click', () => {
    recievenav.classList.toggle('open-recievemenu');
    var check =  document.getElementsByClassName('open-menu');
    var check1 = document.getElementsByClassName('open-sendmenu');
    if(check.length == 1){
      nav.classList.toggle('open-menu');
    }
    if(check1.length == 1){
      sendnav.classList.toggle('open-sendmenu');
    }
  }); 
}

//sendメニュー画面のスクリプト
const sendbtn = document.querySelector('.sendbutton');
const sendnav = document.querySelector('#navsend');

if(sendnav !=null){
  sendbtn.addEventListener('click', () => {
    sendnav.classList.toggle('open-sendmenu');
    var check =  document.getElementsByClassName('open-menu');
    var check1 = document.getElementsByClassName('open-recievemenu');
    if(check.length == 1){
      nav.classList.toggle('open-menu');
    }
    if(check1.length == 1){
      recievenav.classList.toggle('open-recievemenu');
    }
  });
}