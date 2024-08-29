import * as Yup from 'yup';
export default Yup.object({
  username: Yup.string()
    .min(4, 'Must be greater than 4 character ')
    .max(15, 'Must be 15 characters or less'),
  firstName: Yup.string()
    .min(4, 'Must be greater than 4 character ')
    .max(15, 'Must be 15 characters or less'),
  lastName: Yup.string()
    .min(4, 'Must be greater than 4 character ')
    .max(15, 'Must be 15 characters or less'),
  password: Yup.string().min(8, 'Must be at least 8 characters'),
});
