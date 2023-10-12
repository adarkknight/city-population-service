module.exports = {
    formatText: function (word) {
        word = word.toLowerCase();
        let firstLetterFirstWord;
        let firstLetterSecondWord;
        
        if (word.indexOf(' ') !== -1) {
            const index = word.indexOf(' ');
            firstLetterFirstWord = word.charAt(0);
            firstLetterSecondWord = word.charAt(index + 1);
            word = word.replace(firstLetterFirstWord, firstLetterFirstWord.toUpperCase());
            word = word.replace(firstLetterSecondWord, firstLetterSecondWord.toUpperCase());
        } else {
            firstLetterFirstWord = word.charAt(0);
            word = word.replace(firstLetterFirstWord, firstLetterFirstWord.toUpperCase());
        }
        
        return word;
    }
}
