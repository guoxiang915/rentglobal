import React, { useState } from "react";
import { withStyles, Card, CircularProgress } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Typography,
  Button,
  Link,
  Row,
  Column,
  Box,
  Stretch,
  UploadIcon,
  DeleteIcon
} from "../base-components";
import {
  CheckCircle,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@material-ui/icons";
import Dropzone from "react-dropzone";

const styleSheet = theme => ({
  root: {
    width: 192
  },

  title: {
    width: "100%",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    marginTop: 3
  },

  documents: {
    color: theme.colors.primary.lightGrey
  },

  fileNameWrapper: {
    width: 110,
    height: 24,
    overflow: "hidden",
    position: "relative"
  },

  fileName: {
    transition: "transform 1s linear",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    width: 110,
    "&:hover": {
      width: "fit-content",
      overflow: "visible",
      position: "absolute",
      transform: "translateX(calc(110px - 100%))"
    }
  }
});

/**
 * Function component for uploading document
 * @param {Object} props  Props for display UploadDocument component
 */
const UploadDocument = ({
  classes,
  t,
  documents,
  title,
  onUpload,
  onDownload,
  onDelete,
  uploading
}) => {
  const [current, setCurrent] = useState(0);

  const prevCurrent = () => setCurrent(current - 1);
  const nextCurrent = () => setCurrent(current + 1);
  const deleteCurrent = () => onDelete(documents[current]._id);
  const downloadCurrent = () =>
    onDownload(documents[current]._id, documents[current].fileName);

  const approved = documents && documents.find(item => item.approved === true);

  console.log(documents);

  return (
    <Card variant="outlined" className={classes.root}>
      <Column fullWidth padding>
        <Typography
          classes={{ box: classes.title }}
          fontSizeS
          textSecondary
          fullWidth
          justifyChildrenCenter
        >
          {title}
        </Typography>
        {documents && documents.length ? (
          <>
            <Row
              paddingTopHalf
              classes={{ box: classes.documents }}
              fontSizeXS
              fullWidth
              alignChildrenCenter
            >
              <Box style={{ width: 24, height: 24 }}>
                {current > 0 && (
                  <Link to="#" variant="secondaryLight" onClick={prevCurrent}>
                    <KeyboardArrowLeft />
                  </Link>
                )}
              </Box>
              <Stretch />
              <Box
                alignChildrenCenter
                classes={{ box: classes.fileNameWrapper }}
              >
                <Link
                  to="#"
                  onClick={downloadCurrent}
                  variant="normalLight"
                  styles={classes.fileName}
                >
                  {documents[current].fileName}
                </Link>
              </Box>
              <Stretch />
              <Box style={{ width: 24, height: 24 }}>
                {current < documents.length - 1 && (
                  <Link to="#" variant="secondaryLight" onClick={nextCurrent}>
                    <KeyboardArrowRight disabled />
                  </Link>
                )}
              </Box>
            </Row>
            {approved ? (
              <CheckCircle color="primary" />
            ) : (
              <Button
                variant="icon"
                link="secondaryLight"
                background="errorRedLight"
                outline="transparent"
                inverse
                onClick={deleteCurrent}
              >
                <Typography fontSizeXS>
                  <DeleteIcon style={{ width: 12, height: 13 }} />
                </Typography>
              </Button>
            )}
          </>
        ) : uploading ? (
          <Box style={{ paddingTop: 16, paddingBottom: 18 }}>
            <CircularProgress size={24} />
          </Box>
        ) : (
          <Dropzone multiple={false} onDrop={files => onUpload(files[0])}>
            {({ getRootProps, getInputProps }) => (
              <Button
                link="secondaryLight"
                background="transparent"
                outline="transparent"
                // onClick={onUpload}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Column fontSizeXS fontWeightMedium>
                  <Typography paddingTopHalf>
                    <UploadIcon style={{ width: 21, height: 19 }} />
                  </Typography>
                  <Typography>{t("upload")}</Typography>
                </Column>
              </Button>
            )}
          </Dropzone>
        )}
      </Column>
    </Card>
  );
};

export default withStyles(styleSheet, { name: "UploadDocument" })(
  withTranslation("common")(UploadDocument)
);
