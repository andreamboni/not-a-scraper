import puppeteer from "puppeteer";
import { sendBlogPost } from "./sendBlogPost.js";

const searchWholeBlog = process.argv[2]
let pageNumber = process.argv[3]

const notAScraper = async (url) => {
    console.log("searchWholeBlog = " + searchWholeBlog)
    console.log("pageNumber = " + pageNumber)

    if(searchWholeBlog == true) {
        if(pageNumber >= 2) {
            url = url.concat("page/" + pageNumber);
            pageNumber--
        } 
    } else {
        if(pageNumber >= 2) {
            url = url.concat("page/" + pageNumber);
        } 
        pageNumber = 0;
    }

    console.log("Searching page: " + url)

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url);

        const allBlogPosts = await page.evaluate(() => {
            const posts = Array.from(document.querySelectorAll('.post-main'));

            return posts.map(post => {
                const postImage = post.querySelector('img').src;
                const title = post.querySelector('h1').innerText;
                const url = post.querySelector('a').href;
                const theDate = post.querySelector('.thedate').innerText;
                const contentElements = post.querySelector('.post').querySelectorAll('p');
                
                const content = Array.from(contentElements).map(p => {
                    if(p.innerHTML.includes("&nbsp;")) {
                        return p.innerHTML.replaceAll("&nbsp;", "");
                    } 
                    
                    if(p.querySelector('img')) {
                        return p.querySelector('img').src;
                    } 
                    
                    if(p.querySelector('iframe')) {
                        return p.querySelector('iframe').src;
                    } 
 
                    return p.innerHTML;
                });

                console.log({title: title, url: url, theDate: theDate})
                return {postImage, title, url, theDate, content };
            });
        });
        
        sendBlogPost(allBlogPosts)

        await browser.close();
    } catch (error) {
        console.error("Ocorreu um erro:", error);
    }
};

export { notAScraper }
