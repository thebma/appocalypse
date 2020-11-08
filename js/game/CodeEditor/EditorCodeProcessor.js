function EditorCP_RemoveLeadingEmptyLines(code)
{
    let didFindBeginning = false;
    let newCode = [];

    for(let n = 0; n < code.length; n++)
    {
        let line = code[n];

        //We have not yet hit a line of code that isn't empty, lets check if the current one is empty
        //  and ommit that line if required.
        if(!didFindBeginning && line.trim() == "") {
            continue;
        } 
        //Mark this as "yes we hit a line of code", so the subsequent lines always get pushed to newCode array.
        else if(!didFindBeginning) {
            didFindBeginning = true;
        }

        newCode.push(line);
    }  

    return newCode;
}

function EditorCP_RemoveTrailingEmptyLines(code)
{
    let lastKnownLineOfCodeNonEmpty = 0;
    let newCode = [];

    for(let n = 0; n < code.length; n++)
    {
        let line = code[n];

        if(line.trim() != "") {
            lastKnownLineOfCodeNonEmpty = n;
        }
    }

    return code.slice(0, code.length - ((code.length - 1) - lastKnownLineOfCodeNonEmpty))
}

function EditorCP_HtmlifyTabs(code) {
    let newCode = [];
    for(let n = 0; n < code.length; n++)
    {
        let newLine = "";
        let line = code[n];
        let whitespaceCount = line.search(/\S/);

        if(whitespaceCount > 0) {
            for(var w = 0; w < whitespaceCount; w++) {
                newLine += "&nbsp;";
            }
        }

        newLine += line.trim();
        newCode.push(newLine);
    }
    
    return newCode;
}

function EditorCP_RemoveComments(code) {
    let newCode = [];
    let isWaitingForEndMarker = false;

    for(let n = 0; n < code.length; n++)
    {
        let line = code[n];
        let trimLine = line.trim();

        //Strip the single line comment i.e "//".
        if(trimLine.startsWith("//")) {
            continue;
        }

        //Strip the single line comment i.e /* and */
        if(trimLine.startsWith("/*") && trimLine.endsWith("*/")) {
            continue;
        }

        //Strip the single line comment i.e /** */ and */
        if(trimLine.startsWith("/**") && trimLine.endsWith("*/")) {
            continue;
        }

        //Strip the multiline comments i.e. /** */
        if(trimLine.startsWith("/**") && !trimLine.endsWith("*/")) {
            isWaitingForEndMarker = true;
        }

        //Strip the multiline comments i.e. /** */
        if(trimLine.startsWith("/*") && !trimLine.endsWith("*/")) {
            isWaitingForEndMarker = true;
        }

        //Dealing with inline comments
        if(trimLine.includes("/*") && trimLine.includes("*/")) {
            let startIdx = trimLine.indexOf("/*");
            let endIdx = trimLine.indexOf("*/");
            line = line.substring(0, startIdx) + line.substring(endIdx + 2, line.length);
        }

        if(trimLine.includes("//")) {
            let startIdx = trimLine.indexOf("//");
            line = line.substring(0, startIdx);
        }

        if(isWaitingForEndMarker) {
            if(trimLine.includes("*/") || trimLine.includes("**/")) {
                isWaitingForEndMarker = false;
                continue;
            }
        }

        if(!isWaitingForEndMarker) {
            newCode.push(line);
        }

    }

    return newCode;
}
