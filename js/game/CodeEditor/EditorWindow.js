// let tabList = DomHelper_GuarenteeElementById("js-tablist");
// let codeArea = DomHelper_GuarenteeElementById("js-codearea");

let tabListSize = 0;
let tabListColors = [
    "#b51919", "#b55419", "#b59519",
    "#7db519", "#19b52a", "#19b57b",
    "#19aeb5", "#196cb5", "#1e19b5",
    "#6719b5", "#9319b5", "#b5198e",
];

function PushTab(name) {
    if(!tabList) return;

    //Remove the first inserted tab.
    if(tabListSize >= 12) {
        PopTab("", 0);
    }

    let newTab = document.createElement("span");
    newTab.setAttribute("id", `tab-${name.toLowerCase()}`);
    newTab.className = "tab";
    newTab.innerHTML = name + " <i class=\"icon-cancel-circle\"></i>";
    newTab.style.backgroundColor = ArrayHelper_RandomElement(tabListColors);

    tabList.appendChild(newTab);
    tabListSize++;
}

function PopTab(name, index = -1) {
    if(!tabList) return;
    
    if(index >= 0) {
        tabList.removeChild(tabList.childNodes[index]);
        tabListSize--;
    }
    else {
        tabListSize -= DomHelper_RemoveChildrenById(`tab-${name.toLowerCase()}`);
    }
}

function PushCode()
{
    let codeName = RandomCodeName();
    PushTab(codeName);

    FetchRandomCode(codeName).then(code => {
        let lines = code.split("\n");

        //NOTE: Strip comments before Htmlizing the tabbing.
        lines = StripComments(lines);
        lines = HtmlizeTheIndentation(lines);
    });
}