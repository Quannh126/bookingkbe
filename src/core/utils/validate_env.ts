import { cleanEnv, str, email, json } from 'envalid'

const validateEnv = () => {
    cleanEnv(process.env,{
        NODE_ENV: str(),
        MONGODB_URL: str()
    })
}

// const env = cleanEnv(process.env, {
//     API_KEY:            str(),
//     ADMIN_EMAIL:        email({ default: 'admin@example.com' }),
//     EMAIL_CONFIG_JSON:  json({ desc: 'Additional email parameters' }),
//     NODE_ENV:           str({ choices: ['development', 'test', 'production', 'staging']}),
//   })

// Read an environment variable, which is validated and cleaned during
// // and/or filtering that you specified with cleanEnv().
// env.ADMIN_EMAIL     // -> 'admin@example.com'

// // Envalid checks for NODE_ENV automatically, and provides the following
// // shortcut (boolean) properties for checking its value:
// env.isProduction    // true if NODE_ENV === 'production'
// env.isTest          // true if NODE_ENV === 'test'
// env.isDev           // true if NODE_ENV === 'development'
export default validateEnv