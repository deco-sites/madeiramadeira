import BackToTop from "$store/components/footer/BackToTop.tsx";
import ColorClasses from "$store/components/footer/ColorClasses.tsx";
import Divider from "$store/components/footer/Divider.tsx";
import ExtraLinks from "$store/components/footer/ExtraLinks.tsx";
// import FooterItems from "$store/components/footer/FooterItems.tsx";
import Logo from "$store/components/footer/Logo.tsx";
import MobileApps from "$store/components/footer/MobileApps.tsx";
import PaymentMethods from "$store/components/footer/PaymentMethods.tsx";
import RegionSelector from "$store/components/footer/RegionSelector.tsx";
import Social from "$store/components/footer/Social.tsx";
import Newsletter from "$store/islands/Newsletter.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import PoweredByDeco from "apps/website/components/PoweredByDeco.tsx";

export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export interface PaymentItem {
  label: "Diners" | "Elo" | "Mastercard" | "Pix" | "Visa";
}

export interface MobileApps {
  /** @description Link to the app */
  apple?: string;
  /** @description Link to the app */
  android?: string;
}

export interface RegionOptions {
  currency?: Item[];
  language?: Item[];
}

export interface NewsletterForm {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Layout {
  backgroundColor?:
    | "Primary"
    | "Secondary"
    | "Accent"
    | "Base 100"
    | "Base 100 inverted";
  variation?:
    | "Variation 1"
    | "Variation 2"
    | "Variation 3"
    | "Variation 4"
    | "Variation 5";
  hide?: {
    logo?: boolean;
    newsletter?: boolean;
    sectionLinks?: boolean;
    socialLinks?: boolean;
    paymentMethods?: boolean;
    mobileApps?: boolean;
    regionOptions?: boolean;
    extraLinks?: boolean;
    backToTheTop?: boolean;
  };
}

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
  newsletter?: {
    title?: string;
    /** @format textarea */
    description?: string;
    form?: NewsletterForm;
  };
  sections?: Section[];
  social?: {
    title?: string;
    items: SocialItem[];
  };
  payments?: {
    title?: string;
    items: PaymentItem[];
  };
  mobileApps?: MobileApps;
  regionOptions?: RegionOptions;
  extraLinks?: Item[];
  backToTheTop?: {
    text?: string;
  };
  layout?: Layout;
}

function Footer({
  logo,
  newsletter = {
    title: "Newsletter",
    description: "",
    form: { placeholder: "", buttonText: "", helpText: "" },
  },
  sections = [{
    "label": "Sobre nós",
    "items": [
      {
        "href": "/landing/confiavel",
        "label": "Confiabilidade",
      },
      {
        "href": "/landing/carreiras",
        "label": "Carreira",
      },
      {
        "href": "/lojas",
        "label": "Lojas Físicas",
      },
      {
        "href": "/black-friday",
        "label": "Black Friday",
      },
      {
        "href": "/central-de-dicas",
        "label": "Blog da Madeira",
      },
    ],
  }, {
    "label": "Atendimento",
    "items": [
      {
        "href": "/central-de-ajuda?origemInterna=footer",
        "label": "Central de Ajuda",
      },
      {
        "href": "/landing/empresas",
        "label": "Central de Ajuda",
      },
      {
        "href": "/landing/madeira-decora",
        "label": "Vantagens exclusivas para arquitetos",
      },
      {
        "href": "/marketplace",
        "label": "Venda no Marketplace da MadeiraMadeira",
      },
      {
        "href": "/landing/cashback-madeira",
        "label": "Cashback MadeiraMadeira",
      },
    ],
  }, {
    "label": "Televendas",
    "items": [
      {
        "href": "/central-de-ajuda?origemInterna=footer",
        "label": "Central de Ajuda",
      },
      {
        "href": "/landing/empresas",
        "label": "Central de Ajuda",
      },
      {
        "href": "/landing/madeira-decora",
        "label": "Vantagens exclusivas para arquitetos",
      },
      {
        "href": "/marketplace",
        "label": "Venda no Marketplace da MadeiraMadeira",
      },
      {
        "href": "/landing/cashback-madeira",
        "label": "Cashback MadeiraMadeira",
      },
    ],
  }],
  social = {
    title: "Redes sociais",
    items: [{ label: "Instagram", link: "/" }, { label: "Tiktok", link: "/" }],
  },
  payments = {
    title: "Formas de pagamento",
    items: [{ label: "Mastercard" }, { label: "Visa" }, { label: "Pix" }],
  },
  mobileApps = { apple: "/", android: "/" },
  regionOptions = { currency: [], language: [] },
  extraLinks = [],
  backToTheTop,
  layout = {
    backgroundColor: "Primary",
    variation: "Variation 1",
    hide: {
      logo: false,
      newsletter: false,
      sectionLinks: false,
      socialLinks: false,
      paymentMethods: false,
      mobileApps: false,
      regionOptions: false,
      extraLinks: false,
      backToTheTop: false,
    },
  },
}: Props) {

  return (
    <footer
      class={`w-full flex flex-col pt-10 pb-2 md:pb-10 gap-10 bg-[#F9F9F9]`}
    >
      <div class="lg:container mx-6 lg:mx-auto">
        <div class="flex flex-col gap-10">
          <div class="flex flex-col md:flex-row md:justify-between md:flex-wrap lg:flex-nowrap gap-8 lg:gap-12">
            {/* Tablet and Desktop view */}
            <ul
              class={`hidden md:grid grid-cols-5 gap-6 lg:gap-10 lg:justify-between`}
            >
              {sections.map((section) => (
                <li>
                  <div class="flex flex-col gap-2">
                    <span class="font-medium text-lg">
                      {section.label}
                    </span>
                    <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-1 link link-hover"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
              <li></li>
              <PaymentMethods content={payments} />
            </ul>

            {/* Mobile view */}
            <ul class="flex flex-col md:hidden gap-4">
              {sections.map((section) => (
                <li>
                  <details>
                    <summary>
                      <span class="pl-1 py-2">{section.label}</span>
                    </summary>
                    <ul
                      class={`flex flex-col gap-1 pl-5 pt-2`}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-1 link link-hover"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ))}
            </ul>
            
            
          </div>
          <div class="flex flex-col md:flex-row gap-10 md:gap-14 md:items-end">
            <Social content={social} />
            <div class="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-end">
              {/* <MobileApps content={mobileApps} /> */}
              {/* <RegionSelector content={regionOptions} /> */}
            </div>
          </div>
          <Divider />
          <div class="flex flex-col-reverse md:flex-row md:justify-between gap-10">
            <PoweredByDeco />
            <ExtraLinks content={extraLinks} />
          </div>
        </div>
      </div>
      {layout?.hide?.backToTheTop
        ? <></>
        : <BackToTop content={backToTheTop?.text} />}
    </footer>
  );
}

export default Footer;
