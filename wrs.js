'use strict'
// 1行目に記載している 'use strict' は削除しないでください

function fileOpen() {
  window.open("document/Presen.pdf", "_blank");
}

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

function sendToTeams() {
  const sendToStartWork = new XMLHttpRequest();
  origin
  const URL = "https://toyotajp.webhook.office.com/webhookb2/b19bc3da-933e-4410-9b7e-6d6857c24883@d1c1335e-f582-42a9-b6fe-5e1a16eb9bc8/IncomingWebhook/35e6d84b33994d0abc19578c5f647e5e/4c970065-e29d-4300-8066-525204717424";

  sendToStartWork.open("POST", URL);
  sendToStartWork.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  sendToStartWork.send(
    {
      "type": "message",
      "attachments": [
        {
          "contentType": "application/vnd.microsoft.card.adaptive",
          "contentUrl": null,
          "content": {
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.2",
            "body": [
              {
                "type": "TextBlock",
                "text": "勤務報告",
                "wrap": true,
                "size": "ExtraLarge"
              }
            ]
          }
        }
      ]
    });

  sendToStartWork.onreadystatechange = function () {
    console.log(sendToStartWork.responseText);
  }

}

function teamsChatSubmit() {
  const mailWithId = [];
  let sendAddress = "";
  let submitMsg = document.getElementById("submitMsg").value;
  // console.log(submitMsg);

  mailWithId.push(document.getElementById("mail1"));
  mailWithId.push(document.getElementById("mail2"));
  mailWithId.push(document.getElementById("mail3"));
  mailWithId.push(document.getElementById("mail4"));
  mailWithId.push(document.getElementById("mail5"));
  
  const mailAll = mailWithId.map(mail => mail.value);
  
  const mailsAfterFilter = mailAll.filter(mail => mail !== "");
  console.log("mailALL is ", mailsAfterFilter[0]);

  if (mailsAfterFilter[0] === undefined) {
    return alert("メールアドレスが入力されていません。")
  }

  for (let i = 0; i < mailsAfterFilter.length; i++) {
    if (mailsAfterFilter[i].includes("@mail.toyota.co.jp") === true ||
      mailsAfterFilter[i].includes("@tmc.twfr.toyota.co.jp") === true ||
      mailsAfterFilter[i].includes("@lexus-int.com") === true) {
    } else {
      return alert("トヨタドメイン以外が指定されていませんか。送信相手を確認ください");
    }
  }

  for (let j = 0; j < mailsAfterFilter.length; j++) {
    if (j === 0) {
      sendAddress = mailsAfterFilter[0];
    } else {
      sendAddress = `${sendAddress},${mailsAfterFilter[j]}`;
    }
  }
  // console.log("sendAddress is :", sendAddress);
  window.open(`https://teams.microsoft.com/l/chat/0/0?users=${mailsAfterFilter}&message=${submitMsg}`, "_blank");
}
// 個別チャット送信
// https://teams.microsoft.com/l/chat/0/0?users=***&message=***

function timeMngSystem() {
  window.open("https://kintai.kitora.toyota.co.jp/JNET2/start", "_blank");
  document.getElementById("WRKZMENU_H2WKDLLINK").click();
  // href = "javascript:submitAction_win2(document.win2,'WRKZMENU_H2WKDLLINK');"
}
