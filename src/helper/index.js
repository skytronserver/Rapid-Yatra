export const cipherEncryption = (key) => {
    return (text) => {
        if (!text) return '';
        
        // Convert text and key to array of character codes
        const textChars = String(text).split('').map(char => char.charCodeAt(0));
        const keyChars = String(key).split('').map(char => char.charCodeAt(0));
        
        // XOR each character with corresponding key character
        const encrypted = textChars.map((char, index) => {
            const keyChar = keyChars[index % keyChars.length];
            return String.fromCharCode(char ^ keyChar);
        });
        
        // Convert to base64 to make it URL-safe
        return btoa(encrypted.join(''));
    };
};

export const cipherDecryption = (key) => {
    return (encryptedText) => {
        if (!encryptedText) return '';
        
        try {
            // Decode from base64
            const decoded = atob(encryptedText);
            const textChars = decoded.split('').map(char => char.charCodeAt(0));
            const keyChars = String(key).split('').map(char => char.charCodeAt(0));
            
            // XOR each character with corresponding key character to decrypt
            const decrypted = textChars.map((char, index) => {
                const keyChar = keyChars[index % keyChars.length];
                return String.fromCharCode(char ^ keyChar);
            });
            
            return decrypted.join('');
        } catch (error) {
            console.error('Decryption failed:', error);
            return '';
        }
    };
};

// Helper to parse encrypted cookies
export const parseEncryptedCookies = (cookiesString, key) => {
    if (!cookiesString) return null;
    
    const decrypt = cipherDecryption(key);
    const parts = cookiesString.split('-');
    
    try {
        return {
            name: decrypt(parts[0]),
            role: decrypt(parts[1]),
            mobile: decrypt(parts[2]),
            id: parts[3] // ID is not encrypted
        };
    } catch (error) {
        console.error('Failed to parse cookies:', error);
        return null;
    }
};

// Helper to parse encrypted skytrack cookies
export const parseSkytrackCookies = (cookiesString, key) => {
    if (!cookiesString) return null;
    
    const decrypt = cipherDecryption(key);
    const parts = cookiesString.split('-');
    
    try {
        return {
            email: decrypt(parts[0]),
            role: decrypt(parts[1]),
            dateJoined: decrypt(parts[2]),
            mobile: decrypt(parts[3])
        };
    } catch (error) {
        console.error('Failed to parse skytrack cookies:', error);
        return null;
    }
};

// Helper to get user info from storage
export const getUserInfo = () => {
    const cookiesData = sessionStorage.getItem('cookiesData');
    const skytrackCookiesData = localStorage.getItem('skytrackCookiesData');
    
    if (!cookiesData || !skytrackCookiesData) return null;
    
    const userInfo = parseEncryptedCookies(cookiesData, 'skytrack');
    const skytrackInfo = parseSkytrackCookies(skytrackCookiesData, 'skytrack');
    
    return {
        ...userInfo,
        ...skytrackInfo
    };
}; 