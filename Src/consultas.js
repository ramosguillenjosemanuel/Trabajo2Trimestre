/*Consultas Personalizadas */

//En esta consulta realizare la union de 3 colecciones y agrupare por puesto para calcular la recaudación que ha obtenido cada puesto
// y las perdidas para luego calcular los beneficios de cada puesto (sin contar los contratos publicitarios).
//solo con las ganancias debido a los clientes y a las perdidas

db.registroCompras.aggregate(
    [
        {

            $lookup: {
                from: "clientes",
                localField: "ticket",
                foreignField: "ticket",
                as: "compras"
            }
        },
        {
            $unwind: "$compras"

        },
        {
            $lookup: {
                from: "evento",
                localField: "cod",
                foreignField: "cod",
                as: "eventoTotal"
            }
        },
        {
            $unwind: "$eventoTotal"
        },
        
    
        
        {
            $group:{
                _id:{
                   puesto:"$eventoTotal.puesto",
                  
                },
                gananciasClientes:{$sum: "$gasto"},
                
                gananciasPerdidas:
                {$push:{numeroEncargado:"$eventoTotal.encargados",
                precio:"$eventoTotal.precioEncargado",
                mantenimiento:"$eventoTotal.mantenimientoDiario"}},
                  cantidadPuestos:{ $sum: 1 },
                
            }
        },
        {
            $set:{
                cantidadPuestos:"$cantidadPuestos"}
        },
        
        {
            $unwind:"$gananciasPerdidas"
        },
       
        {
            $project:{
             _id:0,
             puesto:"$_id.puesto",
                perdidasPuestos: { $sum: [{ $multiply: ["$gananciasPerdidas.numeroEncargado",
                 "$gananciasPerdidas.precio"] },
                 { $multiply: ["$gananciasPerdidas.mantenimiento", 3] }] },
                
                gananciasClientes:"$gananciasClientes",
                cantidadPuestos:"$cantidadPuestos"

            }
        },
        {
            $set:{
                beneficiosDuplicados:{ $subtract: [ "$gananciasClientes", "$perdidasPuestos" ] }
            }
        },
       
        {
            $group:{
                _id:{
                puesto:"$puesto"
                },
                beneficiosFinal: {$sum:{ $divide: [ "$beneficiosDuplicados", 
                "$cantidadPuestos" ] } }
            }
        },
        {
            $project:{
               _id:0,
                puesto:"$_id.puesto",
                beneficiosFinal:"$beneficiosFinal" 
            }
        },
        
        { $merge : {
            into: { db: "test", coll: "puestosBeneficios" }, on: "_id",  whenMatched: "replace", whenNotMatched: "insert" 
           } 
       }
    ]).pretty()

    /*{ "puesto" : "tienda de juguetes", "beneficiosFinal" : 154.89999999999998 }
{ "puesto" : "tienda de ropas", "beneficiosFinal" : 185.7 }
{ "puesto" : "tienda de comida", "beneficiosFinal" : 97.09999999999997 }
{ "puesto" : "zona de artesania", "beneficiosFinal" : 209.2 }
{ "puesto" : "teatro", "beneficiosFinal" : 158.3 }
{ "puesto" : "zona de minijuegos", "beneficiosFinal" : 127.29999999999998 }
{ "puesto" : "cine", "beneficiosFinal" : 197.89999999999998 }
{ "puesto" : "tienda de juegos", "beneficiosFinal" : 76.10000000000002 }*/


      




//He realiza una unión de dos tablas y he  calculado las perdidas totales de cada puesto
// Y he usado el operador switch para que me imprima en un campo dependiendo de mis requisitos
// la rentabilidad de cada puesto.

db.evento.aggregate([
    {

        $lookup: {
            from: "contrato",
            localField: "contratos.codigo",
            foreignField: "codigo",
            as: "promocion"
        }
    },
    {
        $set: {
            perdidasTotales: { $sum: [{ $multiply: ["$encargados", "$precioEncargado"] }, 
            { $multiply: ["$mantenimientoDiario", 3] }] },

        }
    },
    {
        $project: {
            _id: 0,
            puesto: "$puesto",
            perdidasTotales: "$perdidasTotales",
            rentabilidad:
            {
                $switch:
                {
                    branches: [
                        {
                            case: { $gte: ["$perdidasTotales", 200] },
                            then: "Ha obtenido una rentabilidad muy mala."
                        },
                        {
                            case: {
                                $and: [{ $gte: ["$perdidasTotales", 100] },
                                { $lt: ["$perdidasTotales", 200] }]
                            },
                            then: "Ha obtenido una rentabilidad aceptable ."
                        },
                        {
                            case: {$and: [{ $gte: ["$perdidasTotales", 20] },
                            { $lt: ["$perdidasTotales", 100] }] },
                            then: "Este puesto ha obtenido una rentabilidad muy buena"
                        }
                    ],
                    default: "Rentabilidad sin evaluar."
                }
            }
        },

    },
    {
        $sort:
        {
            puesto: 1,
        }
    }

]).pretty()

/*{
        "puesto" : "cine",
        "perdidasTotales" : 103.80000000000001,
        "rentabilidad" : "Ha obtenido una rentabilidad aceptable ."
}
{
        "puesto" : "teatro",
        "perdidasTotales" : 93.6,
        "rentabilidad" : "Este puesto ha obtenido una rentabilidad muy buena"
}
{
        "puesto" : "tienda de comida",
        "perdidasTotales" : 137.10000000000002,
        "rentabilidad" : "Ha obtenido una rentabilidad aceptable ."
}
{
        "puesto" : "tienda de juegos",
        "perdidasTotales" : 211,
        "rentabilidad" : "Ha obtenido una rentabilidad muy mala."
} */



//En esta búsqueda se ha realizado una unión de dos tablas y una agrupación por días , 
//usando un cond para calcular el 80% de las ganancias de el primer dia 
// el 20% de el segundo y de el tercer dia para realizar una donación.

db.registroCompras.aggregate([
    {

        $lookup: {
            from: "clientes",
            localField: "ticket",
            foreignField: "ticket",
            as: "compras"
        }
    },
    {
        $unwind: "$compras"

    },
    
   
    {
        $group:
        {
            _id: {
                dia: "$dia",

            },
            ganancias:{ $sum: "$gasto" }
            
        }
    },
    {
        $project:{
            _id:0,
            dia:"$_id.dia",
            ganancias:"$ganancias",
            donacion:
            {
              $cond: { if: { $eq: [ "$_id.dia",new Date("2019-12-09")  ] }, then: 0.80, else: 0.2 }
            },
             
        }
            
        },
        {
        $set:{
            donacionFinal:{ $multiply: [ "$donacion", "$ganancias" ] }
        }
        },
        
        {
            $sort:
            {
                dia: 1,
            }
        }
    
    
]).pretty()

/*{
        "dia" : ISODate("2019-12-09T00:00:00Z"),
        "ganancias" : 1025,
        "donacion" : 0.8,
        "donacionFinal" : 820
}
{
        "dia" : ISODate("2019-12-10T00:00:00Z"),
        "ganancias" : 786.8,
        "donacion" : 0.2,
        "donacionFinal" : 157.36
}
{
        "dia" : ISODate("2019-12-11T00:00:00Z"),
        "ganancias" : 530.6,
        "donacion" : 0.2,
        "donacionFinal" : 106.12
}*/

//En esta búsqueda se realiza una unión de  dos tablas (registro compras y clientes) 
//mediante el group agrupando por nombres y ticket, mostrando en pantalla 
//mediante el project el nombre de el cliente , y sus gastos
//mediante un cond con un switch se lo otorgara a cada cliente un cheque con un descuento

db.registroCompras.aggregate([
    {    
           $lookup: {
            from: "clientes",
            localField: "ticket",
            foreignField: "ticket",
            as: "compras"
        }
    },
    {
        $unwind:"$compras"
    },
    
    
    {
        $project:{
            nombre:"$compras.nombre",
            ticket:"$ticket",
            gasto:"$gasto"

        },
        
        
    },
    {
        $group:{
            _id:{
            nombre:"$nombre",
            ticket:"$ticket"
            },
        gastosParticulares:{$sum:"$gasto"}
        },
           
           
},
{
    $set:{
gastosParticulares:"$gastosParticulares"
    }
},
{
$project:{
    gastosParticulares:"$gastosParticulares",
    cheque:{
    $cond:{
        if: {$gte: ["$gastosParticulares", 65]},
        then:{
            
            $switch:
            {
                branches: [
                    {
                        case: {
                            $and: [{ $gte: ["$gastosParticulares", 65] },
                            { $lt: ["$gastosParticulares", 120] }]
                        },
                        then: "30%"
                    
                    },
                    {
                        case: {$and: [{ $gte: ["$gastosParticulares", 120] },
                        { $lt: ["$gastosParticulares", 200] }]
                    },
                        then: "40%"
                    },
                    {
                        case: {$and: [{ $gte: ["$gastosParticulares", 200] },
                        { $lt: ["$gastosParticulares", 800] }]
                    },
                        then: "50%"
                    }
                ],
                default: "0%"
            }
        },
        else: {
            default:"0%"
            
            }
        }
        },
      }
},

{
    $sort:
    {
        gastosParticulares: -1,
    }
}
]).pretty()

/*{
        "_id" : {
                "nombre" : "Yassine Escudero",
                "ticket" : 9
        },
        "gastosParticulares" : 454.1,
        "cheque" : "50%"
}
{
        "_id" : {
                "nombre" : "Aritz Ferrero",
                "ticket" : 21
        },
        "gastosParticulares" : 174.5,
        "cheque" : "40%"
}
{
        "_id" : {
                "nombre" : "Alexia Cruz",
                "ticket" : 19
        },
        "gastosParticulares" : 166.4,
        "cheque" : "40%"
}
 */


// En esta consulta buscaba realizar un lookup, 
//para calcular las ganancias debido a la publicidad realizando una agrupación por nombres
//He usado el operador push para añadir un array 
//para poder saber la cantidad de cada puesto que publicitaba una marca 
//Para posteriormente calcular el saldo por publicidad y las ganancias que ha recibido el evento por el numero de días
// Que ha realiza una marca su publicidad.

db.evento.aggregate([
    {
        $unwind:"$codigo"
    },
    
    {    
        $lookup: {
         from: "contrato",
         localField: "codigo",
         foreignField: "codigo",
         as: "promo"
     }
 },
 {
$unwind:"$promo"
 },
 
 {
     $group:{
         _id:{
         nombrePatrocinador:"$promo.nombrePatrocinador"
         
         
            
         },
         promocion:{ $push:  { puesto: "$puesto" } },
        saldoPublicidad:{$sum:{ $multiply: [ "$promo.publicidad.precioDiario", 
        "$promo.publicidad.diasPublicidad" ] }},
        
       
     }
 },
 {
    $project:{
        nombrePatrocinador:1,
        gananciasPublicidad:{$sum:"$saldoPublicidad"},
        promocion:1,
        
       
       

       
        
    }
}
     
 
 
 ]).pretty()

 /*{
        "_id" : {
                "nombrePatrocinador" : "Riot Games"
        },
        "promocion" : [
                {
                        "puesto" : "tienda de ropas"
                },
                {
                        "puesto" : "zona de minijuegos"
                },
                {
                        "puesto" : "tienda de juegos"
                }
        ],
        "gananciasPublicidad" : 540
}
{
        "_id" : {
                "nombrePatrocinador" : "Monters"
        },
        "promocion" : [
                {
                        "puesto" : "tienda de ropas"
                }
        ],
        "gananciasPublicidad" : 300
}
{
        "_id" : {
                "nombrePatrocinador" : "Fanta"
        },
        "promocion" : [
                {
                        "puesto" : "zona de artesania"
                },
                {
                        "puesto" : "cine"
                }
        ],
        "gananciasPublicidad" : 240
} */





