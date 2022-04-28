/**
 * A class for encoding and decoding base 10 integers to a custom alphanumeric base representation.
 */
class AlphanumericEncoder {
    constructor() {
        /**
         * @private
         * @type {string}
         */
        this._dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // Default dictionary is the English alphabet, all capitalized, in order
    }

    /**
     * Set or get the current dictionary.
     *
     * Default is the English alphabet in order: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
     *
     * @param {string} newDictionary (If setting) String of unique letters and numbers, in order, for the new dictionary
     * @returns {string} (If used as getter) The current dictionary in use
     *
     * @example
     * console.log(AlphanumericEncoder.dictionary)  // 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
     *
     * AlphanumericEncoder.dictionary = 'ABCD'
     * console.log(AlphanumericEncoder.dictionary)  // 'ABCD'
     *
     * AlphanumericEncoder.dictionary = 'ABCDA' // Throws error because the letter 'A' is repeated
     */
    set dictionary(newDictionary) {
        // Check for empty dictionaries
        if (newDictionary === null || newDictionary === undefined || newDictionary.length === 0) {
            throw new Error('The dictionary cannot be null, undefined, or an empty string.')
        }

        // Check for invalid characters. Using a regular expression, make sure only letters and numbers are allowed.
        const regExPattern = /^[a-z0-9]+$/i
        if (!regExPattern.test(newDictionary)) {
            throw new Error('All characters in the dictionary must be alphanumeric.')
        }

        // Convert to upper case only. Verify each character is only used one time within the dictionary.
        const uppercaseDictionary = newDictionary.toUpperCase()

        for (let i = 0; i < uppercaseDictionary.length; i++) {
            if (
                uppercaseDictionary.indexOf(uppercaseDictionary[i]) !==
                uppercaseDictionary.lastIndexOf(uppercaseDictionary[i])
            ) {
                throw new Error(
                    `The dictionary in use has at least one repeating symbol: ${uppercaseDictionary[i]}`
                )
            }
        }

        // Validation is complete. Update the internal property.
        this._dictionary = uppercaseDictionary
    }

    get dictionary() {
        return this._dictionary
    }

    /**
     * Takes any number and converts it into a base (dictionary length) letter combo.
     *
     * @param {number} integerToEncode Base 10 integer. If passed a non-integer number, decimal values are truncated.
     * Passing zero, negative numbers, or non-numbers will return `undefined`.
     * @returns {string} Dictionary encoded value
     *
     * @example
     * const encoder = new AlphanumericEncoder()
     * console.log(encoder.encode(5)) // 'E'
     * console.log(encoder.encode(48)) // 'AV'
     * console.log(encoder.encode(733)) // 'ABE'
     *
     * @example
     * const encoder = new AlphanumericEncoder()
     * encoder.dictionary = 'ABCD'
     * console.log(encoder.encode(5)) // 'AA'
     * console.log(encoder.encode(48)) // 'BCD'
     * console.log(encoder.encode(733)) // 'BCACA'
     *
     * @example
     * const encoder = new AlphanumericEncoder()
     * encoder.dictionary = 'DCBA'
     * console.log(encoder.encode(5)) // 'DD'
     * console.log(encoder.encode(48)) // 'CBA'
     * console.log(encoder.encode(733)) // 'CBDBD'
     *
     * @example
     * const encoder = new AlphanumericEncoder()
     * encoder.dictionary = 'ABC123'
     * console.log(encoder.encode(5)) // '2'
     * console.log(encoder.encode(48)) // 'AA3'
     * console.log(encoder.encode(733)) // 'CBBA'
     */
    encode(integerToEncode) {
        if (Number.isNaN(integerToEncode) || integerToEncode < 0) {
            return undefined
        } //! Number.isInteger(number)

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
     * @returns {number} Positive integer representation. If one of the characters is not present in the dictionary, it will return `undefined`.
     * @example
     * const encoder = new AlphanumericEncoder()
     * console.log(encoder.decode('A')) // 1
     * console.log(encoder.decode('AC')) // 29
     * console.log(encoder.decode('ANE')) // 1045
     *
     * @example
     * const encoder = new AlphanumericEncoder()
     * console.log(encoder.decode('a')) // undefined
     * console.log(encoder.decode(123)) // undefined
     * console.log(encoder.decode('A?')) // undefined
     *
     * @example
     * const encoder = new AlphanumericEncoder()
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

        return result
    }
}

module.exports = AlphanumericEncoder
