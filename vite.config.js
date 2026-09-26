const port = Number(process.env.PORT || 4173);

export default {
  base: process.env.BASE_PATH || '/',
  server: {
    port,
    host: '0.0.0.0',
  },
  preview: {
    port,
    host: '0.0.0.0',
  },
};
