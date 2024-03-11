import useLocalStorage from 'react-use-localstorage';

export default function () {
  const [admin_cachedLanguage, setAdmin_cachedLanguage] = useLocalStorage(
    'admin-t',
    ''
  );

  return {
    value: admin_cachedLanguage,
    set: setAdmin_cachedLanguage,
  };
}
