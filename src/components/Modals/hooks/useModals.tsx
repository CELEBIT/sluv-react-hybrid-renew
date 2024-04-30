import { atom, useRecoilState } from 'recoil'
import { useCallback, ComponentProps, FunctionComponent, useEffect } from 'react'
const modalsAtom = atom<
  Array<{
    Component: FunctionComponent<any>
    props: ComponentProps<FunctionComponent<any>>
  }>
>({
  key: 'modalsAtom',
  default: [],
})

const useModals = () => {
  const [modalList, setModals] = useRecoilState(modalsAtom)

  // useEffect(() => {
  //   const goBack = () => setModals([])
  //   window.addEventListener('popstate', goBack)
  //   return () => {
  //     window.removeEventListener('popstate', goBack)
  //   }
  // }, [])

  // const openModal = useCallback(
  //   <T extends FunctionComponent<any>>(
  //     Component: T,
  //     props?: Omit<ComponentProps<T>, 'open'>,
  //   ): void => {
  //     setModals((modals) => [...modals, { Component, props: { ...props, open: true } }])
  //     history.pushState({ page: 'modal' }, document.title)
  //   },
  //   [],
  // )

  const openModal = useCallback(
    <T extends FunctionComponent<any>>(
      Component: T,
      props?: Omit<ComponentProps<T>, 'open'> & { callbackFunc?: () => void },
    ): void => {
      setModals((modals) => [...modals, { Component, props: { ...props, open: true } }])
      history.pushState({ page: 'modal' }, document.title)
    },
    [setModals],
  )

  const closeModal = useCallback(
    <T extends FunctionComponent<any>>(Component: T, callbackFunc?: () => void) => {
      setModals((modals) => modals.filter((modal) => modal.Component !== Component))
      if (callbackFunc) callbackFunc()
      else history.back()
    },
    [setModals],
  )

  return {
    modalList,
    openModal,
    closeModal,
  }
}

export default useModals
