import { notAScraper } from "./notAScraper.js";

const url = "https://georgerrmartin.com/notablog/";

const main = async () => {
    notAScraper(url)
};

setTimeout(() => {
    main();

    // setInterval(main, 8 * 60 * 60 * 1000); // Run every 8 hours
    setInterval(main, 60 * 1000); // Run every minute 
}, 1000);

