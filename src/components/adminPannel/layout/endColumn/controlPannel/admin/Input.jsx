import { useFormik } from 'formik';
import { useDynamicCssClass } from '../../../../../../recoil/readStore';
import Typography from '../../../../../../styles/__ready/Typography';

export default ({ title, value, onChange ,error}) => {
  const cssClass = useDynamicCssClass();

  return (
    <div className="flex flex-column ">
      <section className={cssClass.ms_3 + ' mb-1'}>
        <Typography.H9 className={'font-400'}>{title}</Typography.H9>
      </section>
      <input
        className="border-r-20 px-3"
        style={{
          height: 48,
          width: 416,
          border: '2px solid #ececec',
          outline: '0',
        }}
        value={value}
        onChange={onChange}
        type="text"
      />
      <section className='mt-2'>
        <Typography.H10 className='text-danger'>{error}</Typography.H10>
      </section>
    </div>
  );
};
