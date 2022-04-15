/**
 * A class for encoding and decoding base 10 integers to a custom alphanumeric base representation.
 * 
 */
class AlphanumericEncoder {

    constructor() {
        this._dictionary = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'     //Default dictionary is the English alphabet, all capitalized, in order
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

        //Check for empty dictionaries
        if (newDictionary === null || newDictionary === undefined || newDictionary.length === 0) {
            throw new Error('The dictionary cannot be null, undefined, or an empty string.')
        }

        //Check for invalid characters. Using a regular expression, make sure only letters and numbers are allowed.
        const regExPattern = /^[a-z0-9]+$/i
        if (!regExPattern.test(newDictionary)) {
            throw new Error('All characters in the dictionary must be alphanumeric.')
        }

        //Convert to upper case only. Verify each character is only used one time within the dictionary.
        newDictionary = newDictionary.toUpperCase()
        for (let i = 0; i < newDictionary.length; i++) {
            if(newDictionary.indexOf(newDictionary[i]) !== newDictionary.lastIndexOf(newDictionary[i])) {
                throw new Error(`The dictionary in use has at least one repeating symbol: ${newDictionary[i]}`)
            }
        }

        //Validation is complete. Update the internal property.
        this._dictionary = newDictionary
    }

    /**
         * Takes any number and converts it into a base (dictionary length) letter combo.
         * It converts any numerical entry into a positive integer.
         * 
         * @param {number} number Base 10 number. Must be positive and non-zero. Decimals values are truncated.
         * @returns {string} Dictionary encoded value
         */
    encode(number) {
        if (isNaN(number) || number < 0) {return undefined}         //!Number.isInteger(number)

        number = Math.abs(Math.floor(number))

        let index = number % this.dictionary.length
        let quotient = number / this.dictionary.length
        let result
        
        if (number <= this.dictionary.length) {
            //Number is within single digit bounds of our encoding letter alphabet
            return numToLetter(number, this.dictionary)
        }

        //By reaching this point in the code, this number was bigger than our dictionary. Recursively perform this function until complete
        if (index === 0) {quotient--}   //Accounts for the edge case of the last letter in the dictionary string
        result = this.encode(quotient)
        
        if (index === 0) {index = this.dictionary.length}   //Accounts for the edge case of the final letter; avoids getting an empty string
        
        return result + numToLetter(index, this.dictionary)

        function numToLetter(number, dictionary) {
            //Takes a letter between 0 and max letter length and returns the corresponding letter
            if (number === 0) {
                return undefined
            } else {
                return dictionary.slice(number - 1, number)
            }
        }
    }

    decode(encoded) {
        //Takes any number encoded with the provided encode dictionary 

        encoded = encoded + ''  //Force any numbers passed into a string format to get proper behavior below
        if (encoded === '' || encoded === null || encoded === undefined) {return undefined}

        let result = 0
        let index = 0

        for (let i = 1; i <= encoded.length; i++) {
            index = this.dictionary.search(encoded.slice(i - 1, i)) + 1
            if (index === 0) {return undefined} //Attempted to find a letter that wasn't encoded in the dictionary
            result = result + index * Math.pow(this.dictionary.length, (encoded.length - i))
        }

        return result
    }
}

module.exports = AlphanumericEncoder