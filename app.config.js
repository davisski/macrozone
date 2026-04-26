export default {
  expo: {
    name: "macrozone-traversy",
    slug: "macrozone-traversy",
    scheme: "macrozone-traversy",
    extra: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_PUBLISHABLE_KEY,
    }
  }
};