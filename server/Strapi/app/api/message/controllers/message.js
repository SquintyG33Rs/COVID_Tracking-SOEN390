const { sanitizeEntity } = require('strapi-utils');
'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is("multipart")) {
          const { data, files } = parseMultipartData(ctx);
          entity = await strapi.services['message'].create(data, { files });
        } else {
          entity = await strapi.services['message'].create(ctx.request.body);
        }
    
        strapi.StrapIO.emit(this,'create', entity);
    
        return sanitizeEntity(entity, { model: strapi.models['message'] });
      },
};
