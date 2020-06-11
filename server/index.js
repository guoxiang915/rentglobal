const dotenv = require('dotenv');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const fs = require('fs');

dotenv.config({ path: '.env' || '.env.example' });

app.set('view engine', 'jade');

const nonSpaRouter = require('./routes/nonSpaRoutes');

app.use((req, res, next) => {
  const userAgent = req.headers['user-agent'];
  if (/^(facebot)|(ia_archiver)|(facebookexternalhit)|(Twitterbot)|(Pinterest)|(InstagramBot)|(Googlebot)|(Googlebot-News)|(Googlebot-Image)|(Googlebot-Video)|(AdsBot-Googlebot)|(Bingbot)|(Slurp)|(Baiduspider)|(LinkedInBot)/gi.test(userAgent)) {
    nonSpaRouter(req, res, next);
  } else {
    next();
  }
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('*', function(request, response) {
  const filePath = path.resolve(__dirname, '../build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
