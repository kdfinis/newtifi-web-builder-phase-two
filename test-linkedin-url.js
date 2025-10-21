// Test LinkedIn OAuth URL generation
const isDev = true; // localhost
const baseUrl = isDev ? 'http://localhost:8080' : 'https://newtifi.com';
const redirectUri = baseUrl + '/auth/linkedin/callback';

const linkedinUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
    `response_type=code&` +
    `client_id=784sx1yh2lpuxm&` +
    `redirect_uri=${encodeURIComponent(redirectUri)}&` +
    `scope=openid profile email&` +
    `state=linkedin_auth`;

console.log('LinkedIn OAuth URL:', linkedinUrl);
console.log('Redirect URI:', redirectUri);
console.log('URL Length:', linkedinUrl.length);
