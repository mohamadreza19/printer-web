import { useRecoilState } from "recoil";
import {
  address_store,
  city_store,
  companyName_store,
  companyZipCode_store,
  daysToExpire_store,
  email_store,
  managerName_store,
  phoneNumber_store,
  productAccess_store,
  province_store,
  username_store,
} from "../../recoil/store/admin_add_user/add_user_store";

export default function (wantAllState = false, wantAllSetState = false) {
  const [username, setUsername] = useRecoilState(username_store);
  const [companyName, setCompanyName] = useRecoilState(companyName_store);
  const [managerName, setManagerName] = useRecoilState(managerName_store);
  const [phoneNumber, setPhoneNumber] = useRecoilState(phoneNumber_store);
  const [companyZipCode, setCompanyZipCode] =
    useRecoilState(companyZipCode_store);
  const [email, setEmail] = useRecoilState(email_store);
  const [province, setProvince] = useRecoilState(province_store);
  const [city, setCity] = useRecoilState(city_store);
  const [address, setAddress] = useRecoilState(address_store);
  const [daysToExpire, setDaysToExpire] = useRecoilState(daysToExpire_store);
  const [productAccess, setProductAccess] = useRecoilState(productAccess_store);

  if (wantAllState) {
    return {
      username: username.value,
      companyName: companyName.value,
      managerName: managerName.value,
      phoneNumber: "+98" + phoneNumber.value.toString(),
      companyZipCode: companyZipCode.value,
      email: email.value,
      province: province.value,
      city: city.value,
      address: address.value,
      daysToExpire: +daysToExpire.value,
      productAccess: productAccess,
    };
  }

  if (wantAllSetState) {
    return {
      setUsername,
      setCompanyName,
      setManagerName,
      setPhoneNumber,
      setEmail,
      setCompanyZipCode,
      setProvince,
      setCity,
      setAddress,
      setDaysToExpire,
    };
  }
  function setUsernameHandeler(e) {
    setUsername({
      value: e.target.value,
      errMsg: "",
    });
  }
  function setCompanyNameHandeler(e) {
    setCompanyName({
      value: e.target.value,
      errMsg: "",
    });
  }
  function setManagerNameHandeler(e) {
    setManagerName({
      value: e.target.value,
      errMsg: "",
    });
  }
  function setPhoneNumberHandeler(e) {
    setPhoneNumber({
      value: e.target.value,
      errMsg: "",
    });
  }
  function setCompanyZipCodeHandeler(e) {
    setCompanyZipCode({
      value: e.target.value,
      errMsg: "",
    });
  }
  function setEmailHandeler(e) {
    setEmail({
      value: e.target.value,
      errMsg: "",
    });
  }
  function setProvinceHandeler(value) {
    setProvince({
      value: value,
      errMsg: "",
    });
  }
  function setCityHandeler(value) {
    setCity({
      value: value,
      errMsg: "",
    });
  }
  function setAddressHandeler(e) {
    setAddress({
      value: e.target.value,
      errMsg: "",
    });
  }
  function setDaysToExpireHandeler(value, label) {
    setDaysToExpire({
      value: value,
      label,
      errMsg: "",
    });
  }
  function setProductAccessHandeler(e) {
    if (e === false) {
      setProductAccess(false);
    }
    if (e === true) {
      setProductAccess(false);
    }
    setProductAccess((draft) => !draft);
  }
  function clearAll() {
    let e = {
      target: {
        value: "",
      },
    };
    setUsernameHandeler(e);
    setCompanyNameHandeler(e);
    setManagerNameHandeler(e);
    setPhoneNumberHandeler(e);
    setCompanyZipCodeHandeler(e);
    setEmailHandeler(e);
    setProvinceHandeler("");
    setCityHandeler("");
    setAddressHandeler(e);
    setDaysToExpire({
      value: "",
      label: "",
      errMsg: "",
    });
    setProductAccessHandeler(false);
  }
  return {
    state: {
      username,
      companyName,
      managerName,
      phoneNumber,
      companyZipCode,
      email,
      province,
      city,
      address,
      daysToExpire,
      productAccess,
    },
    handeler: {
      setUsernameHandeler,
      setCompanyNameHandeler,
      setManagerNameHandeler,
      setPhoneNumberHandeler,
      setCompanyZipCodeHandeler,
      setEmailHandeler,
      setProvinceHandeler,
      setCityHandeler,
      setAddressHandeler,
      setDaysToExpireHandeler,
      setProductAccessHandeler,
    },
    clearAll,
  };
}
