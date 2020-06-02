const PercyScript = require("@percy/script");

PercyScript.run(async (page, percySnapshot) => {
  await page.goto("https://rentglobal-frontend.herokuapp.com/");
  await percySnapshot("homepage");

  await page.goto("https://rentglobal-frontend.herokuapp.com/auth/login/");
  await percySnapshot("login page");
});
