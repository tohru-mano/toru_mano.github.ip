'use strict'
// 1行目に記載している 'use strict' は削除しないでください

let locaChk = "出社";               //ロケーション確認
let bTempChk = "問題なし";           //体温確認
let bConditionChk = "問題なし";      //体調確認

function workLocation() {
  let workLoca = document.getElementById("workLocation");

  if (workLoca.textContent === "出社") {
    workLoca.textContent = "在宅";
  } else {
    workLoca.textContent = "出社";
  }
  locaChk = workLoca.textContent;
  // console.log("locaChk after is", locaChk);
  return locaChk;
}

function bodyTempChk() {
  let bodyTemp = document.getElementById("bodyTemp");

  if (bodyTemp.textContent === "問題なし") {
    bodyTemp.textContent = "熱あり:３７°以上";
  } else {
    bodyTemp.textContent = "問題なし";
  }
  bTempChk = bodyTemp.textContent;
  // console.log("bTempChk after is", bTempChk);
  return bTempChk;
}

function conditionChk() {
  let condition = document.getElementById("condition");

  if (condition.textContent === "問題なし") {
    condition.textContent = "優れない";
  } else {
    condition.textContent = "問題なし";
  }
  bConditionChk = condition.textContent;
  // console.log("bConditionChk after is", bConditionChk);
  return bConditionChk;
}

function createStartMsg() {
  let startMsg = document.getElementById("startMsg");
  // console.log("locaChk after is", locaChk);
  // console.log("bTempChk after is", bTempChk);
  // console.log("bConditionChk after is", bConditionChk);

  if (bTempChk === "問題なし" && bConditionChk === "問題なし") {
    startMsg.value = `おはようございます。${locaChk}で業務開始します。体温、体調ともに問題ありません。`;
  } else {
    startMsg.value = `ツールから：どこか不調ではないですか？年休を検討しましょう。`;
  }
}

const axios = require("axios");
const URL = `https://toyotajp.webhook.office.com/webhookb2/b19bc3da-933e-4410-9b7e-6d6857c24883@d1c1335e-f582-42a9-b6fe-5e1a16eb9bc8/IncomingWebhook/0342e9a70ec9474f8a6eab985e921fc2/4c970065-e29d-4300-8066-525204717424`;

// axios.post(URL, {
//   "@type": "MessageCard",
//   "@context": "https://hogehoge.com/hogehoge.png",
//   "themeColor": "0076D7",
//   "summary": "ディスカッション",
//   "sections": [{
//       "activityTitle": "Larry Bryant created a new task",
//       "activitySubtitle": "On Project Tango",
//       "activityImage": "",

//       "facts": [{
//           "name": "投稿者",
//           "value": "眞野"
//       },
//       {
//           "name": "URL",
//           "value": ""
//       }, {
//           "name": "Status",
//           "value": "Not started"
//       }],
//       "markdown": true
//   }]
// })
//   .then(res => console.log(res.data));

// axios.post();

function teamsChatSubmit() {
  const addressAll = [];
  let sendAddress = "";
  let submitMsg = document.getElementById("submitMsg").value;
  // console.log(submitMsg);

  let mail1 = document.getElementById("mail1");
  let mail2 = document.getElementById("mail2");
  let mail3 = document.getElementById("mail3");
  let mail4 = document.getElementById("mail4");
  let mail5 = document.getElementById("mail5");
  // console.log("mail1 is", mail1);

  addressAll.push(mail1.value);
  addressAll.push(mail2.value);
  addressAll.push(mail3.value);
  addressAll.push(mail4.value);
  addressAll.push(mail5.value);
  // console.log("addressAll is", addressAll);

  let blank = 0;

  for (let i = 0; i < addressAll.length; i++) {
    if (addressAll[i] !== "") {
      // console.log("addressAll[i]", addressAll[i]);
      if (addressAll[i].includes("@mail.toyota.co.jp") === true ||
        addressAll[i].includes("@tmc.twfr.toyota.co.jp") === true ||
        addressAll[i].includes("@lexus-int.com") === true) {
      } else {
        return alert("トヨタドメイン以外が指定されていませんか。送信相手を確認ください");
      }
    } else {
      // console.log(blank);
      blank += 1;
    }
    // console.log(blank);
    if (blank === 5) {
      return alert("メールアドレスが入力されていません。")
    }
  }

  for (let j = 0; j < addressAll.length; j++) {
    if (j === 0) {
      sendAddress = addressAll[0];
    } else if (j > 0 && addressAll[j] !== "") {
      sendAddress = `${sendAddress},${addressAll[j]}`;
    }
  }
  // console.log("sendAddress is :", sendAddress);
  window.open(`https://teams.microsoft.com/l/chat/0/0?users=${addressAll}&message=${submitMsg}`, "_blank");
}


function timeMngSystem() {
  window.open("https://kintai.kitora.toyota.co.jp/JNET2/start", "_blank");
  document.getElementById("WRKZMENU_H2WKDLLINK").click();
  // href = "javascript:submitAction_win2(document.win2,'WRKZMENU_H2WKDLLINK');"
}

// 個別チャット送信
// https://teams.microsoft.com/l/chat/0/0?users=***&message=***
