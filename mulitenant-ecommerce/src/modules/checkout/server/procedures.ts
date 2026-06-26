import z from "zod";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Media, Tenant } from "@/payload-types";
import { TRPCError } from "@trpc/server";

export const checkoutRouter = createTRPCRouter({
    getMany: baseProcedure.input(
        z.object({
            ids: z.array(z.string()),
        }),
    ).query(async ({ ctx, input }) => {
        const data = await ctx.db.find({
            collection: "products",
            depth: 2, //Populate category and image and (depth lvl 1:tenant) & (depth lvl 2:'tenant.image')
            where: {
                id: {
                    in: input.ids,
                }
            }
        });

        if(data.totalDocs !== input.ids.length){
            throw new TRPCError({ code:"NOT_FOUND", message:"Product not found" })
        };

        return {
            ...data,
            docs: data.docs.map((doc) => ({
                ...doc,
                image: doc.image as Media | null,
                tenant: doc.tenant as Tenant & { image: Media | null },
            })),
        };
    }),
});