document.addEventListener("DOMContentLoaded", function() {
    function loadGistInIframe() {
        const codeKey = new URLSearchParams(window.location.search).get('codeKey');

        if (codeKey) {
            const iframe = document.createElement('iframe');
            iframe.style.width = "100%";
            iframe.style.border = "none";
            iframe.id = "gist-iframe";

            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

            const gistScript = `<script src="https://gist.github.com/sachinknsachi/${codeKey}.js"></script>`;
            iframeDoc.open();
            iframeDoc.write(gistScript);
            iframeDoc.close();

            iframe.onload = function() {
                const removeGistMeta = setInterval(function() {
                    const gistMeta = iframeDoc.querySelector('.gist-meta');
                    if (gistMeta) {
                        gistMeta.remove();
                        clearInterval(removeGistMeta);
                    }
                }, 100);
            };
        } else {
            const div = document.createElement('div');
            div.innerHTML = `<h3 style="color: red;">OOPS, You are not authorized to access this page</h3>`
            document.body.appendChild(div);
        }
    } 

    loadGistInIframe();
});