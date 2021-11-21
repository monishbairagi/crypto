function encryptText(input_text, key) {
    // step-1: shift each character with a key
    // step-2: convert characters into a 8-bit bin string (ASCII)
    // step-3: convert consecutive bit pair into N-Base
    // step-4: construct N-Base into a DNA strand
    input_text = shifter(input_text, key); // step-1
    var result = "";
    for (var i = 0; i < input_text.length; i++) {
        var bin = charToBin(input_text[i]); // step-2
        for (var j = 0; j < 8; j += 2) {
            result += binPairToNBase(bin[j] + bin[j + 1]); // step-3 & step-4
        }
    }
    return result;
}

function decryptText(input_text, key) {
    // step-1: restore quad-N-Base from DNA strand
    // step-2: convert quad-N-Base to 8-bit bin string (ASCII)
    // step-3: convert 8-bit bin string (ASCII) to character
    // step-4: shift each character with a key to restore data
    var result = "";
    for (var i = 0; i < input_text.length; i += 4) { // step-1 & step-2
        var bin = nBaseToBinPair(input_text[i]);
        bin += nBaseToBinPair(input_text[i + 1]);
        bin += nBaseToBinPair(input_text[i + 2]);
        bin += nBaseToBinPair(input_text[i + 3]);
        result += binToChar(bin); // step-3
    }
    result = shifter(result, -key); // step-4
    return result;
}

function shifter(s, k) {
    var result = '';
    for (var i = 0; i < s.length; i++) {
        var charCode = s[i].charCodeAt();
        if (charCode > 96 && charCode < 123) {
            charCode += k % 26;
            if (charCode > 122) {
                charCode = (charCode - 122) + 96;
            } else if (charCode < 97) {
                charCode = (charCode - 97) + 123;
            }
        }
        if (charCode > 64 && charCode < 91) {
            charCode += k % 26;
            if (charCode > 90) {
                charCode = (charCode - 90) + 64;
            } else if (charCode < 65) {
                charCode = (charCode - 65) + 91;
            }
        }
        result += String.fromCharCode(charCode);
    }
    return result
}


function charToBin(ip_char) {
    var result = ip_char.charCodeAt(0).toString(2).padStart(8, '0');
    console.log(result);
    return ip_char.charCodeAt().toString(2).padStart(8, '0');
}
function binToChar(ip_bin) {
    return String.fromCharCode(parseInt(ip_bin, 2));
}

function binPairToNBase(bin_pair) {
    if (bin_pair == "00") {
        return "A";
    } else if (bin_pair == "01") {
        return "C";
    } else if (bin_pair == "10") {
        return "G";
    } else if (bin_pair == "11") {
        return "T";
    }
}
function nBaseToBinPair(n_base) {
    if (n_base == "A") {
        return "00";
    } else if (n_base == "C") {
        return "01";
    } else if (n_base == "G") {
        return "10";
    } else if (n_base == "T") {
        return "11";
    }
}