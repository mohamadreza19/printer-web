import { createContext, useContext, useEffect, useReducer } from 'react';
import { AdminProduct_findOne } from '../../../../../reactQuery/admin/callGetService';
import { useParams } from 'react-router-dom';
import { Admin_User_Image } from '../../../../../reactQuery/common/callGetService';

const ProductContext = createContext();

const initalState = {
  page: 1,
  is_popup_open: false,
  productId: null,
  fileId: null,
  exel_file: {
    file: null,
    err: '',
  },
  file: {
    file: null,
    err: '',
  },

  name: {
    persian: '',
    english: '',
    turkish: '',
    err: '',
  },
  link: {
    value: '',
    err: '',
  },
  description: {
    persian: '',
    english: '',
    turkish: '',
    err: '',
  },
  width: {
    value: 1,
    err: '',
  },
  widthOfPrintingArea: {
    value: 1,
    err: '',
  },
};

const reducer = (state = initalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'CHANGE_POPUP__OPEN_STATUS':
      return {
        ...state,
        is_popup_open: !state.is_popup_open,
      };
    case 'ADD_EXEL_FILE':
      return {
        ...state,
        exel_file: {
          file: payload,
          err: '',
        },
      };
    case 'ADD_FILE':
      return {
        ...state,
        file: {
          file: payload,
          err: '',
        },
      };
    case 'ADD_FILEID':
      return {
        ...state,
        fileId: payload,
      };
    case 'ADD_PRODUCTID':
      return {
        ...state,
        productId: payload,
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        page: state.page + 1,
      };
    case 'CLEAR__EXELFILE':
      return {
        ...state,
        exel_file: {
          file: null,
          err: '',
        },
      };
    case 'CLEAR__FILE':
      return {
        ...state,
        file: {
          file: null,
          err: '',
        },
      };
    case 'CHANGE_NAME':
      return {
        ...state,
        name: {
          ...state.name,
          [payload.target]: payload.value,
          err: '',
        },
      };
    case 'CHANGE_DESCRIPTION':
      return {
        ...state,
        description: {
          ...state.description,
          [payload.target]: payload.value,
          err: '',
        },
      };
    case 'CHANGE_LINK':
      return {
        ...state,
        link: {
          value: payload,
          err: '',
        },
      };
    case 'CHANGE_WIDTH':
      return {
        ...state,
        width: {
          value: payload,
          err: '',
        },
      };
    case 'CHANGE_WIDTHOFPRITINGAREA':
      return {
        ...state,
        widthOfPrintingArea: {
          value: payload,
          err: '',
        },
      };
    case 'CLEAR_ALL':
      return initalState;

    case 'ERROR':
      return {
        ...state,
        [payload.target]: {
          ...state[payload.target],
          err: payload.value,
        },
      };

    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const { productid } = useParams();
  const [state, distapch] = useReducer(reducer, initalState);

  const fetchProduct = productid
    ? AdminProduct_findOne(productid)
    : { isSuccess: false };
  const image = Admin_User_Image('admin');

  useEffect(() => {
    if (fetchProduct.isSuccess) {
      const fileId = fetchProduct.data.pictures[0].id;
      image.mutate({ fileId: fileId });
      const {
        name,
        description,
        link,
        pictures,
        width,
        widthOfPrintingArea,
        id,
      } = fetchProduct.data;

      distapch({
        type: 'ADD_PRODUCTID',
        payload: id,
      });
      //
      distapch({
        type: 'CHANGE_NAME',
        payload: {
          target: 'persian',
          value: name.persian,
        },
      });
      distapch({
        type: 'CHANGE_NAME',
        payload: {
          target: 'english',
          value: name.english,
        },
      });
      distapch({
        type: 'CHANGE_NAME',
        payload: {
          target: 'turkish',
          value: name.turkish,
        },
      });
      //
      distapch({
        type: 'CHANGE_LINK',
        payload: link,
      });
      //
      distapch({
        type: 'CHANGE_WIDTH',
        payload: width,
      });
      //
      distapch({
        type: 'CHANGE_WIDTHOFPRITINGAREA',
        payload: widthOfPrintingArea,
      });
      distapch({
        type: 'CHANGE_DESCRIPTION',
        payload: {
          target: 'persian',
          value: name.persian,
        },
      });
      distapch({
        type: 'CHANGE_DESCRIPTION',
        payload: {
          target: 'english',
          value: name.english,
        },
      });
      distapch({
        type: 'CHANGE_DESCRIPTION',
        payload: {
          target: 'turkish',
          value: name.turkish,
        },
      });
      distapch({
        type: 'ADD_FILEID',
        payload: fileId,
      });
      //
    }
  }, [fetchProduct?.isSuccess]);
  useEffect(() => {
    if (image.isSuccess) {
      const blob = image.data;

      let file = new File([blob], blob.type);
      distapch({
        type: 'ADD_FILE',
        payload: file,
      });
    }
  }, [image.isSuccess]);
  useEffect(() => {
    return () => {
      distapch({
        type: 'CLEAR_ALL',
      });
    };
  }, []);
  return (
    <ProductContext.Provider value={{ state, distapch }}>
      {children}
    </ProductContext.Provider>
  );
};
export const useProductContext = () => useContext(ProductContext);
