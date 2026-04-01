import Container from "@/blocks/elements/container/Container";
import { cn } from "@/utilities/helpers/classMerge";
import type { FooterProps } from "./type";

function defaultTelHref(phone: string): string {
  const cleaned = phone.replace(/[^\d+]/g, "");
  return cleaned ? `tel:${cleaned}` : "#";
}

const Footer = ({
  ownerLabel = "Portfolio",
  year = new Date().getFullYear(),
  email = "hello@example.com",
  phone = "+880 1XXX XXX XXX",
  phoneHref,
}: FooterProps = {}) => {
  const tel = phoneHref ?? defaultTelHref(phone);

  return (
    <Container as="footer" className={cn("w-full bg-secondary")}>
      <Container
        as="div"
        className={cn(
          "maxContainer flex w-full flex-col gap-4 border-t border-primary px-4 py-8 md:px-6",
          "md:flex-row md:items-center md:justify-between md:gap-8",
        )}
      >
        <p className="font-open-sans text-sm text-text">
          © {year} {ownerLabel}. All rights reserved.
        </p>
        <div
          className={cn(
            "flex flex-col gap-3 font-open-sans text-sm sm:flex-row sm:items-center sm:gap-8 sm:text-right",
          )}
        >
          <a
            href={`mailto:${email}`}
            className={cn(
              "text-primary underline-offset-4 transition-opacity hover:opacity-85 hover:underline",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            )}
          >
            {email}
          </a>
          <a
            href={tel}
            className={cn(
              "text-primary underline-offset-4 transition-opacity hover:opacity-85 hover:underline",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            )}
          >
            {phone}
          </a>
        </div>
      </Container>
    </Container>
  );
};

export default Footer;
