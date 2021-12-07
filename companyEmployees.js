const puppy = require("puppeteer");
async function openBrowser(url) {
  const browser = await puppy.launch({
    headless: false, //to open browser (chromium)
    args: [
      "--start-maximized", // you can also use '--start-fullscreen'
    ],
    defaultViewport: false,
  });
  let tabs = await browser.pages();
  let tab = tabs[0];
  await tab.goto(url);

  let signIn = await tab.$(".main__sign-in-link");
  await signIn.click();

  await tab.waitForSelector("div>#username");
  let username = await tab.$("div>#username");
  await username.click();
  await username.type("sanketgite1330@gmail.com");

  let password = await tab.$("#password");
  let submit = await tab.$('[type="submit"]');

  await password.click();
  await password.type("sanket@gite$123");
  await submit.click();

  await tab.waitForSelector('[aria-label="Search"]');
  let searchButton = await tab.$('[aria-label="Search"]');
  await searchButton.click();

  await searchButton.type("Amazon"); //type here comany name

  await searchButton.press("Enter");

  await tab.waitForSelector('[class="image-text-lockup__text "]');

  let viewPage = await tab.$('[class="image-text-lockup__text "]');
  await viewPage.click();

  await tab.waitForNavigation({ waitUntil: "networkidle2" });

  await tab.waitForSelector(
    '[class="org-top-card-secondary-content__see-all t-normal t-black--light link-without-visited-state link-without-hover-state"]'
  );

  let employees = await tab.$(
    '[class="org-top-card-secondary-content__see-all t-normal t-black--light link-without-visited-state link-without-hover-state"]'
  );
  await employees.click();

  await tab.waitForSelector(
    '[class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view"] [class="artdeco-button__text"]'
  );

  let connectButtonsArray = await tab.$$(
    '[class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view"] [class="artdeco-button__text"]'
  );
    await connectButtonsArray[4].click(); //remove scroll function and uncomment this click method
    await tab.waitForSelector(
      'button[aria-label="Send now"]>span[class="artdeco-button__text"]'
    );
    let sendButton = await tab.$(
      'button[aria-label="Send now"]>span[class="artdeco-button__text"]'
    );
    await sendButton.click();
  // for (let i = 0;i<connectButtonsArray.length;i++) {
  //   await connectButtonsArray[4].click(); //remove scroll function and uncomment this click method
  //   await tab.waitForSelector(
  //     'button[aria-label="Send now"]>span[class="artdeco-button__text"]'
  //   );
  //   let sendButton = await tab.$(
  //     'button[aria-label="Send now"]>span[class="artdeco-button__text"]'
  //   );
  //   await sendButton.click();
  // }

  let temp = false;

  while (temp == true) {
    try {
      await tab.waitForSelector('[aria-label="Next"]');
      let nextButton = await tab.$('[aria-label="Next"]');
      await nextButton.click();
    } catch (error) {
      temp = false;
    }
    await tab.waitForSelector(
      '[class="artdeco-button artdeco-button--2 artdeco-button--secondary ember-view"]'
    );
  }
}
openBrowser("https://www.linkedin.com/mynetwork/");
