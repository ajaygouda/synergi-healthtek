module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi/provider-upload-cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      // Optional defaults for uploads
      actionOptions: {
        upload: {
          folder: env('CLOUDINARY_FOLDER'), // optional
          resource_type: 'auto', // handles images/videos
        },
        delete: {},
      },
    }
  },
  'populate-deep': {
    config: {
      defaultDepth: 5,
    },
  },
});
