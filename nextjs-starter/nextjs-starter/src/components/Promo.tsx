import React from 'react';
import Image from 'next/image';
import {
  Link as JssLink,
  RichText as JssRichText,
  Field,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface Fields {
  PromoIcon: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  PromoText: Field<string>;
  PromoLink: LinkField;
  PromoText2: Field<string>;
}

type PromoProps = {
  params: { [key: string]: string };
  fields: Fields;
};

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
    const { PromoIcon, PromoText, PromoLink } = props.fields;

    return (
      <div className={`component promo ${props?.params?.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            {PromoIcon?.src && (
              <Image
                src={PromoIcon.src}
                alt={PromoIcon.alt || ''}
                width={PromoIcon.width || 100}
                height={PromoIcon.height || 100}
              />
            )}
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText field={PromoText} />
              </div>
            </div>
            <div className="field-promolink">
              <JssLink field={PromoLink} />
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
    const { PromoIcon, PromoText, PromoText2 } = props.fields;

    return (
      <div className={`component promo ${props?.params?.styles}`} id={id ? id : undefined}>
        <div className="component-content">
          <div className="field-promoicon">
            {PromoIcon?.src && (
              <Image
                src={PromoIcon.src}
                alt={PromoIcon.alt || ''}
                width={PromoIcon.width || 100}
                height={PromoIcon.height || 100}
              />
            )}
          </div>
          <div className="promo-text">
            <div>
              <div className="field-promotext">
                <JssRichText className="promo-text" field={PromoText} />
              </div>
            </div>
            <div className="field-promotext">
              <JssRichText className="promo-text" field={PromoText2} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <PromoDefaultComponent {...props} />;
};