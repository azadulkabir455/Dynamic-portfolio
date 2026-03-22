export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface ModalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
  header?: any;
  body?: any;
  footer?: any;
  children?: any;
  size?: ModalSize;
  className?: string;
  containerClass?: string;
  headerClass?: string;
  bodyClass?: string;
  footerClass?: string;
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  [key: string]: any;
}
