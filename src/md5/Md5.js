/**
 * Author and copyright: Stefan Haack (https://shaack.com)
 * Repository: https://github.com/shaack/cm-web-modules
 * License: MIT, see file 'LICENSE'
 */

export class Md5 {

    /**
     * Create an MD5 hash from a string
     * @param {string} string - The input string to hash
     * @returns {string} The MD5 hash as a hexadecimal string
     */
    static hash(string) {
        // Convert string to array of bytes
        const msg = [];
        for (let i = 0; i < string.length; i++) {
            const c = string.charCodeAt(i);
            if (c < 128) {
                msg.push(c);
            } else if (c < 2048) {
                msg.push((c >> 6) | 192);
                msg.push((c & 63) | 128);
            } else if (((c & 0xFC00) === 0xD800) && (i + 1 < string.length) &&
                       ((string.charCodeAt(i + 1) & 0xFC00) === 0xDC00)) {
                // Surrogate pair
                const c2 = string.charCodeAt(++i);
                const codePoint = 0x10000 + ((c & 0x03FF) << 10) + (c2 & 0x03FF);
                msg.push((codePoint >> 18) | 240);
                msg.push(((codePoint >> 12) & 63) | 128);
                msg.push(((codePoint >> 6) & 63) | 128);
                msg.push((codePoint & 63) | 128);
            } else {
                msg.push((c >> 12) | 224);
                msg.push(((c >> 6) & 63) | 128);
                msg.push((c & 63) | 128);
            }
        }

        const msgLen = msg.length;
        const wordCount = (((msgLen + 8) >>> 6) + 1) * 16;
        const words = new Array(wordCount).fill(0);

        // Convert bytes to words
        for (let i = 0; i < msgLen; i++) {
            words[i >>> 2] |= msg[i] << ((i % 4) * 8);
        }

        // Append padding bit
        words[msgLen >>> 2] |= 0x80 << ((msgLen % 4) * 8);

        // Append length (in bits) as 64-bit little-endian
        const bitLength = msgLen * 8;
        words[wordCount - 2] = bitLength;
        words[wordCount - 1] = Math.floor(bitLength / 0x100000000);

        // Initialize hash values
        let a = 0x67452301;
        let b = 0xEFCDAB89;
        let c = 0x98BADCFE;
        let d = 0x10325476;

        // Per-round shift amounts
        const r = [
            7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
            5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
            4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
            6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
        ];

        // MD5 constants (binary integer part of the sines of integers)
        const k = [
            0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee,
            0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
            0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
            0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
            0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa,
            0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
            0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed,
            0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
            0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
            0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
            0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05,
            0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
            0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039,
            0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
            0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
            0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
        ];

        // Process each 16-word block
        for (let offset = 0; offset < wordCount; offset += 16) {
            const aa = a;
            const bb = b;
            const cc = c;
            const dd = d;

            for (let i = 0; i < 64; i++) {
                let f, g;
                if (i < 16) {
                    f = (b & c) | (~b & d);
                    g = i;
                } else if (i < 32) {
                    f = (d & b) | (~d & c);
                    g = (5 * i + 1) % 16;
                } else if (i < 48) {
                    f = b ^ c ^ d;
                    g = (3 * i + 5) % 16;
                } else {
                    f = c ^ (b | ~d);
                    g = (7 * i) % 16;
                }

                const temp = d;
                d = c;
                c = b;
                const x = (a + f + k[i] + words[offset + g]) | 0;
                b = (b + ((x << r[i]) | (x >>> (32 - r[i])))) | 0;
                a = temp;
            }

            a = (a + aa) | 0;
            b = (b + bb) | 0;
            c = (c + cc) | 0;
            d = (d + dd) | 0;
        }

        // Convert to hex string
        const toHex = (n) => {
            let s = '';
            for (let i = 0; i < 4; i++) {
                s += ((n >> (i * 8)) & 0xFF).toString(16).padStart(2, '0');
            }
            return s;
        };

        return toHex(a) + toHex(b) + toHex(c) + toHex(d);
    }
}