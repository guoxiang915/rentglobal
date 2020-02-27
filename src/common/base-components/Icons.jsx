import React from "react";
import { SvgIcon as MUISvgIcon, withStyles } from "@material-ui/core";
import clsx from "clsx";

import { ReactComponent as AddressSvg } from "../../assets/icon/icon_address_gray.svg";
import { ReactComponent as AlarmSvg } from "../../assets/icon/icon_alarm_graydark.svg";
import { ReactComponent as ArrowDownSvg } from "../../assets/icon/icon_arrow_down_graydark.svg";
import { ReactComponent as ArrowRightAltSvg } from "../../assets/icon/icon_arrow_right_alt.svg";
import { ReactComponent as ArrowUpSvg } from "../../assets/icon/icon_arrow_up_graydark.svg";
import { ReactComponent as CalendarSvg } from "../../assets/icon/icon_calendar_white.svg";
import { ReactComponent as CallSvg } from "../../assets/icon/icon_call_gray.svg";
import { ReactComponent as ChatSvg } from "../../assets/icon/icon_chat_white.svg";
import { ReactComponent as CheckSvg } from "../../assets/icon/icon_check_white.svg";
import { ReactComponent as CloseSvg } from "../../assets/icon/icon_close_white.svg";
import { ReactComponent as EditSvg } from "../../assets/icon/icon_edit_gray.svg";
import { ReactComponent as EmailSvg } from "../../assets/icon/icon_email_gray.svg";
import { ReactComponent as FormSvg } from "../../assets/icon/icon_form_white.svg";
import { ReactComponent as GridSvg } from "../../assets/icon/icon_grid_white.svg";
import { ReactComponent as HeartSvg } from "../../assets/icon/icon_heart_green.svg";
import { ReactComponent as HomeSvg } from "../../assets/icon/icon_home.svg";
import { ReactComponent as LockSvg } from "../../assets/icon/icon_lock_gray.svg";
import { ReactComponent as MenuSvg } from "../../assets/icon/icon_menu_green.svg";
import { ReactComponent as OfficeSvg } from "../../assets/icon/icon_office_white.svg";
import { ReactComponent as OptimizationSvg } from "../../assets/icon/icon_optimization.svg";
import { ReactComponent as PicSvg } from "../../assets/icon/icon_pic_gray.svg";
import { ReactComponent as SettingSvg } from "../../assets/icon/icon_setting_white.svg";
import { ReactComponent as SmilingFaceSvg } from "../../assets/icon/icon_smiling_face_green.svg";
import { ReactComponent as StarSvg } from "../../assets/icon/icon_start_green.svg";
import { ReactComponent as TicketSvg } from "../../assets/icon/icon_ticket_white.svg";
import { ReactComponent as TruckSvg } from "../../assets/icon/icon_truck_white.svg";
import { ReactComponent as UserSvg } from "../../assets/icon/icon_user.svg";
import { ReactComponent as MapPointerSvg } from "../../assets/icon/icon_map_pointer.svg";
import { ReactComponent as HelpSvg } from "../../assets/icon/icon_help.svg";
import { ReactComponent as TessiSvg } from "../../assets/icon/icon_tessi.svg";
import { ReactComponent as EditDocumentSvg } from "../../assets/icon/icon_edit_document.svg";
import { ReactComponent as FacebookSvg } from "../../assets/icon/icon_social_facebook_gray.svg";
import { ReactComponent as InstagramSvg } from "../../assets/icon/icon_social_instagram_gray.svg";
import { ReactComponent as LinkedinSvg } from "../../assets/icon/icon_social_linkedin_gray.svg";
import { ReactComponent as TwitterSvg } from "../../assets/icon/icon_social_twitter_gray.svg";
import { ReactComponent as BackSvg } from "../../assets/icon/icon_back_white.svg";
import { ReactComponent as CancelSvg } from "../../assets/icon/icon_cancel_white.svg";
import { ReactComponent as DeleteSvg } from "../../assets/icon/icon_delete_white.svg";
import { ReactComponent as FavSvg } from "../../assets/icon/icon_fav_white.svg";
import { ReactComponent as MapSvg } from "../../assets/icon/icon_map_white.svg";
import { ReactComponent as PhoneSvg } from "../../assets/icon/icon_phone_white.svg";
import { ReactComponent as RegisterSvg } from "../../assets/icon/icon_register_white.svg";
import { ReactComponent as SearchSvg } from "../../assets/icon/icon_search_white.svg";
import { ReactComponent as ShareSvg } from "../../assets/icon/icon_share_white.svg";
import { ReactComponent as SignoutSvg } from "../../assets/icon/icon_signout.svg";
import { ReactComponent as CompanyRegisterSvg } from "../../assets/icon/icon_company_register.svg";
import { ReactComponent as LandlordRegisterSvg } from "../../assets/icon/icon_landlord_register.svg";

const styleSheet = theme => ({
  primary: {
    color: theme.colors.primary.mainColor,
    opacity: 1
  },
  normal: {
    color: theme.colors.primary.darkGrey,
    opacity: 0.15
  },
  white: {
    color: theme.colors.primary.white,
    opacity: 1
  },
  errorRed: {
    color: theme.colors.primary.errorRed,
    opacity: 1
  }
});

export const SvgIcon = withStyles(styleSheet, { name: "SvgIcon" })(
  ({ src, variant, className, classes, styles, ...props }) => {
    const C = src;

    return (
      <MUISvgIcon
        component={({ viewBox, ...props }) => <C {...props} />}
        className={clsx(variant && classes[variant], styles, className)}
        {...props}
      />
    );
  }
);

export const AddressIcon = props => <SvgIcon src={AddressSvg} {...props} />;
export const AlarmIcon = props => <SvgIcon src={AlarmSvg} {...props} />;
export const ArrowDownIcon = props => <SvgIcon src={ArrowDownSvg} {...props} />;
export const ArrowUpIcon = props => <SvgIcon src={ArrowUpSvg} {...props} />;
export const ArrowRightAltIcon = props => (
  <SvgIcon src={ArrowRightAltSvg} {...props} />
);
export const CallIcon = props => <SvgIcon src={CallSvg} {...props} />;
export const ChatIcon = props => <SvgIcon src={ChatSvg} {...props} />;
export const CheckIcon = props => <SvgIcon src={CheckSvg} {...props} />;
export const CloseIcon = props => <SvgIcon src={CloseSvg} {...props} />;
export const EditIcon = props => <SvgIcon src={EditSvg} {...props} />;
export const EmailIcon = props => <SvgIcon src={EmailSvg} {...props} />;
export const LockIcon = props => <SvgIcon src={LockSvg} {...props} />;
export const MenuIcon = props => <SvgIcon src={MenuSvg} {...props} />;
export const StarIcon = props => <SvgIcon src={StarSvg} {...props} />;
export const TruckIcon = props => <SvgIcon src={TruckSvg} {...props} />;
export const HomeIcon = props => <SvgIcon src={HomeSvg} {...props} />;
export const TessiIcon = props => <SvgIcon src={TessiSvg} {...props} />;
export const UserIcon = props => <SvgIcon src={UserSvg} {...props} />;
export const HelpIcon = props => <SvgIcon src={HelpSvg} {...props} />;
export const EditDocumentIcon = props => (
  <SvgIcon src={EditDocumentSvg} {...props} />
);
export const MapPointerIcon = props => (
  <SvgIcon src={MapPointerSvg} {...props} />
);
export const DashboardIcon = props => <SvgIcon src={GridSvg} {...props} />;
export const NoteIcon = props => <SvgIcon src={FormSvg} {...props} />;
export const OptimizationIcon = props => (
  <SvgIcon src={OptimizationSvg} {...props} />
);
export const CalendarIcon = props => <SvgIcon src={CalendarSvg} {...props} />;
export const TicketIcon = props => <SvgIcon src={TicketSvg} {...props} />;
export const SettingIcon = props => <SvgIcon src={SettingSvg} {...props} />;
export const OfficeIcon = props => <SvgIcon src={OfficeSvg} {...props} />;
export const ImageIcon = props => <SvgIcon src={PicSvg} {...props} />;
export const EmojiIcon = props => <SvgIcon src={SmilingFaceSvg} {...props} />;
export const HeartIcon = props => <SvgIcon src={HeartSvg} {...props} />;
export const FacebookIcon = props => <SvgIcon src={FacebookSvg} {...props} />;
export const InstagramIcon = props => <SvgIcon src={InstagramSvg} {...props} />;
export const TwitterIcon = props => <SvgIcon src={TwitterSvg} {...props} />;
export const LinkedinIcon = props => <SvgIcon src={LinkedinSvg} {...props} />;
export const BackIcon = props => <SvgIcon src={BackSvg} {...props} />;
export const CancelIcon = props => <SvgIcon src={CancelSvg} {...props} />;
export const DeleteIcon = props => <SvgIcon src={DeleteSvg} {...props} />;
export const FavoriteIcon = props => <SvgIcon src={FavSvg} {...props} />;
export const MapIcon = props => <SvgIcon src={MapSvg} {...props} />;
export const PhoneIcon = props => <SvgIcon src={PhoneSvg} {...props} />;
export const RegisterIcon = props => <SvgIcon src={RegisterSvg} {...props} />;
export const SearchIcon = props => <SvgIcon src={SearchSvg} {...props} />;
export const ShareIcon = props => <SvgIcon src={ShareSvg} {...props} />;
export const PowerIcon = props => <SvgIcon src={SignoutSvg} {...props} />;
export const UsersIcon = props => (
  <SvgIcon src={CompanyRegisterSvg} {...props} />
);
export const BuildingsIcon = props => (
  <SvgIcon src={LandlordRegisterSvg} {...props} />
);
