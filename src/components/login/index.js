import { Grid } from '@mui/material';
import { useDynamicCssClass } from '../../recoil/readStore';
import FooterButton from './layout/FooterButton';
import Header from './layout/Header';
import RememberPassword from './layout/RememberPassword';
import SelectedLanguage from './layout/SelectedLanguage';
import Slider from './layout/Slider';
import TextfiledsBox from './layout/TextfiledsBox';
import useCachedToken from '../../utility/useCachedToken';
import { UserLogin_Mutation } from '../../reactQuery/user/callPostServices';

export default function () {
  const cssClass = useDynamicCssClass();
  const reducer = useCachedToken();

  const { isLoading, error, data, mutate } = UserLogin_Mutation();

  function handleLogin(body) {
    mutate(body);
  }

  return (
    <Grid
      container
      className={'bg_secondray  vh100'}
      style={{
        minHeight: '768px',
      }}
    >
      <Grid
        item
        lg={6}
        md={6}
        sm={12}
        xs={12}
        className={
          cssClass.border_r_e_50px +
          ' bg_info py-4 h-100 d-flex flex-column justify-content-between'
        }
      >
        <Header />
        <TextfiledsBox handleLogin={handleLogin} error={error} />

        <SelectedLanguage />
      </Grid>
      <Grid className="h-100 bg_secondray " item lg={6} md={6}>
        <Slider />
      </Grid>
    </Grid>
  );
}
