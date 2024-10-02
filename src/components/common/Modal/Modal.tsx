import { ModalParameters, ModalType } from '@/types';
import { memo, useEffect } from 'react';

const Modal = ({ modal }: { modal: ModalType<ModalParameters> }) => {
  const { element: ModalContainer, resolve, reject, actionModal } = modal;

  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.cssText = `
      position: fixed;
      top: -${scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      document.body.style.cssText = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  return <ModalContainer onSubmit={resolve} onAbort={reject} actionModal={actionModal} />;
};

export default memo(Modal);