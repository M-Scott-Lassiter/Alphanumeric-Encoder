// Manually generated from https://www.typescriptlang.org/play

export class AlphanumericEncoder {
    constructor(configOptions?: {
        allowLowerCaseDictionary: boolean | undefined
        dictionary: string | undefined
    })
    private _defaultDictionary
    private _dictionaryInUse
    private _allowLowerCaseDictionary

    set allowLowerCaseDictionary(arg: boolean)
    get allowLowerCaseDictionary(): boolean

    set dictionary(arg: string)
    get dictionary(): string

    resetDefaultDictionary(): void

    encode(integerToEncode: number): string

    decode(stringToDecode: string): number

    deconstruct(stringToDeconstruct: string | number): number[]
}
