import { Grid } from '@mui/material';
import Buttons from '../../../../../styles/__ready/Buttons';
import Icons from '../../../../../styles/__ready/Icons';
import Typography from '../../../../../styles/__ready/Typography';
import TextFields from '../../../../../styles/__ready/Textfields';
import { useTranslation } from 'react-i18next';
export default function ({
  isAllowShowBookmarkedLabel = false,
  setIsAllowShowBookmarkedLabel = () => {},
  setSearch = () => {},
  content = {
    labelList: ' ',
    selectedLabelButton: ' ',
    searchPlaceHolder: ' ',
  },
  margin = { ms_1: ' ', ms_2: ' ', ms_auto: ' ' },
  padding = { pe_1: ' ', pe_2: ' ' },
  search,
}) {
  function handleOnClickBookmarkedLabel() {
    setIsAllowShowBookmarkedLabel((draft) => !draft);
  }
  const { t } = useTranslation();
  return (
    <header className="w-100  px-4">
      <Grid container className="border-bottom-gray pb-3">
        <Grid item lg={6} className="d-flex">
          <div className={'w-100 d-flex align-items-center ' + padding.pe_1}>
            <Icons.Labels classNameForPath="fill_black" />
            <Typography.H8 className={'font-500 ' + margin.ms_2}>
              {t('listOfLabels.listOfLabels')}
            </Typography.H8>
            {/* // */}
            <Buttons.Outlined
              className={margin.ms_auto}
              onClick={handleOnClickBookmarkedLabel}
            >
              <Icons.Star1 />
              <Typography.Button className={margin.ms_1}>
                {t('listOfLabels.selectedLabels')}
              </Typography.Button>
            </Buttons.Outlined>
          </div>
        </Grid>
        <Grid item lg={6}>
          <div className="w-100 d-flex align-item-center">
            <TextFields.v2_SearchBox
              value={search}
              onClickAndGetValeFn={setSearch}
              placeholder={t('listOfLabels.labelSearch')}
              Input_marginStart_based_Language={margin.ms_1}
            />
          </div>
        </Grid>
      </Grid>
    </header>
  );
}
