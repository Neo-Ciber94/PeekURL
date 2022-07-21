import { TRPCError } from "@trpc/server";
import { MiddlewareFunction } from "@trpc/server/dist/declarations/src/internals/middlewares";
import { AuthorizedContext, Context } from "../context";
import { getAuth } from 'firebase-admin/auth';
import { getFirebaseAdmin } from "src/firebase/firebaseAdmin";
import { User } from "@prisma/client";
import logger from "src/logging";

export const authMiddleware: MiddlewareFunction<Context, AuthorizedContext, {}> = async ({ ctx, next }) => {
    const { prisma } = ctx;

    const app = getFirebaseAdmin();
    const auth = getAuth(app);

    const idToken = ""; // Get token from request
    let user: User | null = null;

    try {
        const { uid } = await auth.verifyIdToken(idToken, true);
        user = await prisma.user.findFirst({ where: { uid } })

        // Use do not exists in the database
        if (user == null) {
            const { displayName, email } = await auth.getUser(uid);
            const username = displayName || email || `peekurl:user-${uid}`;

            user = await prisma.user.create({
                data: { uid, username }
            })
        }

    } catch (err) {
        logger.error(err);
    }

    if (user == null) {
        throw new TRPCError({
            code: 'UNAUTHORIZED'
        })
    }

    logger.info(`User ${user.username} logged`);
    
    return next({
        ctx: {
            ...ctx,
            currentUserId: user.id
        }
    });
}