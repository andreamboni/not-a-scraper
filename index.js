import { notAScraper } from "./notascraper.js";
import readline from "readline";

const url = "https://georgerrmartin.com/notablog/";
let pageNumber = 0;
let searchWholeBlog = false;
let firstTimeRunning = true;


const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const main = async () => {
    if(firstTimeRunning) {
        
        console.log("Bem-vindo ao NotAScraper");
        r1.question("Scrapear o blog todo? (sim/não): ", (resposta) => {
            resposta = resposta.toLowerCase().trim();
    
            searchWholeBlog = resposta === "sim"
        
            if(searchWholeBlog) {
                r1.question("A partir de qual página? De 2 a 261: ", (page) => {
                    if(page >= 2 && page <= 261) {
                        pageNumber = parseInt(page)
                    } else {
                        pageNumber = 261
                    }
                    
                    r1.close()
        
                    console.log("firstTimeRunning = ", firstTimeRunning)
                    firstTimeRunning = false;
                    notAScraper(url, searchWholeBlog, pageNumber), 60 * 1000;
                    pageNumber--;
                });
            } else {
                r1.close();
        
                console.log("firstTimeRunning = ", firstTimeRunning)
                firstTimeRunning = false;
                notAScraper(url, searchWholeBlog), 60 * 1000;
            }
        });
    } else {
        console.log("firstTimeRunning = ", firstTimeRunning)
        notAScraper(url, searchWholeBlog, pageNumber)
        pageNumber--;
    }
};

// setInterval(main, 3 * 60 * 60 * 1000); // 3 horas * 60 minutos/hora * 60 segundos/minuto * 1000 milissegundos/segundo
// setInterval(main, 60 * 1000); 
setTimeout(() => {
    main();

    setInterval(main, 60 * 1000); // 24 horas * 60 minutos * 60 segundos * 1000 milissegundos
}, 1000); 


// main();