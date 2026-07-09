import type { CollectionConfig } from 'payload'

import { isSuperAdmin } from '@/lib/access'

export const Tenants: CollectionConfig = {
    slug: 'tenants',
    access: {
        create: ({ req }) => isSuperAdmin(req.user),
        delete: ({ req }) => isSuperAdmin(req.user),
    },
    admin: {
        useAsTitle: 'slug',
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true,
            label: "Store Name",
            admin: {
                description: "This is the name of the store (e.g Antonio's Store)" //The person here is the one who is looking at the dashboard.
            }
        },
        {
            name: "slug",
            type: "text",
            unique: true,
            required: true,
            index: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            },
            admin: {
                description: "This is the subdomain for the store (e.g [slug].funroad.com)" //The person here is the one who is looking at the dashboard.
            }
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media"
        },
        {
            name: "stripeAccountId",
            type: "text",
            required: true,
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            },
            admin: {
                description: "Stripe account Id associated with your shop.",
            }
        },
        {
            name: "stripDetailsSubmitted",
            type: "checkbox",
            admin: {
                description: "You cannot create products until you submit your Stripe details.",
            },
            access: {
                update: ({ req }) => isSuperAdmin(req.user)
            },
        }
    ],
};