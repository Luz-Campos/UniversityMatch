function selectLink(selectedLink) {
    var links = document.querySelectorAll("#navbar li a");
    
    links.forEach(function(link) {
        link.classList.remove("active");
    });
    
    selectedLink.classList.add("active");
}
