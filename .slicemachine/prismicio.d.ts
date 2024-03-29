// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismicT from "@prismicio/types";
import type * as prismic from "@prismicio/client";

type Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
};
/** Content for homepage documents */
interface HomepageDocumentData {
    /**
     * Slice Zone field in *homepage*
     *
     * - **Field Type**: Slice Zone
     * - **Placeholder**: *None*
     * - **API ID Path**: homepage.slices[]
     * - **Tab**: Main
     * - **Documentation**: https://prismic.io/docs/core-concepts/slices
     *
     */
    slices: prismicT.SliceZone<HomepageDocumentDataSlicesSlice>;
}
/**
 * Slice for *homepage → Slice Zone*
 *
 */
type HomepageDocumentDataSlicesSlice = IntroSectionSlice | AboutSectionSlice | FeaturedSectionSlice | ServicesSectionSlice | ToolkitSectionSlice | RoadmapSectionSlice | TestimonialSectionSlice | BehindTheVineSlice | ContactSectionSlice | FooterSectionSlice;
/**
 * homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismicT.PrismicDocumentWithoutUID<Simplify<HomepageDocumentData>, "homepage", Lang>;
export type AllDocumentTypes = HomepageDocument;
/**
 * Primary content in AboutSection → Primary
 *
 */
interface AboutSectionSliceDefaultPrimary {
    /**
     * Title field in *AboutSection → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: about_section.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *AboutSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: about_section.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
    /**
     * Background field in *AboutSection → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: about_section.primary.background
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    background: prismicT.ImageField<never>;
}
/**
 * Default variation for AboutSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: `AboutSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type AboutSectionSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<AboutSectionSliceDefaultPrimary>, never>;
/**
 * Slice variation for *AboutSection*
 *
 */
type AboutSectionSliceVariation = AboutSectionSliceDefault;
/**
 * AboutSection Shared Slice
 *
 * - **API ID**: `about_section`
 * - **Description**: `AboutSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type AboutSectionSlice = prismicT.SharedSlice<"about_section", AboutSectionSliceVariation>;
/**
 * Primary content in BehindTheVine → Primary
 *
 */
interface BehindTheVineSliceDefaultPrimary {
    /**
     * Title field in *BehindTheVine → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: behind_the_vine.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *BehindTheVine → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: behind_the_vine.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
    /**
     * Link field in *BehindTheVine → Primary*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: behind_the_vine.primary.link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    link: prismicT.LinkField;
    /**
     * Link label field in *BehindTheVine → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: behind_the_vine.primary.link_label
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    link_label: prismicT.KeyTextField;
    /**
     * Background image field in *BehindTheVine → Primary*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: behind_the_vine.primary.background_image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    background_image: prismicT.ImageField<never>;
}
/**
 * Default variation for BehindTheVine Slice
 *
 * - **API ID**: `default`
 * - **Description**: `BehindTheVine`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type BehindTheVineSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<BehindTheVineSliceDefaultPrimary>, never>;
/**
 * Slice variation for *BehindTheVine*
 *
 */
type BehindTheVineSliceVariation = BehindTheVineSliceDefault;
/**
 * BehindTheVine Shared Slice
 *
 * - **API ID**: `behind_the_vine`
 * - **Description**: `BehindTheVine`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type BehindTheVineSlice = prismicT.SharedSlice<"behind_the_vine", BehindTheVineSliceVariation>;
/**
 * Primary content in ContactSection → Primary
 *
 */
interface ContactSectionSliceDefaultPrimary {
    /**
     * Title field in *ContactSection → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: contact_section.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *ContactSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: contact_section.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
}
/**
 * Default variation for ContactSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: `ContactSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ContactSectionSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<ContactSectionSliceDefaultPrimary>, never>;
/**
 * Slice variation for *ContactSection*
 *
 */
type ContactSectionSliceVariation = ContactSectionSliceDefault;
/**
 * ContactSection Shared Slice
 *
 * - **API ID**: `contact_section`
 * - **Description**: `ContactSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ContactSectionSlice = prismicT.SharedSlice<"contact_section", ContactSectionSliceVariation>;
/**
 * Primary content in FeaturedSection → Primary
 *
 */
interface FeaturedSectionSliceDefaultPrimary {
    /**
     * Title field in *FeaturedSection → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: featured_section.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *FeaturedSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: featured_section.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
}
/**
 * Item in FeaturedSection → Items
 *
 */
export interface FeaturedSectionSliceDefaultItem {
    /**
     * Image field in *FeaturedSection → Items*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: featured_section.items[].image
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    image: prismicT.ImageField<never>;
    /**
     * title field in *FeaturedSection → Items*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: featured_section.items[].title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.RichTextField;
    /**
     * description field in *FeaturedSection → Items*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: featured_section.items[].description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
    /**
     * link field in *FeaturedSection → Items*
     *
     * - **Field Type**: Link
     * - **Placeholder**: *None*
     * - **API ID Path**: featured_section.items[].link
     * - **Documentation**: https://prismic.io/docs/core-concepts/link-content-relationship
     *
     */
    link: prismicT.LinkField;
    /**
     * services done field in *FeaturedSection → Items*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: featured_section.items[].services_done
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    services_done: prismicT.KeyTextField;
}
/**
 * Default variation for FeaturedSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: `FeaturedSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type FeaturedSectionSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<FeaturedSectionSliceDefaultPrimary>, Simplify<FeaturedSectionSliceDefaultItem>>;
/**
 * Slice variation for *FeaturedSection*
 *
 */
type FeaturedSectionSliceVariation = FeaturedSectionSliceDefault;
/**
 * FeaturedSection Shared Slice
 *
 * - **API ID**: `featured_section`
 * - **Description**: `FeaturedSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type FeaturedSectionSlice = prismicT.SharedSlice<"featured_section", FeaturedSectionSliceVariation>;
/**
 * Primary content in FooterSection → Primary
 *
 */
interface FooterSectionSliceDefaultPrimary {
    /**
     * Title field in *FooterSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: footer_section.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.RichTextField;
}
/**
 * Default variation for FooterSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: `FooterSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type FooterSectionSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<FooterSectionSliceDefaultPrimary>, never>;
/**
 * Slice variation for *FooterSection*
 *
 */
type FooterSectionSliceVariation = FooterSectionSliceDefault;
/**
 * FooterSection Shared Slice
 *
 * - **API ID**: `footer_section`
 * - **Description**: `FooterSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type FooterSectionSlice = prismicT.SharedSlice<"footer_section", FooterSectionSliceVariation>;
/**
 * Primary content in IntroSection → Primary
 *
 */
interface IntroSectionSliceDefaultPrimary {
    /**
     * Title field in *IntroSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: intro_section.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.RichTextField;
    /**
     * Description field in *IntroSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: intro_section.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
    /**
     * Year field in *IntroSection → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: intro_section.primary.year
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    year: prismicT.KeyTextField;
    /**
     * CTA field in *IntroSection → Primary*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: intro_section.primary.cta
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    cta: prismicT.KeyTextField;
}
/**
 * Item in IntroSection → Items
 *
 */
export interface IntroSectionSliceDefaultItem {
    /**
     * service field in *IntroSection → Items*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: intro_section.items[].service
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    service: prismicT.KeyTextField;
}
/**
 * Default variation for IntroSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: `IntroSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type IntroSectionSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<IntroSectionSliceDefaultPrimary>, Simplify<IntroSectionSliceDefaultItem>>;
/**
 * Slice variation for *IntroSection*
 *
 */
type IntroSectionSliceVariation = IntroSectionSliceDefault;
/**
 * IntroSection Shared Slice
 *
 * - **API ID**: `intro_section`
 * - **Description**: `IntroSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type IntroSectionSlice = prismicT.SharedSlice<"intro_section", IntroSectionSliceVariation>;
/**
 * Primary content in RoadmapSection → Primary
 *
 */
interface RoadmapSectionSliceDefaultPrimary {
    /**
     * Title field in *RoadmapSection → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: roadmap_section.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *RoadmapSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: roadmap_section.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
    /**
     * Sub Description field in *RoadmapSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: roadmap_section.primary.sub_description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    sub_description: prismicT.RichTextField;
}
/**
 * Item in RoadmapSection → Items
 *
 */
export interface RoadmapSectionSliceDefaultItem {
    /**
     * Step title field in *RoadmapSection → Items*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: roadmap_section.items[].step_title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    step_title: prismicT.RichTextField;
    /**
     * Step description field in *RoadmapSection → Items*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: roadmap_section.items[].step_description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    step_description: prismicT.RichTextField;
}
/**
 * Default variation for RoadmapSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: `RoadmapSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type RoadmapSectionSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<RoadmapSectionSliceDefaultPrimary>, Simplify<RoadmapSectionSliceDefaultItem>>;
/**
 * Slice variation for *RoadmapSection*
 *
 */
type RoadmapSectionSliceVariation = RoadmapSectionSliceDefault;
/**
 * RoadmapSection Shared Slice
 *
 * - **API ID**: `roadmap_section`
 * - **Description**: `RoadmapSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type RoadmapSectionSlice = prismicT.SharedSlice<"roadmap_section", RoadmapSectionSliceVariation>;
/**
 * Primary content in ServicesSection → Primary
 *
 */
interface ServicesSectionSliceDefaultPrimary {
    /**
     * Title field in *ServicesSection → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: services_section.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *ServicesSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: services_section.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
    /**
     * Sub Description field in *ServicesSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: services_section.primary.sub_description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    sub_description: prismicT.RichTextField;
}
/**
 * Item in ServicesSection → Items
 *
 */
export interface ServicesSectionSliceDefaultItem {
    /**
     * icon field in *ServicesSection → Items*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: services_section.items[].icon
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    icon: prismicT.ImageField<never>;
    /**
     * Title field in *ServicesSection → Items*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: services_section.items[].title
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    title: prismicT.KeyTextField;
    /**
     * service description field in *ServicesSection → Items*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: services_section.items[].service_description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    service_description: prismicT.RichTextField;
}
/**
 * Default variation for ServicesSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: `ServicesSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ServicesSectionSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<ServicesSectionSliceDefaultPrimary>, Simplify<ServicesSectionSliceDefaultItem>>;
/**
 * Slice variation for *ServicesSection*
 *
 */
type ServicesSectionSliceVariation = ServicesSectionSliceDefault;
/**
 * ServicesSection Shared Slice
 *
 * - **API ID**: `services_section`
 * - **Description**: `ServicesSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ServicesSectionSlice = prismicT.SharedSlice<"services_section", ServicesSectionSliceVariation>;
/**
 * Primary content in TestimonialSection → Primary
 *
 */
interface TestimonialSectionSliceDefaultPrimary {
    /**
     * Title field in *TestimonialSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: testimonial_section.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.RichTextField;
}
/**
 * Item in TestimonialSection → Items
 *
 */
export interface TestimonialSectionSliceDefaultItem {
    /**
     * Title field in *TestimonialSection → Items*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: testimonial_section.items[].title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.RichTextField;
    /**
     * Photo field in *TestimonialSection → Items*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: testimonial_section.items[].photo
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    photo: prismicT.ImageField<never>;
    /**
     * Author field in *TestimonialSection → Items*
     *
     * - **Field Type**: Text
     * - **Placeholder**: *None*
     * - **API ID Path**: testimonial_section.items[].author
     * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
     *
     */
    author: prismicT.KeyTextField;
    /**
     * Testimonial field in *TestimonialSection → Items*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: testimonial_section.items[].testimonial
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    testimonial: prismicT.RichTextField;
}
/**
 * Default variation for TestimonialSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: `TestimonialSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TestimonialSectionSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<TestimonialSectionSliceDefaultPrimary>, Simplify<TestimonialSectionSliceDefaultItem>>;
/**
 * Slice variation for *TestimonialSection*
 *
 */
type TestimonialSectionSliceVariation = TestimonialSectionSliceDefault;
/**
 * TestimonialSection Shared Slice
 *
 * - **API ID**: `testimonial_section`
 * - **Description**: `TestimonialSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type TestimonialSectionSlice = prismicT.SharedSlice<"testimonial_section", TestimonialSectionSliceVariation>;
/**
 * Primary content in ToolkitSection → Primary
 *
 */
interface ToolkitSectionSliceDefaultPrimary {
    /**
     * Title field in *ToolkitSection → Primary*
     *
     * - **Field Type**: Title
     * - **Placeholder**: This is where it all begins...
     * - **API ID Path**: toolkit_section.primary.title
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    title: prismicT.TitleField;
    /**
     * Description field in *ToolkitSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: A nice description of your feature
     * - **API ID Path**: toolkit_section.primary.description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    description: prismicT.RichTextField;
    /**
     * Sub Description field in *ToolkitSection → Primary*
     *
     * - **Field Type**: Rich Text
     * - **Placeholder**: *None*
     * - **API ID Path**: toolkit_section.primary.sub_description
     * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
     *
     */
    sub_description: prismicT.RichTextField;
}
/**
 * Item in ToolkitSection → Items
 *
 */
export interface ToolkitSectionSliceDefaultItem {
    /**
     * Tech field in *ToolkitSection → Items*
     *
     * - **Field Type**: Image
     * - **Placeholder**: *None*
     * - **API ID Path**: toolkit_section.items[].tech
     * - **Documentation**: https://prismic.io/docs/core-concepts/image
     *
     */
    tech: prismicT.ImageField<never>;
}
/**
 * Default variation for ToolkitSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: `ToolkitSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ToolkitSectionSliceDefault = prismicT.SharedSliceVariation<"default", Simplify<ToolkitSectionSliceDefaultPrimary>, Simplify<ToolkitSectionSliceDefaultItem>>;
/**
 * Slice variation for *ToolkitSection*
 *
 */
type ToolkitSectionSliceVariation = ToolkitSectionSliceDefault;
/**
 * ToolkitSection Shared Slice
 *
 * - **API ID**: `toolkit_section`
 * - **Description**: `ToolkitSection`
 * - **Documentation**: https://prismic.io/docs/core-concepts/reusing-slices
 *
 */
export type ToolkitSectionSlice = prismicT.SharedSlice<"toolkit_section", ToolkitSectionSliceVariation>;
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { HomepageDocumentData, HomepageDocumentDataSlicesSlice, HomepageDocument, AllDocumentTypes, AboutSectionSliceDefaultPrimary, AboutSectionSliceDefault, AboutSectionSliceVariation, AboutSectionSlice, BehindTheVineSliceDefaultPrimary, BehindTheVineSliceDefault, BehindTheVineSliceVariation, BehindTheVineSlice, ContactSectionSliceDefaultPrimary, ContactSectionSliceDefault, ContactSectionSliceVariation, ContactSectionSlice, FeaturedSectionSliceDefaultPrimary, FeaturedSectionSliceDefaultItem, FeaturedSectionSliceDefault, FeaturedSectionSliceVariation, FeaturedSectionSlice, FooterSectionSliceDefaultPrimary, FooterSectionSliceDefault, FooterSectionSliceVariation, FooterSectionSlice, IntroSectionSliceDefaultPrimary, IntroSectionSliceDefaultItem, IntroSectionSliceDefault, IntroSectionSliceVariation, IntroSectionSlice, RoadmapSectionSliceDefaultPrimary, RoadmapSectionSliceDefaultItem, RoadmapSectionSliceDefault, RoadmapSectionSliceVariation, RoadmapSectionSlice, ServicesSectionSliceDefaultPrimary, ServicesSectionSliceDefaultItem, ServicesSectionSliceDefault, ServicesSectionSliceVariation, ServicesSectionSlice, TestimonialSectionSliceDefaultPrimary, TestimonialSectionSliceDefaultItem, TestimonialSectionSliceDefault, TestimonialSectionSliceVariation, TestimonialSectionSlice, ToolkitSectionSliceDefaultPrimary, ToolkitSectionSliceDefaultItem, ToolkitSectionSliceDefault, ToolkitSectionSliceVariation, ToolkitSectionSlice };
    }
}
