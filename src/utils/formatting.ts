import { GenericObject } from "../api/RequestBuilder";


/**
 * A simple utility function to parse key/val objects into querystrings.
 * @param input GenericObject the object you want to parse into a querystring.
 */
export function objectToQuerystring(input: GenericObject): string {

    let res = ""
    const keys = Object.keys(input)

    if (keys.length == 0) {
        return res
    } else {
        res += "?"
    }

    keys.forEach((key, index) => {
        res += `${encodeURIComponent(key)}=${encodeURIComponent(input[key])}`
        if (index + 1 != keys.length) res += "&"
    })

    return res
}