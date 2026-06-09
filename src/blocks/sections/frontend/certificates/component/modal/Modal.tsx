"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import Container from "@/blocks/elements/container/Container";
import Text from "@/blocks/elements/text/Text";
import type { ModalProps } from "./type";

const Modal = ({
  src,
  alt,
  title,
  originalWidth,
  originalHeight,
  onClose,
}: ModalProps) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <Container
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <Container
        className="relative"
        style={{ maxWidth: "90vw", maxHeight: "90vh" }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -right-4 -top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors hover:bg-primary/80"
        >
          <X size={18} />
        </button>
        <Image
          src={src}
          alt={alt}
          width={originalWidth}
          height={originalHeight}
          style={{
            maxWidth: "90vw",
            maxHeight: "90vh",
            objectFit: "contain",
          }}
          className="rounded-lg shadow-2xl"
          unoptimized
        />
        <Text
          variant="p"
          className="mt-3 text-center font-open-sans text-sm text-white/70"
        >
          {title}
        </Text>
      </Container>
    </Container>
  );
};

export default Modal;
