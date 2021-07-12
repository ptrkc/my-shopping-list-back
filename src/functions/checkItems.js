import joi from "joi";

export function checkItem(object) {
    const schema = joi.object({
        text: joi.string().trim().replace(/[<>]/g, "").required(),
    });
    const error = schema.validate(object).error;
    return error ? false : object.text.trim().replace(/[<>]/g, "");
}
