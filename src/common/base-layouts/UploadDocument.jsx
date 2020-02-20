import React, { useState } from "react";
import { withStyles, Card } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import { Typography, Button, Link, Row, Column, Box } from "../base-components";
import {
  ArrowLeft,
  ArrowRight,
  CloudUploadOutlined,
  CheckCircle,
  DeleteOutline
} from "@material-ui/icons";

const styleSheet = theme => ({
  root: {
    width: 192
  },

  title: {
    width: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    marginTop: 3
  },

  documents: {
    color: theme.colors.primary.lightGrey
  },

  deleteButton: {
    border: `1px solid ${theme.colors.primary.lightGrey}`,
    color: theme.colors.primary.lightGrey,
    background: "none",
    "&:hover": {
      border: "none",
      color: theme.colors.primary.white,
      background: theme.colors.primary.errorRed
    }
  }
});

const UploadDocument = ({
  classes,
  t,
  documents,
  approved,
  title,
  onUpload,
  onDelete,
  ...props
}) => {
  const [current, setCurrent] = useState(0);
  
  return (
    <Card variant="outlined" className={classes.root}>
      <Column fullWidth padding>
        <Typography
          classes={{ box: classes.title }}
          fontSizeS
          textSecondary
          fullWidth
        >
          {title}
        </Typography>
        {documents && documents.length ? (
          <>
            <Row paddingTopHalf classes={{ box: classes.documents }} fontSizeXS>
              {current > 0 && (
                <Link to="" onClick={() => setCurrent(current - 1)}>
                  <ArrowLeft />
                </Link>
              )}
              <Typography paddingLeftHalf paddingRightHalf>
                {documents[current].name}
              </Typography>
              {current < documents.length - 1 && (
                <Link to="" onClick={() => setCurrent(current + 1)}>
                  <ArrowRight />
                </Link>
              )}
            </Row>
            {approved ? (
              <CheckCircle color="primary" />
            ) : (
              <Button
                variant="icon"
                className={classes.deleteButton}
                onClick={() => onDelete(current)}
              >
                <DeleteOutline />
              </Button>
            )}
          </>
        ) : (
          <Link onClick={onUpload}>
            <Typography paddingTop textLightGrey>
              <CloudUploadOutlined />
            </Typography>
            <Typography paddingTop textLightGrey fontSizeXS>
              {t("upload")}
            </Typography>
          </Link>
        )}
      </Column>
    </Card>
  );
};

export default withStyles(styleSheet, { name: "UploadDocument" })(
  withTranslation("common")(UploadDocument)
);
