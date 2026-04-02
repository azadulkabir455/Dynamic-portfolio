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
    <Container
      as="footer"
      className={cn("w-full bg-primary px-4 py-5 md:px-5 md:py-6")}
    >
      <Container
        as="div"
        className={cn(
          "maxContainer flex w-full flex-col gap-4 rounded-xl bg-secondary px-4 py-6 sm:px-5 sm:py-7 md:flex-row md:items-center md:justify-between md:gap-6 md:px-6 md:py-8",
        )}
      >
        <p className="font-open-sans text-base font-bold text-primary sm:text-lg">
          © {year} {ownerLabel}. All rights reserved.
        </p>
        <div
          className={cn(
            "flex flex-col gap-3 font-open-sans text-base font-bold sm:flex-row sm:items-center sm:gap-6 sm:text-right sm:text-lg",
          )}
        >
          <a
            href={`mailto:${email}`}
            className={cn(
              "font-bold text-primary underline-offset-4 transition-opacity hover:opacity-85 hover:underline",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
            )}
          >
            {email}
          </a>
          <a
            href={tel}
            className={cn(
              "font-bold text-primary underline-offset-4 transition-opacity hover:opacity-85 hover:underline",
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
