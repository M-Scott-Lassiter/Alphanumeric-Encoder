/**
 * A class for encoding and decoding base 10 integers to a custom alphanumeric base representation.
 *
 */
class AlphanumericEncoder {
    constructor() {
        this._dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' // Default dictionary is the English alphabet, all capitalized, in order
    }

    /**
     * Returns the current dictionary. Default is the English alphabet in order: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
     *
     * @returns {string} The current dictionary in use
     */
    get dictionary() {
        return this._dictionary
    }

    /**
     *
     * @param {string} newDictionary String of unique characters in order for the new dictionary
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

    /**
     * Takes any number and converts it into a base (dictionary length) letter combo.
     * It converts any numerical entry into a positive integer.
     *
     * @param {number} number Base 10 number. Must be positive and non-zero. Decimals values are truncated.
     * @returns {string} Dictionary encoded value
     */
    encode(number) {
        if (Number.isNaN(number) || number < 0) {
            return undefined
        } //! Number.isInteger(number)

        function numToLetter(num, dictionary) {
            // Takes a letter between 0 and max letter length and returns the corresponding letter
            if (num === 0) {
                return undefined
            }
            return dictionary.slice(num - 1, num)
        }

        const baseNumber = Math.abs(Math.floor(number))

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

    decode(encoded) {
        // Takes any number encoded with the provided encode dictionary

        const safeEncoded = String(encoded) // += '' // Force any numbers passed into a string format to get proper behavior below

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
