import { clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";


const protectedRoute = createRouteMatcher([
  '/',
  '/upcoming',
  '/meeting(.*)',
  '/previous',
  '/recordings',
  '/personal-room',
]);

export default clerkMiddleware(async (auth, req) => {
  if (protectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};