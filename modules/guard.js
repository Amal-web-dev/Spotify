let user = localStorage.getItem('myId')
if (!user || user.includes('error') || user.includes('undefined') || user == 'http://localhost:5173/') {
    location.assign('/pages/unAuth/');
}