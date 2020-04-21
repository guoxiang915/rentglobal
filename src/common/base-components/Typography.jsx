import React from 'react';
import { Box } from './Box';

export const Typography = Box;

export const PrimaryText = (props) => <Typography textDarkGrey fontSizeM {...props} />;

export const SecondaryText = (props) => <Typography textMediumGrey fontSizeM {...props} />;

export const Subtitle = (props) => <Typography textBlack fontSizeM {...props} />;

export const SectionHeader = (props) => <Typography uppercase textBlack bold fontSizeXS {...props} />;

export const ModalHeader = (props) => <Typography textBlack fontSizeL fontWeightMedium {...props} />;

export const Caption = (props) => <Typography textMediumGrey fontSizeXS {...props} />;

export const SmallText = (props) => <Typography textMediumGrey fontSizeS {...props} />;
