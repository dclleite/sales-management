import React from 'react';
import { Dialog } from '@material-ui/core';

function Modal({ open, children }) {
  return (
    <Dialog open={open}>
      {children}
    </Dialog>
  );
};

export default Modal