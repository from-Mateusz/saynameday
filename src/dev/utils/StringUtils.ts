export default class StringUtils {
    static isNotEmpty(text: string): boolean {
        return undefined !== text && text.trim() !== "";
    }
}