import {object, string, TypeOf, ZodObject} from "zod";

function createIntersectionSchema(primarySchema: ZodObject<any, any>, secondarySchema: ZodObject<any, any>, secondaryFieldName: string) {
    return secondarySchema
        .pick({ [secondaryFieldName]: true })
        .merge(primarySchema)
        .refine(data => data[secondaryFieldName] === data.password, {
            message: "Values must be equal",
            path: [secondaryFieldName],
        });
}

const passwordSchema = object({
    password: string().min(8, "password must have at least 8 digits"),
});

const passwordConfirmSchema = object({
    passwordConfirm: string().min(8, "Please confirm your password"),
});

export const resetPasswordSchema = createIntersectionSchema(passwordSchema, passwordConfirmSchema, 'passwordConfirm');

export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;