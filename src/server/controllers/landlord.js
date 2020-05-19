class LandlordController {
  getOfficePage(req, res, next) {
    res.render('metaview', {
      url: req.protocol + '://' + req.get('host') + req.originalUrl,
      title: 'RentGlobal Real Estate Application',
      description: 'This is a rentglobal real estate test page',
      image: 'https://rentglobal.s3.amazonaws.com/2020/4/1181a21c684063daba/blob',
      content: 'RentGlobalRealContent'
    });
  }
}

export default new LandlordController();
