// Applies next-auth to the entire project
export { default } from "next-auth/middleware";

// Applies next-auth only to matching routes - can be regex
export const config = { matcher: ["/admin"] };
