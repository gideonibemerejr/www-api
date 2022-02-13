module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6571af19cf709348030ef701eac20d0a'),
  },
});
