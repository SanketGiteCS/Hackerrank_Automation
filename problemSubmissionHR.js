const puppy = require("puppeteer");
async function openBrowser(url) {
  const browser = await puppy.launch({
    headless: false, // false -->It will open web page which is visible to us. || true -->It will open web page, but web page is not visible to us.
    defaultViewport: false, // for user better experience , for fullscreen of window
    //slowMo :100, // for decrease the speed of typing data automatic
    args: [
      "--start-maximized", // you can also use '--start-fullscreen'
    ],
  });
  
  const tabs = await browser.pages();
  const tab = tabs[0];
  await tab.goto("https://www.hackerrank.com/auth/login");
  let usernameInputTab = await tab.$("#input-1");
  let passwordInputTab = await tab.$("#input-2");
  let rememberCheckbox = await tab.$(".checkbox-input");
  let loginButton = await tab.$('[data-analytics="LoginPassword"]');
  await usernameInputTab.type("lageja3244@cantouri.com");
  await passwordInputTab.type("Temp@123");
  await rememberCheckbox.click();
  await loginButton.click();

   
  try{
      await tab.waitForSelector('[data-analytics="StartPreparation"]');
      let preparationButton =  await tab.$('[data-analytics="StartPreparation"]');
      await preparationButton.click();
    }catch(ele){
      await tab.waitForSelector('[class="ui-btn ui-btn-normal ui-btn-large ui-btn-primary ui-btn-link ui-btn-styled"] span[class="ui-text"]');
      let continuePrep = await tab.$('[class="ui-btn ui-btn-normal ui-btn-large ui-btn-primary ui-btn-link ui-btn-styled"] span[class="ui-text"]');
      await continuePrep.click();
  }
  await tab.waitForSelector('.ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled');
  let solveChallenegeButtons = await tab.$$('.ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled');
  let solveChallengeUrls = [];
  for(let solveChallenegeButton of solveChallenegeButtons){
      solveChallengeUrls.push(
          await tab.evaluate(function(ele){
              return "https://www.hackerrank.com" + ele.getAttribute("href");
          },solveChallenegeButton)
      )
  }

  for(let i = 0;i<solveChallengeUrls.length-1;i++){
      
    solveChallenge(solveChallengeUrls[i],await browser.newPage());
  }
  

  async function solveChallenge(url,tab){
    let problemUrl = url.replace("?","/problem?");
    let editorialUrl = url.replace("?","/editorial?");
    await tab.goto(editorialUrl);
    let solutionH3Tags = await tab.$$('.hackdown-content h3');
    let solutionLanguages = [];
    for(let solutionH3Tag of solutionH3Tags){
      solutionLanguages.push(
          await tab.evaluate(function(ele){
            return ele.innerText;
          },solutionH3Tag)
      )
    }
    let solutionsPreTags = await tab.$$(".highlight pre");
    let solution;

    // for(let i = 0;i<solutionLanguages.length;i++){
    //   if(solutionLanguages[i] == "C++"){
    //     solution = tab.evaluate(function(ele){
    //       return ele.innerText();  
    //     },solutionsPreTags[i])
    //     break;
    //   }
    // }
    for (let i = 0; i < solutionLanguages.length; i++) {
      if (solutionLanguages[i] == "C++") {
        solution = await tab.evaluate(function (ele) {
          return ele.innerText;
        }, solutionsPreTags[i]);
        break;
      }
    }
    await tab.goto(problemUrl);
    await tab.waitForSelector('[type="checkbox"]')
    await tab.click('[type="checkbox"]')
    await tab.type('#input-1',solution);
    await tab.keyboard.down('Control');
    await tab.keyboard.press('A');
    await tab.keyboard.press('X');
    await tab.keyboard.up('Control');
    await tab.click('[class="view-line"]')
    await tab.keyboard.down("Control");
    await tab.keyboard.press("A");
    await tab.keyboard.press("V");
    await tab.keyboard.up("Control");
    await tab.click(".hr-monaco-submit");
    await tab.waitForSelector(".congrats-wrapper");
    await tab.close();
  }

  

}
openBrowser("https://www.google.com");