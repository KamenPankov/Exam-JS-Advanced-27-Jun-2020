function sortLiItems(ul) {
    let lis = Array.from(ul.querySelectorAll('li'));
    
    let sorted = lis.sort((a, b) => a.textContent.localeCompare(b.textContent));
    lis.map(x => x.remove());
    sorted.map(x => ul.appendChild(x));
 }