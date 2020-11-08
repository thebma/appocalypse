<html>
    <head>
        <title> Appocalypse</title>
        <link rel="stylesheet" href="css/global.css">
        <link rel="stylesheet" href="css/top.css">
        <link rel="stylesheet" href="css/content.css">
        <link rel="stylesheet" href="css/editor.css">
    </head>

    <body>
        <div class="top">
            <span class="heading"><b>APP</b>OCALYPSE<span class="version">version 1.0</span></span>
            <span class="subtext"><b>Date </b><span class="split">01 JAN 1950</span></span>
            <span class="subtext"><b>Money </b><span class="split">$<span id="js-money">0</span></span></span>
            <span class="subtext"><b>Code</b><span class="split"> <span id="js-code">0</span> lines [+0 sec]</span></span>
        </div>

        <div class="content">
            <div class="editor">
                <div id="js-tablist" class="tablist"></div>
                <div class="codearea">
                    <table id="js-codearea"></table>
                </div>
            </div>
        </div>  

        <script src="./js/helpers/ArrayHelper.js"></script>
        <script src="./js/helpers/DomHelper.js"></script>

        <script src="./js/game/stats/GlobalStats.js"></script>

        <script src="./js/game/CodeEditor/EditorCodeLoader.js"></script>
        <script src="./js/game/CodeEditor/EditorCodeProcessor.js"></script>
        <script src="./js/game/CodeEditor/EditorWindow.js"></script>
        <script src="./js/game/CodeEditor/EditorDom.js"></script>
        <script src="./js/game/CodeEditor/Editor.js"></script>
        <script src="./js/game/Game.js"></script>
    </body>
</html>