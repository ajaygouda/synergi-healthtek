import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentsAddress extends Struct.ComponentSchema {
  collectionName: 'components_components_addresses';
  info: {
    displayName: 'Address';
  };
  attributes: {
    address: Schema.Attribute.Text;
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    emails: Schema.Attribute.Component<'components.email', true>;
    phones: Schema.Attribute.Component<'components.phone', true>;
    postalCode: Schema.Attribute.String;
    state: Schema.Attribute.String;
    type: Schema.Attribute.String;
    username: Schema.Attribute.String;
  };
}

export interface ComponentsButton extends Struct.ComponentSchema {
  collectionName: 'components_components_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    ctaLink: Schema.Attribute.String & Schema.Attribute.Required;
    ctaText: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsCartItem extends Struct.ComponentSchema {
  collectionName: 'components_components_cart_items';
  info: {
    displayName: 'cartItem';
  };
  attributes: {
    price: Schema.Attribute.Decimal;
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer;
  };
}

export interface ComponentsEmail extends Struct.ComponentSchema {
  collectionName: 'components_components_emails';
  info: {
    displayName: 'Email';
  };
  attributes: {
    emailId: Schema.Attribute.String;
  };
}

export interface ComponentsMenu extends Struct.ComponentSchema {
  collectionName: 'components_components_menus';
  info: {
    displayName: 'Menu';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ComponentsOrderItem extends Struct.ComponentSchema {
  collectionName: 'components_components_order_items';
  info: {
    displayName: 'OrderItem';
  };
  attributes: {
    product: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    quantity: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface ComponentsPhone extends Struct.ComponentSchema {
  collectionName: 'components_components_phones';
  info: {
    displayName: 'Phone';
  };
  attributes: {
    number: Schema.Attribute.String;
  };
}

export interface ComponentsProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_components_product_variants';
  info: {
    displayName: 'ProductVariant';
  };
  attributes: {
    color: Schema.Attribute.String;
    price: Schema.Attribute.Integer;
    size: Schema.Attribute.String;
    sku: Schema.Attribute.String;
    stock: Schema.Attribute.Integer;
  };
}

export interface ComponentsSocial extends Struct.ComponentSchema {
  collectionName: 'components_components_socials';
  info: {
    displayName: 'Social';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
  };
}

export interface SectionsCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_cards';
  info: {
    displayName: 'Card';
  };
  attributes: {
    ctaLink: Schema.Attribute.String;
    ctaSecondLink: Schema.Attribute.String;
    ctaSecondText: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonials';
  info: {
    displayName: 'Testimonial';
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    designation: Schema.Attribute.String;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    proddd: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'components.address': ComponentsAddress;
      'components.button': ComponentsButton;
      'components.cart-item': ComponentsCartItem;
      'components.email': ComponentsEmail;
      'components.menu': ComponentsMenu;
      'components.order-item': ComponentsOrderItem;
      'components.phone': ComponentsPhone;
      'components.product-variant': ComponentsProductVariant;
      'components.social': ComponentsSocial;
      'sections.card': SectionsCard;
      'sections.testimonial': SectionsTestimonial;
    }
  }
}
