const posts = document.querySelector("#posts");
const getfavs = document.querySelector("#get-favs");
const fav_list = document.querySelector("#Favourites");
const get_posts = document.querySelector("#get-posts");

let favourites = [];


const url = 'https://jsonplaceholder.typicode.com/posts'

see_posts();

function see_posts() {
    fetch(url)
        .then((res) => res.json())
        .then(json => {
            render(json);
        })
        .catch((err) => console.error("error" + err));


    function render(postList) {
        postList.forEach((post) => {
            const div = document.createElement('div');
            const h2 = document.createElement('h2');
            const p = document.createElement('p');
            const fav = document.createElement('button');

            fav.innerHTML = 'Add to favorites';
            h2.innerHTML = post.title;
            p.innerHTML = post.body;
            div.appendChild(h2);
            div.appendChild(p);
            div.appendChild(fav);
            div.id = post.id;
            posts.appendChild(div);

            const btnID = 'btn' + post.id;
            fav.id = btnID;

            const fav_btn = document.getElementById(btnID);
            fav_btn.onclick = () => {

                let x = {
                    title: post.title,
                    body: post.body
                }

                console.log(x);
                favourites.push(x);
                localStorage.setItem("favourites", JSON.stringify(favourites));

            }


            const post_click = document.getElementById(`${div.id}`).firstChild;
            post_click.onclick = () => {
                cmntUrl = `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`;
                fetch(cmntUrl)
                    .then((res) => res.json())
                    .then(json => {
                        render_comments(json);
                    })
                    .catch((err) => console.error("error" + err));

                function render_comments(commentList) {

                    const comments = document.querySelector("#comments");
                    const overlay = document.getElementById("overlay");

                    commentList.forEach((comment) => {
                        const div = document.createElement('div');
                        const h2 = document.createElement('h2');
                        const p = document.createElement('p');

                        h2.innerHTML = comment.name;
                        p.innerHTML = comment.body;


                        div.appendChild(h2);
                        div.appendChild(p);


                        comments.appendChild(div);


                    })

                    comments.style.display = "block";
                    overlay.style.display = "block";


                    window.addEventListener("click", function (event) {
                        if (event.target !== comments) {
                            comments.style.display = "none";
                            overlay.style.display = "none";
                        }
                    });

                }



            }
        })
    }
}


getfavs.onclick = () => {
    posts.innerHTML = "";

    let x = JSON.parse(localStorage.getItem("favourites"));
    x.forEach((favourite) => {
        const div = document.createElement('div');
        const h2 = document.createElement('h2');
        const p = document.createElement('p');

        h2.innerHTML = favourite.title;
        p.innerHTML = favourite.body;
        div.appendChild(h2);
        div.appendChild(p);

        fav_list.appendChild(div);

        get_posts.style.display = 'block';
        getfavs.style.display = 'none';

        get_posts.onclick = () => {
            fav_list.innerHTML = "";
            see_posts();
        };
    })
}