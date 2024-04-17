import {
  useContent_Based_Language,
  useDynamicCssClass,
  useLanguage,
} from '../../../../../../../../recoil/readStore';
import Icons from '../../../../../../../../styles/__ready/Icons';
import Typography from '../../../../../../../../styles/__ready/Typography';
import Buttons from '../../../../../../../../styles/__ready/Buttons';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import profile_store, {
  useGetUserProfile,
} from '../../../../../../../../recoil/store/user/profile_store';
import project_store from '../../../../../../../../recoil/store/user/project_store';
import useBundleProject from '../../../../../../../../utility/useBundleProject';
import { EditProject_Mutation } from '../../../../../../../../reactQuery/user/callPutServices';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { showPutProjectResponse } from '../../../../../../../../recoil/store/user/showPutProjectResponse';
import useScreenShot from '../../../../../../../../utility/useScreenShot';
import { FormatColorResetRounded } from '@mui/icons-material';
import useLocalStorage from 'react-use-localstorage';
import { EditTemplate_project_Mutation } from '../../../../../../../../reactQuery/admin/callPutService';
import { useSetBorderToProntState } from '../../../../../../../../recoil/userEditorStore/bordersToPrint';
import { useProject_baseValue } from '../../../../../../../../recoil/userEditorStore/project_base';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBorderEvent,
  getBorderToPrint,
} from '../../../../../../../../redux/project/border_slice';
import {
  addSuccess,
  clearSuccess,
} from '../../../../../../../../redux/project/success_slice';
import { useTranslation } from 'react-i18next';
import { setUser_project_findOne } from '../../../../../../../../reactQuery/querykey/user_key';

const PROJECT_EDIT = 'project/edit';
const PROJECT_TEMPLATES_USER_EDIT = 'project-templates/user_edit';
const PROJECT_TEMPLATES_EDIT = 'project-templates/edit';

export default function () {
  const disptach = useDispatch();
  const [openPopUp, setOpenPopUp] = useState(false);
  const [printRepetition, setRrintRepetition] = useState(1);
  const [saveMode, setSaveMode] = useState('idle');
  const [editor_access, _] = useLocalStorage('editor_access');
  const language = useLanguage();
  const { projectId } = useParams();

  const beForward = language == 'fa' ? true : false;
  const cssClass = useDynamicCssClass();
  const { t } = useTranslation();
  const content =
    useContent_Based_Language().userPannel.editor.endColumn.rootHeader;
  const navigate = useNavigate();

  const profile_state = useRecoilValue(profile_store);
  const project_state = useRecoilValue(project_store);
  const borderToPrint = useSelector(getBorderToPrint);

  const poject_base = useProject_baseValue(); // CUSTOM | PRODUCT

  const setBordersToPrint = useSetBorderToProntState(); //NONE, ALL, HORIZONTAL, VERTICAL

  const setShowPutProjectResponse = useSetRecoilState(showPutProjectResponse);

  const project_mutate = EditProject_Mutation();
  const project_template_mutate = EditTemplate_project_Mutation();

  const handle_bundled_project = useBundleProject();

  const autoPrint = useScreenShot();

  function handleBorderToPrint(value) {
    const payload = {
      type: 'none',
      value,
    };
    disptach(addBorderEvent(payload));
  }
  function handleSetBordersToPrint(e) {
    const checkbox_horizontal = document.getElementById('checkbox-horizontal');

    const checkbox_vertical = document.getElementById('checkbox-vertical');

    if (e.target.checked) {
      if (
        checkbox_horizontal.isEqualNode(e.target) &&
        checkbox_vertical.checked === false
      ) {
        handleBorderToPrint('HORIZONTAL');
      }
      if (
        checkbox_vertical.isEqualNode(e.target) &&
        checkbox_horizontal.checked === false
      ) {
        handleBorderToPrint('VERTICAL');
      }
      if (checkbox_vertical.checked && checkbox_horizontal.checked) {
        handleBorderToPrint('ALL');
      }
    } else {
      if (
        checkbox_horizontal.isEqualNode(e.target) &&
        checkbox_vertical.checked === true
      ) {
        handleBorderToPrint('VERTICAL');
      }
      if (
        checkbox_vertical.isEqualNode(e.target) &&
        checkbox_horizontal.checked === true
      ) {
        handleBorderToPrint('HORIZONTAL');
      }
      if (!checkbox_vertical.checked && !checkbox_horizontal.checked) {
        handleBorderToPrint('NONE');
      }
    }
  }

  function handleSubmitProject() {
    switch (editor_access) {
      case PROJECT_EDIT:
        // return console.log(handle_bundled_project());

        project_mutate.mutate({
          body: handle_bundled_project(),
        });
        break;
      case PROJECT_TEMPLATES_USER_EDIT:
        // return console.log(handle_bundled_project());

        project_mutate.mutate({
          body: handle_bundled_project(),
        });
        break;
      case PROJECT_TEMPLATES_EDIT:
        project_template_mutate.mutate({
          body: handle_bundled_project(),
        });
        break;
    }

    // mutate.mutate({
    //   body: handle_bundled_project(),
    // });
  }
  function handleOpenPopUp() {
    setOpenPopUp(true);
  }

  function handleClosePopUp() {
    setOpenPopUp(false);
  }
  function handleChangePrintRepetition(event) {
    const value = Number(event.target.value);
    if (value >= 1) {
      setRrintRepetition(value);
    }
  }
  function print() {
    handleSubmitProject();
    handleSaveMode('save');
    setTimeout(() => {
      handleClearSuccess();
      setTimeout(() => autoPrint('PRODUCT', projectId, printRepetition), 200);
    }, 500);
  }
  function singlePrint() {
    handleSubmitProject();
    handleSaveMode('save');
    setTimeout(() => {
      handleClearSuccess();
      setTimeout(() => autoPrint('PRODUCT', projectId, 1), 200);
    }, 500);
  }
  function sreenShot() {
    autoPrint('IMAGE');
  }
  function handleClearSuccess() {
    disptach(clearSuccess());
    // setSaveMode('idle');
    // window.location.reload();
  }
  function handleSuccess() {
    const payload = {
      status: 'success',
      onBack: handleClearSuccess,
      body: handle_bundled_project(),
      type: 'edit',
    };
    disptach(addSuccess(payload));
  }
  function handleSaveMode(action) {
    setUser_project_findOne();
    setSaveMode(action);
  }

  if (project_mutate.isSuccess || project_template_mutate.isSuccess) {
    if (saveMode === 'saveAndContinue') {
    }
    handleSuccess();
  }
  return (
    <header className="w-100 d-flex align-items-center justify-content-between  pt-4 px-4">
      <article className="d-flex">
        <section className="d-flex dir-ltr">
          <Typography.H8 language="en" className="">
            @{profile_state.username}
          </Typography.H8>
          <Icons.UserName svgClassName="mx-2" />
        </section>
        <section className="d-flex">
          <Icons.Back
            svgClassName="mx-3"
            size="small"
            pathClassName="fill_disabled"
            beForward={beForward}
          />
          <Typography.H8 className="">
            {t('addNewProject.addNewProject')}
          </Typography.H8>
        </section>
        <section className="d-flex">
          <Icons.Back
            svgClassName="mx-3"
            size="small"
            pathClassName="fill_disabled"
            beForward={beForward}
          />
          <Typography.H8 className="">
            {project_state.projectName}
          </Typography.H8>
        </section>
        <section className="d-flex">
          <Icons.Back
            svgClassName="mx-3"
            size="small"
            pathClassName="fill_disabled"
            beForward={beForward}
          />
          <Typography.H8 className="">{content.editor}</Typography.H8>
        </section>
      </article>
      <article className="d-flex">
        <main
          style={{
            columnGap: '15px',
          }}
          className="mx-3 d-flex align-items-center"
        >
          <div class="form-check">
            <input
              onChange={handleSetBordersToPrint}
              class="form-check-input"
              type="checkbox"
              id="checkbox-vertical"
              checked={
                borderToPrint.value === 'ALL' ||
                borderToPrint.value === 'VERTICAL'
              }
            />
            <label class="form-check-label" for="flexCheckDefault">
              <Typography.H8>{t('editor.printVerticalLines')}</Typography.H8>
            </label>
          </div>
          <div class="form-check">
            <input
              onChange={handleSetBordersToPrint}
              class="form-check-input"
              type="checkbox"
              id="checkbox-horizontal"
              checked={
                borderToPrint.value === 'ALL' ||
                borderToPrint.value === 'HORIZONTAL'
              }
            />
            <label class="form-check-label" for="flexCheckDefault">
              <Typography.H8>{t('editor.printHorizontalLines')}</Typography.H8>
            </label>
          </div>
        </main>
        <div className="d-flex ">
          <Buttons.Outlined onClick={sreenShot} className="">
            <Icons.Editor_ExportFile size="large" />
            <Typography.H10 className={cssClass.ms_1}>
              {t('editor.output')}
            </Typography.H10>
          </Buttons.Outlined>
          <Buttons.Contained
            disabled={openPopUp}
            onClick={poject_base === 'CUSTOM' ? handleOpenPopUp : singlePrint}
            className="editor-header-button_extra-small mx-3 
              position-relative
            "
          >
            <Icons.Editor_Print size="large" />
            <Typography.H10 className={cssClass.ms_1 + ' font-300'}>
              {t('print')}
            </Typography.H10>
          </Buttons.Contained>
          <PopUpBox openPopUp={openPopUp}>
            <header className="d-flex pos">
              <span onClick={handleClosePopUp} className="cur-pointer">
                X
              </span>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  top: '18px',
                }}
              >
                <Typography.H9 className="text-nowrap ">
                  {t('editor.numberOfPrints')}
                </Typography.H9>
              </div>
            </header>
            <main
              style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '10px',
                alignItems: 'center',
              }}
            >
              <PopUpInput
                disabled={poject_base === 'PRODUCT' ? true : false}
                onChange={handleChangePrintRepetition}
                type="number"
                value={printRepetition}
              />
              <Buttons.Contained
                onClick={print}
                className="editor-header-button_extra-small 

              position-relative
            "
              >
                <Icons.Editor_Print size="large" />
                <Typography.H7 className={cssClass.ms_1 + ' font-300'}>
                  {t('print')}
                </Typography.H7>
              </Buttons.Contained>
            </main>
          </PopUpBox>

          <Buttons.Contained
            className="editor-header-button_extra-medium"
            onClick={() => {
              handleSubmitProject();
              handleSaveMode('saveAndContinue');
            }}
          >
            {/* <Icons.Editor_Save size="medium" /> */}
            <Typography.H10 className={cssClass.ms_1 + ' font-300'}>
              {t('saveAndContinue')}
            </Typography.H10>
          </Buttons.Contained>
          <Buttons.Contained
            className="editor-header-button_extra-auto mx-3"
            onClick={() => {
              handleSubmitProject();
              handleSaveMode('save');
              setTimeout(() => handleClearSuccess(), 500);
            }}
          >
            <Icons.Editor_Save size="medium " />
          </Buttons.Contained>
        </div>
      </article>
    </header>
  );
}

const PopUpBox = styled.div`
  padding: 5px 10px;
  width: 150px;
  min-height: 120px;
  border: 1px solid #cbcbcb;
  position: absolute;
  top: 19%;
  left: 19%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 99;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  //
  visibility: ${({ openPopUp }) => (openPopUp ? 'visible' : 'hidden')};
`;
const PopUpInput = styled.input`
  border-radius: 10px;
  border-width: 1px;
  height: 30px;
  padding: 5px;
  width: 80px;
  text-align: center;
`;
