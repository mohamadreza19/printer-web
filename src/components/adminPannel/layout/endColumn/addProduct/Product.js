import styles from './Product.module.css';
import Icons from '../../../../../styles/__ready/Icons';
import Typography from '../../../../../styles/__ready/Typography';
import UploadExcelButton from './UploadExcelButton';
import { ProductProvider, useProductContext } from './product.context';
import PopUp from './PopUp';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import Success from './Success';
import { AdminProduct_findOne } from '../../../../../reactQuery/admin/callGetService';
import { useTranslation } from 'react-i18next';

export default function () {
  return (
    <ProductProvider>
      <Product />
    </ProductProvider>
  );
}

function Product() {
  const { state, distapch } = useProductContext();
  const { t } = useTranslation();

  const page = state.page;

  return (
    <div className={styles['container']}>
      {page && page !== 3 ? (
        <header className={styles['header']}>
          <section className={styles['header-item']}>
            <Icons.AddNewProject classNameForPath="fill_black" />
            <Typography.H8 className={'font-500 '}>
              {!state.productId
                ? t('addNewProduct.AddNewProduct')
                : t('addNewProduct.editProduct')}
            </Typography.H8>
          </section>
          <section>{!state.productId ? <UploadExcelButton /> : null}</section>
        </header>
      ) : null}
      <ControlPages page={page} />
      <PopUp />
    </div>
  );
}
const ControlPages = ({ page }) => {
  switch (page) {
    case 1:
      return <PageOne />;
    case 2:
      return <PageTwo />;
    case 3:
      return <Success />;

    default:
      return <PageOne />;
  }
};
