function getFirst(string) {
    return parseFloat(string.replace(/\/.*/,''));
}
function getSecond(string) {
    return parseFloat(string.replace(/.*\//,''));
}
function getXval(string) {
    // Height * X = Width   // Opposite is true
    // Width / X = Height   // in Landscape
    return (getFirst(string) / getSecond(string));
}

async function declarePageSize() {
    let print = document.querySelector('print'),
        styles = print.getBoundingClientRect();

    // This check helps to avoid going through the whole function if nothing has changed
    if (!sessionStorage.resizePage) {
        sessionStorage.resizePage = `${styles.height};${styles.width}`;
    } else {
        if (sessionStorage.resizePage !== `${styles.height};${styles.width}`) {
            sessionStorage.resizePage = `${styles.height};${styles.width}`;
            return;
        }
    }

    let valX = getXval(print.getAttribute('data-size'));
    
    if (print.classList.contains('portrait')) {
        // Page is in portrait mode
        if (styles.width >= (styles.height * valX)) {
            // Container width is greater than page width
            print.classList.remove('alt');            
        } else {
            print.classList.add('alt');
        }
    } else if (print.classList.contains('landscape')) {
        // Page is in landscape mode
        if (styles.height < (styles.width * valX)) {
            // Container height is less than page height
            print.classList.remove('alt');            
        } else {
            print.classList.add('alt');
        }
    }
    
    print.setAttribute('style',`--_print-height:${styles.height}px;--_print-width:${styles.width}px;--_print-x:${valX}`);
}

// Updates the page size values every 10ms
const updatePageSize = setInterval(declarePageSize, 10);