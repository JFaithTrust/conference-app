import React, { ReactElement } from "react";
import { Dialog, DialogContent, DialogFooter } from "./dialog";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  body?: ReactElement;
  footer?: ReactElement;
  bg?: string;
  classNames?: string;
}

export default function Modal({ body, footer, isOpen, onClose, bg, classNames }: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`p-1 flex flex-col justify-between ${bg} ${classNames}`}>
        <div className="mt-4">{body}</div>
        {footer && <div>{footer}</div>}
      </DialogContent>
    </Dialog>
  );
}
