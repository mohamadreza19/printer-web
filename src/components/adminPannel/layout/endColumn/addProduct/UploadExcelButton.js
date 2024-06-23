import { Component } from 'react';
import styles from './Product.module.css';
import Buttons from '../../../../../styles/__ready/Buttons';
import Typography from '../../../../../styles/__ready/Typography';
import { AdminAddExcelFile_Mutation as send_excel_file } from '../../../../../reactQuery/admin/callPostService';
import { useProductContext } from './product.context';
import { t } from 'i18next';

export default function Container() {
  const { state, distapch } = useProductContext();

  function toggleShowPopup() {
    distapch({
      type: 'CHANGE_POPUP__OPEN_STATUS',
    });
  }
  return (
    <div>
      <Buttons.Outlined onClick={toggleShowPopup}>
        <Typography.H8>{t('excelUpload')}</Typography.H8>
      </Buttons.Outlined>
    </div>
  );
}
