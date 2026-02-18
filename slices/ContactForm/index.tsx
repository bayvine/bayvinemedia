'use client';

import { FC, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  asLink,
  Content,
  type LinkField,
  type LinkResolverFunction,
} from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Section from "@/components/Section";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import { withPhotoPlaceholderBackground } from "@/utils/mediaPlaceholders";

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

export enum SERVICES {
  WEB_DESIGN = "Web Design",
}

export enum BUDGET {
  LOWER = "$500 - $1000",
  MID = "$1000 - $5000",
  HIGH = "$5000 - $10000",
  VIP = "$10000+",
  NA = "Unsure",
}
export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  requestedServices: string[];
  budget: string;
  description: string;
};

type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;
const NETLIFY_FORM_NAME = "contact";

const getInitialFormValues = (): ContactFormValues => ({
  name: "",
  email: "",
  phone: "",
  requestedServices: [],
  budget: "",
  description: "",
});

const encodeFormData = (data: Record<string, string>) =>
  Object.keys(data)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    )
    .join("&");

const createOptionId = (prefix: string, value: string) =>
  `${prefix}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`;

type BaseInputProps = {
  id: string;
  name?: string;
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "email" | "tel";
  onChange: (value: string) => void;
  error?: string;
};

const InputField: FC<BaseInputProps> = ({
  id,
  name,
  label,
  value,
  placeholder,
  required,
  type = "text",
  onChange,
  error,
}) => (
  <label htmlFor={id} className="flex flex-col gap-2 text-white">
    <span className="font-medium">
      {label}
      {required ? "*" : ""}
    </span>
    <input
      id={id}
      name={name || id}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className="bg-transparent border-b border-white/70 px-1 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
      required={required}
    />
    {error ? (
      <span id={`${id}-error`} className=" text-red-200">
        {error}
      </span>
    ) : null}
  </label>
);

type NameInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
};

const NameInput: FC<NameInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  error,
}) => (
  <InputField
    id="contact-name"
    name="name"
    label={label}
    value={value}
    placeholder={placeholder}
    onChange={onChange}
    error={error}
    required
  />
);

type EmailInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
};

const EmailInput: FC<EmailInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  error,
}) => (
  <InputField
    id="contact-email"
    name="email"
    label={label}
    value={value}
    placeholder={placeholder}
    type="email"
    onChange={onChange}
    error={error}
    required
  />
);

type PhoneInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
};

const PhoneInput: FC<PhoneInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  error,
}) => (
  <InputField
    id="contact-phone"
    name="phone"
    label={label}
    value={value}
    placeholder={placeholder}
    type="tel"
    onChange={onChange}
    error={error}
  />
);

type DescriptionInputProps = {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

const DescriptionInput: FC<DescriptionInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
  error,
}) => (
  <label htmlFor="contact-description" className="flex flex-col gap-2 text-white">
    <span className="font-medium">{label}</span>
    <textarea 
      id="contact-description"
      name="description"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={2}
      className="bg-transparent  border-b border-white/70 px-1 py-2 text-white placeholder:text-white/50 focus:outline-none focus:border-white"
      aria-invalid={Boolean(error)}
      aria-describedby={error ? "contact-description-error" : undefined}
    />
    {error ? (
      <span id="contact-description-error" className=" text-red-200">
        {error}
      </span>
    ) : null}
  </label>
);

type PillOptionProps = {
  id: string;
  name: string;
  type: "checkbox" | "radio";
  label: string;
  selected: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const PillOption: FC<PillOptionProps> = ({
  id,
  name,
  type,
  label,
  selected,
  onChange,
}) => (
  <label htmlFor={id} className="cursor-pointer py-2">
    <input
      id={id}
      name={name}
      type={type}
      value={label}
      checked={selected}
      onChange={onChange}
      className="peer sr-only "
    />
    <span className="rounded-full border px-5 py-2 font-medium transition-colors peer-checked:bg-white peer-checked:text-black peer-checked:border-white text-white">
      {label}
    </span>
  </label>
);

type ServicesFieldProps = {
  label: string;
  options: string[];
  selected: string[];
  onToggle: (service: string) => void;
  error?: string;
};

const ServicesField: FC<ServicesFieldProps> = ({
  label,
  options,
  selected,
  onToggle,
  error,
}) => (
  <fieldset
    className="flex flex-col gap-4 text-white"
    aria-invalid={Boolean(error)}
    aria-describedby={error ? "services-error" : undefined}
  >
    <legend className="font-medium pb-2">{label}</legend>
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <PillOption
          key={option}
          id={createOptionId("service", option)}
          name="requested_services"
          type="checkbox"
          label={option}
          selected={selected.includes(option)}
          onChange={() => onToggle(option)}
        />
      ))}
    </div>
    {error ? (
      <span id="services-error" className=" text-red-200">
        {error}
      </span>
    ) : null}
  </fieldset>
);

type BudgetFieldProps = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (budget: string) => void;
  error?: string;
};

const BudgetField: FC<BudgetFieldProps> = ({
  label,
  options,
  selected,
  onSelect,
  error,
}) => (
  <fieldset
    className="flex flex-col gap-4 text-white"
    aria-invalid={Boolean(error)}
    aria-describedby={error ? "budget-error" : undefined}
  >
    <legend className="font-medium pb-2">{label}</legend>
    <div className="flex flex-wrap gap-3">
      {options.map((option) => (
        <PillOption
          key={option}
          id={createOptionId("budget", option)}
          name="budget"
          type="radio"
          label={option}
          selected={selected === option}
          onChange={() => onSelect(option)}
        />
      ))}
    </div>
    {error ? (
      <span id="budget-error" className=" text-red-200">
        {error}
      </span>
    ) : null}
  </fieldset>
);

type ContactOptionsProps = {
  options: Content.ContactFormSliceDefaultPrimaryContactOptionsItem[];
};

const getContactTargetProps = (href?: string | null) =>
  typeof href === "string" && /\/contact(\/|$|\?|#)/.test(href)
    ? { target: "_self" }
    : {};

const richTextLinkResolver: LinkResolverFunction<string> = (doc) => {
  if (doc.type === "home") return "/";
  if (doc.type === "contact") return "/contact";
  if (doc.type === "service" && doc.uid) return `/services/${doc.uid}`;
  if (doc.type === "project" && doc.uid) return `/projects/${doc.uid}`;
  if (doc.type === "privacy_policy") return "/privacy-policy";
  if (doc.type === "terms_and_conditions") return "/terms-and-conditions";
  return null;
};

const getRichTextLinkHref = (field: LinkField) =>
  asLink(field, { linkResolver: richTextLinkResolver }) ||
  (field.link_type === "Web" ? field.url ?? "#" : "#");

const ContactOptions: FC<ContactOptionsProps> = ({ options }) => (
  <div className="flex flex-col gap-2">
    {options.map((option, index) => {
      if (!option.option_link) {
        return null;
      }

      return (
        <PrismicNextLink
          key={`${option.option_label ?? "option"}-${index}`}
          field={option.option_link}
          {...getContactTargetProps(option.option_link?.url)}
        >
          <span className="text-lg font-semibold hover:underline">
            {option.option_label || option.option_link.text || option.option_link.url}
          </span>
        </PrismicNextLink>
      );
    })}
  </div>
);
/**
 * Component for "ContactForm" Slices.
 */
const ContactForm: FC<ContactFormProps> = ({ slice }) => {
  const [values, setValues] = useState<ContactFormValues>(getInitialFormValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);
  const errorMessageRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const target = isSuccess
      ? successMessageRef.current
      : formError
        ? errorMessageRef.current
        : null;

    if (!target) {
      return;
    }

    window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }, [isSuccess, formError]);

  const updateValue = <Key extends keyof ContactFormValues>(
    key: Key,
    value: ContactFormValues[Key]
  ) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const toggleService = (service: string) => {
    setValues((prev) => {
      const isSelected = prev.requestedServices.includes(service);
      const nextServices = isSelected
        ? prev.requestedServices.filter((item) => item !== service)
        : [...prev.requestedServices, service];

      return {
        ...prev,
        requestedServices: nextServices,
      };
    });
    setErrors((prev) => ({
      ...prev,
      requestedServices: undefined,
    }));
  };

  const serviceOptions =
    slice.primary.interest_services
      ?.map((item) => item.service)
      .filter((service): service is string => Boolean(service)) ?? [];
  const budgetOptions =
    slice.primary.budget_options
      ?.map((item) => item.budget_label)
      .filter((budget): budget is string => Boolean(budget)) ?? [];

  const nameLabel = slice.primary.name_label || "Your name";
  const emailLabel = slice.primary.email_label || "Email";
  const phoneLabel = slice.primary.phone_label || "Phone";
  const aboutLabel = slice.primary.about_project_label || "Tell us about your project";
  const aboutPlaceholder = slice.primary.about_project_placeholder || "";
  const submitLabel = slice.primary.submit_label || "Submit";
  const namePlaceholder = "John Doe";
  const emailPlaceholder = "john@doe.com";
  const phonePlaceholder = "123-456-7890";

  const validateForm = (nextValues: ContactFormValues) => {
    const nextErrors: ContactFormErrors = {};

    if (!nextValues.name.trim()) {
      nextErrors.name = "Please add your name.";
    }

    if (!nextValues.email.trim()) {
      nextErrors.email = "Please add your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(nextValues.email)) {
      nextErrors.email = "Please use a valid email.";
    }

    if (!nextValues.requestedServices.length) {
      nextErrors.requestedServices = "Select at least one service.";
    }

    if (!nextValues.budget.trim()) {
      nextErrors.budget = "Select a budget.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormError(null);
    setIsSuccess(false);
    setHasSubmitted(true);

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: encodeFormData({
          "form-name": NETLIFY_FORM_NAME,
          name: values.name,
          email: values.email,
          phone: values.phone,
          requested_services: values.requestedServices.join(", "),
          budget: values.budget,
          description: values.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit your form right now.");
      }

      setValues(getInitialFormValues());
      setErrors({});
      setHasSubmitted(false);
      setIsSuccess(true);
    } catch {
      setFormError(
        "Something went wrong while sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartAnotherSubmission = () => {
    setFormError(null);
    setErrors({});
    setHasSubmitted(false);
    setValues(getInitialFormValues());
    setIsSuccess(false);
  };

  return (
    <>
    <Section
      className="relative isolate overflow-hidden min-h-[500px] flex items-end pb-10 bg-top"
      style={{
        backgroundImage: withPhotoPlaceholderBackground(
          'images/contact-page.webp'
        ),
        backgroundSize: "cover",
 
      }}
    >
      <div className="relative z-50 flex flex-col gap-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-start">
          <div>
            <PrismicRichText
              components={{
                heading1: ({ children }) => (
                  <h1 className="text-4xl font-semibold">{children}</h1>
                ),
              }}
              field={slice.primary.heading}
            ></PrismicRichText>
            <PrismicNextLink
              field={slice.primary.questions_link}
              {...getContactTargetProps(slice.primary.questions_link?.url)}
            >
              <span className="hover:underline text-lg font-medium">
                {slice.primary.questions_link.text}
              </span>
            </PrismicNextLink>
          </div>
          <div className="flex flex-col gap-4">
            <PrismicRichText
              field={slice.primary.subheading}
              components={{
                heading3: ({ children }) => (
                  <h3 className="text-md font-semibold">{children}</h3>
                ),
              }}
            />
            <ContactOptions options={slice.primary.contact_options ?? []} />
          </div>
        </div>

      
      </div>
      <div className="absolute z-0 bg-linear-to-b from-black w-full inset-0  h-full  to-black/20" />
      
      </Section>
      <Section className="pt-10 pb-20">
        <form
          name={NETLIFY_FORM_NAME}
          action="/__forms.html"
          method="POST"
          className="flex flex-col gap-8 max-w-4xl"
          onSubmit={handleSubmit}
          aria-busy={isSubmitting}
        >
          <input type="hidden" name="form-name" value={NETLIFY_FORM_NAME} />

          {isSuccess ? (
            <div
              ref={successMessageRef}
              role="status"
              aria-live="polite"
              className="flex min-h-[320px] flex-col items-center justify-center gap-6 rounded-2xl border border-emerald-300/40 bg-emerald-300/10 p-8 text-center sm:min-h-[380px] sm:p-12"
            >
              <p className="max-w-xl text-2xl font-semibold leading-tight text-emerald-100 sm:text-3xl">
                Thank you! Your inquiry has been submitted. We&apos;ll get back to you as soon as
                possible.
              </p>
              <button
                type="button"
                onClick={handleStartAnotherSubmission}
                className="w-full rounded-full border border-emerald-100/70 px-8 py-3 font-semibold uppercase text-emerald-50 transition-colors hover:bg-emerald-100/15 sm:w-fit"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <>
              {formError ? (
                <p
                  ref={errorMessageRef}
                  className="rounded-lg border border-red-300/40 bg-red-300/10 p-4 text-red-200"
                >
                  {formError}
                </p>
              ) : null}

              <ServicesField
                label="Interested in (Select all that apply)"
                options={serviceOptions}
                selected={values.requestedServices}
                onToggle={toggleService}
                error={hasSubmitted ? errors.requestedServices : undefined}
              />

              <div className="grid gap-6 lg:grid-cols-3">
                <NameInput
                  label={nameLabel}
                  value={values.name}
                  placeholder={namePlaceholder}
                  onChange={(value) => updateValue("name", value)}
                  error={hasSubmitted ? errors.name : undefined}
                />
                <EmailInput
                  label={emailLabel}
                  value={values.email}
                  placeholder={emailPlaceholder}
                  onChange={(value) => updateValue("email", value)}
                  error={hasSubmitted ? errors.email : undefined}
                />
                <PhoneInput
                  label={phoneLabel}
                  value={values.phone}
                  placeholder={phonePlaceholder}
                  onChange={(value) => updateValue("phone", value)}
                  error={hasSubmitted ? errors.phone : undefined}
                />
              </div>

              <BudgetField
                label="Project budget"
                options={budgetOptions}
                selected={values.budget}
                onSelect={(value) => updateValue("budget", value)}
                error={hasSubmitted ? errors.budget : undefined}
              />

              <DescriptionInput
                label={aboutLabel}
                placeholder={aboutPlaceholder}
                value={values.description}
                onChange={(value) => updateValue("description", value)}
                error={hasSubmitted ? errors.description : undefined}
              />

              <div className="flex flex-col gap-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full rounded-full px-20 py-3 font-semibold uppercase transition-colors sm:w-fit ${
                    isSubmitting
                      ? "cursor-not-allowed bg-white/40 text-black/70"
                      : "cursor-pointer bg-white text-black hover:bg-white/90"
                  }`}
                >
                  {isSubmitting ? "Sending..." : submitLabel}
                </button>
                <PrismicRichText
                  field={slice.primary.disclaimer}
                  components={{
                    hyperlink: ({ node, children }) => {
                      const href = getRichTextLinkHref(node.data as LinkField);

                      return (
                        <Link
                          href={href}
                          className="underline!  text-white"
                          {...getContactTargetProps(href)}
                        >
                          {children}
                        </Link>
                      );
                    },
                  }}
                />
              </div>
            </>
          )}
        </form>
      </Section>
    
    </>
  );
};

export default ContactForm;
