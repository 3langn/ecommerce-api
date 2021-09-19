import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const pathToUpperBarFile = new URL('../../.env', import.meta.url).pathname;
const __dirname = dirname(fileURLToPath(import.meta.url));

//dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config({ path: pathToUpperBarFile });

export default {
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    host: process.env.EMAIL,
    apikey: process.env.SENDGRID_API_KEY,
  },
};
