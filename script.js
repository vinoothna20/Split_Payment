let frndsGrpList = JSON.parse(localStorage.getItem("frndsGrpList")) || [];

function saveToStorage() {
  localStorage.setItem("frndsGrpList", JSON.stringify(frndsGrpList));
}

function startFun() {
  document.getElementById("div1").style.display = "none";

  document.getElementById("div2").style.display = "block";

  return false;
}

function addMemFun() {
  let temp = document.getElementById("break");
  let divEle = document.createElement("div");

  divEle.innerHTML = '<input type="text" /> ';

  temp.before(divEle);

  let eleDiv2 = document.getElementById("div2");

  let div2Height = eleDiv2.clientHeight;

  if (div2Height > 527) {
    eleDiv2.style.transform = "translate(-50%, -40%)";
  }
}

let s = "";

function createGrpFun() {
  let mainArr = {};
  let inpList;
  let temparr = [];

  inpList = document.getElementsByTagName("input");

  var grpPattern = /^[^\s][a-zA-Z0-9\s]*$/;

  var namePattern = /^[^\s][a-zA-Z\s]*$/;

  if (
    !grpPattern.test(inpList[0].value) ||
    inpList[0].value == null ||
    inpList[0].value == ""
  ) {
    alert("Enter a valid group name with no special characters");
    return false;
  }

  for (var i = 1; i < inpList.length - 1; i++) {
    if (
      !namePattern.test(inpList[i].value) ||
      inpList[i].value == null ||
      inpList[i].value == ""
    ) {
      alert(`Enter a valid name at input ${i}`);
      return false;
    }
    temparr.push(inpList[i].value);
  }

  temparr.push(inpList[i].value);

  mainArr[inpList[0].value] = temparr;

  frndsGrpList.push(mainArr);

  let keysList = [];

  for (var i = 0; i < frndsGrpList.length; i++) {
    keysList.push(Object.keys(frndsGrpList[i]));
  }

  for (i in keysList) {
    let node = document.createElement("option");
    node.setAttribute("value", `${keysList[i]}`);
    let textnode = document.createTextNode(`${keysList[i]}`);
    node.appendChild(textnode);
    document.getElementById("grpsList").appendChild(node);
  }

  saveToStorage();

  document.getElementById("div2").style.display = "none";
  document.getElementById("div3").style.display = "block";
}

let valList;
let nofMem = 0;

function grpMembersFun() {
  let grpValue = document.getElementById("grpsList").value;

  for (var i = 0; i < frndsGrpList.length; i++) {
    let objTemp = Object.keys(frndsGrpList[i]);
    if (objTemp == grpValue) {
      valList = Object.values(frndsGrpList[i]);

      nofMem = valList[0].length;
      document.getElementById("membNames").innerHTML = `Group Members: ${valList
        .join(",")
        .replace(/,\s*$/, "")}`;
    }
  }
}

function existGrpFun() {
  document.getElementById("div2").style.display = "none";
  document.getElementById("div3").style.display = "block";
  let keysList = [];
  for (var i = 0; i < frndsGrpList.length; i++) {
    keysList.push(Object.keys(frndsGrpList[i]));
  }

  for (i in keysList) {
    let node = document.createElement("option");
    node.setAttribute("value", `${keysList[i]}`);
    let textnode = document.createTextNode(`${keysList[i]}`);
    node.appendChild(textnode);
    document.getElementById("grpsList").appendChild(node);
  }

  saveToStorage();
}

function splitFun() {
  let amnt = document.getElementById("amnt").value;

  var amntPattern = /^-?\d*\.?\d*$/;

  if (!amntPattern.test(amnt)) {
    alert("Enter only an integer or a float in amount");
    return false;
  }

  let splitAmnt = (amnt / (nofMem - 1)).toFixed(2);
  let success = document.createElement("p");
  success.innerHTML = "Successfully shared the bill with your friends!";
  let detl = document.createElement("details");
  let sumry = document.createElement("summary");

  document.getElementById("splitDiv").after(success, detl);
  detl.appendChild(sumry);

  success.setAttribute("id", "scus");
  detl.setAttribute("id", "dtls");

  sumry.innerText = "Details of the bill";

  for (var i = 0; i < valList[0].length - 1; i++) {
    var names = document.createElement("p");
    names.innerHTML = `${valList[0][i]} : ${splitAmnt}`;
    detl.appendChild(names);
    names.setAttribute("id", "memAmnt");
  }

  let eleDiv3 = document.getElementById("div3");

  let div3Height = eleDiv3.clientHeight;

  console.log(div3Height);

  if (div3Height > 439) {
    eleDiv3.style.transform = "translate(-50%, -40%)";
  }
}

localStorage.removeItem("frndsGrpList");
