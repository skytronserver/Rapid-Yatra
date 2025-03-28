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
    if (!cookiesString || typeof cookiesString !== 'string') return null;
    
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
    if (!cookiesString || typeof cookiesString !== 'string') return null;
    
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

export const dateTimeUpdate=(date)=>{
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
  }
  export const isoDatePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z/;
export const fullText={
  "L":"Live",
  "H":"History",
  "EA":"Emergency Alert",
  "E":"East",
  "N":"North",
  "S":"South",
  "W":"West"
}
export const keyMapping = {
    "id":"ID",
    "entry_time": "Date & Time",
    "vehicle_registration_number": "Vehicle Reg. No.",
    "odometer": "Odometer (km)",
    "imei": "IMEI",
    "packet_type": "Packet Type",
    "alert_id": "Alert ID",
    "packet_status": "Packet Status",
    "gps_status": "GPS Status",
    "date": "Date",
    "time": "Time",
    "latitude": "Latitude",
    "latitude_dir": "Latitude Direction",
    "longitude": "Longitude",
    "longitude_dir": "Longitude Direction",
    "speed": "Speed (km/h)",
    "heading": "Heading",
    "satellites": "Satellites",
    "altitude": "Altitude (m)",
    "pdop": "PDOP",
    "hdop": "HDOP",
    "network_operator": "Network Operator",
    "ignition_status": "Ignition Status",
    "main_power_status": "Main Power Status",
    "main_input_voltage": "Main Input Voltage (V)",
    "internal_battery_voltage": "Internal Battery Voltage (V)",
    "emergency_status": "Emergency Status",
    "box_tamper_alert": "Box Tamper Alert",
    "gsm_signal_strength": "GSM Signal Strength",
    "mcc": "MCC",
    "mnc": "MNC",
    "lac": "LAC",
    "cell_id": "Cell ID",
    "nbr1_cell_id": "Neighbor 1 Cell ID",
    "nbr1_lac": "Neighbor 1 LAC",
    "nbr1_signal_strength": "Neighbor 1 Signal Strength",
    "nbr2_cell_id": "Neighbor 2 Cell ID",
    "nbr2_lac": "Neighbor 2 LAC",
    "nbr2_signal_strength": "Neighbor 2 Signal Strength",
    "nbr3_cell_id": "Neighbor 3 Cell ID",
    "nbr3_lac": "Neighbor 3 LAC",
    "nbr3_signal_strength": "Neighbor 3 Signal Strength",
    "nbr4_cell_id": "Neighbor 4 Cell ID",
    "nbr4_lac": "Neighbor 4 LAC",
    "nbr4_signal_strength": "Neighbor 4 Signal Strength",
    "digital_input_status": "Digital Input Status",
    "digital_output_status": "Digital Output Status",
    "frame_number": "Frame Number",
    "device_tag": "Device Tag"
  };

  export const iconData = [
    {
      iconUrl: `${process.env.REACT_APP_API_URL}/static/track.png`,
      text: "All",
      color: "black",
      key: "default",
    },
    {
      iconUrl: `${process.env.REACT_APP_API_URL}/static/logo/red-skytron-transparent.png`,
      text: "Em. Alert",
      color: "red",
      key: "red",
    },
    {
      iconUrl: `${process.env.REACT_APP_API_URL}/static/logo/orange-skytron-transparent.png`,
      text: "Alert",
      color: "orange",
      key: "orange",
    },
    {
      iconUrl: `${process.env.REACT_APP_API_URL}/static/logo/blue-skytron-transparent.png`,
      text: "Eng On",
      color: "blue",
      key: "blue",
    },
    {
      iconUrl: `${process.env.REACT_APP_API_URL}/static/logo/green-skytron-transparent.png`,
      text: "Moving",
      color: "green",
      key: "green",
    },
    {
      iconUrl: `${process.env.REACT_APP_API_URL}/static/logo/grey-skytron-transparent.png`,
      text: "Offline",
      color: "grey",
      key: "grey",
    },
  ];

  export const iconStyles = {
    red: `${process.env.REACT_APP_API_URL}/static/logo/red-skytron-transparent.png`,
    orange: `${process.env.REACT_APP_API_URL}/static/logo/orange-skytron-transparent.png`,
    blue: `${process.env.REACT_APP_API_URL}/static/logo/blue-skytron-transparent.png`,
    green: `${process.env.REACT_APP_API_URL}/static/logo/green-skytron-transparent.png`,
    grey: `${process.env.REACT_APP_API_URL}/static/logo/grey-skytron-transparent.png`,
    default: `${process.env.REACT_APP_API_URL}/static/track.png`,
  };

  export const formatDateTime=(dateTimeString)=>{
    // Check if the string matches the date and time format
    const isoDatePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z/;
    
    if (isoDatePattern.test(dateTimeString)) {
        // Convert string to Date object
        const dateObj = new Date(dateTimeString);
        
        // Extract Date in YYYY-MM-DD format
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        // Extract Time in HH:MM:SS.mmm format
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getSeconds()).padStart(2, '0');
        const milliseconds = String(dateObj.getMilliseconds()).padStart(3, '0').slice(0, 2); // 2 digits
        const formattedTime = `${hours}:${minutes}:${seconds}.${milliseconds} IST`;
        
        // Return formatted date and time
        return `${formattedDate} \n ${formattedTime}`
    } else {
        return "Invalid date-time format!";
    }
  }
  
  
  