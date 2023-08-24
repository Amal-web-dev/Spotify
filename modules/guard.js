let user = localStorage.getItem('myId')

if (user.includes('error') || user.includes('undefined') || !user) {
    location.assign('/pages/unAuth/');
}