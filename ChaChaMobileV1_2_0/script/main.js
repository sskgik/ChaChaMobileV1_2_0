//入力内容のクリア
function clearinput(){
  document.scanresult.Destinationpubkey.value = "";
  document.scanresult.Amount.value = "";
}

/*sendpageのQRスキャナファンクション*/
function scanBarcode2() {
  cordova.plugins.barcodeScanner.scan(
      function (result) {
          if(result.text == ""){
            return;
          }
          var b =confirm("Get Destination Publickey!\n" + "\n" + result.text + "\n" );
                if(b==true){
                  document.scanresult.Destinationpubkey.value = result.text;
                  var sendnav = document.querySelector('#navsend');
                  var check1 = document.getElementsByClassName('open-sendmenu');
                  if(check1.length == 0){
                    sendnav.classList.toggle('open-sendmenu');
                  }
                  var check2 =  document.getElementsByClassName('open-menu');
                  var check3 = document.getElementsByClassName('open-recievemenu');
                  if(check2.length == 1){
                    nav.classList.toggle('open-menu');
                  }
                  if(check3.length == 1){
                    recievenav.classList.toggle('open-recievemenu');
                  }
                }
                else{
                 return; 
                }
        },
        function (error) {
          alert("Scanning failed: " + error);
        },
    {
      preferFrontCamera : true, // iOS and Android
      showFlipCameraButton : true, // iOS and Android
      showTorchButton : true, // iOS and Android
      torchOn: true, // Android, launch with the torch switched on (if available)
      saveHistory: true, // Android, save scan history (default false)
      prompt : "Place a barcode inside the scan area", // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
      orientation : "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations : true, // iOS
      disableSuccessBeep: false // iOS and Android
    }

  );
}

//QR拡大表示
function lergeQR(){
  var show = document.getElementById('publickey')
  show.innerHTML = localStorage.getItem('publickey')
  var el = document.getElementById('lergeqr');
  var options = {
    text: localStorage.getItem('publickey'),
    width: 270,
    height: 270,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
};
new QRCode(el, options);
}
//about ChaCha
function chachacoin(){
  alert("About\tChaChaMobileVer1.2\n" + "\n"
        + "Technology:\nMiyabi BrockChain(by Bitflyer)\n\n"
        + "Frontend Program Language:\nHTML,CSS,javascript(jquery)\n\n"
        + "Backend Program Language:\nc#(ASP.NETCORE),HTML,CSS,\njavascript(jquery)\n\n"
        + "Developper:\n@yanchal_crypto(Twitter)\n\n"
        + "ConsensusAlgorithm  :BFK2\n\n"
        + "Processing performance:\n4000 case/Sec\n\n"
        + "About ChaChaCoin\n\n"
        + "Infomal Hinatazaka Token");
}

//Contactdevelopper
function contact(){
  var cont = confirm("公式に質問を行いますか？\n\n" + "質問する場合はOKを押してください!\n（twitterにアクセスします）");
  if(cont == true){
    //ios用android用
    window.location.href = 'https://twitter.com/ChaChaWalletJP';
  }
  else{
    return;
  }
} 
//access blogpage
function manual(){
  var responce = confirm("ユーザーマニュアルに移動しますか？\n\n" + "移動する場合はOKを押してください!\n（blogにアクセスします）");
  if(responce == true){
    //IOS用 android用
    window.location.href = 'https://chal-convenience-info.net/chachamobile/';
  }
  else{
    return;
  }
}


//コインの送金情報に関して
function send(){
  var button = document.getElementById('sendbutton');
  var footer = document.getElementById('footermenu');
  button.disabled = true;
  hidefooter()
  var myprivatekey = localStorage.getItem('privatekey');
  var destinationpubkey = deistination.value;
  var coinamount = amount.value;
  if(destinationpubkey == "" || coinamount == ""){
    alert("空白のテキストボックス があります！\n入力してください！");
    button.disabled = false;
    showfooter();
    return;
  }
  var Transactioninfo={
    TableName: "ChaChaCoin",
    my_privatekey:myprivatekey,
    opponet_pubkey:destinationpubkey,
    send_amount:coinamount
  }
   // karisyuusei
   //localstarage値なしの時
   if (localStorage.getItem("balance") =="" || localStorage.getItem("balance") ==null) {
        alert("localstrageに残高を取得してください" + "\n\n送金していません！");
        button.disabled = false;
        showfooter();
        return;
    }
    //ウォレット残高より多い場合
    if (Number(localStorage.getItem("balance")) < Number(coinamount)) {
        alert("Result:NegativeBalance" + "\n\n送金していません！");
        button.disabled = false;
        showfooter();
        return;
    }
    
    if (localStorage.getItem("publickey") == destinationpubkey) {
        alert("Result:ConservationBreak" + "\n\n送金していません！");
        button.disabled = false;
        showfooter();
        return;
    }
    //kokomadekari

  var confirm1 = confirm("送金情報\n\n送金先:\n\n"+destinationpubkey+"\n\n送金枚数:"+coinamount);
  if(confirm1==false){
    alert("送金せず終了します！");
    button.disabled = false;
    showfooter();
    return;
  }
  
  $.ajax({
    type:"post",                     //method = "post"
    url:"https://chachacoin.net/api/miyabi/send",             // POST送信先のURL
    data:JSON.stringify(Transactioninfo),   // JSONデータ本体
    contentType: 'application/json', // リクエストの Content-Type
    dataType: "json",                // レスポンスをJSONとしてパースする
    timespan: 10000,                  // 通信のタイムアウト(10秒)
  }).done(function(Result){//Result;レスポンスのJSON,textStatus通信結果のステータス リクエスト成功時
    var code1 = Result.code;
    switch(code1){
      case 1:
      alert("プライベートキーが適正な値ではありません！");
      button.disabled = false;
      showfooter();
      break;
      case 2:
      alert("自分のプライベートキーから変換に失敗しました！\n開発者にお問い合わせください！");
      button.disabled = false;
      showfooter();
      break;
      case 3:
      alert("入力された送信者のパブリックキーが不適当です！\n入力値を再入力してください！");
      button.disabled = false;
      showfooter();
      break;
      case 4:
      alert("数字でない文字が入力されています！\n数字を入力してください！");
      button.disabled = false;
      showfooter();
      break;
      case 5:
      if(Result.result == "Success"||Result.result == "success"){
      alert("送信に成功しました！\n\ntransactionID:\n"+ Result.transactionId + "\n\nSend_Result:\n"+Result.result);
      button.disabled = false;
      showfooter();
      hystorylog(coinamount,destinationpubkey);//ローカルストレージに送金履歴を保存
      }
      else{
        alert(Result.result + "\n\n送金していません！");
        button.disabled = false;
        showfooter();
      }   
    };
    //HTTPレスポンスが失敗で帰ってきた場合
  }).fail(function(jqXHR,textStatus, errorThrown){
    alert("HTTPレスポンスの結果\n"+jqXHR.status+"\n"+textStatus+"\n"+errorThrown+"\n再度送金を試してください！\nもう一度試してエラーの場合はお問い合わせください！");
    button.disabled = false;
    showfooter();
  });     
}
//送金ミスを防ぐ
function hidefooter() {
$('#footermenu').delay(60).hide(10);
}
  
function showfooter() {
$('#footermenu').delay(50).show(10);
}
//送金ミスを防ぐ 
//ローカルストレージ のプライベートキーの有無確認とブロックチェーンからデータの取得 
function showasset(){
  recenttransaction();
  lergeQR();
  if((localStorage.getItem('privatekey')) == null)
  {
     var registname = prompt("Please type your name!(半角英字)\n\n*@,!,#,-などの記号は使わないでください!");
     if(registname == "" || registname == null){
       alert("このままでは登録動作を使用できません！アプリの再起動をしてください！");
       return;
     }
     else{
     var RegistName={
         nickname:registname
     };
     $.ajax({
     type:"post",                     //method = "post"
     url:"https://chachacoin.net/api/miyabi/regist",   // POST送信先のURL
     data:JSON.stringify(RegistName), // JSONデータ本体
     contentType: 'application/json', // リクエストの Content-Type
     dataType: "json",                // レスポンスをJSONとしてパースする
     timespan: 5000,                  // 通信のタイムアウト(5秒)
     }).done(function(getkeypair,textStatus){//Result;レスポンスのJSON,textStatus通信結果のステータス リクエスト成功時
          var privatevalue = getkeypair.PrivateKey;
          var publicvalue =getkeypair.PublicKey;
          alert("必ずスクリーンショットに保管してください！\n\nYour_PrivateKey\n\n"+ privatevalue + "\n\nYour_PublicKey\n\n"+ publicvalue);
          localStorage.setItem('privatekey',privatevalue);
          localStorage.setItem('publickey',publicvalue);
     }).fail(function(jqXHR,textStatus, errorThrown){
     alert("サーバーサイドからキーペアの取得に失敗しました！アプリの再起動をしてください！");
     });
   }
  }
  
  var mypublickey=localStorage.getItem('publickey');// ローカルストレージに保存されたパブリックキー を呼び出す
  var Showamount={
    Tablename: "ChaChaCoin",
    my_publickey:mypublickey
  };
  $.ajax({
    type:"post",                    //method = "post"
    url:"https://chachacoin.net/api/miyabi/show",        // POST送信先のURL
    data:JSON.stringify(Showamount), // JSONデータ本体
    contentType: 'application/json', // リクエストの Content-Type
    dataType: "json",               // レスポンスをJSONとしてパースする
    timespan: 5000,                  // 通信のタイムアウト(5秒)
 }).done(function(Showresult,textStatus){//Result;レスポンスのJSON,textStatus通信結果のステータス リクエスト成功時
    var show = Showresult.coin_amount;
    document.getElementById("content2").innerHTML = show;
    localStorage.setItem('balance',show);
    }).fail(function(jqXHR,textStatus, errorThrown){
    document.getElementById("content2").innerHTML = "ー";
  });
}
//バランス更新のボタン
function get_balance(){
  while( recent.rows[ 1 ] ) recent.deleteRow( 1 );
  recenttransaction();
  var mypublickey=localStorage.getItem('publickey');// ローカルストレージに保存されたパブリックキー を呼び出す
  var Showamount={
    Tablename: "ChaChaCoin",
    my_publickey:mypublickey
  };
  $.ajax({
    type:"post",                    //method = "post"
    url:"https://chachacoin.net/api/miyabi/show",        // POST送信先のURL
    data:JSON.stringify(Showamount), // JSONデータ本体
    contentType: 'application/json', // リクエストの Content-Type
    dataType: "json",               // レスポンスをJSONとしてパースする
    timespan: 5000,                  // 通信のタイムアウト(5秒)
 }).done(function(Showresult,textStatus){//Result;レスポンスのJSON,textStatus通信結果のステータス リクエスト成功時
    var show = Showresult.coin_amount;
    document.getElementById("content2").innerHTML = show;
    localStorage.setItem('balance',show);
    }).fail(function(jqXHR,textStatus, errorThrown){
    document.getElementById("content2").innerHTML = "ー";
  });
}

//裏オプション
function backoption(){
    var scan = localStorage.getItem('privatekey');
    if(scan){
      return;
    }
    var privatekey = prompt("Please paste your Privatekey\n\n(＊プライベートキーを再登録する時のみ使ってください！)");
    if(privatekey){
    var MyPrivateKey={
    BeforeParsePrivateKey:privatekey
    };
    $.ajax({
    type:"post",                     //method = "post"
    url:"https://chachacoin.net/api/miyabi/parse",             // POST送信先のURL
    data:JSON.stringify(MyPrivateKey), // JSONデータ本体
    contentType: 'application/json', // リクエストの Content-Type
    dataType: "json",                // レスポンスをJSONとしてパースする
    timespan: 5000,                  // 通信のタイムアウト(5秒)
    }).done(function(parsepublickey,textStatus){//Result;レスポンスのJSON,textStatus通信結果のステータス リクエスト成功時
    if(parsepublickey.AfterParsepublickey == null ||parsepublickey.AfterParsepublickey == ""){
    alert("登録したprivatekeyが誤っている可能性があります！\n再度保存のキー文字列を確認して登録ください！");
    return;
    }
    var Key = parsepublickey.AfterParsepublickey;
    localStorage.setItem('privatekey',privatekey);
    localStorage.setItem('publickey',Key);
    alert("your publickey\n\n"+Key+"\n\nComplete Regist Privatekey&PublicKey your localstorage\n");
    }).fail(function(jqXHR,textStatus, errorThrown){
    alert("PublicKeyの取得に失敗しました！\n再度行いダメな場合は開発者に連絡ください！\n");
    });
    }
    else{
        alert("PrivateKeyの登録を行いませんでした！");
    }
}

//recent transactionの記録
function hystorylog(amount,publickeydist){
  var a = localStorage.getItem('date1');
  var b = localStorage.getItem('date2');
  var c = localStorage.getItem('date3');
  var d = localStorage.getItem('date4');
  var e = localStorage.getItem('date4');
  //時刻取得
  var now = new Date();
	var year = now.getFullYear();
	var mon = toDoubleDigits(now.getMonth()+1); //１を足すこと
	var day = toDoubleDigits(now.getDate());
	var hour = toDoubleDigits(now.getHours());
	var min = toDoubleDigits(now.getMinutes());
	var sec = toDoubleDigits(now.getSeconds());
  var date = year + "/" + mon + "/" + day + "\t" + hour + ":" + min + ":" + sec ; 
  if(a==null){
  localStorage.setItem('date1',date);
  localStorage.setItem('amount1',amount);
  localStorage.setItem('publickeydist1',publickeydist);
  }
  else if(b==null){
  localStorage.setItem('date2',localStorage.getItem('date1'));
  localStorage.setItem('amount2',localStorage.getItem('amount1'));
  localStorage.setItem('publickeydist2',localStorage.getItem('publickeydist1'));
  localStorage.setItem('date1',date);
  localStorage.setItem('amount1',amount);
  localStorage.setItem('publickeydist1',publickeydist)
  }
  else if(a != null&& b != null && c==null){
  localStorage.setItem('date3',localStorage.getItem('date2'));
  localStorage.setItem('amount3',localStorage.getItem('amount2'));
  localStorage.setItem('publickeydist3',localStorage.getItem('publickeydist2'));
  localStorage.setItem('date2',localStorage.getItem('date1'));
  localStorage.setItem('amount2',localStorage.getItem('amount1'));
  localStorage.setItem('publickeydist2',localStorage.getItem('publickeydist1'));
  localStorage.setItem('date1',date);
  localStorage.setItem('amount1',amount);
  localStorage.setItem('publickeydist1',publickeydist)
  }
  else if(a != null&& b != null && c!=null && d == null){
  localStorage.setItem('date4',localStorage.getItem('date3'));
  localStorage.setItem('amount4',localStorage.getItem('amount3'));
  localStorage.setItem('publickeydist4',localStorage.getItem('publickeydist3'));
  localStorage.setItem('date3',localStorage.getItem('date2'));
  localStorage.setItem('amount3',localStorage.getItem('amount2'));
  localStorage.setItem('publickeydist3',localStorage.getItem('publickeydist2'));
  localStorage.setItem('date2',localStorage.getItem('date1'));
  localStorage.setItem('amount2',localStorage.getItem('amount1'));
  localStorage.setItem('publickeydist2',localStorage.getItem('publickeydist1'));
  localStorage.setItem('date1',date);
  localStorage.setItem('amount1',amount);
  localStorage.setItem('publickeydist1',publickeydist)
  }
  else if(a != null&& b != null && c!=null && d != null){
  localStorage.setItem('date5',localStorage.getItem('date4'));
  localStorage.setItem('amount5',localStorage.getItem('amount4'));
  localStorage.setItem('publickeydist5',localStorage.getItem('publickeydist4'));
  localStorage.setItem('date4',localStorage.getItem('date3'));
  localStorage.setItem('amount4',localStorage.getItem('amount3'));
  localStorage.setItem('publickeydist4',localStorage.getItem('publickeydist3'));
  localStorage.setItem('date3',localStorage.getItem('date2'));
  localStorage.setItem('amount3',localStorage.getItem('amount2'));
  localStorage.setItem('publickeydist3',localStorage.getItem('publickeydist2'));
  localStorage.setItem('date2',localStorage.getItem('date1'));
  localStorage.setItem('amount2',localStorage.getItem('amount1'));
  localStorage.setItem('publickeydist2',localStorage.getItem('publickeydist1'));
  localStorage.setItem('date1',date);
  localStorage.setItem('amount1',amount);
  localStorage.setItem('publickeydist1',publickeydist)
  }
}
// 1桁の数字を0埋めで2桁にする
var toDoubleDigits = function(num) {
  num += "";
  if (num.length === 1) {
    num = "0" + num;
  }
 return num;     
};
//送金履歴の読み出し
function recenttransaction(){
  for(i=1;i<=5;i++){
    var datekey = "date" + i;
    var amountkey = "amount"+i;
    var publickey = "publickeydist"+i;
    var date = localStorage.getItem(datekey);
    var dist = localStorage.getItem(publickey); 
    if(dist == null|| dist == "null")
    {
       break;
    }
    var distfront = dist.substr(0,15);
    var distback = dist.substr(-15);
    
       var transaction =localStorage.getItem(datekey)+"\n"+distfront +"..."+ distback; 
       var amount = "amount:\t"+ localStorage.getItem(amountkey)+"ChaCha";

       let table = document.getElementById('recentTable');
       
       let newRow = table.insertRow();
       let newCell = newRow.insertCell();
       let newText = document.createTextNode(transaction);
       newCell.appendChild(newText);   

       newRow = table.insertRow();
       newCell = newRow.insertCell();
       newText = document.createTextNode(amount);
       newCell.appendChild(newText);
  }
}
//プライベートキーの確認
function showprivatekey(){
  var privatekey = localStorage.getItem('privatekey');
  alert("スクリーンショットの保存がお済みで無い場合はスクリーンショットでの保存を推奨します!!\n\nyour privatekey\n\n" + privatekey);
}

