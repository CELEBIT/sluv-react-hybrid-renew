import { ComponentProps, FunctionComponent, useCallback, useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

const modalsAtom = atom<
  Array<{
    Component: FunctionComponent<any>;
    props: ComponentProps<FunctionComponent<any>>;
  }>
>({
  key: 'modalsAtom',
  default: [],
});

const useModals = () => {
  const [modals, setModals] = useRecoilState(modalsAtom);

  useEffect(() => {
    const goBack = () => setModals([]);
    window.addEventListener('popstate', goBack);
    return () => {
      window.removeEventListener('popstate', goBack);
    };
  },[]);

  const openModal = useCallback(
    <T extends FunctionComponent<any>>(Component: T, props?: Omit<ComponentProps<T>, 'open'>) => {
      setModals((modals) => [...modals, { Component, props: { ...props, open: true } }])
      history.pushState({ page: 'modal' }, document.title)
    },
    [setModals],
  )

  const closeModal = useCallback(
    <T extends FunctionComponent<any>>(Component: T) => {
      setModals((modals) => modals.filter((modal) => modal.Component !== Component))
      history.back()
    },
    [setModals],
  )

  return {
    modals,
    openModal,
    closeModal,
  }
}

export default useModals;