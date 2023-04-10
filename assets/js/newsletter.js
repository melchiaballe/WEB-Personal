
function joinNewsletter(event){
    event.preventDefault();
    const form = document.querySelector('form');
    const data = Object.fromEntries(new FormData(form).entries());

    fetch("https://httpbin.org/post", {
        method: "POST",
        headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify(data)
    }).then(res => {
        console.log("Request complete! response:", res);
        let parent = document.querySelector("#section-info");
        parent.innerHTML = "Added you to our email list.";
        setTimeout(function() {parent.innerHTML = "";}, 3000);
    });
}
