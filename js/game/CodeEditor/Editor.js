let editor_CurrentCodeName = "";
let editor_CurrentCode = "";
let editor_CurrentLines = 0;

let editor_maxlines = 30;
let editor_linesToScroll = 28;

async function Editor_SetCode() {
    EditorDom_ClearCode();
    EditorDom_ClearLines();

    editor_CurrentCodeName = EditorCL_GetRandomName();

    await EditorCL_FetchCodeText(editor_CurrentCodeName).then(code => {
        code = code.split("\n");
        code = EditorCP_RemoveComments(code);
        code = EditorCP_RemoveLeadingEmptyLines(code);
        code = EditorCP_RemoveTrailingEmptyLines(code);
        code = EditorCP_HtmlifyTabs(code);
        
        editor_CurrentCode = code;
        editor_CurrentLines = code.length;
    });

    let domLineCount = Math.min(editor_CurrentLines, editor_maxlines, editor_CurrentLines)
    EditorDom_InitializeLines(domLineCount);
    EditorDom_InitializeCode(editor_CurrentCode);
    EditorDom_AddTab(editor_CurrentCodeName);

    console.log(`Set current code to ${editor_CurrentCodeName}`)
}

function Editor_Intialize() { 
    Editor_SetCode();
}

function Editor_ProgressCharacter()
{
    let isEof = EditorDom_ProgressCode(editor_maxlines, editor_linesToScroll);

    if(isEof) 
    {
        GlobalStats_AddCode(editor_CurrentLines);
        EditorDom_RemoveTab(editor_CurrentCodeName);

        editor_CurrentCodeName = "";
        editor_CurrentCode = "";
        editor_CurrentLines = 0;
        
        Editor_SetCode();

    }
}