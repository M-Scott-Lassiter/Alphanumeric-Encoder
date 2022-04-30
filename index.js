// @ts-check

/**
 * A class for encoding and decoding base 10 integers to a custom alphanumeric base representation.
 * @example
 * // Import into a project
 * const AlphanumericEncoder = require('alphanumeric-encoder')
 * const encoder = new AlphanumericEncoder()
 */
class AlphanumericEncoder {
    constructor() {
        /** @private */
        this._defaultDictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // Default dictionary is the English alphabet, all capitalized, in order
        /** @private */
        this._dictionaryInUse = ''
        /** @private */
        this.resetDefaultDictionary()
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
        if (newDictionary === null || newDictionary === undefined || newDictionary.length === 0) {
            throw new RangeError('The dictionary cannot be null, undefined, or an empty string.')
        }

        // Check for invalid characters. Using a regular expression, make sure only letters and numbers are allowed.
        const regExPattern = /^[a-z0-9]+$/i
        if (!regExPattern.test(newDictionary)) {
            throw new RangeError('All characters in the dictionary must be alphanumeric.')
        }

        // Convert to upper case only. Verify each character is only used one time within the dictionary.
        const uppercaseDictionary = newDictionary.toUpperCase()

        for (let i = 0; i < uppercaseDictionary.length; i++) {
            if (
                uppercaseDictionary.indexOf(uppercaseDictionary[i]) !==
                uppercaseDictionary.lastIndexOf(uppercaseDictionary[i])
            ) {
                throw new RangeError(
                    `The dictionary in use has at least one repeating symbol: ${uppercaseDictionary[i]}`
                )
            }
        }

        // Validation is complete. Update the internal property.
        this._dictionaryInUse = uppercaseDictionary
    }

    get dictionary() {
        return this._dictionaryInUse
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
}

module.exports = AlphanumericEncoder
