let user = localStorage.getItem('myId')
if (user.includes('error') || user.includes('undefined') || !user || user == 'http://localhost:5173/') {
    location.assign('/pages/unAuth/');
}