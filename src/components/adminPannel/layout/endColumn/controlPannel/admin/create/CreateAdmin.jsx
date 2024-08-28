import { useFormik } from 'formik';
import { TextFieldFUN_v3 } from '../../../../../../../styles/__ready/Textfields';
import Header from '../Header';
import Input from '../Input';
import { t } from 'i18next';
import Buttons from '../../../../../../../styles/__ready/Buttons';
import Typography from '../../../../../../../styles/__ready/Typography';
import validateAdmin from '../validateAdmin';

const CreateAdmin = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      Role: 'admin',
      firstName: '',
      lastName: '',
    },
    onSubmit: (values) => {
      console.log('Form data', values);
    },
    validationSchema: validateAdmin,
  });

  const handleChangeUsername = (event) => {
    formik.setFieldValue('username', event.target.value);
  };
  const handleChangePassword = (event) => {
    formik.setFieldValue('password', event.target.value);
  };
  const handleChangeFirstName = (event) => {
    formik.setFieldValue('firstName', event.target.value);
  };
  const handleChangeLastName = (event) => {
    formik.setFieldValue('lastName', event.target.value);
  };
  return (
    <div className="w-100 h_100vh">
      <Header />

      <div className="d-flex flex-wrap gap-3 py-3 px-3">
        <Input
          title={t('admin.username')}
          onChange={handleChangeUsername}
          value={formik.values.username}
        />
        <Input
          title={t('admin.firstName')}
          onChange={handleChangeFirstName}
          value={formik.values.firstName}
        />
        <Input
          title={t('admin.lastName')}
          onChange={handleChangeLastName}
          value={formik.values.lastName}
        />
        <Input
          title={t('admin.password')}
          onChange={handleChangePassword}
          value={formik.values.password}
        />

        <AddUserButton
          onlick={formik.handleSubmit}
          value={t('admin.addNewAdmin')}
        />
      </div>
    </div>
  );
};

export default CreateAdmin;
const AddUserButton = ({ value, onlick }) => {
  return (
    <div className="w-100 d-flex justify-content-end">
      <Buttons.Contained onClick={onlick} className="button_large border-r-20 ">
        <Typography.H7 className="font-400">{value}</Typography.H7>
      </Buttons.Contained>
    </div>
  );
};
