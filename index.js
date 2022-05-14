// @ts-check

/**
 * A class for encoding and decoding base 10 integers to a custom alphanumeric base representation.
 * @param {object} [configOptions] Optional object defining initial settings for the class
 * @param {boolean} [configOptions.allowLowerCaseDictionary] Whether or not to allow lower case letters in the dictionary
 * @param {string} [configOptions.dictionary] Starting dictionary to use
 * @example
 * // Import into a project
 * const AlphanumericEncoder = require('alphanumeric-encoder')
 *
 * const encoder = new AlphanumericEncoder()
 *
 * @example
 * // Import into a project
 * const AlphanumericEncoder = require('alphanumeric-encoder')
 *
 * const encoder = new AlphanumericEncoder({allowLowerCaseDictionary: true, dictionary: "abcdEFGH"})
 *
 * @example
 * // Import into a project
 * const AlphanumericEncoder = require('alphanumeric-encoder')
 *
 * const configOptions = {allowLowerCaseDictionary: true, dictionary: "abcdEFGH"}
 * const encoder = new AlphanumericEncoder(configOptions)
 */
class AlphanumericEncoder {
    constructor(configOptions = {}) {
        /**
         * @private
         * @type {string} Internal value used to initialize and reset the dictionary
         * @default The English alphabet, all capitalized, in order
         * */
        this._defaultDictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        /**
         * @private
         * @type {string} Internal value of the dictionary to encode/decode against
         */
        this._dictionaryInUse = ''
        /**
         * @private
         * @type {boolean} Internal value that tracks whether or not the dictionary setter should allow lower case letters or not
         * */
        this._allowLowerCaseDictionary = false

        this.resetDefaultDictionary()

        // Process the options. If the user included any, then the if statements will evaluate truthy and try to
        //  set the appropriate values.
        if (configOptions.allowLowerCaseDictionary) {
            this.allowLowerCaseDictionary = configOptions.allowLowerCaseDictionary
        }
        if (configOptions.dictionary) {
            this.dictionary = configOptions.dictionary
        }
    }

    /**
     * Returns or sets the current dictionary.
     *
     * @param {string} newDictionary (If setting) String of unique letters and numbers, in order, for the new dictionary
     * @throws {RangeError} if setting dictionary to `null`, `undefined` or empty string (i.e. `''`)
     * @throws {RangeError} if `newDictionary` contains a non-alphanumeric character
     * @throws {RangeError} if `newDictionary` has a repeating character
     * @returns {string} (If used as getter) The current dictionary in use
     * @default `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
     *
     * @example
     * const encoder = new AlphanumericEncoder()
     *
     * console.log(encoder.dictionary)  // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
     *
     * encoder.dictionary = 'ABCD'
     * console.log(encoder.dictionary)  // 'ABCD'
     *
     * encoder.dictionary = 'ABCDA' // Throws error because the letter 'A' is repeated
     */
    set dictionary(newDictionary) {
        // Check for empty dictionaries
        if (
            typeof newDictionary !== 'string' ||
            newDictionary.length === 0 ||
            // eslint-disable-next-line no-self-compare
            newDictionary !== newDictionary // This verifies it wasn't passed NaN
        ) {
            throw new RangeError(
                'The dictionary cannot be null, undefined, boolean, NaN, or an empty string.'
            )
        }

        // Check for invalid characters. Using a regular expression, make sure only letters and numbers are allowed.
        const regExPattern = /^[a-z0-9]+$/i
        if (!regExPattern.test(newDictionary)) {
            throw new RangeError('All characters in the dictionary must be alphanumeric.')
        }

        // Convert to upper case only unless allowing for lower case letters
        let formattedDictionary = newDictionary
        if (!this._allowLowerCaseDictionary) {
            formattedDictionary = newDictionary.toUpperCase()
        }

        // Verify each character is only used one time within the dictionary.
        for (let i = 0; i < formattedDictionary.length; i++) {
            if (
                formattedDictionary.indexOf(formattedDictionary[i]) !==
                formattedDictionary.lastIndexOf(formattedDictionary[i])
            ) {
                throw new RangeError(
                    `The dictionary in use has at least one repeating symbol: ${formattedDictionary[i]}`
                )
            }
        }

        // Validation is complete. Update the internal property.
        this._dictionaryInUse = formattedDictionary
    }

    get dictionary() {
        return this._dictionaryInUse
    }

    /**
     * Returns or sets a boolean value that determines whether the dictionary will allow lower case letters or not.
     *
     * @param {boolean} isAllowed (If setting). Accept truthy or falsy statements.
     * @returns {boolean} (If used as getter)
     * @default false
     * @example
     * const encoder = new AlphanumericEncoder()
     * encoder.dictionary = 'abcdefg' // Default for `allowLowerCaseDictionary` is false
     * console.log(encoder.dictionary) // 'ABCDEFG'
     *
     * @example
     * const encoder = new AlphanumericEncoder()
     * encoder.allowLowerCaseDictionary = true
     * encoder.dictionary = 'ABCDefg'
     * console.log(encoder.dictionary) // 'ABCDefg'
     */
    set allowLowerCaseDictionary(isAllowed) {
        this._allowLowerCaseDictionary = !!isAllowed // The double !! converts truthy or falsy values to true or false, respectively
    }

    get allowLowerCaseDictionary() {
        return this._allowLowerCaseDictionary
    }

    /**
     * Reset the dictionary in use to the default.
     * @default `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
     * @returns {void}
     * @example
     * const encoder = new AlphanumericEncoder()
     * console.log(encoder.dictionary) // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
     * encoder.dictionary = 'ABCD'
     * console.log(encoder.dictionary) // 'ABCD'
     * encoder.resetDefaultDictionary()
     * console.log(encoder.dictionary) // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
     */
    resetDefaultDictionary() {
        this._dictionaryInUse = this._defaultDictionary
    }

    /**
     * Takes any number and converts it into a base (dictionary length) letter combo.
     *
     * @param {number} integerToEncode Base 10 integer. If passed a non-integer number, decimal values are truncated.
     * Passing zero, negative numbers, or non-numbers will return `undefined`.
     * @throws {RangeError} if `integerToEncode` exceeds the maximum safe integer for Javascript (`2^53 - 1 = 9007199254740991`).
     * @returns {string} Dictionary encoded value
     *
     * @example
     * const encoder = new AlphanumericEncoder()
     * console.log(encoder.encode(5)) // 'E'
     * console.log(encoder.encode(48)) // 'AV'
     * console.log(encoder.encode(733)) // 'ABE'
     *
     * @example
     * encoder.dictionary = 'ABCD'
     * console.log(encoder.encode(5)) // 'AA'
     * console.log(encoder.encode(48)) // 'BCD'
     * console.log(encoder.encode(733)) // 'BCACA'
     *
     * @example
     * encoder.dictionary = 'DCBA'
     * console.log(encoder.encode(5)) // 'DD'
     * console.log(encoder.encode(48)) // 'CBA'
     * console.log(encoder.encode(733)) // 'CBDBD'
     *
     * @example
     * encoder.dictionary = 'ABC123'
     * console.log(encoder.encode(5)) // '2'
     * console.log(encoder.encode(48)) // 'AA3'
     * console.log(encoder.encode(733)) // 'CBBA'
     *
     * @example
     * console.log(encoder.encode('A')) // undefined
     * console.log(encoder.encode(null)) // undefined
     * console.log(encoder.encode(undefined)) // undefined
     */
    encode(integerToEncode) {
        if (Number.isNaN(integerToEncode) || integerToEncode < 0) {
            return undefined
        }
        if (integerToEncode > Number.MAX_SAFE_INTEGER) {
            throw new RangeError(
                'The encoding value is greater than the maximum safe integer for Javascript.'
            )
        }

        function numToLetter(num, dictionary) {
            // Takes a letter between 0 and max letter length and returns the corresponding letter
            if (num === 0) {
                return undefined
            }
            return dictionary.slice(num - 1, num)
        }

        const baseNumber = Math.abs(Math.floor(integerToEncode))

        let index = baseNumber % this.dictionary.length
        let quotient = baseNumber / this.dictionary.length

        if (baseNumber <= this.dictionary.length) {
            // Number is within single digit bounds of our encoding letter alphabet
            return numToLetter(baseNumber, this.dictionary)
        }

        // By reaching this point in the code, this number was bigger than our dictionary. Recursively perform this function until complete
        if (index === 0) {
            quotient -= 1
        } // Accounts for the edge case of the last letter in the dictionary string
        const result = this.encode(quotient)

        if (index === 0) {
            index = this.dictionary.length
        } // Accounts for the edge case of the final letter; avoids getting an empty string

        return result + numToLetter(index, this.dictionary)
    }

    /**
     * Takes any string and converts it into a base 10 integer based on the defined dictionary.
     *
     * @param {string} stringToDecode If passed a non-integer number, decimal values are truncated.
     * Passing an empty string, `null`, or `undefined` will return `undefined`.
     * @throws {RangeError} if the decoded integer exceeds the maximum safe integer for Javascript (`2^53 - 1 = 9007199254740991`).
     * @returns {number} Positive integer representation. If one of the characters is not present in the dictionary, it will return `undefined`.
     * @example
     * const encoder = new AlphanumericEncoder()
     * console.log(encoder.decode('A')) // 1
     * console.log(encoder.decode('AC')) // 29
     * console.log(encoder.decode('ANE')) // 1045
     *
     * @example
     * console.log(encoder.decode('a')) // undefined
     * console.log(encoder.decode(123)) // undefined
     * console.log(encoder.decode('A?')) // undefined
     * console.log(encoder.decode(null)) // undefined
     * console.log(encoder.decode(undefined)) // undefined
     *
     * @example
     * encoder.dictionary = 'ABCD'
     * console.log(encoder.decode('A')) // 1
     * console.log(encoder.decode('AC')) // 7
     * console.log(encoder.decode('ADBAC')) // 551
     * console.log(encoder.decode('ANE')) // undefined
     */
    decode(stringToDecode) {
        // Takes any number encoded with the provided encode dictionary

        const safeEncoded = String(stringToDecode) // += '' // Force any numbers passed into a string format to get proper behavior below

        if (safeEncoded === '' || safeEncoded === null || safeEncoded === undefined) {
            return undefined
        }

        let result = 0
        let index = 0

        for (let i = 1; i <= safeEncoded.length; i++) {
            index = this.dictionary.search(safeEncoded.slice(i - 1, i)) + 1
            if (index === 0) {
                return undefined
            } // Attempted to find a letter that wasn't encoded in the dictionary
            result += index * this.dictionary.length ** (safeEncoded.length - i)
        }

        if (result > Number.MAX_SAFE_INTEGER) {
            throw new RangeError(
                'The decoded value is greater than the maximum safe integer for Javascript.'
            )
        }

        return result
    }

    /**
     * Takes any string of letters and numbers and deconstructs it into an array of base 10 integers based on the defined dictionary.
     *
     * @param {string|number} stringToDeconstruct A string of letters and numbers (e.g. `'A7'`, `'AC22'`, `'7C10F'`)
     * @throws {Error} if the dictionary contains a number as this function would be unable to differentiate between where a number and dictionary value.
     * @returns {number[]} An array of numbers. Characters not present in the dictionary are treated as letters and return `undefined` for that array value.
     * Passing an empty string (`''`), `null`, or `undefined` will return `undefined` for the whole function.
     * @example
     * const encoder = new AlphanumericEncoder()
     * console.log(encoder.deconstruct('A')) // [1]
     * console.log(encoder.deconstruct('AC22')) // [29, 22]
     * console.log(encoder.deconstruct('C3ABC123EFGH456')) // [3, 3, 731, 123, 92126, 456]
     * console.log(encoder.deconstruct('A1aB2B')) // [1, 1, undefined, 2, 2]
     * console.log(encoder.deconstruct('7AC!23A1%')) // [7, undefined, 23, 1, 1, undefined]
     * console.log(encoder.deconstruct('')) // undefined
     *
     */
    deconstruct(stringToDeconstruct) {
        // The dictionary cannot contain numbers, or else the deconstruct function cannot distinguish where
        //  one code begins and another ends.
        if (this.dictionary.match(/[0-9]/)) {
            throw new Error('Cannot deconstruct if the dictionary contains numbers.')
        }

        // Passing falsy values should return undefined
        if (
            stringToDeconstruct === null ||
            stringToDeconstruct === undefined ||
            String(stringToDeconstruct).length === 0
        ) {
            return undefined
        }

        const safeString = String(stringToDeconstruct) // Force argument to string to process number arguments and prevent slice from throwing an error
        const deconstructedArray = []
        let character = ''
        let componentPart = safeString.slice(0, 1) // Initialize with the first character (which has been guranteed present by above guard functions)

        // A helper function to push the final component into the array that gets returned. Numbers get added as is, strings get decoded.
        const addDecodedElement = (componentString) => {
            if (componentString.match(/[0-9]/)) {
                deconstructedArray.push(Number.parseInt(componentString, 10)) // Numbers
            } else {
                deconstructedArray.push(this.decode(componentString)) // Letters
            }
        }

        // If more than one character in safeString, loop through each subsequent character. Once the next character is not
        // the same type as the previous group (i.e. flips from letter to number, or vice versa), add the character group to
        // deconstructedArray, reset, and move to the next.
        for (let i = 2; i <= safeString.length; i++) {
            character = safeString.slice(i - 1, i)

            // Parse using a RegExp looking for numbers. The !! converts this to either true/false.
            if (!!character.match(/[0-9]/) === !!componentPart.match(/[0-9]/)) {
                // Same type, concatenate and keep going
                componentPart += character
            } else {
                // Flipped types, add to array and reset
                addDecodedElement(componentPart)
                componentPart = character
            }
        }

        // Add the final component part (for single character stringToDeconstruct, this will be the only part)
        addDecodedElement(componentPart)

        return deconstructedArray
    }
}

module.exports = AlphanumericEncoder
