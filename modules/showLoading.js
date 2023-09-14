function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.className = 'loader';

    const loaderContent = document.createElement('div');
    loaderContent.className = 'loader-content';
    loaderContent.textContent = 'Идет загрузка. Пожалуйста подождите.'; // Замените этот текст по вашему усмотрению

    loader.appendChild(loaderContent);
    
    document.addEventListener('DOMContentLoaded', function() {
        document.body.appendChild(loader);
    });

    window.addEventListener('load', () => {
        loader.style.display = 'none';
    });
}

showLoadingScreen();
