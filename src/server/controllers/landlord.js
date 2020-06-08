import fetch from "node-fetch";

class LandlordController {
  async getOfficePageByRefCode(req, res) {
    try {
      const refId = req.params.refId;
      const office = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/offices/ref/${refId}/`
      );
      const officeDetails = await office.json();
      res.render("metaview", {
        url: req.protocol + "://" + req.get("host") + req.originalUrl,
        title: officeDetails.title,
        description: officeDetails.description,
        image:
          officeDetails.coverPhotos?.length > 0 &&
          officeDetails.coverPhotos[0].desktop.bucketPath
      });
    } catch (err) {
      console.log(err);
      res.status(400).send({
        msg: "Failed"
      });
    }
  }

  async getOfficePage(req, res) {
    try {
      const officeId = req.params.officeId;
      const office = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/offices/${officeId}/`
      );
      const officeDetails = await office.json();
      res.render("metaview", {
        url: req.protocol + "://" + req.get("host") + req.originalUrl,
        title: officeDetails.title,
        description: officeDetails.description,
        image:
          officeDetails.coverPhotos?.length > 0 &&
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

export default new LandlordController();
