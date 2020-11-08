let codeArea = DomHelper_GuarenteeElementById("js-codearea");
let tabList = DomHelper_GuarenteeElementById("js-tablist");
let tabListCount = 0;

let code = [];
let codeAreaSize = 0;
let codeCharacterOffset = 0;
let codeLineOffset = 0;
let codeScrollOffset = 0;
let codeCurrentLineNumberElement = undefined;
let codeCurrentCodeElement = undefined;

function EditorDom_ClearLines() 
{
    DomHelper_RemoveChildren(codeArea);
}

function EditorDom_InitializeLines(count)
{
    codeAreaSize = count;

    for(var i = 0; i < count; i++) {
        EditorDom_AddLine(i);
    }
}

function EditorDom_AddLine(idx) 
{
    let tableRow = document.createElement("tr");
    tableRow.setAttribute("id", `row-${idx}`);

    let tdLineCount = document.createElement("td");
    tdLineCount.setAttribute("id", `line-${idx}`);
    tdLineCount.innerHTML = idx + 1;

    let tdLineCode = document.createElement("td");
    tdLineCode.setAttribute("id", `code-${idx}`);

    tableRow.appendChild(tdLineCount);
    tableRow.appendChild(tdLineCode);
    codeArea.appendChild(tableRow);
}

function EditorDom_RemoveLine(idx)
{
    DomHelper_RemoveChildrenById(codeArea, `row-${idx}`);
}

function EditorDom_ClearCode() 
{
    code = [];
    codeCharacterOffset = 0;
    codeLineOffset = 0;
    codeScrollOffset = 0;
    codeCurrentLineNumberElement = undefined;
    codeCurrentCodeElement = undefined;
}

function EditorDom_InitializeCode(newCode) 
{
    code = newCode;
    codeCurrentLineNumberElement = DomHelper_GuarenteeElementById(`line-${codeLineOffset}`);
    codeCurrentCodeElement = DomHelper_GuarenteeElementById(`code-${codeLineOffset}`);
}

function EditorDom_NextLine(lines, linesToScroll)
{
    codeLineOffset++;

    if(codeLineOffset == code.length) {
        return true;
    }

    //Do we need to scroll the window?
    let scrollDelta = (linesToScroll + codeScrollOffset) - codeLineOffset;

    if(scrollDelta <= 0)
    {
        EditorDom_RemoveLine(codeScrollOffset);
        EditorDom_AddLine(lines + codeScrollOffset++);
    }

    codeCharacterOffset = 0;
    codeCurrentCodeElement = DomHelper_GuarenteeElementById(`code-${codeLineOffset}`);
    codeCurrentLineNumberElement = DomHelper_GuarenteeElementById(`line-${codeLineOffset}`);

    return false;
}

function EditorDom_ProgressCode(lines, linesToScroll)
{
    if(!codeCurrentCodeElement) {
        console.warn("Input dropped, no next line found! Sadly cheating creates race conditions ;)");
        return false;
    }

    //Did we reach the end of the file?
    if(codeLineOffset >= code.length) {
        return true;
    }

    let currentLine = code[codeLineOffset];
    
    //At the start of a file, determine the identation level.
    if(codeCharacterOffset == 0) {
        let identCount = (currentLine.match(/&nbsp;/g)||[]).length

        if(identCount > 0)
        {
            for(var i = 0; i < identCount; i++) { 
                codeCurrentCodeElement.style.paddingLeft = (identCount * 6) + "px";
            }

            codeCharacterOffset += identCount * 6;
        }
    }
    
    //Did we encounter a whitespace or empty line?
    if(currentLine.length == 0) {
        return EditorDom_NextLine(lines, linesToScroll);
    }

    let nextCharacter = currentLine[codeCharacterOffset++];
    codeCurrentCodeElement.innerHTML += nextCharacter;

    //Are we at the end of the line?
    if(currentLine.length == codeCharacterOffset) {
        return EditorDom_NextLine(lines, linesToScroll);
    }

}

function EditorDom_AddTab(name) 
{
    if(!tabList) return;

    //Remove the first inserted tab.
    if(tabListSize >= 12) {
        PopTab("", 0);
    }

    let newTab = document.createElement("span");
    newTab.setAttribute("id", `tab-${name.toLowerCase()}`);
    newTab.className = "tab";
    newTab.innerHTML = name + ".js <i class=\"icon-cancel-circle\"></i>";
    newTab.style.backgroundColor = ArrayHelper_RandomElement(tabListColors);

    tabList.appendChild(newTab);
    tabListCount++;
}

function EditorDom_RemoveTab(name, index = -1) 
{
    if(!tabList) return;
    
    if(index >= 0) {
        tabList.removeChild(tabList.childNodes[index]);
        tabListSize--;
    }
    else {
        DomHelper_RemoveChildrenById(tabList, `tab-${name.toLowerCase()}`);
        tabListSize--;
    }
}