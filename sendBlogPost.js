function sendBlogPost(allBlogPosts) {

    allBlogPosts.forEach((blogPost) => {
        const URL = process.env.NAGA + "/saveBlogPost/"
        const options = { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(blogPost), }

        fetch(URL, options)
            .then(response => {
                if (!response.ok) {
                    return response.json();
                }
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                }
            })
            .then(response => {
                console.log(response)
            })
            .catch((error) => {
                console.error(error)
            });
    })

}

export { sendBlogPost }
