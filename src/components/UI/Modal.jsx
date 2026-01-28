import { useContext, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import UserProgressContext from '../../store/UserProgressContext';

export default function Modal({ children, open, className = '' }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
    }
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById('modal'),
  );
}
