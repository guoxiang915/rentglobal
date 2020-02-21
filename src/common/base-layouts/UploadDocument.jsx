import React, { useState } from "react";
import { withStyles, Card } from "@material-ui/core";
import { withTranslation } from "react-i18next";
import {
  Typography,
  Button,
  Link,
  Row,
  Column,
  Box,
  Stretch
} from "../base-components";
import {
  ArrowLeft,
  ArrowRight,
  CloudUploadOutlined,
  CheckCircle,
  DeleteOutline,
  KeyboardArrowLeft,
  KeyboardArrowRight
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
            >
              <Box>
                {current > 0 && (
                  <Link
                    to="#"
                    variant="secondaryLight"
                    onClick={() => setCurrent(current - 1)}
                  >
                    <KeyboardArrowLeft />
                  </Link>
                )}
              </Box>
              <Stretch />
              <Typography paddingLeftHalf paddingRightHalf>
                {documents[current].name}
              </Typography>
              <Stretch />
              <Box>
                {current < documents.length - 1 && (
                  <Link
                    to="#"
                    variant="secondaryLight"
                    onClick={() => setCurrent(current + 1)}
                  >
                    <KeyboardArrowRight />
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
                onClick={() => onDelete(current)}
              >
                <Typography fontSizeXS>
                  <DeleteOutline />
                </Typography>
              </Button>
            )}
          </>
        ) : (
          <Button
            link="secondaryLight"
            background="transparent"
            outline="transparent"
            onClick={onUpload}
          >
            <Column fontSizeXS fontWeightMedium>
              <Typography paddingTopHalf>
                <CloudUploadOutlined />
              </Typography>
              <Typography>{t("upload")}</Typography>
            </Column>
          </Button>
        )}
      </Column>
    </Card>
  );
};

export default withStyles(styleSheet, { name: "UploadDocument" })(
  withTranslation("common")(UploadDocument)
);
