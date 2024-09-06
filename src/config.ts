import env from "env-var";

export const config = {
    baseUrl: env.get("BASE_URL").default("http://localhost").asString(),
    port: env.get("PORT").required().asInt()
}