import { Input, TextField } from '@mui/material';
import ContentEditable from 'react-contenteditable';
import { useDynamicCssClass, useLanguage } from '../../recoil/readStore';
import Icons from './Icons';
import Typography from './Typography';
import { useRecoilState, useRecoilValue } from 'recoil';
//
import { isView } from '../../recoil/userEditorStore/selectionButtonsStore/actionButton';
import { useEffect, useRef, useState } from 'react';
import shortid from 'shortid';
import Barcode from 'react-barcode';
import { QRCodeSVG } from 'qrcode.react';
import styled from 'styled-components';
import useLocalStorage from 'react-use-localstorage';
export default class {
  static v1({ children = '', className = '' }) {
    return <TextField className={className} />;
  }
  static v2({
    children = '',
    className = '',
    Input_marginStart_based_Language = 'ms-3',
    value = ' ',
    onChange = () => {},
  }) {
    return (
      <div
        className={
          'w-100 bg-white border py-3 px-3 d-flex align-items-center border-r-20 ' +
          className
        }
      >
        <input
          className={'text-filed-input-v2 ' + Input_marginStart_based_Language}
          // value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
    );
  }
  static v3({
    children = '',
    className = '',
    Input_marginStart_based_Language = 'ms-3',
    value = ' ',
    onChange = () => {},
  }) {
    return (
      <div
        className={
          ' bg-white border  d-flex align-items-center border-r-20 ' + className
        }
      >
        <input
          className={
            'text-filed-input-v2 text-filed-medium ' +
            Input_marginStart_based_Language
          }
          // value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
    );
  }
  static v4({
    children = '',
    className = '',
    Input_marginStart_based_Language = 'ms-3',
    value = ' ',
    onChange = () => {},
  }) {
    return (
      <div
        className={
          ' bg-white border  d-flex align-items-center border-r-20 ' + className
        }
      >
        <input
          className={
            'text-filed-input-v2  text-filed-large ' +
            Input_marginStart_based_Language
          }
          // value={value}
          onChange={(e) => onChange(e)}
        />
      </div>
    );
  }
  static v2_SearchBox({
    children = '',
    className = '',
    Input_marginStart_based_Language = 'ms-3',
    placeholder = '',
    iconMarginStart = ' ',

    onClickAndGetValeFn = () => {},
  }) {
    return (
      <div
        className={
          'w-100 bg-white border py-2 px-3 d-flex align-items-center justify-content-between border-r-20 ' +
          className
        }
        style={{
          height: '52px',
        }}
      >
        <input
          style={{
            position: 'relative',
            top: '-0.1rem',
          }}
          value={localStorage.getItem('search')}
          id="serach-input"
          placeholder={placeholder}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              // Perform your desired action here
              const value = event.target.value;
              onClickAndGetValeFn(value);
            }
          }}
          onChange={(e) => {
            const value = e.target.value;
            setTimeout(() => {
              localStorage.setItem('sreach', value);

              onClickAndGetValeFn(value);
            }, 500);
            if (value === '') {
              onClickAndGetValeFn('');
            }
          }}
          // placeholder="جست و جو بر اساس نام پروژه"
          className={
            'w-100 text-filed-input-v2 placeholder-v1 ' +
            Input_marginStart_based_Language
          }
        />
        <span
          className={'cur-pointer ' + iconMarginStart}
          onClick={() => {
            const serach_input = document.getElementById('serach-input');
            const value = serach_input.value;

            onClickAndGetValeFn(value);
          }}
        >
          <Icons.Search />
        </span>
      </div>
    );
  }

  static v2_password({
    children = '',
    className = '',
    Input_marginStart_based_Language = 'ms-3',
  }) {
    return (
      <div className={'login-input-box px-3 ' + className}>
        <img src="/svg/icon/password.svg" className="" />
        <input
          className={'text-filed-input-v2 ' + Input_marginStart_based_Language}
        />
      </div>
    );
  }
}
export const UserNameTextField = ({
  content = 'content',
  children = '',
  className = '',
  Input_marginStart_based_Language = 'ms-3',
  value = '',

  onChange = () => {},
}) => {
  return (
    <div className="d-flex flex-column mb-3">
      <Typography.H6>{content}</Typography.H6>
      <section className={'login-input-box px-3 ' + className}>
        <Icons.UserName />
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={'text-filed-input-v2 ' + Input_marginStart_based_Language}
        />
      </section>
    </div>
  );
};

export const LoginPasswordTextField = ({
  content = 'content',
  children = '',
  className = '',
  Input_marginStart_based_Language = 'ms-3',
  value = '',
  onChange = () => {},
  onEnterKeyDown = () => {},
}) => {
  function changeIcon() {
    const input = document.getElementById('password-v1');
    eyeContriller();
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }
  function eyeContriller() {
    const input = document.getElementById('password-v1');
    const container = document.getElementById('password-input-icon');

    if (input.type === 'password') {
      const svgString = `<svg width="24" height="24" fill="#CBCBCB" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>`;

      container.innerHTML = svgString;
    } else {
      const svgString = `<svg width="24" height="24" fill="#CBCBCB" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>`;
      container.innerHTML = svgString;
    }
  }
  return (
    <div className="d-flex flex-column mt-4">
      <Typography.H6>{content}</Typography.H6>
      <section className={'login-input-box px-3 ' + className}>
        <img src="/svg/icon/password.svg" className="" />
        <input
          name="password"
          type="password"
          id="password-v1"
          value={value}
          onChange={onChange}
          className={'text-filed-input-v2  ' + Input_marginStart_based_Language}
          onKeyDown={(e) => {
            const key = e.key;

            if (key === 'Enter') {
              onEnterKeyDown();
            }
          }}
        />
        <div
          onClick={changeIcon}
          id="password-input-icon"
          className="password-input-icon "
        >
          <svg
            width="24"
            height="24"
            fill="#CBCBCB"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
          </svg>
        </div>
      </section>
    </div>
  );
};
export const EditorSearchBox = ({
  children = '',
  className = '',
  Input_marginStart_based_Language = 'ms-3',
  placeholder = 'نام محصول',
  iconMarginStart = ' ',
  setSearch = () => {},
}) => {
  const cssClass = useDynamicCssClass();
  function onChangeValue(e) {
    const value = e.target.value;
    setTimeout(() => setSearch(value), 500);
  }
  return (
    <div
      style={{
        width: '320px',
        height: '64px',
      }}
      className={` bg-white border py-2  d-flex align-items-center justify-content-between border-r-20
      ${cssClass.ps_2} ${cssClass.pe_1} ${className} `}
    >
      <input
        onChange={onChangeValue}
        style={{
          position: 'relative',
          top: '-0.1rem',
        }}
        placeholder={placeholder}
        // placeholder="جست و جو بر اساس نام پروژه"
        className={
          ' editor-searchbox-input placeholder-v1 ' +
          Input_marginStart_based_Language
        }
      />
      <section
        className={
          'cur-pointer bg_primary d-flex justify-content-center align-items-center   ' +
          iconMarginStart
        }
        style={{ width: '60px', height: '52px' }}
      >
        <Icons.Search className="fill_white " cls={'editor-search-icon'} />
      </section>
    </div>
  );
};
export const TextFieldFUN_v3 = ({
  value = ' ',
  onChange = ' ',
  placeholder = ' ',
  className = ' ',
  type = 'text',
}) => {
  const cssClass = useDynamicCssClass();
  const lan = useLanguage();
  return (
    <div
      className={` h-100   d-flex align-items-center border-r-20 ${className}`}
    >
      <input
        className={`text-filed-input-v2 
          ${cssClass.ms_2}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
        style={{
          textAlign: lan === 'fa' ? 'right' : 'left',
        }}
      />
    </div>
  );
};
export const TextFieldFUN_v4 = ({
  value = ' ',
  onChange = ' ',
  placeholder = ' ',
  className = ' ',
}) => {
  const cssClass = useDynamicCssClass();

  return (
    <div
      className={` bg-white border  d-flex align-items-center border-r-20 ${className}`}
    >
      <input
        className={`text-filed-input-v2 text-filed-large
          ${cssClass.ms_2}`}
        // value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
export const TextField_small_Custom = ({
  value = ' ',
  onChange = () => {},
  placeholder = ' ',
  className = ' ',
  type = 'text',
}) => {
  const cssClass = useDynamicCssClass();
  const language = useLanguage();

  return (
    <div
      className={` bg-white border  d-flex align-items-center border-r-20  ${className}`}
    >
      <span className={cssClass.ms_2}>ml</span>
      <input
        type={type}
        className={`text-filed-input-v2 text-filed-large
          ${cssClass.ms_2}`}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{
          textAlign: language === 'fa' ? 'right' : 'left',
        }}
      />
    </div>
  );
};
export const TextFieldFUN_v5 = ({
  value = '',
  onChange = () => {},
  placeholder = ' ',
  className = ' ',
  ImputclassName = '',
}) => {
  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  const changedClass = language == 'fa' ? ' ' : 'font-English';

  return (
    <article className="text-filed-medium-v1">
      <div
        className={` bg-white border   d-flex align-items-center border-r-20 ${className}`}
      >
        <input
          className={`${ImputclassName} text-filed-input-v2 text-filed-large
          ${cssClass.ms_2}`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
      <footer className={'w-100 d-flex justify-content-end px-2 mt-1'}>
        <Typography.Button_v2
          className={'font-400 disabled_gray2 ' + changedClass}
        >
          {value.length}/120
        </Typography.Button_v2>
      </footer>
    </article>
  );
};
export const TextFieldFUN_v5_Big = ({
  value = '',
  onChange = () => {},
  placeholder = ' ',
  className = ' ',
  InputclassName = '',
}) => {
  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  const changedClass = language == 'fa' ? ' ' : 'font-English';

  return (
    <>
      <div
        className={` bg-white border  d-flex align-items-start border-r-20 ${className}  p-2`}
      >
        <textarea
          className={`${InputclassName} 
          text-filed-input-v2 
          test-area-big
          ${cssClass.ms_2}`}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
        />
      </div>
      <footer className={'w-100 d-flex justify-content-end px-2 mt-1'}>
        <Typography.Button_v2
          className={'font-400 disabled_gray2 ' + changedClass}
        >
          {value.length}/120
        </Typography.Button_v2>
      </footer>
    </>
  );
};
export const TextFieldFUN_ClipBoardBadge = ({
  value = ' ',
  onChange = () => {},
  placeholder = ' ',
  className = ' ',
  footerNumber = '0',
}) => {
  const cssClass = useDynamicCssClass();
  const language = useLanguage();
  const changedClass = language == 'fa' ? ' ' : 'font-English';

  return (
    <>
      <div
        className={` bg-white border language-card-select px-1   d-flex align-items-center border-r-20 ${className}`}
      >
        <span className="d-flex justify-content-center align-items-center bg_primary border-r-16 badge_1">
          <Icons.ClipBoard size="medium-sm" />
        </span>
        <input
          className={` text-filed-input-v2 text-filed-large
          ${cssClass.ms_2}`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </>
  );
};
export const Editor_Cell_Input = ({
  allowReplaceInputToDiv = false,
  value = '',
  onChange = () => {},
  isSelection = false,
  onClick = () => {},
  style = {
    fontFamily: '',
    fontStyle: '',
    angle: 0,
    fontSize: '',
  },
  isBarcode = false,
  isQrcode = false,
  borderWidthBasedDpi,
  // parentWidth = 0,
  // parentHeight = 0,
}) => {
  const isViewMode = useRecoilValue(isView);
  const ref = useRef(null);
  const barCodeRef = useRef(null);
  const qrcodeRef = useRef(null);
  useEffect(() => {
    if (isBarcode) {
      barCodeRef.current.renderElementRef.current.style.rotate = `${style.angle}deg`;
      barCodeRef.current.renderElementRef.current.style.padding = `${style.padding}px`;
    }
    // if (parentWidth || parentHeight) {
    //   if (ref.current) {
    //     const input = ref.current;

    //     input.style.width = parentWidth + "px";
    //     input.style.height = parentHeight + "px";
    //   }
    // }
  }, [
    style.angle,
    style.padding,
    // parentWidth, parentHeight
  ]);
  const BarcodeAndQrCodeController = () => {
    if (isBarcode) {
      return (
        <Barcode
          value={value}
          fontSize={style.fontSize}
          displayValue={false}
          margin={style.margin}
          ref={barCodeRef}
        />
      );
    }
    if (isQrcode) {
      return (
        <QRCodeSVG
          value={value}
          width="100%"
          height="100%"
          rotate={`${style.angle}deg`}
          style={{
            rotate: `${style.angle}deg`,
            margin: `${style.margin}px 0`,
            padding: `${style.padding}px`,
          }}
        />
      );
    }
  };

  return (
    <>
      {isBarcode || isQrcode ? (
        <BarcodeAndQrCodeController />
      ) : (
        <>
          {!isSelection ? (
            <div
              ref={ref}
              className="d-flex align-items-center   "
              style={{
                color: 'black',
                fontFamily: style.fontFamily,
                fontWeight: style.fontStyle == 'bold' ? 600 : 400,
                fontSize: style.fontSize,
                fontStyle: style.fontStyle == 'italic' ? 'italic' : 'normal',
                textDecoration:
                  style.fontStyle == 'underline' ? 'underline' : 'none',
                textAlign: style.textAlign,
                rotate: `${style.angle}deg`,
                // marginRight: borderWidthBasedDpi + "px",
              }}
            >
              {/* <span style={{ textAlign: style.textAlign }} className="m-auto"> */}
              {value}
              {/* </span> */}
            </div>
          ) : (
            <input
              ref={ref}
              className="editor-cell-input  "
              value={value || ''}
              style={{
                // marginRight: borderWidthBasedDpi + "px",
                fontFamily: style.fontFamily,
                fontWeight: style.fontStyle == 'bold' ? 600 : 400,
                fontSize: style.fontSize,
                fontStyle: style.fontStyle == 'italic' ? 'italic' : 'normal',
                textDecoration:
                  style.fontStyle == 'underline' ? 'underline' : 'none',
                textAlign: style.textAlign,
                rotate: `${style.angle}deg`,
                // margin: `${style.margin}px `,
                padding: `${style.padding}px`,
              }}
              onClick={() => {
                onClick();
              }}
              onChange={(e) => {
                onChange(e.target.value);
              }}
              id="text"
            />
          )}
        </>
      )}
    </>
  );
};
const RelacedToDiv = ({
  style = {
    fontFamily: '',
    fontWeight: '',
    fontStyle: '',
    textAlign: '',
    angle: '',
    margin: '',
    padding: '',
  },
  value = '',
}) => {
  function lookTextAlignToConvertFlex(textAlign) {
    if (textAlign === 'right') return 'start';
    if (textAlign === 'center') return 'center';
    if (textAlign === 'left') return 'end';
    return 'center';
  }
  console.log({ style });
  return (
    <Div
      style={
        {
          // justifyContent: lookTextAlignToConvertFlex(style.textAlign),
        }
      }
      rootStyle={style}
      justify={lookTextAlignToConvertFlex(style.textAlign)}
    >
      {value}
    </Div>
  );
};
const Div = styled.div`
  width: 100% !important;
  height: 100% !important;
  display: flex;
  justify-content: ${({ justify }) => justify};
  align-items: center;
  rotate: ${({ rootStyle }) => rootStyle.angle}deg;
  font-family: ${({ rootStyle }) => rootStyle.fontFamily};
  font-weight: ${({ rootStyle }) =>
    rootStyle.fontWeight == 'bold' ? 600 : 400};
  font-size: ${({ rootStyle }) => rootStyle.fontSize};
  font-style: ${({ rootStyle }) =>
    rootStyle.fontStyle == 'italic' ? 'italic' : 'normal'};
  color: black;
  padding: ${({ rootStyle }) => rootStyle.padding}px;
  margin: ${({ rootStyle }) => rootStyle.padding}px 0;
`;
