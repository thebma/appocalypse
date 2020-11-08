let moneyElement = DomHelper_GuarenteeElementById("js-money");
let codeElement = DomHelper_GuarenteeElementById("js-code");

let globalStats_money = 0;
let globalStats_code = 0;

function GlobalStats_AddCode(linesOfCode)
{
    let score = linesOfCode;
    score += (score / 10) * 25.0;
    score += (score / 100) * 100.0;
    score += (score / 1000) * 300.0;
    score += (score / 5000) * 500.0;
    score += (score / 10000) * 1000.0;
    score += (score / 20000) * 5000.0;
    score = Math.floor(score);

    globalStats_code += score;
    codeElement.textContent = globalStats_code;
}