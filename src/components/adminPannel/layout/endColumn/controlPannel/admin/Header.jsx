import {
  useContent_Based_Language,
  useDynamicCssClass,
} from '../../../../../../recoil/readStore';
import Icons from '../../../../../../styles/__ready/Icons';
import Typography from '../../../../../../styles/__ready/Typography';
import Buttons from '../../../../../../styles/__ready/Buttons';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';

export default function () {
  const cssClass = useDynamicCssClass();

  return (
    <div className={'w-100 d-flex  px-4'}>
      <section className="w-100 d-flex    pb-3 border-bottom-gray">
        <Icons.AddNewProject classNameForPath="fill_black" />
        <Typography.H8 className={'font-500 ' + cssClass.ms_2}>
          {t('admin.addNewAdmin')}
        </Typography.H8>
      </section>
    </div>
  );
}
