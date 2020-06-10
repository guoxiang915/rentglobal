const fetch = require('node-fetch');

class LandlordController {
  async getOfficePageByRefCode(req, res) {
    try {
      const refId = req.params.refId;
      console.log(process.env.SERVER_URL);
      const office = await fetch(
        `${process.env.SERVER_URL}/offices/ref/${refId}/`
      );
      const officeDetails = await office.json();
      res.render("metaview", {
        url: req.protocol + "://" + req.get("host") + req.originalUrl,
        title: officeDetails.title,
        description: officeDetails.description,
        image:
          officeDetails.coverPhotos &&
          officeDetails.coverPhotos.length > 0 &&
          officeDetails.coverPhotos[0].desktop.bucketPath
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        msg: "Failed"
      });
    }
  }
}

module.exports = new LandlordController();
