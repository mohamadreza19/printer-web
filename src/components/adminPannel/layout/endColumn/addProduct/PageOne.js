import { Component, useState } from 'react';

import styles from './Product.module.css';
import Typography from '../../../../../styles/__ready/Typography';
import { Navigate, useNavigate } from 'react-router-dom';
import { useProductContext } from './product.context';
import Buttons from '../../../../../styles/__ready/Buttons';
import { useTranslation } from 'react-i18next';

export default function PageOne() {
  const { state, distapch } = useProductContext();
  const [productNameCardLang, setProductNameCardLang] = useState('persian');
  const [productDescriptionCardLang, setProductDescriptionCardLang] =
    useState('persian');
  const navigate = useNavigate();
  const { t } = useTranslation();
  function onChangeSelect(event) {
    const value = event.target.value;

    navigate('/admin/' + value);
  }
  function handleChangeProductnameCardLang(value) {
    const selectedlan = value;

    setProductNameCardLang(selectedlan);
  }
  function handleChangeProductDescriptionCardLang(value) {
    const selectedlan = value;

    setProductDescriptionCardLang(selectedlan);
  }
  function handleChangeProductName(event) {
    const value = event.target.value;
    const action = {
      type: 'CHANGE_NAME',
      payload: {
        target: productNameCardLang,
        value,
      },
    };
    distapch(action);
  }
  function handleChangeProductDescription(event) {
    const value = event.target.value;
    const action = {
      type: 'CHANGE_DESCRIPTION',
      payload: {
        target: productDescriptionCardLang,
        value,
      },
    };
    distapch(action);
  }
  function readCurrentClipboard(event) {}
  function handleChangeLink(event) {
    const value = event.target.value;
    const action = {
      type: 'CHANGE_LINK',
      payload: value,
    };
    distapch(action);
  }
  function nextPage() {
    const { name, link, description } = state;
    var urlPattern =
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;

    if (name.persian.length < 4) {
      callErr('name', t('addNewProduct.persianNameErr'));
      return;
    }
    if (name.english.length < 4) {
      callErr('name', t('addNewProduct.englishNameErr'));
      return;
    }
    if (name.turkish.length < 4) {
      callErr('name', t('addNewProduct.turkishNameErr'));
      return;
    }

    if (urlPattern.test(link.value) === false) {
      callErr('link', 'لینک وارد شده معتبر نمی باشد');
      return;
    }
    distapch({ type: 'NEXT_PAGE' });

    function callErr(target, value) {
      const action = {
        type: 'ERROR',
        payload: {
          target,
          value,
        },
      };
      distapch(action);
    }
  }

  return (
    <div className={styles['page-1-container']}>
      <section className={styles['input-box'] + ' ' + styles['input-medium']}>
        <select onChange={onChangeSelect} className="w-100">
          <option value="add-product">
            <Typography.H8>{t('addNewProduct.addNewProduct2')}</Typography.H8>
          </option>
          <option value="add-label-beta">
            <Typography.H8>{t('addNewLabel.addNewLabel')}</Typography.H8>
          </option>
        </select>
      </section>
      <section className={styles['input-box'] + ' ' + styles['input-medium']}>
        <label>
          <Typography.H8>{t('addNewProduct.productName')}</Typography.H8>
        </label>
        <LanguageSelectCards
          selectedValue={productNameCardLang}
          onClickCard={handleChangeProductnameCardLang}
        />
        <input
          className="w-100"
          value={state.name[productNameCardLang]}
          onChange={handleChangeProductName}
        />
        <div className={styles['err-message']}>{state.name.err}</div>

        <span className={styles['length']}>
          <Typography.H10 className={styles['color-disabled']}>
            {state.name[productNameCardLang].length}/120
          </Typography.H10>
        </span>
      </section>
      <section className={styles['input-box'] + ' ' + styles['input-medium']}>
        <label>
          <Typography.H8>{t('addNewProduct.link')}</Typography.H8>
        </label>

        <input
          style={{
            paddingRight: '50px',
          }}
          className="w-100"
          value={state.link.value}
          onChange={handleChangeLink}
        />
        <div className={styles['err-message']}>{state.link.err}</div>
        <div onClick={readCurrentClipboard} className={styles['link-icon']}>
          <svg
            width="83"
            height="88"
            viewBox="0 0 83 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_255_1696)">
              <rect
                x="20.3965"
                y="0.720215"
                width="42"
                height="42"
                rx="16"
                fill="url(#paint0_linear_255_1696)"
              />
            </g>
            <path
              d="M49.0327 11.902H44.4672C44.0199 10.6366 42.8199 9.72021 41.3963 9.72021C39.9727 9.72021 38.7727 10.6366 38.3254 11.902H33.7599C32.5545 11.902 31.5781 12.8784 31.5781 14.0839V31.5384C31.5781 32.7439 32.5545 33.7202 33.7599 33.7202H49.0327C50.2381 33.7202 51.2145 32.7439 51.2145 31.5384V14.0839C51.2145 12.8784 50.2381 11.902 49.0327 11.902ZM41.3963 11.902C41.9963 11.902 42.4872 12.3875 42.4872 12.9929C42.4872 13.5984 41.9963 14.0839 41.3963 14.0839C40.7963 14.0839 40.3054 13.5984 40.3054 12.9929C40.3054 12.3875 40.7963 11.902 41.3963 11.902ZM49.0327 31.5384H33.7599V14.0839H35.9418V17.3566H46.8509V14.0839H49.0327V31.5384Z"
              fill="white"
            />
            <defs>
              <filter
                id="filter0_d_255_1696"
                x="0.396484"
                y="0.720215"
                width="82"
                height="87"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feMorphology
                  radius="20"
                  operator="erode"
                  in="SourceAlpha"
                  result="effect1_dropShadow_255_1696"
                />
                <feOffset dy="25" />
                <feGaussianBlur stdDeviation="20" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 1 0 0 0 0 0.317307 0 0 0 0 0 0 0 0 0.8 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_255_1696"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_255_1696"
                  result="shape"
                />
              </filter>
              <linearGradient
                id="paint0_linear_255_1696"
                x1="36.3501"
                y1="-2.6555"
                x2="58.894"
                y2="6.33567"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FF7D41" />
                <stop offset="1" stop-color="#FF5100" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
      <section className={styles['input-box'] + ' ' + styles['input-big']}>
        <label>
          <Typography.H8>
            {t('addNewProduct.AdditionalInformationAboutTheProduct')}
          </Typography.H8>
        </label>
        <LanguageSelectCards
          selectedValue={productDescriptionCardLang}
          onClickCard={handleChangeProductDescriptionCardLang}
        />
        <textarea
          className="w-100"
          value={state.description[productDescriptionCardLang]}
          onChange={handleChangeProductDescription}
        />

        <span className={'ms-auto'}>
          <Typography.H10 className={styles['color-disabled']}>
            {state.description[productNameCardLang].length}/120
          </Typography.H10>
        </span>
      </section>
      <div>
        <Buttons.Contained onClick={nextPage} className={styles['submit-btn']}>
          {t('continue')}
        </Buttons.Contained>
      </div>
    </div>
  );
}

const LanguageSelectCards = ({ selectedValue, onClickCard }) => {
  const { t } = useTranslation();
  const isPersian =
    selectedValue === 'persian' ? 'language-select-card-selected' : '';
  const isEnglish =
    selectedValue === 'english' ? 'language-select-card-selected' : '';
  const isTurkish =
    selectedValue === 'turkish' ? 'language-select-card-selected' : '';
  return (
    <div className={styles['language-select-cards']}>
      <section
        onClick={() => onClickCard('persian')}
        className={styles['language-select-card'] + ' ' + styles[isPersian]}
      >
        <Typography.H8> {t('persian')}</Typography.H8>
      </section>
      <section
        onClick={() => onClickCard('english')}
        className={styles['language-select-card'] + ' ' + styles[isEnglish]}
      >
        <Typography.H8>{t('english')}</Typography.H8>
      </section>
      <section
        onClick={() => onClickCard('turkish')}
        className={styles['language-select-card'] + ' ' + styles[isTurkish]}
      >
        <Typography.H8> {t('turkish')}</Typography.H8>
      </section>
    </div>
  );
};
