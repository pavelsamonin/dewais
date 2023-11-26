import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult
}
    from "aws-lambda/trigger/api-gateway-proxy";

interface Body {
    text: string
}

interface lambdaResponse {
    statusCode: number,
    body: string
}

interface Result {
    noun: number,
    verb: number,
    adjective: number,
    adverb: number,
    preposition: number,
    conjunction: number,
    pronoun: number,
    interjection: number,
    determiner: number,
    numeral: number
}

const VOCABULARY:any = {
    "noun": ["cat", "book", "table", "house", "dog", "car", "tree", "bird", "friend", "city", "computer", "chair", "sun", "flower", "music", "child", "parent", "food", "water", "phone", "time", "money", "job", "world", "love", "school", "student", "teacher", "doctor", "hospital"],
    "verb": ["run", "eat", "sleep", "dance", "sing", "swim", "write", "read", "play", "talk", "work", "study", "drive", "think", "create", "listen", "watch", "buy", "help", "cook", "travel", "exercise", "paint", "draw", "explore", "solve", "smile", "laugh", "dream", "relax"],
    "adjective": ["happy", "big", "beautiful", "small", "tall", "smart", "funny", "kind", "loud", "quiet", "clever", "brave", "friendly", "patient", "colorful", "exciting", "delicious", "strong", "soft", "hard", "young", "old", "busy", "calm", "careful", "curious", "energetic", "happy", "peaceful"],
    "adverb": ["quickly", "eagerly", "silently", "happily", "slowly", "carefully", "loudly", "sharply", "softly", "quietly", "easily", "kindly", "politely", "vigorously", "gently", "anxiously", "honestly", "enthusiastically", "generously", "responsibly", "boldly", "joyfully", "patiently", "faithfully", "freely", "gracefully", "intensely", "safely", "wisely"],
    "preposition": ["in", "on", "at", "above", "below", "behind", "beside", "between", "under", "over", "across", "through", "into", "onto", "towards", "from", "within", "without", "among", "beyond", "with", "except", "until", "around", "past", "off", "up", "down", "onto", "inside"],
    "conjunction": ["and", "but", "or", "nor", "so", "yet", "for", "while", "although", "because", "if", "unless", "since", "when", "where", "as", "that", "whether", "while", "once", "though", "even", "provided", "whereas", "so", "thus", "therefore", "hence", "nevertheless"],
    "pronoun": ["he", "she", "they", "we", "it", "I", "you", "me", "him", "her", "us", "them", "myself", "yourself", "himself", "herself", "itself", "ourselves", "themselves", "everyone", "everything", "somebody", "nobody", "anyone", "everything", "no one", "each", "both", "few", "many"],
    "interjection": ["wow", "ouch", "oops", "yay", "hurray", "bravo", "oh", "ah", "uh", "yikes", "yeah", "yes", "no", "uh-huh", "hmm", "oh", "well", "alas", "phew", "oops", "ow", "oh no", "wow", "ahem", "hush", "hey", "hello", "goodbye", "oh dear", "congratulations"],
    "determiner": ["the", "a", "this", "that", "these", "those", "my", "your", "his", "her", "its", "our", "their", "an", "any", "some", "all", "every", "each", "either", "neither", "both", "much", "many", "few", "several", "enough", "other", "such", "what", "which"],
    "numeral": ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety", "hundred", "thousand", "million"]
}


export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    let response: lambdaResponse = {
        statusCode: 400,
        body: JSON.stringify('this is empty response'),
    };
    if (event.body !== null) {
        let body: Body = JSON.parse(event.body)

        if (body.text) {

            let result: Result

            const words: string[] = [];
            let str = body.text.replace(/[\t\n\r]/gm, " ").split(" ");
            str.map((s) => {
                let trimStr = s.trim();
                if (trimStr.length > 0) {
                    words.push(trimStr);
                }
            });

            let res:any = {}
            Object.keys(VOCABULARY).map(item => {
                const q = VOCABULARY[item].map((e: string) => ({[e]: words.filter(k => k === e).length}));
                let c = q.map((i: { [s: string]: string; } | ArrayLike<string>) => {
                    return Object.values(i)[0]
                })
                res[item] = 0
                for (let i = 0; i < c.length; i++) {
                    res[item] += c[i]
                }
            })
            result = res
            response = {
                statusCode: 200,
                body: JSON.stringify(result),
            };
        }
    }
    return response;
}