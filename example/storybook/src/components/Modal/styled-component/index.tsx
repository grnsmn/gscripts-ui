import { View } from 'react-native';
import { styled } from '@dank-style/react';

const Modal = styled(
  View,
  {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    defaultProps: {},

    _web: {
      pointerEvents: 'box-none',
    },
  },
  {}
);

export { Modal as Root };
export { default as Backdrop } from './Backdrop';
export { default as Body } from './Body';
export { default as CloseButton } from './CloseButton';
export { default as Content } from './Content';
export { default as Footer } from './Footer';
export { default as Header } from './Header';
export default Modal;
