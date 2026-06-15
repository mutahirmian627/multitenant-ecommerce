import type { CollectionConfig } from 'payload'

export const Tenants: CollectionConfig = {
    slug: 'tenants',
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
            admin: {
                description: "This is the subdomain for the store (e.g [slug].funroad.com)" //The person here is the one who is looking at the dashboard.
            }
        },
        {
            name:"image",
            type:"upload",
            relationTo: "media"
        },
        {
            name: "stripeAccountId",
            type:"text",
            required: true,
            admin: {
                readOnly: true
            },
        },
        {
            name: "stripDetailsSubmitted",
            type: "checkbox",
            admin: {
                readOnly:true,
                description: "You cannot create products until you submit your Stripe details."
            }
        }
    ],
}
