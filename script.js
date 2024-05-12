let frndsGrpList = JSON.parse(localStorage.getItem("frndsGrpList")) || [];

function saveToStorage() {
  localStorage.setItem("frndsGrpList", JSON.stringify(frndsGrpList));
}

function startFun() {
  document.getElementById("div1").style.display = "none";

  document.getElementById("div2").style.display = "block";

  return false;
}

var i = 2;

function addMemFun() {
  let temp = document.getElementById("membsDiv");
  let inpEle = document.createElement("input");
  let delBtn = document.createElement("button");
  let br = document.createElement("br");

  // tem.innerHTML = '<input type="text" /> ';
  inpEle.setAttribute("id", `inp${i}`);
  delBtn.innerHTML = "-";
  delBtn.setAttribute("id", `btn${i}`);
  i++;
  delBtn.setAttribute("onclick", "delMemFun(this.id)");

  temp.append(inpEle, delBtn, br);

  let eleDiv2 = document.getElementById("div2");

  let div2Height = eleDiv2.clientHeight;

  if (div2Height > 527) {
    eleDiv2.style.transform = "translate(-50%, -40%)";
  }
}

function delMemFun(clkId) {
  let idNo = clkId.charAt(clkId.length - 1);
  let inpList = document.querySelectorAll("#membsDiv input");
  let btnList = document.querySelectorAll("#membsDiv button");

  for (var j = 0; j < inpList.length; j++) {
    let inpId = inpList[j].id;
    if (inpId.charAt(inpId.length - 1) == idNo) {
      let temp = document.getElementById(`btn${j + 1}`).nextSibling;
      if (temp) {
        temp.remove();
      }
      document.getElementById(`inp${j + 1}`).remove();
      document.getElementById(`btn${j + 1}`).remove();
      break;
    }
  }

  inpList = document.querySelectorAll("#membsDiv input");
  btnList = document.querySelectorAll("#membsDiv button");

  for (var k = j; k < inpList.length; k++) {
    inpList[k].id = `inp${k + 1}`;
    btnList[k].id = `btn${k + 1}`;
  }

  i--;
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

  if (div3Height > 439) {
    eleDiv3.style.transform = "translate(-50%, -40%)";
  }
}

localStorage.removeItem("frndsGrpList");
