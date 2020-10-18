module.exports = {
   css: {
      loaderOptions: {
         sass: {
            prependData: `
               @import '@/scss/mixins.scss';
               @import '@/scss/variables.scss';
            `,
         },
      },
   },
};