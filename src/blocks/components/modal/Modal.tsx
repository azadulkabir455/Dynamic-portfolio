"use client";

import type { MouseEvent } from "react";
import clsx from "clsx";
import Button from "@/blocks/elements/button/Button";
import Card from "@/blocks/elements/card/Card";
import Container from "@/blocks/elements/container/Container";
import Icon from "@/blocks/elements/icon/Icon";
import {
  getModalPaddingClass,
  getModalWidthClass,
  handleOverlayClick,
  useModalBehavior,
} from "./function";
import { ModalProps } from "./type";

export const Modal = ({
  isOpen,
  onOpen,
  onClose,
  header,
  body,
  footer,
  children,
  size = "md",
  className,
  containerClass,
  headerClass,
  bodyClass,
  footerClass,
  closeOnOverlayClick = true,
  showCloseButton = true,
  ...props
}: ModalProps) => {
  useModalBehavior(isOpen, onOpen, onClose);

  if (!isOpen) return null;

  return (
    <Container
      as="section"
      size="full"
      className={clsx(
        "fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6",
        className
      )}
      onClick={(event: MouseEvent<HTMLElement>) =>
        handleOverlayClick(event, closeOnOverlayClick, onClose)
      }
      {...props}
    >
      <Card
        padding="none"
        className={clsx(
          "w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl",
          getModalWidthClass(size),
          containerClass
        )}
      >
        <Container
          as="section"
          size="full"
          className={clsx(
            "flex items-start justify-between gap-4 border-b border-slate-200",
            getModalPaddingClass(size),
            headerClass
          )}
        >
          <Container as="section" size="full" className="!mx-0 !px-0">
            {header}
          </Container>
          {showCloseButton ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-9 w-9 shrink-0 px-0 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close modal"
            >
              <Icon name="X" size={18} />
            </Button>
          ) : null}
        </Container>

        <Container
          as="section"
          size="full"
          className={clsx("!mx-0 !px-0", getModalPaddingClass(size), bodyClass)}
        >
          {body ?? children}
        </Container>

        {footer ? (
          <Container
            as="section"
            size="full"
            className={clsx(
              "!mx-0 !px-0 border-t border-slate-200",
              getModalPaddingClass(size),
              footerClass
            )}
          >
            {footer}
          </Container>
        ) : null}
      </Card>
    </Container>
  );
};

export default Modal;
