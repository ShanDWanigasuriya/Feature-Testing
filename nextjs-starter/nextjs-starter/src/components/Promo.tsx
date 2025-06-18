import React from 'react';
import Image from 'next/image';
import {
  Link as JssLink,
  RichText as JssRichText,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface SitecoreImageField {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  value?: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
  };
}

interface Fields {
  PromoIcon: SitecoreImageField;
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

// Helper to get image props for next/image from Sitecore image field
function getImageProps(imageField?: SitecoreImageField) {
  if (!imageField) return null;

  const img = imageField.value ?? imageField;

  if (!img?.src) return null;

  return {
    src: img.src,
    alt: img.alt || '',
    width: img.width || 100,
    height: img.height || 100,
  };
}

const PromoDefaultComponent = (props: PromoProps): JSX.Element => (
  <div className={`component promo ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">Promo</span>
    </div>
  </div>
);

export const Default = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  if (props.fields) {
    const imageProps = getImageProps(props.fields.PromoIcon);

    return (
      <div className={`component promo ${props?.params?.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            {imageProps && <Image {...imageProps} />}
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={props.fields.PromoLink} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};

export const WithText = (props: PromoProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;

  if (props.fields) {
    const imageProps = getImageProps(props.fields.PromoIcon);

    return (
      <div className={`component promo ${props?.params?.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            {imageProps && <Image {...imageProps} />}
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText className="promo-text" field={props.fields.PromoText} />
              </div>
            </div>
            <div className="field-promotext">
              <JssRichText className="promo-text" field={props.fields.PromoText2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};