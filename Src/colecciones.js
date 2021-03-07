db.evento.drop()
db.evento.insertMany([
    {cod:1,
        puesto:"teatro",
        encargados:6,
        precioEncargado:10.6,
        mantenimientoDiario:10,
        codigo:[5,6]
        
        },

    {cod:2,puesto:"tienda de ropas",encargados:6,precioEncargado:10.5,mantenimientoDiario:10,codigo:[1,3]},
    {cod:3,puesto:"zona de minijuegos",encargados:8,precioEncargado:13.8,mantenimientoDiario:20,codigo:[3,4]},
    {cod:4,puesto:"zona de artesania",encargados:9,precioEncargado:9,mantenimientoDiario:10,codigo:[2,8]},
    {cod:5,puesto:"cine",encargados:5,precioEncargado:9,mantenimientoDiario:19.6,codigo:[2,8]},
    {cod:6,puesto:"tienda de juegos",encargados:10,precioEncargado:15.1,mantenimientoDiario:20,codigo:[3,9]},
    {cod:7,puesto:"tienda de comida",encargados:7,precioEncargado:15.3,mantenimientoDiario:10,codigo:[4,9]},
    {cod:8,puesto:"tienda de juguetes",encargados:15,precioEncargado:12.4,mantenimientoDiario:10,codigo:[6,7]}
]);

db.clientes.drop()
db.clientes.insertMany([
    {dni: "84070455G",
    nombre:"Melania Hervas",
    ticket:1
},

    {dni: "05959342L",nombre:"Dylan Tejera",ticket:2},
    {dni: "80111866Z",nombre:"Maximino Mira",ticket:3},
    {dni: "08552553A",nombre:"Josue Herreros",ticket:4},
    {dni: "99782556T",nombre:"Aina Cifuentes",ticket:5},
    {dni: "86231552K",nombre:"Montse Jurado",ticket:6},
    {dni: "55012395Y",nombre:"Lucio Avila",ticket:7},
    {dni: "15744582R",nombre:"Sergi Osorio",ticket:8},
    {dni: "54120644B",nombre:"Yassine Escudero",ticket:9},
    {dni: "07278721A",nombre:"Piedad Xu",ticket:10},
    {dni: "59459177Z",nombre:"Ona Casas",ticket:11},
    {dni: "84551538L",nombre:"Bruno Elvira",ticket:12},
    {dni: "87342539Q",nombre:"Moussa Mateu",ticket:13},
    {dni: "22116817V",nombre:"Maria Molinero",ticket:14},
    {dni: "80531233E",nombre:"Belen Lopez",ticket:15},
    {dni: "15152712J",nombre:"Paul Toro",ticket:16},
    {dni: "39194844S",nombre:"Toni Real",ticket:17},
    {dni: "88349307M",nombre:"Luciana Pastor",ticket:18},
    {dni: "94850699X",nombre:"Alexia Cruz",ticket:19},
    {dni: "69323624Z",nombre:"Zahra Montiel",ticket:20},
    {dni: "51165420B",nombre:"Aritz Ferrero",ticket:21},
    ]);

db.contrato.drop()
db.contrato.insertMany([
    {codigo:1,
        nombrePatrocinador:"Monters",
        publicidad:{
            precioDiario:150,
            diasPublicidad:2}
        },

    {codigo:2,nombrePatrocinador:"Fanta",publicidad:{precioDiario:120,diasPublicidad:1}},
    {codigo:3,nombrePatrocinador:"Riot Games",publicidad:{precioDiario:180,diasPublicidad:1}},
    {codigo:4,nombrePatrocinador:"Urban Roosters",publicidad:{precioDiario:100,diasPublicidad:3}},
    {codigo:5,nombrePatrocinador:"Sony",publicidad:{precioDiario:200,diasPublicidad:1}},
    {codigo:6,nombrePatrocinador:"Redbull",publicidad:{precioDiario:90,diasPublicidad:1}},
    {codigo:7,nombrePatrocinador:"Xiomi",publicidad:{precioDiario:180,diasPublicidad:1}},
    {codigo:8,nombrePatrocinador:"Ea Sports",publicidad:{precioDiario:120,diasPublicidad:1}},
    {codigo:9,nombrePatrocinador:"Microsoft",publicidad:{precioDiario:190,diasPublicidad:2}},
]);

db.registroCompras.drop()
db.registroCompras.insertMany([
    {dia:new Date("2019-12-09") ,
    cod:2,
    gasto:48.6,
    ticket:1
},
    
    {dia:new Date("2019-12-09") ,cod:2,gasto:27.4,ticket:4},
    {dia:new Date("2019-12-09") ,cod:5,gasto:25.8,ticket:6},
    {dia:new Date("2019-12-09") ,cod:1,gasto:28.3,ticket:7},
    {dia:new Date("2019-12-09") ,cod:3,gasto:36.5,ticket:9},
    {dia:new Date("2019-12-09") ,cod:3,gasto:62.5,ticket:6},
    {dia:new Date("2019-12-09") ,cod:1,gasto:35.2,ticket:11},
    {dia:new Date("2019-12-09") ,cod:1,gasto:30,ticket:12},
    {dia:new Date("2019-12-09") ,cod:1,gasto:30,ticket:13},
    {dia:new Date("2019-12-09") ,cod:3,gasto:37,ticket:14},
    {dia:new Date("2019-12-09") ,cod:6,gasto:28.5,ticket:9},
    {dia:new Date("2019-12-09") ,cod:7,gasto:50.8,ticket:18},
    {dia:new Date("2019-12-09") ,cod:5,gasto:36.5,ticket:9},
    {dia:new Date("2019-12-09") ,cod:2,gasto:47.5,ticket:9},
    {dia:new Date("2019-12-09") ,cod:4,gasto:83.4,ticket:9},
    {dia:new Date("2019-12-09") ,cod:7,gasto:52.3,ticket:9},
    {dia:new Date("2019-12-09") ,cod:8,gasto:64.5,ticket:9},
    {dia:new Date("2019-12-09") ,cod:1,gasto:28.4,ticket:9},
    {dia:new Date("2019-12-09") ,cod:2,gasto:40,ticket:9},
    {dia:new Date("2019-12-09") ,cod:3,gasto:36.5,ticket:9},
    {dia:new Date("2019-12-09") ,cod:3,gasto:68,ticket:19},
    {dia:new Date("2019-12-09") ,cod:2,gasto:47,ticket:20},
    {dia:new Date("2019-12-09") ,cod:5,gasto:80.3,ticket:21},
    {dia:new Date("2019-12-10") ,cod:6,gasto:52,ticket:1},
    {dia:new Date("2019-12-10") ,cod:4,gasto:34.5,ticket:2},
    {dia:new Date("2019-12-10") ,cod:1,gasto:60,ticket:3},
    {dia:new Date("2019-12-10") ,cod:3,gasto:57.2,ticket:4},
    {dia:new Date("2019-12-10") ,cod:7,gasto:50,ticket:5},
    {dia:new Date("2019-12-10") ,cod:8,gasto:66.6,ticket:7},
    {dia:new Date("2019-12-10") ,cod:2,gasto:46,ticket:8},
    {dia:new Date("2019-12-10") ,cod:6,gasto:18.4,ticket:10},
    {dia:new Date("2019-12-11") ,cod:4,gasto:58.5,ticket:11},
    {dia:new Date("2019-12-10") ,cod:6,gasto:44,ticket:12},
    {dia:new Date("2019-12-10") ,cod:6,gasto:37.5,ticket:14},
    {dia:new Date("2019-12-10") ,cod:6,gasto:50,ticket:15},
    {dia:new Date("2019-12-10") ,cod:1,gasto:40,ticket:17},
    {dia:new Date("2019-12-10") ,cod:8,gasto:54.1,ticket:18},
    {dia:new Date("2019-12-10") ,cod:4,gasto:69,ticket:19},
    {dia:new Date("2019-12-10") ,cod:5,gasto:50.8,ticket:20},
    {dia:new Date("2019-12-10") ,cod:6,gasto:56.7,ticket:21},
    {dia:new Date("2019-12-11") ,cod:5,gasto:35.6,ticket:2},
    {dia:new Date("2019-12-11") ,cod:2,gasto:22.2,ticket:3},
    {dia:new Date("2019-12-11") ,cod:7,gasto:17.6,ticket:4},
    {dia:new Date("2019-12-11") ,cod:8,gasto:80,ticket:5},
    {dia:new Date("2019-12-11") ,cod:4,gasto:26,ticket:8},
    {dia:new Date("2019-12-11") ,cod:7,gasto:26,ticket:10},
    {dia:new Date("2019-12-11") ,cod:8,gasto:47.7,ticket:11},
    {dia:new Date("2019-12-11") ,cod:8,gasto:58,ticket:14},
    {dia:new Date("2019-12-11") ,cod:5,gasto:43.3,ticket:16},
    {dia:new Date("2019-12-11") ,cod:4,gasto:48.8,ticket:17},
    {dia:new Date("2019-12-11") ,cod:5,gasto:29.4,ticket:19},
    {dia:new Date("2019-12-11") ,cod:7,gasto:37.5,ticket:21},
]);