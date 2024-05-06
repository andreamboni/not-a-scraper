function sendBlogPost(allBlogPosts) {

    console.log("SendBlogPost")

    allBlogPosts.forEach((blogPost) => {
        fetch('http://localhost:8085/not-a-grrm-archive/v1/saveBlogPost/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(blogPost),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar os dados. Status: ' + response.status);
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } 
        })
        .then(blogPost => {
            if(blogPost) {
                console.log('Dados enviados com sucesso:', blogPost);
            } 
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
    })

} 

export { sendBlogPost }