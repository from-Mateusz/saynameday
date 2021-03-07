interface DiacriticalMarksUtil {
    simplify(text: string): string;
}

class PolishDiacriticalMarksUtil implements DiacriticalMarksUtil {
    simplify(text: string): string {
        let simplerText = text;
        if(text.indexOf("ł")) {
            simplerText = simplerText.replace("ł", "l");
        }
        return simplerText;
    }
}

export default class DiacriticalMarksUtilFactory {
    static polish(): DiacriticalMarksUtil {
        return new PolishDiacriticalMarksUtil();
    }
}