function GameInitialize() {
    Editor_Intialize();

    //Any key, fired once.
    document.addEventListener("keyup", key => {
        Editor_ProgressCharacter();
    });
}

function GameLoop() {
    requestAnimationFrame(GameLoop);
}

GameInitialize();
requestAnimationFrame(GameLoop);