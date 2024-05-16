import { notAScraper } from "./notascraper.js";
import readline from "readline";

const url = "https://georgerrmartin.com/notablog/";

const main = async () => {
    notAScraper(url)
};

// setInterval(main, 3 * 60 * 60 * 1000); // 3 horas * 60 minutos/hora * 60 segundos/minuto * 1000 milissegundos/segundo
// setInterval(main, 60 * 1000); 
// main();
setTimeout(() => {
    main();

    setInterval(main, 60 * 1000); // 24 horas * 60 minutos * 60 segundos * 1000 milissegundos
}, 1000); 

