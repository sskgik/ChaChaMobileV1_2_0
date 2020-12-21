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
//QRによるアドレス登録
function scanBarcode3() {
      cordova.plugins.barcodeScanner.scan(
      function (result) {
          var name =prompt("Get Registration Publickey!\n" + "\n" + result.text + "\n\n" + "Please enter registration name\n" );
                if(name){
                  var regist1 = confirm("Entered PublicKey\n\n" + result.text + "\n\n" +"Entered Name\n\n" + name);
                  var pubkey = result.text;
                  if(regist1 == true){
                    addtable(name,pubkey)
                    alert("指定の情報で登録しました！");
                  }
                  else{
                    alert("登録せずに終了します");
                  } 
                }
                else if(name == ""){
                  name = "No name";
                  var pubkey = result.text;
                  var regist2 = confirm("Entered PublicKey\n\n" + result.text + "\n\n" +"Entered Name\n\n" + name);
                  if(regist2 == true){
                    addtable(name,pubkey)
                    alert("指定の情報で登録しました！");
                  }
                  else{
                    alert("登録せずに終了します");
                  } 
                }
                else{
                    alert("登録せずに終了します");
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
//クリップボードによるアドレスの登録
function register(){
  var conf=confirm("クリップボードに登録する相手の\nパブリックキー は保存しましたか？\n");
  if(conf==true){
    //PublicKeyの入力
    var pubkey = prompt("Please Paste PublicKey\n");
    if(pubkey){
      //登録名の入力
      var name= prompt("Please type registration name\n",'');
      if(name==null){
        alert("登録せずに終了します");
        return;
      }
      else if(name==''){
        name = "No name";
        var regist3 = confirm("Entered PublicKey\n\n" + pubkey + "\n\n" +"Entered Name\n\n" + name);
        if(regist3 == true){
                    addtable(name,pubkey);
                    alert("指定の情報で登録しました！");
                  }
                  else{
                    alert("登録せずに終了します");
                  } 
        }
      else{
        var regist4 =  confirm("Entered PublicKey\n\n" + pubkey + "\n\n" +"Entered Name\n\n" + name);
        if(regist4 == true){
                    addtable(name,pubkey);
                    alert("指定の情報で登録しました！");
                  }
                  else{
                    alert("登録せずに終了します");
                  } 
     }
   }
  else{
      alert("相手のパブリックキーをクリップボードからペーストしなおしてくださいください！");
      return;
      }
  }
  else{
    alert("相手のパブリックキーをクリップボードに保存し再実行してください！");
    return;
  }
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

//table値を入力
function addtable(name,pubkey){
  var key = localStorage.getItem('key'); 
  if(key > 0){
  }
  else if(key == null){
    key = 0;
  }
  let table = document.getElementById('listtable');
  let newRow = table.insertRow();

  key++;
  let newCell = newRow.insertCell();
  let newText = document.createTextNode(name);
  newCell.appendChild(newText);

  newCell = newRow.insertCell();
  newText = document.createTextNode(pubkey);
  newCell.appendChild(newText);
  
  var datalist = {
    name1: name,
    pubkey1: pubkey 
  };
  localStorage.setItem('key',key);
  localStorage.setItem(key , JSON.stringify(datalist));
}
//localStorageの読み出し
function load(){
  lergeQR();
  var publickey = localStorage.getItem('publickey');
  document.getElementById('myPublickey').innerHTML = publickey;
  var data = "";
  if(localStorage.getItem(1)==null){
    return;
  }
  else{
    for(i=1;i<=localStorage.length;i++)
    {
      if(localStorage.getItem(i) == null)
      {
        break;
      }
      data = JSON.parse(localStorage.getItem(i));
      
      var name = data.name1;
      var pubkey = data.pubkey1;

      let table = document.getElementById('listtable');
      let newRow = table.insertRow();
    
      let newCell = newRow.insertCell();
      let newText = document.createTextNode(name);
      newCell.appendChild(newText);

      newCell = newRow.insertCell();
      newText = document.createTextNode(pubkey);
      newCell.appendChild(newText);
    }
  }
}

//ローカルストレージから削除
function Delete(){
  var conf = confirm("アドレスデータをローカルから全て削除します！")
    if(conf==true){
      //ローカルデータの一時避難
      var privatekey = localStorage.getItem('privatekey');
      var publickey = localStorage.getItem('publickey');
      var date = [];
      var amount=[];
      for(i=1;i<=5;i++){
         var datekey = "date" + i;
         var amountkey = "amount"+i;
         date.push(localStorage.getItem(datekey));
         amount.push(localStorage.getItem(amountkey));   
      }
      //ローカルの全てをクリア
      localStorage.clear();
      //避難からの戻し
      localStorage.setItem('privatekey',privatekey);
      localStorage.setItem('publickey',publickey);
      for(i=1;i<=5;i++){
         var datekey = "date" + i;
         var amountkey = "amount"+i;
         localStorage.setItem(datekey,date[i-1]);
         localStorage.setItem(amountkey,amount[i-1]);
      }
      alert("全て削除しました！\nページ再読み込み後反映されます！")
    }
    else{
      alert("削除せずに終了します");
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

//アドレスブックよりパブリックキー取得
function passaddress(){
  var key = prompt("使用する宛先の番号を半角数字で\n入力してください！");
  /*var key = numchoice.value;*/
  if(key ==""){
    alert("読み込むアドレスの番号を選択してください！");
    return;
  }
  if(isNaN(key) == true){
    alert("半角数字でない文字が入力されています！\n送信先予定のアドレスの番号を入力してください！");
    return;
  }
  data = JSON.parse(localStorage.getItem(key));
  if(data == "" ||data == null){
    alert("登録データがありません!\n選択を中止します!");
    return;
  }
  var Addressname = data.name1;
  var Inputpublickey = data.pubkey1;
  var check = confirm("下記内容でよろしいですか？\n\n送金先名:" + Addressname +"\n\n送金先キー\n\n" +Inputpublickey);
  if(check == true){
    document.scanresult.Destinationpubkey.value = Inputpublickey;
    var sendnav = document.querySelector('#navsend');
    sendnav.classList.toggle('open-sendmenu');
    var check =  document.getElementsByClassName('open-menu');
    if(check.length == 1){
    nav.classList.toggle('open-menu');
    }
  }
  else{
    alert("選択を中止しました！");
  }
}

/*以下今後の開発用のメモ*/
  /*var num = prompt("削除するアドレスの番号を入力してください！");
  var num1 = Number(num);
  if(num1==0){
    return;
  }
  var result = Number.isInteger(num1);
  if(result == true){
    var conf = confirm(num1 + "番のアドレスデータをローカルから削除します！")
    if(conf==true){
      localStorage.removeItem(num1)
      alert("削除しました！\nページ再読み込み後反映されますす！")
    }
    else{
      alert("削除せずに終了します");
      return;
    }
  }
  else{
    alert("数字以外を入力しましたので中断します！")
    return;
  }*/
