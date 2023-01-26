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
type HomepageDocumentDataSlicesSlice = IntroSectionSlice | AboutSectionSlice;
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
declare module "@prismicio/client" {
    interface CreateClient {
        (repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
    }
    namespace Content {
        export type { HomepageDocumentData, HomepageDocumentDataSlicesSlice, HomepageDocument, AllDocumentTypes, AboutSectionSliceDefaultPrimary, AboutSectionSliceDefault, AboutSectionSliceVariation, AboutSectionSlice, IntroSectionSliceDefaultPrimary, IntroSectionSliceDefaultItem, IntroSectionSliceDefault, IntroSectionSliceVariation, IntroSectionSlice };
    }
}
