/*
* Author: Duong Han
* HUST
* AdminSider Messages
*
* This contains all the text for the AdminSider component.
*/

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AdminSider';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the AdminSider component!',
  },

  subMenuSurvey: {
    id: `${scope}.subMenuSurvey`,
    defaultMessage: 'Mẫu khảo sát',
  },

  subMenuStatistic: {
    id: `${scope}.subMenuStatistic`,
    defaultMessage: 'Thống kê',
  },

  subMenuChart: {
    id: `${scope}.subMenuChart`,
    defaultMessage: 'Biểu đồ',
  },

  menuItemAccount: {
    id: `${scope}.menuItemAccount`,
    defaultMessage: 'Quản lý tài khoản',
  },

  menuItemSurvey: {
    id: `${scope}.menuItemSurvey`,
    defaultMessage: 'Quản lý khảo sát',
  },

  menuItemDashboard: {
    id: `${scope}.menuItemDashboard`,
    defaultMessage: 'Bảng điều khiển',
  },

  menuItemCheck: {
    id: `${scope}.menuItemCheck`,
    defaultMessage: 'Khảo sát tâm lý học sinh trung học',
  },

  menuItemNEO: {
    id: `${scope}.menuItemNEO`,
    defaultMessage: 'Trắc nghiệm dự đoán nhân cách',
  },

  menuItemRIASEC: {
    id: `${scope}.menuItemRIASEC`,
    defaultMessage: 'Trắc nghiệm tư vấn nghề nghiệp',
  },

  menuItemMOC: {
    id: `${scope}.menuItemMOC`,
    defaultMessage: 'Tham vấn ý kiến người dùng/chuyên gia',
  },

  menuItemMOC2: {
    id: `${scope}.menuItemMOC2`,
    defaultMessage: 'Khảo sát kết quả tập huấn UDA',
  },
});
