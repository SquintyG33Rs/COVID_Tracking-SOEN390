module.exports = ({ env }) => ({
    email: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST', 'smtp.gmail.com'),
          port: env('SMTP_PORT', 465),
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
          secure: true,
        // ... any custom nodemailer options
      },
      settings: {
        defaultFrom: 'soen390notifier@gmail.com',
        //defaultReplyTo: 'mangonijinx@gmail.com',
      },
    },
  });